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
              <img
              src={`/app/shared/assets/${lodging.name.replace(/\s+/g, "-").toLowerCase()}.png`}
              alt={lodging.name || "Imagen del hospedaje"}
              className={styles.tourImage}
            />

            </div>


            {/* Sección de detalles */}
            <div className={styles.detailsContainer}>
              <h2>{lodging.name || 'Hospedaje'}</h2>
              <h3>{lodging.location || 'Dirección del hospedaje'}</h3>
              <p>{lodging.description || 'Descripcion del hospedaje'}</p>
              <StarRating rating={ratings[lodging.id] || 0} />
            </div>

            {/* Sección de precio */}
            <div className={styles.priceContainer}>
              <h2>Precio</h2>
              <h2>{lodging.cost || 'Información del precio no disponible'}</h2>
              <p>Precio por noche</p>
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
