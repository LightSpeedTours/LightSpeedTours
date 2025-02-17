import { Request, Response } from 'express';
import { getAllLodgings, getLodgingById, createLodging, updateLodging, deleteLodging } from '../services/LodgingService';
import { handleErrorResponse } from '../utils/ErrorHandler';

export const getLodgingsController = async (_req: Request, res: Response): Promise<void> => {
  try {
    const lodgings = await getAllLodgings();
    res.status(200).json(lodgings);
  } catch (error: unknown) {
    handleErrorResponse(res, error);
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
    handleErrorResponse(res, error);
  }
};

export const createLodgingController = async (req: Request, res: Response): Promise<void> => {
  try {
    const newLodging = await createLodging(req.body);
    res.status(201).json({ message: 'Lodging created successfully', lodging: newLodging });
  } catch (error: unknown) {
    handleErrorResponse(res, error);
  }
};

export const updateLodgingController = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedLodging = await updateLodging(parseInt(req.params.id), req.body);
    res.status(200).json({ message: 'Lodging updated successfully', lodging: updatedLodging });
  } catch (error: unknown) {
    handleErrorResponse(res, error);
}

};

export const deleteLodgingController = async (req: Request, res: Response): Promise<void> => {
  try {
    await deleteLodging(parseInt(req.params.id));
    res.status(200).json({ message: 'Lodging deleted successfully' });
  } catch (error: unknown) {
    handleErrorResponse(res, error);
  }
};
