import React, { useState, useEffect } from "react";
import RatingSlider from "../../../shared/components/RatingSlider";
import styles from "./ToursFilters.module.css";
import type { Tour } from "../utils/ToursTypes";

//Estado inicial de los filtros
interface FiltersProps {
  tours: Tour[];
  selectedServices: string[];
  setSelectedServices: React.Dispatch<React.SetStateAction<string[]>>;
  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
  maxPrice: number;
  setMaxPrice: (price: number) => void;
  selectedPlanets: string[];
  setSelectedPlanets: React.Dispatch<React.SetStateAction<string[]>>;
  resetFilters: () => void; // ✅ Añadir el resetFilters desde el componente padre
}

export default function Filters({
  tours,
  selectedServices,
  setSelectedServices,
  rating,
  setRating,
  maxPrice,
  setMaxPrice,
  selectedPlanets,
  setSelectedPlanets,
  resetFilters,
}: FiltersProps) {
  const [priceRange, setPriceRange] = useState<number>(maxPrice);
  const [planetsList, setPlanetsList] = useState<string[]>([]);

  //Obtener la lista de planetas únicos 
  useEffect(() => {
    if (tours.length > 0) {
      const uniquePlanets = Array.from(
        new Set(tours.map((tour) => tour.planet))
      );
      setPlanetsList(uniquePlanets);
    }
  }, [tours]);

  //Sincronizar el precio máximo si cambia externamente
  useEffect(() => {
    setPriceRange(maxPrice);
  }, [maxPrice]);

  //Seleccion de precios
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = Number(event.target.value);
    setPriceRange(newPrice);
    setMaxPrice(newPrice);
  };

  //Seleccion de planetas
  const handlePlanetChange = (planet: string) => {
    setSelectedPlanets((prev) =>
      prev.includes(planet)
        ? prev.filter((p) => p !== planet)
        : [...prev, planet]
    );
  };


  //"Seleccionar todos" o "Deseleccionar todos" los planetas
  const toggleSelectAllPlanets = () => {
    if (selectedPlanets.length === planetsList.length) {
      setSelectedPlanets([]);
    } else {
      setSelectedPlanets(planetsList);
    }
  };

  return (
    <div className={styles.filtersContainer}>
      <h2>Filtros</h2>

      {/* Filtro por planetas */}
      <div className={styles.filtroSection}>
        <h3>Planetas</h3>
        <div className={styles.checkboxGroup}>
          {planetsList.length > 0 ? (
            <>
              <label>
                <input
                  type="checkbox"
                  checked={selectedPlanets.length === planetsList.length}
                  onChange={toggleSelectAllPlanets}
                />
                {selectedPlanets.length === planetsList.length
                  ? "Deseleccionar todos"
                  : "Seleccionar todos"}
              </label>
              {planetsList.map((planet) => (
                <label key={planet}>
                  <input
                    type="checkbox"
                    checked={selectedPlanets.includes(planet)}
                    onChange={() => handlePlanetChange(planet)}
                  />
                  {planet}
                </label>
              ))}
            </>
          ) : (
            <p>No hay planetas disponibles</p>
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
        <div className={styles.ratingContainer}>
          <RatingSlider value={rating} onChange={setRating} />
        </div>
      </div>

    </div>
  );
}
