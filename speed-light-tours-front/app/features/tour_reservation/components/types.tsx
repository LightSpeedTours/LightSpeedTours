export interface Review {
    user: string;
    rating: number;
    comment: string;
  }
  
export interface TourReservationProps {
    tourName: string;
    images: string[];
    location: string;
    duration: number;
    contact: string;
    services: string[];
    recommendations: string[];
    pricePerPerson: number;
    onReserve: (guests: number) => void;
    description: string;
    reviews: Review[];
}
  
export interface TourInfoProps {
    location: string;
    duration: number;
    contact: string;
}
  
export interface ServicesListProps {
    services: string[];
}
  
export interface BookingFormProps {
    pricePerPerson: number;
    onReserve: (guests: number) => void;
}
  
export interface ReviewsSectionProps {
    reviews: Review[];
}

export interface RecommendationsSectionProps {
    recommendations: string[];
}

export interface GalleryProps {
    images: string[];
}

export interface DescriptionSectionProps {
    description: string;
}

export interface BookingFormProps {
    pricePerPerson: number;
    onReserve: (guests: number) => void;
}