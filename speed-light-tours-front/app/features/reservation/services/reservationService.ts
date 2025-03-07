import type { Order, ReservationPayload } from '../utils/ReservationTypes';

export const API_URL = 'http://localhost:3000'; // Ajusta según tu backend
const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJkdW1teUBleGFtcGxlLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzQxMzY0OTU5LCJleHAiOjE3NDE0NTEzNTl9.OlqMelDSzz-Lurdsgi1PAoNhIQ8qJi8lncfVZXed2TA'; // TODO: Reemplazar por token real

/**
 * Obtiene todas las fechas reservadas de un hospedaje o tour específico
 * @param lodgingId ID del hospedaje
 * @returns Lista de fechas reservadas
 */
export const fetchReservedDates = async (entityType:String, entityId: number): Promise<Date[]> => {
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
    const response = await fetch(`${API_URL}/reservations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${BEARER_TOKEN}`,
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
    const response = await fetch(`${API_URL}/reservations/${reservationId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${BEARER_TOKEN}`,
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
 * @param reservationId ID de la reserva
 * @param updatedReservation Datos actualizados de la reserva
 */
export const updateReservation = async (reservation: ReservationPayload, idReservation: number) => {
  try {
    console.log(reservation);
    const response = await fetch(`${API_URL}/reservations/${idReservation}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${BEARER_TOKEN}`,
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
 * Obtiene todas las órdenes de un usuario
 * @param userId ID del usuario
 * @returns Lista de órdenes
 */
export const fetchUserOrders = async (userId: number): Promise<Order> => {
  try {
    const response = await fetch(`${API_URL}/cart/orders?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${BEARER_TOKEN}`,
      },
    });

    if (!response.ok) throw new Error('Error al obtener las órdenes');

    return await response.json();
  } catch (error) {
    console.error('Error obteniendo las órdenes:', error);
    throw error;
  }
};
