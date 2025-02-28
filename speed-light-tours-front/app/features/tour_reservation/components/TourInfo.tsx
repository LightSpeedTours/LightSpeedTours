import React from 'react';
import type { TourInfoProps } from './types';

const TourInfo: React.FC<TourInfoProps> = ({ location, duration, contact }) => {
  return (
    <div className="tour-info flex flex-col md:flex-row md:items-center md:justify-between p-4 bg-white shadow-md rounded-lg">
      <p className="text-lg font-semibold mb-2 md:mb-0"><strong>Localidad:</strong> {location}</p>
      <p className="text-lg font-semibold mb-2 md:mb-0"><strong>Duración:</strong> {duration} horas</p>
      <p className="text-lg font-semibold"><strong>Contacto:</strong> {contact}</p>
    </div>
  );
};

export default TourInfo;