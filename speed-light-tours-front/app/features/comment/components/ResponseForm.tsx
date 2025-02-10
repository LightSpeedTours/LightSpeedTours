import React, { useState } from 'react';
import { createResponse } from '../services/ResponseService';
import InputField from '../../../shared/components/InputField';
import Button from '../../../shared/components/Button';
import type { ResponsePayload } from '../utils/ResponseTypes';

const ResponseForm = (
  { commentId, onResponseAdded }: { commentId: string; onResponseAdded: () => void }) => {
  const [text, setText] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newResponse: ResponsePayload = {
      userId: '123', //TODO: configurar para que obtenga el valor del usuario
      commentId,
      text,
    };

    const response = await createResponse(newResponse);

    if (response) {
      setText('');
      onResponseAdded();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-2 pl-6 border-l-2 border-gray-300">
      <InputField value={text} onChange={(e) => setText(e.target.value)} placeholder="Escribe una respuesta..." />
      <Button text="Responder" type="submit" />
    </form>
  );
};

export default ResponseForm;
