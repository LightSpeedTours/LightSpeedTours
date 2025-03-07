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
  tour?: {
    name: string;
    planet: string;
    description: string;
  };
  lodging?: {
    name: string;
    planet: string;
    location: string;
    description: string;
  };
}

export interface Order {
  id: number;
  userId: number;
  totalAmount: number;
  reservations: Reservation[];
}

export interface CommentPayload {
  userId: number;
  entityType: string;
  entityId: number;
  quantity: number;
  subtotal: number;
  startDate: Date;
  endDate: Date;
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
  disabled?: boolean;
}

export interface LodgingFormProps {
  cost: number;
  id: number;
  quantity: number;
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
  imageSrc: string;
}

export interface TourFormProps {
  id: number;
  cost: number;
  duration: number;
  quantity: number;
  isOpen: boolean;
  onClose: () => void;
}

export interface ReservationButtonsProps {
  service: string;
  countDown: string;
  daysLeft: number;
  onCancelClick: () => void;
}