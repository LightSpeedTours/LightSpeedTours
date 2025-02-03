import commentRoutes from './CommentRoutes';
import lodgingRoutes from './LodgingRoutes';
import tourRoutes from './TourRoutes';

import { Router } from 'express';

const router = Router();

router.use('/comments', commentRoutes);
router.use('/lodgings', lodgingRoutes);
router.use('/tours', tourRoutes);

export default router;
