import React, { useState, useEffect } from "react";
import styles from "./Filters.module.css";
import RatingSlider from "../../../shared/components/RatingSlider";
import type { Lodging } from "../utils/LodgingsTypes";


//Estado inicial de los filtros
interface FiltersProps {
  lodgings: Lodging[];
  selectedLocations: string[];
  setSelectedLocations: (locations: string[]) => void;
  selectedServices: string[];
  setSelectedServices: (services: string[]) => void;
  rating: number;
  setRating: (rating: number) => void;
  maxPrice: number;
  setMaxPrice: (price: number) => void;
}

export default function Filters({
  lodgings,
  selectedLocations,
  setSelectedLocations,
  selectedServices,
  setSelectedServices,
  rating,
  setRating,
  maxPrice,
  setMaxPrice,
}: FiltersProps) {
  const [locations, setLocations] = useState<string[]>([]);
  const [services, setServices] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number>(200); 

  useEffect(() => {
    //Extraer las localidades únicas
    const uniqueLocations = Array.from(
      new Set(lodgings.map((lodging) => lodging.location))
    );
    setLocations(uniqueLocations);

    //Extraer los servicios únicos
    const allServices = lodgings.flatMap((lodging) =>
      lodging.services ? lodging.services.map((service) => service.name) : []
    );
    setServices(Array.from(new Set(allServices)));
  }, [lodgings]);

  //Seleccion de localidades
  const handleLocationChange = (loc: string) => {
    setSelectedLocations(
      selectedLocations.includes(loc)
        ? selectedLocations.filter((l) => l !== loc)
        : [...selectedLocations, loc]
    );
  };

  //Seleccion de servicios
  const handleServiceChange = (service: string) => {
    setSelectedServices(
      selectedServices.includes(service)
        ? selectedServices.filter((s) => s !== service)
        : [...selectedServices, service]
    );
  };

  //Seleccion de precios
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = Number(event.target.value);
    setPriceRange(newPrice);
    setMaxPrice(newPrice);
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
            <p>Selecciona un planeta para ver sus localidades</p>
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
            <p>Selecciona un planeta para ver sus servicios</p>
          )}
        </div>
      </div>


      {/* Filtro por Precio */}
      <div className={styles.filtroSection}>
        <h3>Precio Máximo: ${priceRange}</h3>
        <input
          type="range"
          min="0"
          max="200"
          value={priceRange}
          onChange={handlePriceChange}
          className={styles.priceSlider}
        />
      </div>

      {/* Filtro por Puntuación */}
      <div className={styles.filtroSection}>
        <h3>Puntuación</h3>
        <RatingSlider value={rating} onChange={setRating} />
      </div>
    </div>
  );
}
