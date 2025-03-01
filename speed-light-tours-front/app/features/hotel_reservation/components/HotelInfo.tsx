import React from 'react';
import type { LodgingProps } from '../utils/types';

const HotelInfo: React.FC<Pick<LodgingProps, 'planet' | 'capacity'>> = ({ planet, capacity }) => {
  return (
    <div className="hotel-info p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="mb-4 md:mb-0 md:mr-8">
          <p className="text-lg font-semibold">
            <strong>Localidad:</strong>
          </p>
          <p className="text-lg">{planet}</p>
        </div>
        <div className="mb-4 md:mb-0 md:mr-8">
          <p className="text-lg font-semibold">
            <strong>Capacidad:</strong>
          </p>
          <p className="text-lg">{capacity} personas</p>
        </div>
      </div>
    </div>
  );
};

export default HotelInfo;
