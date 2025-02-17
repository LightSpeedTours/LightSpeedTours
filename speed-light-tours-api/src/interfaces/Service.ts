import { EntityType } from '../utils/types/EnumTypes';

export interface Service {
    id: number;
    name: string;
    description: string;
    entityType: EntityType;
    entityId: number;
}
