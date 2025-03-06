import React, { useState } from 'react';
import LodgingModal from './LodgingModal';
import TourModal from './TourModal';
import Button from './Button';
import type { ReservationCardProps } from '../utils/ReservationTypes';
import './reservationCard.css';

const ReservationCard: React.FC<ReservationCardProps> = ({
  service,
  price,
  description,
  location,
  dates,
  people,
  countDown,
  timeLimitModify,
  timeLimitCancel,
  imageSrc,
  onCancelClick,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="reservation-card">
        <div className="reservation-card-left">
          <div className="service-info">
          <h6 className="service-title">{service}</h6>
          <img src={imageSrc} alt={service} className="service-image" />
          </div>

          <div className="price-description">
          <p className="price">Precio: {price}</p>
          <p className="description">{description}</p>
          </div>
        </div>
        <div className="reservation-info">
          <p>Ubicación: {location}</p>
          <p>
          Fechas: <br />
          {dates}
          </p>
          <p>Cantidad de personas: {people}</p>
        </div>
      </div>
      <div className="reservation-card-right">
        <p className="countdown">{countDown}</p>
        <Button className="modify-button" variant="outline" onClick={openModal}>
        Modificar reserva
        </Button>
        <p className="time-limit">
        Válido hasta: <br />
        {timeLimitModify}
        </p>
        <Button variant="destructive" onClick={onCancelClick}>
        Cancelar
        </Button>
        <p className="time-limit">
        Válido hasta: <br />
        {timeLimitCancel}
        </p>        
      </div>
      {service === 'lodging' ? (
      <LodgingModal isOpen={isModalOpen} onClose={closeModal} />
      ) : (
      <TourModal isOpen={isModalOpen} onClose={closeModal} />
      )}
    </>
  );
};

export default ReservationCard;
