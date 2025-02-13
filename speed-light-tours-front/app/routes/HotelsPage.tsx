import Search from "../features/hotels/components/Search";
import Filters from "../features/hotels/components/Filters";
import Info from "../features/hotels/components/Info";
import styles from "../features/hotels/components/HotelsPage.module.css";

export default function HotelsPage() {
  return (
    <main className={styles.hotelsPage}>
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
