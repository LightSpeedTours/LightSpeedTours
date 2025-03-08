import { useEffect, useState } from 'react';
import Header from '../shared/components/Header';
import HotelReservation from '~/features/hotel_reservation/components/HotelReservation';
import { getLodgingById } from '~/features/hotel_reservation/services/hotelService';
import type { LodgingProps } from '~/features/hotel_reservation/utils/types';
import mainImage from '../shared/assets/imagenp.jpeg';
import image1 from '../shared/assets/imagen1.jpeg';
import image2 from '../shared/assets/imagen2.jpeg';
import image3 from '../shared/assets/imagen3.jpeg';
import { useParams } from 'react-router';

const HotelReservationPage = () => { 
  const { id } = useParams();

  const [hotel, setHotel] = useState<LodgingProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHotel = async () => {
      if (!id) return;

      try {
        const data = await getLodgingById(Number(id));
        setHotel({
          id: data.id,
          name: data.name,
          images: [mainImage, image1, image2, image3],
          planet: data.planet,
          capacity: data.capacity,
          services: data.services,
          cost: data.cost,
          description: data.description,
        });
      } catch (err) {
        setError('No se pudo obtener la información del hospedaje.');
      } finally {
        setLoading(false);
      }
    };
    fetchHotel();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  if (!hotel) return <p>No hay información disponible.</p>;

  return (
    <main>
      <Header />
      <HotelReservation {...hotel} />
    </main>
  );
};

export default HotelReservationPage;
