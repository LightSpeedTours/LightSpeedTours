import React from "react";
import '../app.css';

interface ReservationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReservationForm: React.FC<ReservationFormProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Precio / Noche</h2>
          <button className="close-button" onClick={onClose}>X</button>
        </div>

        <div className="modal-body">
          <div className="input-section">
            <div className="input-group-row">
              <div className="input-group">
                <label htmlFor="arrival">Llegada</label>
                <input type="date" id="arrival" />
              </div>

              <div className="input-group">
                <label htmlFor="departure">Salida</label>
                <input type="date" id="departure" />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="guests">Huéspedes</label>
              <input type="number" id="guests" placeholder="# de huéspedes" />
            </div>

            <div className="price-section">
              <div className="price-item">
                <p>Precio / noche x días</p>
                <p>$111.11</p>
              </div>

              <div className="price-item">
                <p>Tarifa de limpieza</p>
                <p>$111.11</p>
              </div>

              <div className="price-item">
                <p>Tarifa por servicio</p>
                <p>$111.11</p>
              </div>

              <div className="price-item total">
                <p>Total</p>
                <p>$111.11</p>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="reserve-button">Reservar</button>
        </div>
      </div>
    </div>
  );
};

export default ReservationForm;