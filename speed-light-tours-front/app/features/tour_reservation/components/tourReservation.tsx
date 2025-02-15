import Gallery from './Gallery';
import ServicesList from './ServicesList';
import BookingForm from './BookingForm';
import DescriptionSection from './DescriptionSection';
import ReviewsSection from './ReviewsSection';
import RecommendationsSection from './RecommendationsSection';
import TourInfo from './TourInfo';
import type { TourReservationProps } from './types';


const TourReservation: React.FC<TourReservationProps> = ({ tourName, images, location, duration, contact, 
  services, recommendations, pricePerPerson, onReserve, description, reviews }) => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-4">{tourName}</h1>
      <Gallery images={images} />
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div>
          <TourInfo location={location} duration={duration} contact={contact} />
          <ServicesList services={services}/>
        </div>
        <div>
          <RecommendationsSection recommendations={recommendations}/>
          <BookingForm pricePerPerson={pricePerPerson} onReserve={onReserve}/>
        </div>
      </div>
      <DescriptionSection description={description} />
      <ReviewsSection reviews={reviews} />
    </div>
  );
};

export default TourReservation;