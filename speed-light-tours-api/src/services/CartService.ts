import Cart from '../models/CartModel';
import Reservation from '../models/ReservationModel';
import Order from '../models/OrderModel';
import { makeErrorResponse } from '../utils/ErrorHandler';
import { Transaction } from 'sequelize';

/**
 * ✅ Obtener el carrito del usuario autenticado con sus reservas
 */
export const getUserCart = async (userId: number) => {
    return await Cart.findOne({
        where: { userId },
        include: [Reservation],
    });
};

/**
 * ✅ Obtener todas las órdenes de un usuario
 */
export const getUserOrders = async (userId: number) => {
    return await Order.findOne({
        where: { userId },
        include: ['reservations'],
    });
};

/**
 * ✅ Procesar el pago del carrito del usuario autenticado
 */
export const processCartPayment = async (userId: number) => {
    return await Cart.sequelize!.transaction(async (transaction: Transaction) => {
        // ✅ Obtener el carrito del usuario con todas sus reservas
        const cart = await Cart.findOne({
            where: { userId },
            include: [Reservation],
            transaction,
        });

        if (!cart || cart.reservations.length === 0) {
            throw makeErrorResponse(400, 'El carrito está vacío.');
        }

        // ✅ Verificar si el usuario ya tiene una orden activa
        let order = await Order.findOne({
            where: { userId },
            transaction,
        });

        if (order) {
            // ✅ Si ya existe una orden, actualizar el total
            order.totalAmount += cart.totalPrice;
            await order.save({ transaction });
        } else {
            // ✅ Si no existe, crear una nueva orden
            order = await Order.create(
                {
                    userId,
                    totalAmount: cart.totalPrice,
                },
                { transaction },
            );
        }

        const reservations = await Reservation.findAll({
            where: { locationId: cart.id, locationType: 'cart' },
            transaction,
        });

        for (const reservation of reservations) {
            await reservation.update(
                {
                    locationId: order.id,
                    locationType: 'order',
                },
                { transaction },
            );
        }

        await cart.update({ totalPrice: 0 }, { transaction });

        return order;
    });
};
