import { jwtDecode } from 'jwt-decode';
/**
 * Función para obtener el token de autenticación desde el localStorage
 */
export const getAuthToken = (): string | null => {
    return localStorage.getItem('token');
  };

/**
 * Función para obtener el ID del usuario desde el token almacenado en localStorage
 */
export const getUserIdFromToken = (): number | null => {
    const token = localStorage.getItem('token');
    if (!token) return null;
  
    try {
      const decoded: { id: number } = jwtDecode(token);
      return decoded.id;
    } catch (error) {
      console.error('Error decodificando el token:', error);
      return null;
    }
  };
