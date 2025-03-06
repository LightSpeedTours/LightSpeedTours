import React, { useState, useEffect } from "react";
import styles from "./Filters.module.css";
import RatingSlider from "../../../shared/components/RatingSlider";
import type { Lodging } from "../utils/LodgingsTypes";

interface FiltersProps {
  lodgings: Lodging[];
  selectedLocations: string[];
  setSelectedLocations: (locations: string[]) => void;
  selectedServices: string[];
  setSelectedServices: (services: string[]) => void;
  rating: number;
  setRating: (rating: number) => void;
}

export default function Filters({
  lodgings,
  selectedLocations,
  setSelectedLocations,
  selectedServices,
  setSelectedServices,
  rating,
  setRating,
}: FiltersProps) {
  const [locations, setLocations] = useState<string[]>([]);
  const [services, setServices] = useState<string[]>([]);

  useEffect(() => {
    // Extraer las ubicaciones únicas
    const uniqueLocations = Array.from(new Set(lodgings.map((lodging) => lodging.location)));
    setLocations(uniqueLocations);

    // Extraer los servicios únicos
    const allServices = lodgings.flatMap((lodging) =>
      lodging.services ? lodging.services.map((service) => service.name) : []
    );
    setServices(Array.from(new Set(allServices)));
  }, [lodgings]);

  const handleLocationChange = (loc: string) => {
    setSelectedLocations(
      selectedLocations.includes(loc)
        ? selectedLocations.filter((l) => l !== loc)
        : [...selectedLocations, loc]
    );
  };

  const handleServiceChange = (service: string) => {
    setSelectedServices(
      selectedServices.includes(service)
        ? selectedServices.filter((s) => s !== service)
        : [...selectedServices, service]
    );
  };

  return (
    <div className={styles.filtersContainer}>
      <h2>Filtros</h2>

      {/* Filtro por Localidad */}
      <div className={styles.filtroSection}>
        <h3>Localidad</h3>
        <div className={styles.checkboxGroup}>
          {locations.length > 0 ? (
            locations.map((loc) => (
              <label key={loc}>
                <input
                  type="checkbox"
                  checked={selectedLocations.includes(loc)}
                  onChange={() => handleLocationChange(loc)}
                />
                {loc}
              </label>
            ))
          ) : (
            <p>No hay locaciones disponibles</p>
          )}
        </div>
      </div>

      {/* Filtro por Servicios */}
      <div className={styles.filtroSection}>
        <h3>Servicios</h3>
        <div className={styles.checkboxGroup}>
          {services.length > 0 ? (
            services.map((service) => (
              <label key={service}>
                <input
                  type="checkbox"
                  checked={selectedServices.includes(service)}
                  onChange={() => handleServiceChange(service)}
                />
                {service}
              </label>
            ))
          ) : (
            <p>No hay servicios disponibles</p>
          )}
        </div>
      </div>

      {/* Filtro por Puntuación */}
      <div className={styles.filtroSection}>
        <h3>Puntuación</h3>
        <RatingSlider value={rating} onChange={setRating} />
      </div>
    </div>
  );
}
