import React, { useEffect, useState } from "react";
import Header from "../shared/components/Header";
import Search from "../features/hotels/components/Search";
import Filters from "../features/hotels/components/Filters";
import Info from "../features/hotels/components/Info";
import styles from "../features/hotels/components/HotelsPage.module.css";
import type { Lodging } from "../features/hotels/utils/LodgingsTypes";

export default function HotelsPage() {
  const [planet, setPlanet] = useState<string | null>(null);
  const [planetInfo, setPlanetInfo] = useState<Lodging[]>([]);
  const [loading, setLoading] = useState(true);

  //Estados para los filtros
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [selectedRooms, setSelectedRooms] = useState<number | null>(null);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(200); 

  //Obtener informacion y creacion de links a partir del nombre del planeta
  useEffect(() => {
    if (typeof window !== "undefined") {
      const fetchData = async () => {
        setLoading(true);
        try {
          const params = new URLSearchParams(window.location.search);
          const planetName = params.get("planet");
          setPlanet(planetName);

          const url = planetName
            ? `http://localhost:3000/lodgings/planet/${planetName}`
            : `http://localhost:3000/lodgings/planet`;

          const response = await fetch(url);
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
    }
  }, []);

  //Filtros
  const filteredLodgings = planetInfo.filter((lodging) => {
    const matchesLocation =
      selectedLocations.length === 0 || selectedLocations.includes(lodging.location);

    const matchesServices =
      selectedServices.length === 0 ||
      (lodging.services &&
        selectedServices.every((service) =>
          lodging.services?.some((s) => s.name === service)
        ));

    const matchesRating = (lodging.rating ?? 0) >= rating;

    const matchesPrice = lodging.cost <= maxPrice;

    return matchesLocation && matchesServices && matchesRating && matchesPrice;
  });

  if (loading) {
    return <div className={styles.loading}>Cargando información...</div>;
  }

  //Divs e informacion que debe mostrarse dependiendo de los filtros
  return (
    <main className={styles.hotelsPage}>
      <Header />
      <div className={styles.searchContainer}>
        <Search
          selectedLocations={selectedLocations}
          setSelectedLocations={setSelectedLocations}
          selectedServices={selectedServices}
          setSelectedServices={setSelectedServices}
          rating={rating}
          setRating={setRating}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          selectedPeople={selectedRooms}
          setSelectedPeople={setSelectedRooms}
        />
      </div>
      <div className={styles.contentContainer}>
        <aside className={styles.filtersContainer}>
          <Filters
            lodgings={planetInfo}
            selectedLocations={selectedLocations}
            setSelectedLocations={setSelectedLocations}
            selectedServices={selectedServices}
            setSelectedServices={setSelectedServices}
            rating={rating}
            setRating={setRating}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
          />
        </aside>
        <section className={styles.infoContainer}>
          <Info planet={planet} planetInfo={filteredLodgings} />
        </section>
      </div>
    </main>
  );
}
