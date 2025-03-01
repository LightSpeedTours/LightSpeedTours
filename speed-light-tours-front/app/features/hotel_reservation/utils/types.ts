import type { Service } from "~/shared/utils/types";


export interface LodgingProps {
    id: number;
    name: string;
    images: string[];
    planet: string;
    capacity: number;
    services: Service[];
    cost: number;
    description: string;
}
