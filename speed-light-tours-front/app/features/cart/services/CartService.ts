import { getAuthToken } from '~/shared/utils/tokenService';
import type { Cart } from '../utils/CartTypes';

const API_URL = 'http://localhost:3000/cart';

/**
 * ✅ Obtener el carrito del usuario
 */
export const getUserCart = async (): Promise<Cart | null> => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error('No hay token de autenticación');

    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error('Error obteniendo el carrito');

    const data: Cart = await response.json();
    return data;
  } catch (error) {
    console.error('Error obteniendo el carrito:', error);
    return null;
  }
};

/**
 * ✅ Eliminar una reserva del carrito
 */
export const removeCartItem = async (itemId: number) => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error('No hay token de autenticación');

    const response = await fetch(`${API_URL}/${itemId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error('Error eliminando el elemento del carrito');

    return await response.json();
  } catch (error) {
    console.error('Error eliminando el elemento del carrito:', error);
    return null;
  }
};

/**
 * ✅ Pagar el carrito
 */
export const payCart = async () => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error('No hay token de autenticación');

    const response = await fetch(`${API_URL}/pay`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error('Error procesando el pago');

    return await response.json();
  } catch (error) {
    console.error('Error procesando el pago:', error);
    return null;
  }
};
