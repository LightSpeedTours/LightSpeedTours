import React, { useState } from 'react';
import type { Comment } from '../utils/CommentTypes';
import StarRating from '../../../shared/components/StarRating';
import CommentForm from './CommentForm';

interface CommentListProps {
  refreshTrigger: number;
  setRefreshTrigger: React.Dispatch<React.SetStateAction<number>>;
  comments: Comment[];
  isReply?: boolean;
}

const CommentList: React.FC<CommentListProps> = ({ refreshTrigger, setRefreshTrigger, comments, isReply = false }) => {
  const [replyingTo, setReplyingTo] = useState<number | null>(null);

  return (
    <div className={`mt-4 ${isReply ? 'pl-4 border-l-2 border-gray-600' : ''} w-full max-w-full overflow-hidden`}>
      {comments.length > 0 ? (
        comments.map((comment) => {
          return (
            <div key={comment.id} className="p-2 w-full max-w-full break-words overflow-hidden border-gray-600 rounded-md shadow-md">
              <p className="mt-2 font-semibold break-words overflow-hidden">{comment.text}</p>

              {!isReply && <StarRating rating={comment.rating} />}
              <p className="text-sm text-gray-400">
                Publicado el: {new Date(comment.publishedAt).toLocaleDateString()}
              </p>

              {/* Formulario para responder */}
              {replyingTo === comment.id && (
                <CommentForm
                  parentId={comment.id}
                  isReply={true}
                  onCommentAdded={() => {
                    setReplyingTo(null);
                    setRefreshTrigger((prev) => prev + 1);
                  }}
                />
              )}

              {/* Botón para responder */}
              <button
                onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                className="mt-2 text-[#ffec80] hover:text-[#ffd700] hover:underline"
              >
                {replyingTo === comment.id ? 'Cancelar' : 'Responder'}
              </button>

              {/* Renderizar respuestas recursivamente */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="mt-1 w-full max-w-full overflow-hidden">
                  <CommentList comments={comment.replies} refreshTrigger={refreshTrigger} setRefreshTrigger={setRefreshTrigger} isReply />
                </div>
              )}
            </div>
          );
        })
      ) : (
        <p className="text-gray-400">No hay comentarios aún.</p>
      )}
    </div>
  );
};

export default CommentList;
