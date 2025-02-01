import type { Response, ResponsePayload } from '../utils/ResponseTypes';

export const createResponse = async (responseData: ResponsePayload): Promise<Response | null> => {
  try {
    const response = await fetch('http://localhost:3000/responses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(responseData),
    });

    return await response.json();
  } catch (error) {
    console.error('Error creando respuesta:', error);
    return null;
  }
};
