import type { Reservation } from '~/features/reservation/utils/ReservationTypes';

export interface Cart {
  id: number;
  userId: number;
  totalPrice: number;
  reservations: Reservation[];
}
