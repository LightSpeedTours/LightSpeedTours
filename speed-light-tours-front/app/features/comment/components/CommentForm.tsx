import React, { useState } from 'react';
import { createComment } from '../services/CommentService';
import InputField from '../../../shared/components/InputField';
import Button from '../../../shared/components/Button';
import RatingSlider from '../../../shared/components/RatingSlider';
import type { CommentPayload } from '../utils/CommentTypes';

const CommentForm = ({ onCommentAdded }: { onCommentAdded: () => void }) => {
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const [error, setError] = useState('');


  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!content.trim()) {
      setError('El comentario no puede estar vacío');
      return;
    }
    if (content.length < 3) {
      setError('El comentario debe tener al menos 3 caracteres');
      return;
    }
  
    setError(''); // Resetear el error si todo está bien
  
    const newComment: CommentPayload = { //TODO: asignar el usuario y el tour o lodging respectivamente cuando se creen las funcionalidades
      userId: '123',
      type: 'tour',
      typeId: '1',
      rating,
      text: content,
    };
  
    const response = await createComment(newComment);
  
    if (response) {
      setContent('');
      setRating(0);
      onCommentAdded();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-4 border rounded">
      <InputField 
        value={content} 
        onChange={(e) => setContent(e.target.value)}
        placeholder="Escribe tu comentario..." 
        minLength={3} 
        required 
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <RatingSlider value={rating} onChange={setRating} />
      <Button onClick={handleSubmit} text="Enviar" type="submit" />
    </form>
  );
};

export default CommentForm;
