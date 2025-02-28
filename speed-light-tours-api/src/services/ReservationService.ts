import Reservation from '../models/ReservationModel';
import { Transaction, Op } from 'sequelize';
import { makeErrorResponse } from '../utils/ErrorHandler';
import Tour from '../models/TourModel';
import Lodging from '../models/LodgingModel';
import Cart from '../models/CartModel';
import { hasOverlappingReservation } from '../utils/ReservationUtils';

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
 * ✅ Crear una nueva reserva y asociarla automáticamente a un carrito
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
                if (!lodgingExists) throw makeErrorResponse(404, 'El hospedaje no existe.');
            } else if (reservationData.entityType === 'tour') {
                const tourExists = await Tour.findByPk(reservationData.entityId, { transaction });
                if (!tourExists) throw makeErrorResponse(404, 'El tour no existe.');
            } else {
                throw makeErrorResponse(400, 'El tipo de entidad debe ser "tour" o "lodging".');
            }

            const isOverlapping = await hasOverlappingReservation(
                reservationData.entityType,
                reservationData.entityId!,
                reservationData.startDate!,
                reservationData.endDate!,
                undefined,
                transaction,
            );

            if (isOverlapping) {
                throw makeErrorResponse(409, 'Ya existe una reserva en este rango de fechas.');
            }

            let cart = await Cart.findOne({
                where: { userId: reservationData.userId },
                transaction,
            });

            if (!cart) {
                cart = await Cart.create(
                    { userId: reservationData.userId, totalPrice: 0 },
                    { transaction },
                );
            }

            reservationData.locationType = 'cart';
            reservationData.locationId = cart.id;

            const newReservation = await Reservation.create(reservationData, { transaction });

            cart.totalPrice += newReservation.subtotal;
            await cart.save({ transaction });

            return newReservation;
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

            if (new Date(reservation.startDate) <= new Date())
                throw makeErrorResponse(400, 'No se puede actualizar una reserva ya iniciada.');

            const isOverlapping = await hasOverlappingReservation(
                reservation.entityType,
                reservation.entityId,
                reservationData.startDate ?? reservation.startDate,
                reservationData.endDate ?? reservation.endDate,
                reservation.id,
                transaction,
            );
            if (isOverlapping)
                throw makeErrorResponse(409, 'La reserva en este nuevo rango de fechas ya existe.');

            let additionalCost = 0;
            if (reservationData.quantity && reservationData.quantity > reservation.quantity) {
                const extraPersons = reservationData.quantity - reservation.quantity;
                const pricePerPerson = reservation.subtotal / reservation.quantity;
                additionalCost = extraPersons * pricePerPerson;
            }

            if (reservation.locationType === 'order' && additionalCost > 0) {
                let cart = await Cart.findOne({
                    where: { userId: reservation.userId },
                    transaction,
                });

                if (!cart) {
                    cart = await Cart.create(
                        { userId: reservation.userId, totalPrice: 0 },
                        { transaction },
                    );
                }

                reservation.locationType = 'cart';
                reservation.locationId = cart.id;

                cart.totalPrice += additionalCost;
                await cart.save({ transaction });
            }

            if (reservation.locationType === 'cart') {
                const cart = await Cart.findByPk(reservation.locationId, { transaction });
                if (cart) {
                    cart.totalPrice -= reservation.subtotal;
                    reservation.subtotal = reservationData.subtotal ?? reservation.subtotal;
                    cart.totalPrice += reservation.subtotal;
                    await cart.save({ transaction });
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

            if (new Date(reservation.startDate) <= new Date()) {
                throw makeErrorResponse(400, 'No se puede eliminar una reserva ya iniciada.');
            }

            if (reservation.locationType === 'cart') {
                const cart = await Cart.findByPk(reservation.locationId, { transaction });
                if (cart) {
                    cart.totalPrice -= reservation.subtotal;
                    await cart.save({ transaction });
                }
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
