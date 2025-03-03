import Gallery from './Gallery';
import ServicesList from '../../../shared/components/ServicesList';
import BookingForm from './BookingForm';
import DescriptionSection from './DescriptionSection';
import HotelInfo from './HotelInfo';
import type { LodgingProps } from '../utils/types';
import ReviewsSection from '~/features/comment/components/ReviewSection';

const HotelReservation: React.FC<LodgingProps> = ({
  id,
  name,
  images,
  planet,
  capacity,
  services,
  cost,
  description,
}) => {
  return (
    <div className="w-full mx-auto px-4 flex flex-col w-full">
      <h1 className="text-2xl font-bold my-4 text-center">{name}</h1>
      <Gallery images={images} />

      {/* Contenedor flexible para responsividad */}
      <div className="flex flex-col md:flex-col lg:flex-row mt-6 gap-6 w-full items-center md:justify-center">
        {/* Columna izquierda: Información del hotel y servicios */}
        <div className="space-y-4 md:w-3/4 lg:w-2/3">
          <HotelInfo planet={planet} capacity={capacity} />
          <ServicesList services={services} category="hospedaje" />
        </div>

        {/* Columna derecha: BookingForm */}
        <div className="md:w-3/4 lg:w-1/3 flex justify-center">
          <BookingForm cost={cost} id={id} />
        </div>
      </div>

      {/* Descripción */}
      <div className="mt-6 w-full">
        <DescriptionSection description={description} />
      </div>

      {/* Sección de comentarios */}
      <ReviewsSection entityType="lodging" entityId={id} />
    </div>
  );
};

export default HotelReservation;
