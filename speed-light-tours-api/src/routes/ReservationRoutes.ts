import { Router } from 'express';
import {
    getReservationsByUserController,
    createReservationController,
    updateReservationController,
    deleteReservationController,
    cleanExpiredReservationsController,
    getReservationDatesByEntityController,
} from '../controllers/ReservationController';
import { validateEntityType, validateReservation } from '../middlewares/ReservationMiddleware';

const router = Router();

router.get('/user/:userId', getReservationsByUserController);
router.get(
    '/:entityType/:entityId/dates',
    validateEntityType,
    getReservationDatesByEntityController,
);

router.post('/', validateReservation, createReservationController);
router.put('/:id', validateReservation, updateReservationController);
router.delete('/:id', deleteReservationController);
router.delete('/expired', cleanExpiredReservationsController);

export default router;
