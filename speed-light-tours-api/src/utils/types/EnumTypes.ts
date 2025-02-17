export const ENTITY_TYPES = {
    TOUR: 'tour',
    LODGING: 'lodging',
} as const;

export type EntityType = (typeof ENTITY_TYPES)[keyof typeof ENTITY_TYPES];
