import { Router } from 'express';
import {
    getUserCartController,
    getUserOrdersController,
    payCartController,
    removeCartItemController,
} from '../controllers/CartController';

const router = Router();

router.get('/', getUserCartController);
router.post('/pay', payCartController);
router.get('/orders', getUserOrdersController);
router.delete('/:itemId', removeCartItemController);

export default router;
