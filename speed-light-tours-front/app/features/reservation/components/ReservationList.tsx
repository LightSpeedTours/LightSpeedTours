import React, { useState } from 'react';
import ReservationCard from './ReservationCard';
import ReservationButtons from './ReservationButtons';
import './reservationList.css';
import CancelModal from './CancelModal';
import sunImage from 'app/shared/assets/sun.jpg';
import worldImage from 'app/shared/assets/world.jpg';
import brainImage from 'app/shared/assets/brain.jpg';

const ReservationList: React.FC = () => {
  const [isCancelModalOpen, setCancelModalOpen] = useState(false);

  const openCancelModal = () => {
    setCancelModalOpen(true);
  };

  const closeCancelModal = () => {
    setCancelModalOpen(false);
  };

  const handleConfirmCancel = () => {
    console.log('Reserva cancelada');
    alert('Tu reserva ha sido cancelada');
    setCancelModalOpen(false);
  };

  

  return (
    <div className="reservation-title">
      <h1 className="reservation-list-title">Mis Reservas</h1>
      <div className="reservation-list">
        <ReservationCard
          service="Reserva 1"
          price="$100"
          description="Descripción del reserva 1"
          location="Ubicación 1"
          dates="01/01/2025 - 02/01/2025"
          people="2"
          imageSrc={sunImage}
        />
        <ReservationButtons
          service="lodging"
          countDown="3 días"      
          onCancelClick={openCancelModal}
        />
        <ReservationCard
          service="Reserva 2"
          price="$200"
          description="Descripción del Reserva 2"
          location="Ubicación 2"
          dates="03/01/2025 - 04/01/2025"
          people="4"
          imageSrc={worldImage}
        />
        <ReservationButtons
          service="tour"
          countDown="3 días"     
          onCancelClick={openCancelModal}
        />
        <ReservationCard
          service="Reserva 3"
          price="$300"
          description="Descripción del reserva 3"
          location="Ubicación 3"
          dates="05/01/2025 - 06/01/2025"
          people="6"
          imageSrc={brainImage}
        />
        <ReservationButtons
          service="lodging"
          countDown="3 días"       
          onCancelClick={openCancelModal}
        />
        <CancelModal
          isOpen={isCancelModalOpen}
          onClose={closeCancelModal}
          onConfirm={handleConfirmCancel}
        />
      </div>
    </div>
  );
};

export default ReservationList;
