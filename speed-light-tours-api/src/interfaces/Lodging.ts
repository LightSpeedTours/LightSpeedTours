import { Service } from './Service';

export interface Lodging {
  id: number;
  planet: String;
  description: string;
  capacity: number;
  rooms: number;
  rating: number | null;
  cost: number;
  duration: Date;
  services: Service[];
}
