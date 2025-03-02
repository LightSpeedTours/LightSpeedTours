import React, { useEffect } from 'react';
import Button from './Button';

interface CancelConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id: number) => void;
}

const CancelConfirmationModal: React.FC<CancelConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content-cancel">
        <p>
          Una vez cancelada, <strong>NO</strong> podrá recuperar su reserva.
        </p>
        <br />
        <p>
          Recuerde que <strong>NO</strong> hay devolución del dinero.
        </p>
        <br />
        <h2>¿Está seguro que desea cancelar la reserva?</h2>
        <div className="modal-actions">
          <Button className="return-button" variant="outline" onClick={onClose}>
            No
          </Button>
          <Button className="cancel-button" variant="destructive" onClick={() => onConfirm(1)}>
            Sí, cancelar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CancelConfirmationModal;
