import { useEffect, useState } from "react";
import Header from "../shared/components/Header";
import Search from "../features/tours/components/ToursSearch";
import Filters from "../features/tours/components/ToursFilters";
import Info from "../features/tours/components/ToursInfo";
import styles from "../features/tours/components/ToursPage.module.css";
import type { Tour } from "../features/tours/utils/ToursTypes";

export default function ToursPage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);

  const [selectedPlanets, setSelectedPlanets] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(200); // Nuevo estado para el precio máximo


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3000/tours/");
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        setTours(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error al obtener la información:", error);
        setTours([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Aplicar filtros a los tours
  const filteredTours = tours.filter((tour) => {
    const matchesServices =
      selectedServices.length === 0 ||
      (tour.services &&
        selectedServices.every((service) =>
          tour.services?.some((s) => s.name === service)
        ));

    const matchesRating = (tour.rating ?? 0) >= rating;

    const matchesPrice = tour.cost <= maxPrice;

    const matchesPlanet =
      selectedPlanets.length === 0 ||
      selectedPlanets.includes(tour.planet);

    return matchesServices && matchesRating && matchesPrice && matchesPlanet;
  });

  // Restablecer todos los filtros
  const resetFilters = () => {
    setSelectedServices([]);
    setRating(0);
    setMaxPrice(200);
    setSelectedPlanets([]);
  };

  if (loading) {
    return <div className="text-center text-white">Cargando información...</div>;
  }

  return (
    <main className={styles.ToursPage}>
      <Header />
      <div className={styles.searchContainer}>
      <Search
        selectedServices={selectedServices}
        setSelectedServices={setSelectedServices}
        rating={rating}
        setRating={setRating}
        startDate={startDate}
        setStartDate={setStartDate}
        selectedPlanets={selectedPlanets}
        setSelectedPlanets={setSelectedPlanets}
      />

      </div>
      <div className={styles.contentContainer}>
        <aside className={styles.filtersContainer}>
          <Filters
          tours={tours}
          selectedPlanets={selectedPlanets}
          setSelectedPlanets={setSelectedPlanets}
          selectedServices={selectedServices}
          setSelectedServices={setSelectedServices}
          rating={rating}
          setRating={setRating}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          resetFilters={resetFilters}
        />
        </aside>
        <section className={styles.infoContainer}>
          <Info planet={selectedPlanets.join(", ") || ""} planetInfo={filteredTours} />
        </section>
      </div>
    </main>
  );
}
