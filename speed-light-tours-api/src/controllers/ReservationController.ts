import { Request, Response } from 'express';
import {
    getReservationsByUser,
    createReservation,
    updateReservation,
    deleteReservation,
    cleanExpiredReservations,
} from '../services/ReservationService';
import { handleErrorResponse, makeErrorResponse } from '../utils/ErrorHandler';
import { validationResult } from 'express-validator';

/**
 * ✅ Obtener todas las reservas de un usuario
 */
export const getReservationsByUserController = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const reservations = await getReservationsByUser(parseInt(userId));
        res.status(200).json(reservations);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

/**
 * ✅ Crear una nueva reserva
 */
export const createReservationController = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return handleErrorResponse(
                res,
                makeErrorResponse(
                    400,
                    errors
                        .array()
                        .map((err) => err.msg)
                        .join('. '),
                ),
            );
        }
        const newReservation = await createReservation(req.body);
        res.status(201).json({
            message: 'Reservation created successfully',
            reservation: newReservation,
        });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

/**
 * ✅ Actualizar una reserva (Solo si aún no ha comenzado)
 */
export const updateReservationController = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return handleErrorResponse(
                res,
                makeErrorResponse(
                    400,
                    errors
                        .array()
                        .map((err) => err.msg)
                        .join('. '),
                ),
            );
        }
        const updatedReservation = await updateReservation(parseInt(req.params.id), req.body);
        res.status(200).json({
            message: 'Reservation updated successfully',
            reservation: updatedReservation,
        });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

/**
 * ✅ Eliminar una reserva (Solo si aún no ha comenzado)
 */
export const deleteReservationController = async (req: Request, res: Response) => {
    try {
        await deleteReservation(parseInt(req.params.id));
        res.status(200).json({ message: 'Reservation deleted successfully' });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

/**
 * ✅ Eliminar automáticamente reservas que ya iniciaron (startDate <= NOW)
 */
export const cleanExpiredReservationsController = async (_req: Request, res: Response) => {
    try {
        await cleanExpiredReservations();
        res.status(200).json({ message: 'Expired reservations deleted successfully' });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};
