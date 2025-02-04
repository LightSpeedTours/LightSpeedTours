import { Router } from 'express';
import { validateTour } from '../middlewares/TourMiddleware';
import { handleValidationErrors } from '../middlewares/validationMiddleware';
import {
  getToursController,
  getTourByIdController,
  createTourController,
  updateTourController,
  deleteTourController
} from '../controllers/TourController';

const router = Router();

router.get('/', getToursController);
router.get('/:id', getTourByIdController);
router.post('/', validateTour, handleValidationErrors, createTourController);
router.put('/:id', validateTour, handleValidationErrors, updateTourController);
router.delete('/:id', deleteTourController);

export default router;
