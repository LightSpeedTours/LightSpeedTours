import React, { useState } from 'react';
import { createComment } from '../services/CommentService';
import InputField from '../../../shared/components/InputField';
import Button from '../../../shared/components/Button';
import RatingSlider from '../../../shared/components/RatingSlider';
import type { CommentPayload } from '../utils/CommentTypes';

const CommentForm = ({
  parentId,
  onCommentAdded,
  isReply = false,
  entityType,
  entityId,
}: {
  parentId?: number;
  onCommentAdded: () => void;
  isReply?: boolean;
  entityType: 'tour' | 'lodging';
  entityId: number;
}) => {
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const [error, setError] = useState('');

  const isDisabled = content.trim().length < 3;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isDisabled) return;
    if (!isReply && rating === 0) {
      setError('Debe seleccionar una calificación.');
      return;
    }

    setError('');

    const newComment: CommentPayload = {
      userId: 1, //TODO: Cambiar por el usuario actual
      entityType: entityType,
      entityId: entityId,
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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-1 p-3 border-2 border-gray-600 rounded"
    >
      <InputField
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Escribe tu comentario..."
        minLength={3}
        required
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {!isReply && <RatingSlider value={rating} onChange={setRating} />}
      <Button text="Enviar" type="submit" disabled={isDisabled} />
    </form>
  );
};

export default CommentForm;
