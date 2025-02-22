export interface Review {
    user: string;
    rating: number;
    comment: string;
  }
  
  export interface HotelReservationProps {
    hotelName: string;
    images: string[];
    location: string;
    capacity: number;
    contact: string;
    services: string[];
    pricePerPerson: number;
    onReserve: (guests: number, checkInDate: Date, checkOutDate: Date) => void;
    checkAvailability: (checkInDate: Date, checkOutDate: Date) => boolean;
    description: string;
    reviews: Review[];
  }
  
export interface HotelInfoProps {
    location: string;
    capacity: number;
    contact: string;
}
  
export interface ServicesListProps {
    services: string[];
}
   
export interface ReviewsSectionProps {
    reviews: Review[];
}

export interface GalleryProps {
    images: string[];
}

export interface DescriptionSectionProps {
    description: string;
}

export interface BookingFormProps {
    pricePerPerson: number;
    onReserve: (guests: number, checkInDate: Date, checkOutDate: Date) => void;
    checkAvailability: (checkInDate: Date, checkOutDate: Date) => boolean;
  }