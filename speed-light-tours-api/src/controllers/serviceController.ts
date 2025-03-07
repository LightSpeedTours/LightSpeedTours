import { Request, Response } from 'express';
import {
    getLodgingsByServiceId,
    getToursByServiceId,
    getAllServices,
} from '../services/serviceService';
import { handleErrorResponse } from '../utils/ErrorHandler';

/**
 * Controlador para obtener los alojamientos asociados a un servicio por ID.
 */
export const getLodgingsByService = async (req: Request, res: Response): Promise<void> => {
    try {
        const { serviceId } = req.params;
        const lodgings = await getLodgingsByServiceId(Number(serviceId));

        res.status(200).json(lodgings);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

/**
 * Controlador para obtener los tours asociados a un servicio por ID.
 */
export const getToursByService = async (req: Request, res: Response): Promise<void> => {
    try {
        const { serviceId } = req.params;
        const tours = await getToursByServiceId(Number(serviceId));

        res.status(200).json(tours);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

/**
 * Controlador para obtener todos los servicios.
 */
export const getServices = async (_req: Request, res: Response): Promise<void> => {
    try {
        const services = await getAllServices();
        res.status(200).json(services);
    } catch (error: unknown) {
        handleErrorResponse(res, error);
    }
};
