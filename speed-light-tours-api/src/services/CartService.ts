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
            },
        ],
    });

    if (!cart) {
        cart = await Cart.create({ userId: userId, totalPrice: 0 });
    }

    // Obtener entidades asociadas en una segunda consulta
    const reservationsWithEntities = await Promise.all(
        cart.reservations.map(async (reservation) => {
            let entity = null;
            if (reservation.entityType === 'lodging') {
                entity = await Lodging.findOne({
                    where: { id: reservation.entityId },
                    attributes: ['name', 'planet', 'location', 'description'],
                });
            } else if (reservation.entityType === 'tour') {
                entity = await Tour.findOne({
                    where: { id: reservation.entityId },
                    attributes: ['name', 'planet', 'description'],
                });
            }

            return {
                ...reservation.get({ plain: true }),
                [reservation.entityType]: entity,
            };
        }),
    );

    return {
        id: cart.id,
        userId: cart.userId,
        totalPrice: cart.totalPrice,
        reservations: reservationsWithEntities,
    };
};

/**
 * ✅ Obtener todas las órdenes de un usuario
 */
export const getUserOrders = async (userId: number) => {
    let order = await Order.findOne({
        where: { userId },
        include: [
            {
                model: Reservation,
            },
        ],
    });

    if (!order) {
        order = await Order.create({ userId: userId, totalPrice: 0 });
    }

    // Obtener entidades asociadas en una segunda consulta
    const reservationsWithEntities = await Promise.all(
        order.reservations.map(async (reservation) => {
            let entity = null;
            if (reservation.entityType === 'lodging') {
                entity = await Lodging.findOne({
                    where: { id: reservation.entityId },
                    attributes: ['id', 'name', 'planet', 'location', 'description'],
                });
            } else if (reservation.entityType === 'tour') {
                entity = await Tour.findOne({
                    where: { id: reservation.entityId },
                    attributes: ['id', 'name', 'planet', 'description'],
                });
            }

            return {
                ...reservation.get({ plain: true }),
                [reservation.entityType]: entity,
            };
        }),
    );

    return {
        id: order.id,
        userId: order.userId,
        totalAmount: order.totalAmount,
        reservations: reservationsWithEntities,
    };
};

/**
 * ✅ Procesar el pago del carrito del usuario autenticado
 */
export const processCartPayment = async (userId: number) => {
    return await Cart.sequelize!.transaction(async (transaction: Transaction) => {
        const cart = await Cart.findOne({
            where: { userId },
            include: [Reservation],
            transaction,
        });

        if (!cart || cart.reservations.length === 0) {
            throw makeErrorResponse(400, 'El carrito está vacío.');
        }

        let order = await Order.findOne({
            where: { userId },
            transaction,
        });

        if (order) {
            order.totalAmount += cart.totalPrice;
            await order.save({ transaction });
        } else {
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
    const cart = await Cart.findOne({ where: { userId }, include: [Reservation] });

    if (!cart) {
        throw makeErrorResponse(404, 'El carrito');
    }

    const reservation = await Reservation.findOne({
        where: { id: itemId, locationId: cart.id, locationType: 'cart' },
    });

    if (!reservation) {
        throw makeErrorResponse(404, 'El reserva');
    }

    const newTotalPrice = cart.totalPrice - reservation.subtotal;
    await cart.update({ totalPrice: newTotalPrice });

    await reservation.destroy();

    return { message: 'Elemento eliminado correctamente' };
};
