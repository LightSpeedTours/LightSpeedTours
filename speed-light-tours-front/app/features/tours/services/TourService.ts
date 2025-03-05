import type { Tour, Service, TourService } from '../utils/ToursTypes';

const API_URL = 'http://localhost:3000/tours';

export const getTours = async (): Promise<Tour[]> => {
  try {
    const response = await fetch(`${API_URL}/list`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Error obteniendo tours: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error obteniendo tours:', error);
    return [];
  }
};

export const getTourByPlanet = async (toursplanet: string): Promise<Tour[]> => {
  try {
    const response = await fetch(`${API_URL}/planet/${toursplanet}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Error obteniendo tour: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error obteniendo tour:', error);
    return [];
  }
};


