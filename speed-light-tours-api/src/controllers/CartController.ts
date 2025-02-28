import { Request, Response } from 'express';
import { getUserCart, getUserOrders, processCartPayment } from '../services/CartService';
import { handleErrorResponse } from '../utils/ErrorHandler';

/**
 * ✅ Obtener el carrito del usuario autenticado
 */
export const getCartController = async (req: Request, res: Response) => {
    try {
        //TODO: dejar de mockear un usuario
        //const userId = req.user.id;
        //const cart = await getUserCart(userId);
        const cart = await getUserCart(1);
        if (!cart) {
            res.status(200).json({ message: 'El carrito está vacío', cart: null });
        }

        res.status(200).json(cart);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

/**
 * ✅ Pagar el carrito
 */
export const payCartController = async (req: Request, res: Response) => {
    try {
        //TODO: dejar de mockear un usuario

        // const userId = req.user.id;
        // const order = await processCartPayment(userId);
        const order = await processCartPayment(1);

        res.status(200).json({ message: 'Pago exitoso', order });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

export const getUserOrdersController = async (req: Request, res: Response) => {
    try {
        //TODO: dejar de mockear un usuario

        // const userId = Number(req.user.id);
        // const orders = await getOrdersByUser(userId);
        const orders = await getUserOrders(1);

        res.status(200).json(orders);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};
