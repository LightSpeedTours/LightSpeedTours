import { Request, Response } from 'express';
import {
    getUserCart,
    getUserOrders,
    processCartPayment,
    removeItemFromCart,
} from '../services/CartService';
import { handleErrorResponse } from '../utils/ErrorHandler';
import { CustomRequest } from '../utils/types/CustomRequest';

/**
 * ✅ Obtener el carrito del usuario autenticado
 */
export const getUserCartController = async (req: CustomRequest, res: Response) => {
    try {
        const userId = req.user!.id;
        const cart = await getUserCart(userId);
        if (!cart) {
            res.status(200).json({ message: 'El carrito está vacío' });
            return;
        }

        res.status(200).json(cart);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

/**
 * ✅ Pagar el carrito
 */
export const payCartController = async (req: CustomRequest, res: Response) => {
    try {
        const userId = req.user!.id;
        const order = await processCartPayment(userId);

        res.status(200).json({ message: 'Pago exitoso', order });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

export const getUserOrdersController = async (req: CustomRequest, res: Response) => {
    try {
        const userId = Number(req.user!.id);
        const orders = await getUserOrders(userId);

        res.status(200).json(orders);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

/**
 * ✅ Eliminar un elemento del carrito de un usuario autenticado
 */
export const removeCartItemController = async (req: CustomRequest, res: Response) => {
    try {
        const userId = req.user!.id;
        const { itemId } = req.params;

        if (!itemId) {
            res.status(400).json({ message: 'Se requiere el itemId' });
        }

        const result = await removeItemFromCart(userId, Number(itemId));

        res.status(200).json(result);
    } catch (error) {
        handleErrorResponse(res, error);
    }
};
