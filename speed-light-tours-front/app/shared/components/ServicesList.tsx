import React from 'react';
import defaultIcon from '~/shared/assets/default-service.png'; // Ícono por defecto
import type { ServicesListProps } from '../utils/types';

const ServicesList: React.FC<ServicesListProps & { category: string }> = ({
  services,
  category,
}) => {
  return (
    <div className="services p-4 bg-gray-200 dark:bg-gray-800 shadow-md rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">Lo que ofrece este {category}</h3>
      {/* En pantallas pequeñas (sm), 1 columna. En pantallas grandes (md+), 2 columnas */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {services.map((service) => {
          // Intentar cargar la imagen desde assets
          let serviceImage;
          try {
            serviceImage = require(
              `~/shared/assets/${service.name.toLowerCase().replace(/\s+/g, '-')}.png`,
            );
          } catch (error) {
            serviceImage = defaultIcon; // Usa ícono por defecto si no existe la imagen
          }

          return (
            <li
              key={service.id}
              className="flex items-center space-x-4 relative group bg-white dark:bg-gray-700 p-3 rounded-lg shadow-md break-words"
            >
              {/* Imagen del servicio (NO se altera bajo ningún motivo) */}
              <div className="w-16 h-16 rounded-full flex items-center justify-center overflow-hidden shrink-0">
                <img src={serviceImage} alt={service.name} className="w-16 h-16 object-cover" />
              </div>

              {/* Nombre del servicio con break-words */}
              <span className="text-lg font-bold break-words">{service.name}</span>

              {/* Descripción emergente abajo del servicio */}
              <div className="absolute left-1/2 -translate-x-1/2 top-full w-auto min-w-[200px] p-2 text-sm text-white bg-gray-900 rounded-lg shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
                {service.description}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ServicesList;
