import Gallery from './Gallery';
import BookingForm from './BookingForm';
import DescriptionSection from './DescriptionSection';
import RecommendationsSection from './RecommendationsSection';
import TourInfo from './TourInfo';
import ReviewsSection from '~/features/comment/components/ReviewSection';
import ServicesList from '~/shared/components/ServicesList';
import type { TourProps } from '../utils/types';

const TourReservation: React.FC<TourProps> = ({ 
  id,
  name, 
  images, 
  planet, 
  duration, 
  services, 
  recommendations, 
  cost, 
  description, 
}) => {
  return (
    <div className="w-full mx-auto px-4 flex flex-col">
      <h1 className="text-2xl font-bold my-4 text-center">{name}</h1>
      <Gallery images={images} />

      {/* Contenedor flexible para responsividad */}
      <div className="flex flex-col md:flex-col lg:flex-row mt-6 gap-6 w-full items-center md:justify-center">
        
        {/* Columna izquierda: Información del tour y servicios */}
        <div className="space-y-4 md:w-3/4 lg:w-2/3">
          <TourInfo planet={planet} duration={duration}/>
          <ServicesList services={services} category="Tour" />
          <RecommendationsSection recommendations={recommendations} />
        </div>

        {/* Columna derecha: BookingForm */}
        <div className="md:w-3/4 lg:w-1/3 flex justify-center">
          <BookingForm cost={cost}  id={id} duration={duration}/>
        </div>
      </div>

      {/* Descripción */}
      <div className="mt-6 w-full">
        <DescriptionSection description={description} />
      </div>
      
      {/* Sección de comentarios */}
      <ReviewsSection entityType="tour" entityId={id} />
      </div>
  );
};

export default TourReservation;
