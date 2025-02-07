import React, { useState } from "react";
import Button from "../../../shared/components/Button";
import StarRating from "../../../shared/components/StarRating";
import styles from "./Info.module.css";

export default function Info() {
  const [rating, setRating] = useState(0);

  return (
    <div className={styles.infoContainer}>
      <div className={styles.gridContainer}>
        {/* Imagenes */}
        <div className={styles.imageContainer}>
          <button>&lt;</button>
          <span>Imagen</span>
          <button>&gt;</button>
        </div>

        {/* Detalles */}
        <div className={styles.detailsContainer}>
          <h2>Hospedaje</h2>
          <p>Ubicación: Dirección del hospedaje</p>
          <h3>Servicios:</h3>
          <ul>
            <li>Wi-Fi</li>
            <li>Estacionamiento</li>
            <li>Piscina</li>
          </ul>

          <h3>Puntuación</h3>
          <StarRating rating={rating} />
        </div>

        {/* Precio */}
        <div className={styles.priceContainer}>
          <h2>Precio</h2>
          <p>Información del precio</p>
          <p>Información del pago</p>
          <Button text="Reservar" type="button" />
        </div>
      </div>
    </div>
  );
}
