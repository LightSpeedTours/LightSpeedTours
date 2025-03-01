import { useEffect, useState } from "react";
import Header from "../shared/components/Header";
import TourReservation from "~/features/tour_reservation/components/TourReservation";
import { getTourById } from "~/features/tour_reservation/services/TourService";
import type { TourProps } from "~/features/tour_reservation/utils/types";
import mainImage from "../shared/assets/imagenp.jpeg";
import image1 from "../shared/assets/imagen1.jpeg";
import image2 from "../shared/assets/imagen2.jpeg";
import image3 from "../shared/assets/imagen3.jpeg";

const TourReservationPage = () => {
  const [tour, setTour] = useState<TourProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const data = await getTourById(1); // TODO: Cargar el ID correcto al seleccionar un tour de la lista
        setTour({
          id: data.id,
          name: data.name,
          images: [mainImage, image1, image2, image3],
          planet: data.planet,
          duration: data.duration,
          services: data.services,
          recommendations: data.recommendations,
          cost: data.cost,
          description: data.description,
          route: data.route,
          capacity: data.capacity,
        });
      } catch (err) {
        setError("No se pudo obtener la información del tour.");
      } finally {
        setLoading(false);
      }
    };
    fetchTour();
  }, []);

  if (loading) return <p className="text-center text-lg">Cargando...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!tour) return <p className="text-center text-gray-500">No hay información disponible.</p>;

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <TourReservation {...tour} />
    </main>
  );
};

export default TourReservationPage;
