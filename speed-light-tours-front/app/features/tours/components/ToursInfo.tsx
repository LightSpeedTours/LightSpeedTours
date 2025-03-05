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
              {/* Aquí podrías agregar una imagen si está disponible */}
            </div>

            {/* Detalles */}
            <div className={styles.detailsContainer}>
              <h2>{tour.name || "Tour sin nombre"}</h2>
              <h3>{tour.route || "Ruta no especificada"}</h3>
              <p>{tour.description || "Descripción no disponible"}</p>
              <StarRating rating={ratings[tour.id] || 0} />
            </div>

            {/* Sección de precio */}
            <div className={styles.priceContainer}>
              <h2>Precio</h2>
              <p>{tour.cost ? `$${tour.cost}` : "Precio no disponible"}</p>
              <h3>Precio por persona</h3>
              <Button text="Reservar" type="button" />
            </div>
          </div>
        ))
      ) : (
        <div>No hay tours disponibles</div>
      )}
    </div>
  );
}
