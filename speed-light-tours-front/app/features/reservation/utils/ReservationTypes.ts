export interface Reservation {
  id: number;
  userId: number;
  locationType: 'cart' | 'order';
  locationId: number;
  entityType: 'lodging' | 'tour';
  entityId: number;
  quantity: number;
  subtotal: number;
  startDate: string;
  endDate: string;
}

export interface CommentPayload {
  userId: number;
  entityType: string;
  entityId: number;
  quantity: number;
  subtotal: number;
  startDate: string;
  endDate: string;
}
