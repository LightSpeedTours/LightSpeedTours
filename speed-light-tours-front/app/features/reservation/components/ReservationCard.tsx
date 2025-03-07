import React from 'react';
import type { ReservationCardProps } from '../utils/ReservationTypes';
import './reservationCard.css';

const ReservationCard: React.FC<ReservationCardProps> = ({
  service,
  price,
  description,
  location,
  dates,
  people,
  imageSrc,
}) => {
  return (
    <div className="reservation-card">
      <div className="service-info">
        <h6 className="service-title">{service}</h6>
        <img src={imageSrc} alt={service} className="service-image" />
      </div>
      <div className="price-description">
        <p className="price">Precio: {price}</p>
        <p className="description">{description}</p>
      </div>
      <div className="reservation-info">
        <p>Ubicación: {location}</p>
        <p>Fechas: {dates}</p>
        <p>Cantidad de personas: {people}</p>
      </div>
    </div>
  );
};

export default ReservationCard;