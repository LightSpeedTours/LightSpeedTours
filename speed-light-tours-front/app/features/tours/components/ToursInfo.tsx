import React, { useState } from "react";
import Button from "../../../shared/components/Button";
import StarRating from "../../../shared/components/StarRating";
import styles from "./ToursInfo.module.css";
import type { Tour } from "../utils/ToursTypes";

interface InfoProps {
  planet: string | null;
  planetInfo: Tour[];
}

export default function Info({ planetInfo }: InfoProps) {
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});

  const handleRatingChange = (id: string, rating: number) => {
    setRatings((prev) => ({ ...prev, [id]: rating }));
  };

  return (
    <div className={styles.infoContainer}>
      {planetInfo.length > 0 ? (
        planetInfo.map((tour) => (
          <div key={tour.id} className={styles.gridContainer}>
            {/* Sección de imágenes */}
            <div className={styles.imageContainer}>
              <img
              src={`/app/shared/assets/tours/${tour.name.replace(/\s+/g, "-").toLowerCase()}.png`}
              alt={tour.name || "Imagen del hospedaje"}
              className={styles.image}
            />

            </div>

            {/* Detalles */}
            <div className={styles.detailsContainer}>
              <h2>{tour.name || "Tour sin nombre"}</h2>
              <h3>{tour.route || "Ruta no especificada"}</h3>
              <p>{tour.description || "Descripción no disponible"}</p>
              {/* Contenedor centrado para el StarRating */}
            <div className="flex justify-center items-center w-full">
              <StarRating rating={ratings[tour.id] || 0} />
            </div>
          </div>

            {/* Sección de precio */}
            <div className={styles.priceContainer}>
              <h2>Precio</h2>
              <h2>{tour.cost ? `$${tour.cost}` : "Precio no disponible"}</h2>
              <h3>Valor por persona</h3>
              <a href='/tourReservation'>
              <Button text="Reservar" type="button" />
              </a>
            </div>
          </div>
        ))
      ) : (
        <div>No hay tours disponibles</div>
      )}
    </div>
  );
}
