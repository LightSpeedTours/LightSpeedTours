export interface ServicesListProps {
  services: Service[];
}

export interface Service {
  id: number;
  name: string;
  description: string;
}
