import Reservation from '../models/ReservationModel';
import { Transaction, Op } from 'sequelize';
import { makeErrorResponse } from '../utils/ErrorHandler';
import Tour from '../models/TourModel';
import Lodging from '../models/LodgingModel';

/**
 * ✅ Obtener todas las reservas de un usuario
 */
export const getReservationsByUser = async (userId: number): Promise<Reservation[]> => {
    try {
        return await Reservation.findAll({ where: { userId } });
    } catch (error) {
        throw error;
    }
};

/**
 * ✅ Crear una nueva reserva
 */
export const createReservation = async (
    reservationData: Partial<Reservation>,
): Promise<Reservation> => {
    return await Reservation.sequelize!.transaction(async (transaction: Transaction) => {
        try {
            if (reservationData.entityType === 'lodging') {
                const lodgingExists = await Lodging.findByPk(reservationData.entityId, {
                    transaction,
                });
                if (!lodgingExists) throw makeErrorResponse(404, 'hospedaje');
            } else if (reservationData.entityType === 'tour') {
                const tourExists = await Tour.findByPk(reservationData.entityId, { transaction });
                if (!tourExists) throw makeErrorResponse(404, 'tour');
            } else {
                throw makeErrorResponse(400, 'El tipo de entidad debe ser "tour" o "lodging".');
            }
            const overlappingReservation = await Reservation.findOne({
                where: {
                    entityType: reservationData.entityType,
                    entityId: reservationData.entityId,
                    [Op.or]: [
                        {
                            startDate: {
                                [Op.between]: [reservationData.startDate, reservationData.endDate],
                            },
                        },
                        {
                            endDate: {
                                [Op.between]: [reservationData.startDate, reservationData.endDate],
                            },
                        },
                    ],
                },
                transaction,
            });

            if (overlappingReservation) {
                throw makeErrorResponse(409, 'La reserva en este rango de fechas,');
            }

            return await Reservation.create(reservationData, { transaction });
        } catch (error) {
            throw error;
        }
    });
};

/**
 * ✅ Actualizar una reserva (Solo si aún no ha comenzado)
 */
export const updateReservation = async (
    id: number,
    reservationData: Partial<Reservation>,
): Promise<Reservation> => {
    return await Reservation.sequelize!.transaction(async (transaction: Transaction) => {
        try {
            const reservation = await Reservation.findByPk(id, { transaction });
            if (!reservation) throw makeErrorResponse(404, 'Reserva');

            if (new Date(reservation.startDate) <= new Date()) {
                throw makeErrorResponse(400, 'No se puede actualizar una reserva ya iniciada.');
            }
            if (reservationData.startDate || reservationData.endDate) {
                const overlappingReservation = await Reservation.findOne({
                    where: {
                        entityType: reservation.entityType,
                        entityId: reservation.entityId,
                        id: { [Op.ne]: id },
                        [Op.or]: [
                            {
                                startDate: {
                                    [Op.between]: [
                                        reservationData.startDate ?? reservation.startDate,
                                        reservationData.endDate ?? reservation.endDate,
                                    ],
                                },
                            },
                            {
                                endDate: {
                                    [Op.between]: [
                                        reservationData.startDate ?? reservation.startDate,
                                        reservationData.endDate ?? reservation.endDate,
                                    ],
                                },
                            },
                        ],
                    },
                    transaction,
                });

                if (overlappingReservation) {
                    throw makeErrorResponse(409, 'La reserva en este nuevo rango de fechas,');
                }
            }

            await reservation.update(reservationData, { transaction });

            return reservation;
        } catch (error) {
            throw error;
        }
    });
};

/**
 * ✅ Eliminar una reserva (Solo si aún no ha comenzado)
 */
export const deleteReservation = async (id: number): Promise<void> => {
    return await Reservation.sequelize!.transaction(async (transaction: Transaction) => {
        try {
            const reservation = await Reservation.findByPk(id, { transaction });
            if (!reservation) throw makeErrorResponse(404, 'Reserva');

            // No permitir eliminar reservas que ya iniciaron
            if (new Date(reservation.startDate) <= new Date()) {
                throw makeErrorResponse(400, 'No se puede eliminar una reserva ya iniciada.');
            }

            await reservation.destroy({ transaction });
        } catch (error) {
            throw error;
        }
    });
};

/**
 * ✅ Eliminar automáticamente reservas expiradas
 */
export const cleanExpiredReservations = async (): Promise<void> => {
    return await Reservation.sequelize!.transaction(async (transaction: Transaction) => {
        try {
            await Reservation.destroy({
                where: { startDate: { [Op.lt]: new Date() } },
                transaction,
            });
        } catch (error) {
            throw error;
        }
    });
};
