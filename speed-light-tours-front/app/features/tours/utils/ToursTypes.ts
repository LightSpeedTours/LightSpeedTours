export interface Service {
    id: number;
    name: string;
    description: string;
}


export interface TourService {
    tourId: number;
    serviceId: number;
}


export interface Tour {
    id: number;
    planet: string;
    name: string;
    description: string;
    duration: number;
    route: string;
    capacity: number;
    rating: number | null;
    cost: number;
    recommendations: string;
    services: Service[];
}
