import { Router } from 'express';
import {
    getCartController,
    getUserOrdersController,
    payCartController,
} from '../controllers/CartController';

const router = Router();

router.get('/', getCartController);
router.post('/pay', payCartController);
router.get('/orders', getUserOrdersController);

export default router;
