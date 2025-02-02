import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Precio / Noche</h2>
        <div className="modal-body">
          <div className="modal-inputs">
            <label htmlFor="checkin">Llegada</label>
            <input type="date" id="checkin" />
            <label htmlFor="checkout">Salida</label>
            <input type="date" id="checkout" />
            <label htmlFor="guests">Huéspedes</label>
            <input type="number" id="guests" placeholder="# de huéspedes" />
          </div>

          <div className="modal-prices">
            <p>Precio / noche x días</p>
            <p>$111.11</p>
            <p>Tarifa de limpieza</p>
            <p>$111.11</p>
            <p>Tarifa por servicio</p>
            <p>$111.11</p>
            <p>Total</p>
            <p>$111.11</p>
          </div>
        </div>

        <button className="modal-button">Reservar</button>
      </div>
    </div>
  );
};

export default Modal;