import { EntityType } from '../utils/types/EnumTypes';

export interface Reservation {
    id: number;
    userId: number;
    entityType: EntityType;
    entityId: number;
    quantity: number;
    subtotal: number;
    startDate: Date;
    endDate: Date;
}
