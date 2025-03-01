import React from 'react';
import type { TourProps } from '../utils/types';

const TourInfo: React.FC<Pick<TourProps, 'planet' | 'duration' >> = ({ planet, duration }) => {
  return (
    <div className="tour-info p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="mb-4 md:mb-0 md:mr-8">
          <p className="text-lg font-semibold"><strong>Localidad:</strong></p>
          <p className="text-lg">{planet}</p>
        </div>
        <div className="mb-4 md:mb-0 md:mr-8">
          <p className="text-lg font-semibold"><strong>Duración:</strong></p>
          <p className="text-lg">{duration} horas</p>
        </div>
      </div>
    </div>
  );
};

export default TourInfo;
