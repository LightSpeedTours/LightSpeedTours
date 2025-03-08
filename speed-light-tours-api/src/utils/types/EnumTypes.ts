export const ENTITY_TYPES = {
    TOUR: 'tour',
    LODGING: 'lodging',
} as const;

export type EntityType = (typeof ENTITY_TYPES)[keyof typeof ENTITY_TYPES];

export enum STATUS {
    PENDING = 'pending',
    PAID = 'paid',
}
export const LOCATION_TYPES = {
    CART: 'cart',
    ORDER: 'order',
} as const;

export const USER_ROLS = {
    ADMIN: 'admin',
    USER: 'user',
} as const;

export const GENDER = {
    MALE: 'male',
    FEMALE: 'female',
    OTHER: 'other',
} as const;

export type LocationType = (typeof LOCATION_TYPES)[keyof typeof LOCATION_TYPES];
