import React from 'react';
import type { HotelInfoProps } from './types';

const HotelInfo: React.FC<HotelInfoProps> = ({ location, capacity, contact }) => {
  return (
    <div className="hotel-info p-4 bg-white shadow-md rounded-lg">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="mb-4 md:mb-0 md:mr-8">
          <p className="text-lg font-semibold"><strong>Localidad:</strong></p>
          <p className="text-lg">{location}</p>
        </div>
        <div className="mb-4 md:mb-0 md:mr-8">
          <p className="text-lg font-semibold"><strong>Capacidad:</strong></p>
          <p className="text-lg">{capacity} personas</p>
        </div>
        <div>
          <p className="text-lg font-semibold"><strong>Contacto:</strong></p>
          <p className="text-lg">{contact}</p>
        </div>
      </div>
    </div>
  );
};

export default HotelInfo;