import React, { useEffect, useState } from 'react';
import { getComments } from '../services/CommentService';
import type { Comment } from '../utils/CommentTypes';
import StarRating from '../../../shared/components/StarRating';
import ResponseForm from './ResponseForm';
import type { Response } from '../utils/ResponseTypes';

interface CommentListProps {
  refreshTrigger: number;
  setRefreshTrigger: React.Dispatch<React.SetStateAction<number>>;
}

const CommentList: React.FC<CommentListProps> = ({ refreshTrigger, setRefreshTrigger }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [replyingTo, setReplyingTo] = useState<number | null>(null); 

  useEffect(() => {
    fetchComments();
  }, [refreshTrigger]);

  const fetchComments = async () => {
    const fetchedComments: Comment[] = await getComments();
    setComments(fetchedComments);
  };

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-4">Comentarios</h2>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className="p-4 border-b">
            <StarRating rating={comment.rating} />
            <p className="mt-2">{comment.text}</p>
            <p className="text-sm text-gray-500">
              Publicado el: {new Date(comment.publishedAt).toLocaleDateString()}
            </p>

            {/* Lista de respuestas dentro del comentario */}
            <div className="mt-2 pl-6 border-l-2 border-gray-300">
              {comment.responses.length > 0 ? (
                comment.responses.map((response: Response) => (
                  <div key={response.id} className="p-2 border-b">
                    <p>{response.text}</p>
                    <p className="text-sm text-gray-500">
                      Publicado el: {new Date(response.publishedAt).toLocaleDateString()}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No hay respuestas aún.</p>
              )}
            </div>

            {/* Botón para responder */}
            <button
              onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
              className="mt-2 text-blue-500 hover:underline"
            >
              {replyingTo === comment.id ? 'Cancelar' : 'Responder'}
            </button>

            {/* Formulario para responder (solo se muestra si el usuario ha hecho clic en "Responder") */}
            {replyingTo === comment.id && (
              <ResponseForm
                commentId={comment.id.toString()}
                onResponseAdded={() => {
                  setReplyingTo(null); // Ocultar el formulario después de enviar la respuesta
                  setRefreshTrigger((prev) => prev + 1);
                }}
              />
            )}
          </div>
        ))
      ) : (
        <p>No hay comentarios aún.</p>
      )}
    </div>
  );
};

export default CommentList;
