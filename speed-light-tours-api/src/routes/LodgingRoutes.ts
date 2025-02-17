import { Router } from 'express';
import { validateLodging } from '../middlewares/LodgingMiddleware';
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
router.post('/', validateLodging, createLodgingController);
router.put('/:id', validateLodging, updateLodgingController);
router.delete('/:id', deleteLodgingController);

export default router;
