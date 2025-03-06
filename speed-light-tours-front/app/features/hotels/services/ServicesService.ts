import type { Lodging, Service, LodgingService } from "../utils/LodgingsTypes";

const API_URL = 'http://localhost:3000/services';

export const getServices = async (): Promise<Service[]> => {
  try {
    const response = await fetch(`${API_URL}/list`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Error obteniendo servicios: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error obteniendo servicios:', error);
    return [];
  }
};


export const getServicesByLodging = async (lodgingId: Number): Promise<Lodging[]> => {
  try {
    const response = await fetch(`${API_URL}/lodging/${lodgingId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Error obteniendo servicios: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error obteniendo servicios:', error);
    return [];
  }
};
