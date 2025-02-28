import Header from "../shared/components/Header";
import Search from "../features/tours/components/ToursSearch";
import Filters from "../features/tours/components/ToursFilters";
import Info from "../features/tours/components/ToursInfo";
import styles from "../features/tours/components/ToursPage.module.css";

export default function ToursPage() {
  return (
    <main className={styles.toursPage}>
      {/* Encabezado */}
      <div>
        <Header />
      </div>
      {/* Sección de búsqueda */}
      <div className={styles.searchContainer}>
        <Search />
      </div>

      {/* Contenedor principal */}
      <div className={styles.contentContainer}>
        {/* Filtros en un `aside` */}
        <aside className={styles.filtersContainer}>
          <Filters />
        </aside>
        
        {/* Sección de información */}
        <section className={styles.infoContainer}>
          <Info />
        </section>
      </div>
    </main>
  );
}
