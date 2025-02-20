import { Service } from './Service';

export interface Tour {
    id: number;
    planet: String;
    name: string;
    description: string;
    duration: number;
    capacity: number;
    rating: number | null;
    cost: number;
    recommendations: string;
    services: Service[];
}
