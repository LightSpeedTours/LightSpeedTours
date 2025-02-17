import { Router } from 'express';
import {
  getCommentController,
  setCommentController,
  getCommentListController,
  getCommentsByLodgingController,
  getCommentsByTourController,
  replyToCommentController,
} from '../controllers/CommentController';
import { validateComment,  } from '../middlewares/CommentMiddleware';

const router = Router();

router.get('/list', getCommentListController);
router.get('/list/:id', getCommentController);
router.get('/lodging/:lodgingId', getCommentsByLodgingController);
router.get('/tour/:tourId', getCommentsByTourController);
router.post('/', validateComment, setCommentController);
router.post('/reply/:parentId', validateComment, replyToCommentController);



export default router;
