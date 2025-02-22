import { EntityType } from '../utils/types/EnumTypes';

export interface Comment {
    id: number;
    userId: number;
    entityType: EntityType;
    entityId: number;
    rating: number;
    text: string;
    publishedAt: Date;
}
