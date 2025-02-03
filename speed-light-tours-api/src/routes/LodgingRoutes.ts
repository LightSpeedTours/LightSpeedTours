import { Router } from 'express';
import { validateLodging } from '../middlewares/LodgingMiddleware';
import { handleValidationErrors } from '../middlewares/validationMiddleware';
import {
  getLodgingsController,
  getLodgingByIdController,
  createLodgingController,
  updateLodgingController,
  deleteLodgingController
} from '../controllers/LodgingController';

const router = Router();

router.get('/', getLodgingsController);
router.get('/:id', getLodgingByIdController);
router.post('/', validateLodging, handleValidationErrors, createLodgingController);
router.put('/:id', validateLodging, handleValidationErrors, updateLodgingController);
router.delete('/:id', deleteLodgingController);

export default router;
