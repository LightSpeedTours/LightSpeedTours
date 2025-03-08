import commentRoutes from './CommentRoutes';
import lodgingRoutes from './LodgingRoutes';
import tourRoutes from './TourRoutes';
import reservationRoutes from './ReservationRoutes';
import cartRoutes from './CartRoutes';
import authRoutes from './AuthRoutes';
import serviceRoutes from './serviceRoutes';
import userRoutes from './UserRoutes';

import { Router } from 'express';

const router = Router();

router.use('/comments', commentRoutes);
router.use('/lodgings', lodgingRoutes);
router.use('/tours', tourRoutes);
router.use('/reservations', reservationRoutes);
router.use('/cart', cartRoutes);
router.use('/services', serviceRoutes);
router.use('/auth', authRoutes);
router.use('/user', userRoutes);

export default router;
