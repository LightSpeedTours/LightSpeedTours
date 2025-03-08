import { getAuthToken } from '~/shared/utils/tokenService';
import type { Order, ReservationPayload } from '../utils/ReservationTypes';

export const API_URL = 'http://localhost:3000'; // Ajusta según tu backend



/**
 * Obtiene todas las fechas reservadas de un hospedaje o tour específico
 * @param entityType Tipo de entidad (lodging o tour)
 * @param entityId ID del hospedaje o tour
 * @returns Lista de fechas reservadas
 */
export const fetchReservedDates = async (entityType: string, entityId: number): Promise<Date[]> => {
  try {
    const response = await fetch(`${API_URL}/reservations/${entityType}/${entityId}/dates`);
    if (!response.ok) throw new Error('Error al obtener las reservas');

    const data: ReservationPayload[] = await response.json();
    return data
      .map((reservation) => {
        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate);
        const datesArray = [];

        while (start <= end) {
          datesArray.push(new Date(start));
          start.setDate(start.getDate() + 1);
        }

        return datesArray;
      })
      .flat();
  } catch (error) {
    console.error('Error obteniendo fechas reservadas:', error);
    return [];
  }
};

/**
 * Crea una nueva reserva
 * @param reservation Datos de la reserva
 */
export const createReservation = async (reservation: ReservationPayload) => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error('No hay token de autenticación');

    const response = await fetch(`${API_URL}/reservations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reservation),
    });

    if (!response.ok) throw new Error('Error al realizar la reserva');

    return await response.json();
  } catch (error) {
    console.error('Error creando la reserva:', error);
    throw error;
  }
};

/**
 * Elimina una reserva
 * @param reservationId ID de la reserva
 */
export const deleteReservation = async (reservationId: number) => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error('No hay token de autenticación');

    const response = await fetch(`${API_URL}/reservations/${reservationId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error('Error al eliminar la reserva');

    return await response.json();
  } catch (error) {
    console.error('Error eliminando la reserva:', error);
    throw error;
  }
};

/**
 * Actualiza una reserva existente
 * @param idReservation ID de la reserva
 * @param reservation Datos actualizados de la reserva
 */
export const updateReservation = async (reservation: ReservationPayload, idReservation: number) => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error('No hay token de autenticación');

    const response = await fetch(`${API_URL}/reservations/${idReservation}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reservation),
    });

    if (!response.ok) throw new Error('Error al actualizar la reserva');

    return await response.json();
  } catch (error) {
    console.error('Error actualizando la reserva:', error);
    throw error;
  }
};

/**
 * Obtiene todas las órdenes de un usuario
 * @param userId ID del usuario
 * @returns Lista de órdenes
 */
export const fetchUserOrders = async (userId: number): Promise<Order> => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error('No hay token de autenticación');

    const response = await fetch(`${API_URL}/cart/orders?userId=${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error('Error al obtener las órdenes');

    return await response.json();
  } catch (error) {
    console.error('Error obteniendo las órdenes:', error);
    throw error;
  }
};
