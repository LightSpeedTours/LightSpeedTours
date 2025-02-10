import { Request, Response } from 'express';
import { getAllTours, getTourById, createTour, updateTour, deleteTour } from '../services/TourService';

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
    if (!tour) {
      throw new Error('Tour not found');
    }
    res.status(200).json(tour);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch tour';
    res.status(errorMessage === 'Tour not found' ? 404 : 500).json({ error: errorMessage });
  }
};

export const createTourController = async (req: Request, res: Response): Promise<void> => {
  try {
    const newTour = await createTour(req.body);
    res.status(201).json({ message: 'Tour created successfully', tour: newTour });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create tour';
    res.status(errorMessage.includes('already exists') ? 400 : 500).json({ error: errorMessage });
  }
};

export const updateTourController = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedTour = await updateTour(parseInt(req.params.id), req.body);
    res.status(200).json({ message: 'Tour updated successfully', tour: updatedTour });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update tour';
    res.status(errorMessage.includes('already exists') ? 400 : errorMessage === 'Tour not found' ? 404 : 500).json({ error: errorMessage });
  }
};

export const deleteTourController = async (req: Request, res: Response): Promise<void> => {
  try {
    await deleteTour(parseInt(req.params.id));
    res.status(200).json({ message: 'Tour deleted successfully' });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete tour';
    res.status(errorMessage === 'Tour not found' ? 404 : 500).json({ error: errorMessage });
  }
};
