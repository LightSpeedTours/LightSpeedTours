import React, { useState } from 'react';
import Button from '../../../shared/components/Button';
import StarRating from '../../../shared/components/StarRating';
import styles from './Info.module.css';
import type { Lodging, Service, LodgingService } from "../utils/LodgingsTypes";


interface InfoProps {
  planet: string | null;
  planetInfo: Lodging[]; // Mejor que "any"
}

export default function Info({ planet, planetInfo }: InfoProps) {
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});

  const handleRatingChange = (id: string, rating: number) => {
    setRatings((prev) => ({ ...prev, [id]: rating }));
  };

  return (
    <div className={styles.infoContainer}>
      {Array.isArray(planetInfo) && planetInfo.length > 0 ? (
        planetInfo.map((lodging) => (
          <div key={lodging.id} className={styles.gridContainer}>
            {/* Sección de imágenes */}
            <div className={styles.imageContainer}>
            </div>

            {/* Sección de detalles */}
            <div className={styles.detailsContainer}>
              <h2>{lodging.name || 'Hospedaje'}</h2>
              <h3>{lodging.location || 'Dirección del hospedaje'}</h3>
              <h3>{lodging.description || 'Descripcion del hospedaje'}</h3>
              <StarRating rating={ratings[lodging.id] || 0} />
            </div>

            {/* Sección de precio */}
            <div className={styles.priceContainer}>
              <h2>Precio</h2>
              <p>{lodging.cost || 'Información del precio no disponible'}</p>
              <h3>Precio por noche</h3>
              <Button text="Reservar" type="button" />
            </div>
          </div>
        ))
      ) : (
        <div>Selecciona un planeta</div>
      )}
    </div>
  );
}
