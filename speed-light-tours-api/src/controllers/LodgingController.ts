import { Request, Response } from 'express';
import { getAllLodgings, getLodgingById, createLodging, updateLodging, deleteLodging } from '../services/LodgingService';

export const getLodgingsController = async (_req: Request, res: Response): Promise<void> => {
  try {
    const lodgings = await getAllLodgings();
    res.status(200).json(lodgings);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch lodgings';
    console.error('Error fetching lodgings:', errorMessage);
    res.status(500).json({ error: errorMessage });
  }
};

export const getLodgingByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const lodging = await getLodgingById(parseInt(req.params.id));
    if (!lodging) {
      throw new Error('Lodging not found');
    }
    res.status(200).json(lodging);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch lodging';
    res.status(errorMessage === 'Lodging not found' ? 404 : 500).json({ error: errorMessage });
  }
};

export const createLodgingController = async (req: Request, res: Response): Promise<void> => {
  try {
    const newLodging = await createLodging(req.body);
    res.status(201).json({ message: 'Lodging created successfully', lodging: newLodging });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create lodging';
    res.status(errorMessage.includes('already exists') ? 400 : 500).json({ error: errorMessage });
  }
};

export const updateLodgingController = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedLodging = await updateLodging(parseInt(req.params.id), req.body);
    res.status(200).json({ message: 'Lodging updated successfully', lodging: updatedLodging });
  } catch (error: unknown) {
  if (error instanceof Error) {
    console.error('Database error:', error);
    res.status(400).json({ error: error.message });
  } else {
    res.status(500).json({ error: 'Unexpected error occurred' });
  }
}

};

export const deleteLodgingController = async (req: Request, res: Response): Promise<void> => {
  try {
    await deleteLodging(parseInt(req.params.id));
    res.status(200).json({ message: 'Lodging deleted successfully' });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete lodging';
    res.status(errorMessage === 'Lodging not found' ? 404 : 500).json({ error: errorMessage });
  }
};
