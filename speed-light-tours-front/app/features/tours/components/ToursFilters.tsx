import React from 'react';
import RatingSlider from '../../../shared/components/RatingSlider';
import styles from './ToursFilters.module.css';

// Definir la estructura de las props
interface FiltersProps {
  selectedServices: string[];
  setSelectedServices: React.Dispatch<React.SetStateAction<string[]>>;
  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
}

export default function Filters({
  selectedServices,
  setSelectedServices,
  rating,
  setRating
}: FiltersProps) {
  const servicesList = ['WiFi', 'Desayuno', 'Guía turístico', 'Transporte'];

  return (
    <div className={styles.filtersContainer}>
      <h2>Filtros</h2>

      {/* Servicios */}
      <div className={styles.filtroSection}>
        <h3>Servicios</h3>
        <div className={styles.checkboxGroup}>
          {servicesList.map((service) => (
            <label key={service}>
              <input
                type="checkbox"
                checked={selectedServices.includes(service)}
                onChange={() => {
                  setSelectedServices((prev) =>
                    prev.includes(service)
                      ? prev.filter((s) => s !== service)
                      : [...prev, service]
                  );
                }}
              />
              {service}
            </label>
          ))}
        </div>
      </div>

      {/* Puntuación */}
      <div className={styles.filtroSection}>
        <h3>Puntuación</h3>
        <div className={styles.ratingContainer}>
          <RatingSlider value={rating} onChange={setRating} />
        </div>
      </div>
    </div>
  );
}
