import Gallery from './Gallery';
import ServicesList from './ServicesList';
import BookingForm from './BookingForm';
import DescriptionSection from './DescriptionSection';
import ReviewsSection from './ReviewsSection';
import HotelInfo from './HotelInfo';
import type { HotelReservationProps } from './types';

const HotelReservation: React.FC<HotelReservationProps> = ({ hotelName, images, location, capacity, contact, 
  services, pricePerPerson, onReserve, checkAvailability, description, reviews }) => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-4">{hotelName}</h1>
      <Gallery images={images} />
      <div className="grid grid-cols-2 gap-8 mt-6">
        <div className="space-y-4">
          <HotelInfo location={location} capacity={capacity} contact={contact} />
          <ServicesList services={services} />
        </div>
        <div className="space-y-4">
          <BookingForm pricePerPerson={pricePerPerson} onReserve={onReserve} checkAvailability={checkAvailability} />
        </div>
      </div>
      <div className="mt-8">
        <DescriptionSection description={description} />
      </div>
      <div className="mt-8">
        <ReviewsSection reviews={reviews} />
      </div>
    </div>
  );
};

export default HotelReservation;