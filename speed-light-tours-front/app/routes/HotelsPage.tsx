import Header from '../shared/components/Header';
import Search from '../features/hotels/components/Search';
import Filters from '../features/hotels/components/Filters';
import Info from '../features/hotels/components/Info';
import styles from '../features/hotels/components/HotelsPage.module.css';
import { useEffect, useState } from 'react';

export default function HotelsPage() {
  const [planet, setPlanet] = useState<string | null>(null);
  const [planetInfo, setPlanetInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Extrae el parámetro "planet" de la URL (ej. /hotels?planet=tatooine)
    const params = new URLSearchParams(window.location.search);
    const planetName = params.get('planet');
    setPlanet(planetName);

    // Si se seleccionó un planeta, se utiliza la ruta GET /:planet,
    // de lo contrario, se obtiene solo la lista de nombres de planetas
    const url = planetName
      ? `http://localhost:3000/lodgings/${planetName}`  // RUTA: router.get('/:planet', getLodgingByPlanetController)
      : `http://localhost:3000/lodgings/planet`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setPlanetInfo(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener la información:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Cargando información...</div>;
  }

  return (
    <main className={styles.hotelsPage}>
      <Header />
      <div className={styles.searchContainer}>
        <Search />
      </div>
      <div className={styles.contentContainer}>
        <aside className={styles.filtersContainer}>
          <Filters />
        </aside>
        <section className={styles.infoContainer}>
          {/*
            El componente Info debe manejar:
            - Si "planet" es null: mostrar la lista de nombres de planetas.
            - Si "planet" tiene valor: mostrar los hospedajes filtrados para ese planeta.
          */}
          <Info planet={planet} planetInfo={planetInfo} />
        </section>
      </div>
    </main>
  );
}
