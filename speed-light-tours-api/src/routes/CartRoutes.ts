import { Router } from 'express';
import {
    getUserCartController,
    getUserOrdersController,
    payCartController,
    removeCartItemController,
} from '../controllers/CartController';
import { authenticateUser } from '../middlewares/UserMiddleware';

const router = Router();

router.get('/', authenticateUser, getUserCartController);
router.post('/pay', authenticateUser, payCartController);
router.get('/orders', authenticateUser, getUserOrdersController);
router.delete('/:itemId', authenticateUser, removeCartItemController);

export default router;
