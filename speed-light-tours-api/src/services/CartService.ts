import Cart from '../models/CartModel';
import Reservation from '../models/ReservationModel';
import Order from '../models/OrderModel';
import { makeErrorResponse } from '../utils/ErrorHandler';
import { Transaction } from 'sequelize';
import Lodging from '../models/LodgingModel';
import Tour from '../models/TourModel';

/**
 * ✅ Obtener el carrito del usuario autenticado con sus reservas
 */
export const getUserCart = async (userId: number) => {
    let cart = await Cart.findOne({
        where: { userId },
        include: [
            {
                model: Reservation,
                include: [
                    {
                        model: Lodging,
                        attributes: ['name', 'planet', 'location', 'description'],
                        required: false,
                    },
                    {
                        model: Tour,
                        attributes: ['name', 'planet', 'description'],
                        required: false,
                    },
                ],
            },
        ],
    });
    if (!cart) {
        cart = await Cart.create({ userId: userId, totalPrice: 0 });
    }
    return cart;
};

/**
 * ✅ Obtener todas las órdenes de un usuario
 */
export const getUserOrders = async (userId: number) => {
    return await Order.findOne({
        where: { userId },
        include: [
            {
                model: Reservation,
                include: [
                    {
                        model: Lodging,
                        attributes: ['name', 'planet', 'location', 'description'],
                        required: false,
                    },
                    {
                        model: Tour,
                        attributes: ['name', 'planet', 'description'],
                        required: false,
                    },
                ],
            },
        ],
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

/**
 * ✅ Eliminar un elemento específico del carrito de un usuario
 */
export const removeItemFromCart = async (userId: number, itemId: number) => {
    // Buscar el carrito del usuario
    const cart = await Cart.findOne({ where: { userId }, include: [Reservation] });

    if (!cart) {
        throw makeErrorResponse(404, 'El carrito');
    }

    // Buscar la reserva específica dentro del carrito
    const reservation = await Reservation.findOne({
        where: { id: itemId, locationId: cart.id, locationType: 'cart' },
    });

    if (!reservation) {
        throw makeErrorResponse(404, 'El reserva');
    }

    const newTotalPrice = cart.totalPrice - reservation.subtotal;
    await cart.update({ totalPrice: newTotalPrice });

    // Eliminar la reserva del carrito
    await reservation.destroy();

    return { message: 'Elemento eliminado correctamente' };
};
