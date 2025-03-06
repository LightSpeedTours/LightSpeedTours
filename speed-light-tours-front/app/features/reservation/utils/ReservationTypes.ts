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

export interface CancelConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id: number) => void;
}

export interface ButtonProps {
  children: React.ReactNode;
  variant: 'outline' | 'destructive';
  className?: string;
  onClick?: () => void;
}

export interface LodgingFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ReservationCardProps {
  service: string;
  price: string;
  description: string;
  location: string;
  dates: string;
  people: string;
  countDown: string;
  timeLimitModify: string;
  timeLimitCancel: string;
  imageSrc: string;
  onCancelClick: () => void;
}

export interface TourFormProps {
  isOpen: boolean;
  onClose: () => void;
}