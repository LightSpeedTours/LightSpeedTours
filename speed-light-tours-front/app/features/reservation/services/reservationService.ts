import type { CommentPayload } from '../utils/ReservationTypes';

export const API_URL = 'http://localhost:3000'; // Ajusta según tu backend

/**
 * Obtiene todas las fechas reservadas de un hospedaje o tour específico
 * @param lodgingId ID del hospedaje
 * @returns Lista de fechas reservadas
 */
export const fetchReservedDates = async (lodgingId: number): Promise<Date[]> => {
  try {
    const response = await fetch(`${API_URL}/reservations/lodging/${lodgingId}/dates`);
    if (!response.ok) throw new Error('Error al obtener las reservas');

    const data: CommentPayload[] = await response.json();
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
export const createReservation = async (reservation: CommentPayload) => {
  try {
    const response = await fetch(`${API_URL}/reservations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
export const updateReservation = async (reservationId: number, updatedReservation: CommentPayload) => {
  try {
    const response = await fetch(`${API_URL}/reservations/${reservationId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedReservation),
    });

    if (!response.ok) throw new Error('Error al actualizar la reserva');

    return await response.json();
  } catch (error) {
    console.error('Error actualizando la reserva:', error);
    throw error;
  } 
};


