import React, { useState } from 'react';
import Button from './Button';
import type { ReservationButtonsProps } from '../utils/ReservationTypes';
import LodgingModal from './LodgingModal';
import TourModal from './TourModal';
import './reservationButtons.css';

const ReservationButtons: React.FC<ReservationButtonsProps> = ({
  service,
  countDown,
  onCancelClick,
  info,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="reservation-buttons">
        <p className="countdown">{countDown}</p>
        <div className="button-container">
          <div className="button-group">
            <Button className="modify-button" variant="outline" onClick={openModal}>
              Modificar reserva
            </Button>
            <Button className="destructive-button" variant="destructive" onClick={onCancelClick}>
              Cancelar
            </Button>
          </div>
          <div className="time-limit-container">
            <p className="time-limit">Válido hasta 1 semana antes.</p>
            <p className="time-limit">Válido hasta 3 días antes.</p>
          </div>
        </div>
      </div>
      {service === 'lodging' ? (
        <LodgingModal 
        reservationId={info.reservationId}
        id={info.id} 
        cost={info.cost} 
        quantity={info.quantity} 
        isOpen={isModalOpen} 
        onClose={closeModal}
        startDate={info.startDate}
        endDate={info.endDate} 
      />
      ) : (
        <TourModal 
        reservationId={info.reservationId}
        id={info.id} 
        cost={info.cost} 
        quantity={info.quantity} 
        isOpen={isModalOpen} 
        onClose={closeModal}
        startDate={info.startDate}
        endDate={info.endDate}  
        />
      )}
    </>
  );
};

export default ReservationButtons;
