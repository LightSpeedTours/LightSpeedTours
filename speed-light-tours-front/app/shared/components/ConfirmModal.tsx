import { useState } from 'react';
import Button from '~/shared/components/Button';

interface ConfirmModalProps {
  message: string;
  onConfirm: () => Promise<void> | void;
  onCancel: () => void;
}

const ConfirmModal = ({ message, onConfirm, onCancel }: ConfirmModalProps) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    await onConfirm();
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg text-center border border-gray-600 text-[#fade4b]">
        <p className="text-lg mb-4">{message}</p>
        <div className="flex justify-center gap-4">
          <Button text="Sí, confirmar" onClick={handleConfirm} type="button" disabled={loading} />
          <Button text="Cancelar" onClick={onCancel} type="button" disabled={loading} />
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
