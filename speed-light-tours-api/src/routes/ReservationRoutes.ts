import { Router } from 'express';
import {
    getReservationsByUserController,
    createReservationController,
    updateReservationController,
    deleteReservationController,
    cleanExpiredReservationsController,
} from '../controllers/ReservationController';
import { validateReservation } from '../middlewares/ReservationMiddleware';

const router = Router();

router.get('/user/:userId', getReservationsByUserController);
router.post('/', validateReservation, createReservationController);
router.put('/:id', validateReservation, updateReservationController);
router.delete('/:id', deleteReservationController);
router.delete('/expired', cleanExpiredReservationsController);

export default router;
