import type { Service } from '~/shared/utils/types';

export interface TourProps {
  id: number;
  name: string;
  images: string[];
  planet: string;
  duration: number;
  route: string;
  capacity: number;
  services: Service[];
  cost: number;
  recommendations: string;
  description: string;
}
