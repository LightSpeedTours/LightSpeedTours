import { Router } from 'express';
import { validateTour } from '../middlewares/TourMiddleware';
import {
    getToursController,
    getTourByIdController,
    createTourController,
    updateTourController,
    deleteTourController,
    getTourByPlanetController,
} from '../controllers/TourController';

const router = Router();

router.get('/', getToursController);
router.get('/:id', getTourByIdController);
router.get('/planet/:planet', getTourByPlanetController);

router.post('/', validateTour, createTourController);
router.put('/:id', validateTour, updateTourController);
router.delete('/:id', deleteTourController);

export default router;
