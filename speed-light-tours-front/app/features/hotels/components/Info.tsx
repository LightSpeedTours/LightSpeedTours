import React, { useState } from 'react';
import Button from '../../../shared/components/Button';
import StarRating from '../../../shared/components/StarRating';
import styles from './Info.module.css';

interface InfoProps {
  planet: string | null;
  planetInfo: any; // Puedes reemplazar "any" con el tipo adecuado para tus datos
}

export default function Info({ planet, planetInfo }: InfoProps) {
  const [rating, setRating] = useState(0);

  // Si no se selecciona ningún planeta, mostramos una lista con los nombres de los planetas
  if (!planet) {
    return (
      <div className={styles.infoContainer}>
        <h2>Lista de Planetas</h2>
        <ul>
          {Array.isArray(planetInfo) &&
            planetInfo.map((item: any, index: number) => (
              <li key={index}>{item.planet}</li>
            ))}
        </ul>
      </div>
    );
  }

  // Si se selecciona un planeta, se asume que planetInfo es un array con la info de hospedajes
  return (
    <div className={styles.infoContainer}>
      {Array.isArray(planetInfo) && planetInfo.length > 0 ? (
        planetInfo.map((lodging: any) => (
          <div key={lodging.id} className={styles.gridContainer}>
            {/* Sección de imagenes */}
            <div className={styles.imageContainer}>
              <button>&lt;</button>
              <span>{lodging.image || 'Imagen'}</span>
              <button>&gt;</button>
            </div>

            {/* Sección de detalles */}
            <div className={styles.detailsContainer}>
              <h2>{lodging.name || 'Hospedaje'}</h2>
              <p>Ubicación: {lodging.location || 'Dirección del hospedaje'}</p>
              <h3>Servicios:</h3>
              <ul>
                {lodging.services && lodging.services.length > 0 ? (
                  lodging.services.map((service: any, idx: number) => (
                    <li key={idx}>{service.name}</li>
                  ))
                ) : (
                  <li>No hay servicios</li>
                )}
              </ul>
              <StarRating rating={rating} />
            </div>

            {/* Sección de precio */}
            <div className={styles.priceContainer}>
              <h2>Precio</h2>
              <p>{lodging.priceInfo || 'Información del precio'}</p>
              <p>{lodging.paymentInfo || 'Información del pago'}</p>
              <Button text="Reservar" type="button" />
            </div>
          </div>
        ))
      ) : (
        <div>No hay información disponible para {planet}</div>
      )}
    </div>
  );
}
