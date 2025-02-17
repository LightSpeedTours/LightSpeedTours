import React, { useState } from "react";
import RatingSlider from "../../../shared/components/RatingSlider";
import styles from "./Filters.module.css";

export default function Filters() {
  const [rating, setRating] = useState(0);

  return (
    <div className={styles.filtersContainer}>
      <h2>Filtros</h2>

      {/* Localidad */}
      <div className={styles.filtroSection}>
        <h3>Localidad</h3>
        <div className={styles.checkboxGroup}>
          {[1, 2, 3, 4, 5].map((num) => (
            <label key={num}>
              <input type="checkbox" />
              Localidad {num}
            </label>
          ))}
        </div>
      </div>

      {/* Servicios */}
      <div className={styles.filtroSection}>
        <h3>Servicios</h3>
        <div className={styles.checkboxGroup}>
          {[...Array(8)].map((_, index) => (
            <label key={index}>
              <input type="checkbox" />
              Servicio {index + 1}
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
