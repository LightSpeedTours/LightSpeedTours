import { Op, Transaction } from 'sequelize';
import Reservation from '../models/ReservationModel';

export const hasOverlappingReservation = async (
    entityType: string,
    entityId: number,
    startDate: Date,
    endDate: Date,
    excludeId?: number,
    transaction?: Transaction,
): Promise<boolean> => {
    const whereCondition: any = {
        entityType,
        entityId,
        [Op.or]: [
            {
                startDate: {
                    [Op.between]: [startDate, endDate],
                },
            },
            {
                endDate: {
                    [Op.between]: [startDate, endDate],
                },
            },
        ],
    };

    if (excludeId !== undefined) {
        whereCondition.id = { [Op.ne]: excludeId };
    }

    const overlappingReservation = await Reservation.findOne({
        where: whereCondition,
        transaction,
    });

    return !!overlappingReservation;
};
