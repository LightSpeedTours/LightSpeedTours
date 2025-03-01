import React, { useState } from 'react';
import { createComment } from '../services/CommentService';
import InputField from '../../../shared/components/InputField';
import Button from '../../../shared/components/Button';
import RatingSlider from '../../../shared/components/RatingSlider';
import type { CommentPayload } from '../utils/CommentTypes';

const CommentForm = ({ parentId, onCommentAdded, isReply = false }: { parentId?: number; onCommentAdded: () => void; isReply?: boolean }) => {
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      setError('El comentario no puede estar vacío');
      return;
    }
    if (content.length < 3) {
      setError('El comentario debe tener al menos 3 caracteres');
      return;
    }
    setError('');

    const newComment: CommentPayload = {
      userId: '123',
      entityType: 'tour',
      entityId: 1,
      rating: isReply ? undefined : rating,
      text: content,
      parentId,
    };

    const response = await createComment(newComment);
    if (response) {
      setContent('');
      setRating(0);
      onCommentAdded();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-1 p-3 border-2 border-gray-600 rounded">
      <InputField value={content} onChange={(e) => setContent(e.target.value)} placeholder="Escribe tu comentario..." minLength={3} required />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {!isReply && <RatingSlider value={rating} onChange={setRating} />} {/* Solo mostrar rating si no es respuesta */}
      <Button text="Enviar" type="submit" />
    </form>
  );
};

export default CommentForm;
