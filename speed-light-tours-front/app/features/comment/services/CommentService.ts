import type { CommentPayload } from '../utils/CommentTypes';

export const getComments = async () => {
    try {
      const response = await fetch('http://localhost:3000/comments/list');
      return await response.json();
    } catch (error) {
      console.error('Error obteniendo comentarios:', error);
      return [];
    }
};
  
export const createComment = async (comment: CommentPayload): Promise<Comment | null> => {
    try {
        const response = await fetch('http://localhost:3000/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment),
        });

        return await response.json();
    } catch (error) {
        console.error('Error creando comentario:', error);
        return null;
    }
};
  