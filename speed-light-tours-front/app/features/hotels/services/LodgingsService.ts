import type { Lodging, Service, LodgingService } from "../utils/LodgingsTypes";

const API_URL = 'http://localhost:3000/lodgings';

export const getLodgings = async (): Promise<Lodging[]> => {
  try {
    const response = await fetch(`${API_URL}/list`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Error obteniendo hospedajes: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error obteniendo hospedajes:', error);
    return [];
  }
};

export const getLodgingByPlanet = async (lodgingplanet: string): Promise<Lodging[]> => {
  try {
    const response = await fetch(`${API_URL}/planet/${lodgingplanet}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Error obteniendo hospedaje: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error obteniendo hospedaje:', error);
    return [];
  }
};


