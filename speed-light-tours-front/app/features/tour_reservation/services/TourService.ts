import type { TourProps } from '../utils/types';

const API_URL = 'http://localhost:3000'; // Ajusta según tu backend

/**
 * ✅ Obtiene un hospedaje por ID desde el backend
 */
export const getTourById = async (id: number): Promise<TourProps> => {
  try {
    const response = await fetch(`${API_URL}/tours/${id}`);
    if (!response.ok) {
      throw new Error('Error al obtener el hospedaje');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en getLodgingById:', error);
    throw error;
  }
};
