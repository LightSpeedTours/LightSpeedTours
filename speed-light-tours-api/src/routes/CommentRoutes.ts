import { Router } from 'express';
import {
  getCommentController,
  setCommentController,
  getCommentListController,
  setResponseController,
} from '../controllers/CommentController';
import { validateComment, validateResponse } from '../middlewares/CommentMiddleware';

const router = Router();

router.get('/list', getCommentListController);

router.get('/list/:id', getCommentController);

router.post('/', validateComment, setCommentController);

router.post('/response', validateResponse, setResponseController);

export default router;
