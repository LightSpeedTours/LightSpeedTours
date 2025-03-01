import type { CommentPayload } from '../utils/CommentTypes';

const API_URL = 'http://localhost:3000/comments';

export const getComments = async () => {
    try {
        const response = await fetch(`${API_URL}/list`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) throw new Error('Error obteniendo comentarios');
        return await response.json();
    } catch (error) {
        console.error('Error obteniendo comentarios:', error);
        return [];
    }
};

export const getCommentsByLodging = async (lodgingId: number) => {
    try {
        const response = await fetch(`${API_URL}/lodging/${lodgingId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) throw new Error('Error obteniendo comentarios del hospedaje');
        return await response.json();
    } catch (error) {
        console.error('Error obteniendo comentarios del hospedaje:', error);
        return [];
    }
};

export const getCommentsByTour = async (tourId: number) => {
    try {
        const response = await fetch(`${API_URL}/tour/${tourId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) throw new Error('Error obteniendo comentarios del tour');
        return await response.json();
    } catch (error) {
        console.error('Error obteniendo comentarios del tour:', error);
        return [];
    }
};

export const createComment = async (comment: CommentPayload): Promise<Comment | null> => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(comment),
        });
        if (!response.ok) throw new Error('Error creando comentario');
        return await response.json();
    } catch (error) {
        console.error('Error creando comentario:', error);
        return null;
    }
};
