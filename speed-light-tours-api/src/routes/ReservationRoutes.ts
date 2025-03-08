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
import { authenticateUser } from '../middlewares/UserMiddleware';

const router = Router();

router.get('/user/:userId', getReservationsByUserController);
router.get(
    '/:entityType/:entityId/dates',
    validateEntityType,
    getReservationDatesByEntityController,
);

router.post('/', authenticateUser, validateReservation, createReservationController);
router.put('/:id', authenticateUser, validateReservation, updateReservationController);
router.delete('/:id', authenticateUser, deleteReservationController);
router.delete('/expired', authenticateUser, cleanExpiredReservationsController);

export default router;
