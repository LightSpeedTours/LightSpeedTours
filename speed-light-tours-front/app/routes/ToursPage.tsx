import { useEffect, useState } from "react";
import Header from "../shared/components/Header";
import Search from "../features/tours/components/ToursSearch";
import Filters from "../features/tours/components/ToursFilters";
import Info from "../features/tours/components/ToursInfo";
import styles from "../features/tours/components/ToursPage.module.css";
import type { Tour } from "../features/tours/utils/ToursTypes";

export default function ToursPage() {
  const [planet, setPlanet] = useState<string | null>(null);
  const [planetInfo, setPlanetInfo] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);

  // Estados para los filtros
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [rating, setRating] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3000/tours/");
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        setPlanetInfo(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error al obtener la información:", error);
        setPlanetInfo([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Aplicar filtros a los tours
  const filteredTours = planetInfo.filter((tour) => {
    const matchesServices =
      selectedServices.length === 0 ||
      (tour.services &&
        selectedServices.every((service) =>
          tour.services?.some((s) => s.name === service)
        ));

    const matchesRating = (tour.rating ?? 0) >= rating;

    return matchesServices && matchesRating;
  });

  const resetFilters = () => {
    setSelectedServices([]);
    setRating(0);
  };

  if (loading) {
    return <div>Cargando información...</div>;
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
        setStartDate={setStartDate} />
      </div>
      <div className={styles.contentContainer}>
        <aside className={styles.filtersContainer}>
          <Filters
            selectedServices={selectedServices}
            setSelectedServices={setSelectedServices}
            rating={rating}
            setRating={setRating}
          />
         
        </aside>
        <section className={styles.infoContainer}>
          <Info planet={planet || ""} planetInfo={filteredTours} />
        </section>
      </div>
    </main>
  );
}
