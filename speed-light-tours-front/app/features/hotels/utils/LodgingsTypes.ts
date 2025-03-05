export interface Service {
    id: number;
    name: string;
    description: string;
}


export interface LodgingService {
    lodgingId: number;
    serviceId: number;
}


export interface Lodging {
    id: number;
    name: string;
    planet: string;
    location: string;
    description: string;
    capacity: number;
    rooms: number;
    rating: number | null;
    cost: number;
    services: Service[];
}
  
