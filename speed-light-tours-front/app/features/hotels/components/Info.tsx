import React, { useState } from 'react';
import Button from '../../../shared/components/Button';
import StarRating from '../../../shared/components/StarRating';
import styles from './Info.module.css';
import type { Lodging, Service, LodgingService } from "../utils/LodgingsTypes";
import planetsImages from '../../../shared/utils/planetsImagesLists'; 


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
              src={`/app/shared/assets/hospedajes/${lodging.name.replace(/\s+/g, "-").toLowerCase()}.png`}
              alt={lodging.name || "Imagen del hospedaje"}
              className={styles.image}
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
              <h2>${lodging.cost || 'Información del precio no disponible'}</h2>
              <p>Precio por noche</p>
              <a href='/hotelReservation'>
              <Button text="Reservar" type="button" />
              </a>
            </div>
          </div>
        ))
      ) : (
          <div className={styles.planetsImagesContainer}>
              {Object.entries(planetsImages).map(([planetName, imageUrl]) => (
              <a
                key={planetName}
                href={`/hotels?planet=${planetName.toLowerCase()}`}
                aria-label={`Ver hospedajes en ${planetName}`}
              >
                <button className="rounded-full bg-[#2C2C2C] flex-shrink-0 overflow-hidden border-2 border-[#FFE81F] transition-transform hover:scale-110">
                  <img
                    src={imageUrl}
                    alt={planetName}
                    className="w-full h-full object-cover"
                  />
                </button>
              </a>))}
        </div>
      )}
    </div>
  );
}
