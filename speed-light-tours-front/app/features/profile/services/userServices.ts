import { getAuthToken } from '~/shared/utils/tokenService';

const API_URL = 'http://localhost:3000'; // Ajusta según tu backend

/**
 * Obtiene los datos del usuario autenticado desde el backend
 */
export const fetchUserProfile = async () => {
  const token = getAuthToken();
  if (!token) {
    console.error('No hay token de autenticación en localStorage');
    throw new Error('No hay token de autenticación');
  }

  try {
    const response = await fetch(`${API_URL}/user/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error obteniendo el perfil del usuario');
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error('Error obteniendo el perfil del usuario:', error);
    throw error;
  }
};

/**
 * Actualiza los datos del usuario en el backend
 * @param updatedUser Datos del usuario actualizados
 */
export const updateUserProfile = async (updatedUser: any) => {
  const token = getAuthToken();
  if (!token) {
    console.error('No hay token de autenticación en localStorage');
    throw new Error('No hay token de autenticación');
  }

  try {
    const response = await fetch(`${API_URL}/user/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedUser),
    });

    if (!response.ok) {
      throw new Error('Error actualizando el perfil del usuario');
    }

    return await response.json();
  } catch (error) {
    console.error('Error actualizando el perfil del usuario:', error);
    throw error;
  }
};
