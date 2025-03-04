import { Request, Response } from 'express';
import {
    getAllTours,
    getTourById,
    createTour,
    updateTour,
    deleteTour,
    getTourByPlanet,
} from '../services/TourService';
import { handleErrorResponse, makeErrorResponse } from '../utils/ErrorHandler';
import { validationResult } from 'express-validator';

export const getToursController = async (_req: Request, res: Response): Promise<void> => {
    try {
        const tours = await getAllTours();
        res.status(200).json(tours);
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch tours';
        console.error('Error fetching tours:', errorMessage);
        res.status(500).json({ error: errorMessage });
    }
};

export const getTourByIdController = async (req: Request, res: Response): Promise<void> => {
    try {
        const tour = await getTourById(parseInt(req.params.id));
        res.status(200).json(tour);
    } catch (error: unknown) {
        handleErrorResponse(res, error);
    }
};

export const getTourByPlanetController = async (req: Request, res: Response): Promise<void> => {
    try {
        const tour = await getTourByPlanet(req.params.planet);

        res.status(200).json(tour);
    } catch (error: unknown) {
        handleErrorResponse(res, error);
    }
};

export const createTourController = async (req: Request, res: Response): Promise<void> => {
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
        const newTour = await createTour(req.body);
        res.status(201).json({ message: 'Tour created successfully', tour: newTour });
    } catch (error: unknown) {
        handleErrorResponse(res, error);
    }
};

export const updateTourController = async (req: Request, res: Response): Promise<void> => {
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
        const updatedTour = await updateTour(parseInt(req.params.id), req.body);
        res.status(200).json({ message: 'Tour updated successfully', tour: updatedTour });
    } catch (error: unknown) {
        handleErrorResponse(res, error);
    }
};

export const deleteTourController = async (req: Request, res: Response): Promise<void> => {
    try {
        await deleteTour(parseInt(req.params.id));
        res.status(200).json({ message: 'Tour deleted successfully' });
    } catch (error: unknown) {
        handleErrorResponse(res, error);
    }
};
