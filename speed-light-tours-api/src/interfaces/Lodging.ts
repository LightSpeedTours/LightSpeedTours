import { Service } from './Service';

export interface Lodging {
    id: number;
    planet: String;
    location: String;
    description: string;
    capacity: number;
    rooms: number;
    rating: number | null;
    cost: number;
    services: Service[];
}
