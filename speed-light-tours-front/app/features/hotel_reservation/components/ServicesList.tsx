import React from 'react';
import type { ServicesListProps } from './types';

const ServicesList: React.FC<ServicesListProps> = ({ services }) => {
  return (
    <div className="services p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <h3 className="text-xl font-bold mb-4">Lo que ofrece este hospedaje</h3>
      <ul className="list-disc list-inside">
        {services.map((service, index) => (
          <li key={index} className="text-lg mb-2">{service}</li>
        ))}
      </ul>
    </div>
  );
};

export default ServicesList;