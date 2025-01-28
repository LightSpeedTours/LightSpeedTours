import commentRoutes from './CommentRoutes';

import { Router } from 'express';

const router = Router();

router.use('/comments', commentRoutes);

export default router;
