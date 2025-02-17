import commentRoutes from './CommentRoutes';
import lodgingRoutes from './LodgingRoutes';
import tourRoutes from './TourRoutes';
import reservationRoutes from './ReservationRoutes';

import { Router } from 'express';

const router = Router();

router.use('/comments', commentRoutes);
router.use('/lodgings', lodgingRoutes);
router.use('/tours', tourRoutes);
router.use('/reservations', reservationRoutes);

export default router;
