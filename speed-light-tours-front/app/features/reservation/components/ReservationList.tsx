import React, { useState, useEffect } from 'react';
import ReservationCard from './ReservationCard';
import ReservationButtons from './ReservationButtons';
import './reservationList.css';
import CancelModal from './CancelModal';
import { fetchUserOrders } from '../services/reservationService';
import type { Order, Reservation } from '../utils/ReservationTypes';
import ewokVillage from 'app/shared/assets/hospedajes/ewok-village.png';
import wookieVillage from 'app/shared/assets/tours/wookie-culture.png';

const ReservationList: React.FC = () => {
  const [isCancelModalOpen, setCancelModalOpen] = useState(false);
  const [orders, setOrders] = useState<Order | null>(null);

  useEffect(() => {
    const getUserOrders = async () => {
      try {
        const userId = 1; // TODO: Replace with actual user ID
        const fetchedOrders = await fetchUserOrders(userId);
        setOrders(fetchedOrders);
      } catch (error) {
        console.error('Error fetching user orders:', error);
      }
    };

    getUserOrders();
  }, []);

  const openCancelModal = () => {
    setCancelModalOpen(true);
  };

  const closeCancelModal = () => {
    setCancelModalOpen(false);
  };

  const handleConfirmCancel = () => {
    console.log('Reserva cancelada');
    alert('Tu reserva ha sido cancelada');
    setCancelModalOpen(false);
  };

  const calculateCountdown = (startDate: string) => {
    const start = new Date(startDate);
    const now = new Date();
    const diffTime = Math.abs(start.getTime() - now.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const months = Math.floor(diffDays / 30);
    const days = diffDays % 30;

    return {
      countdown: `${months > 0 ? `${months} meses ` : ''}${days} días`,
      daysLeft: diffDays,
    };
  };

  return (
    <div className="reservation-title">
      <h1 className="reservation-list-title">Mis Reservas</h1>
      <div>
        {orders?.reservations.length ? (
          orders.reservations.map((reservation: Reservation) => {
            const { countdown, daysLeft } = calculateCountdown(reservation.startDate);
            return (
              <div className="reservation-list" key={reservation.id}>
                <ReservationCard
                  service={reservation.entityType === 'tour' ? reservation.tour?.name || 'Tour' : reservation.lodging?.name || 'Lodging'}
                  price={`$${reservation.subtotal}`}
                  description={reservation.entityType === 'tour' ? reservation.tour?.description || '' : reservation.lodging?.description || ''}
                  location={reservation.entityType === 'tour' ? reservation.tour?.planet || '' : `${reservation.lodging?.planet || ''}, ${reservation.lodging?.location || ''}`}
                  dates={reservation.entityType === 'tour' ? new Date(reservation.startDate).toLocaleDateString() : `${new Date(reservation.startDate).toLocaleDateString()} - ${new Date(reservation.endDate).toLocaleDateString()}`}
                  people={`${reservation.quantity}`}
                  imageSrc={reservation.entityType === 'tour' ? ewokVillage : wookieVillage}
                />
                <ReservationButtons
                  service={reservation.entityType}
                  countDown={countdown}
                  daysLeft={daysLeft}
                  onCancelClick={openCancelModal}
                  info={{
                    id: reservation.entityType === 'tour' ? reservation.tour?.id || 1 : reservation.lodging?.id || 1,
                    reservationId: reservation.id,
                    cost: reservation.subtotal/reservation.quantity,
                    quantity: reservation.quantity,
                    isOpen: false, 
                    onClose: () => {},
                    startDate: new Date(reservation.startDate),
                    endDate: new Date(reservation.endDate),
                  }}
                />
              </div>
            );
          })
        ) : (
          <div className="no-reservations">
            <p>No tienes reservas</p>
            <p>¡Reserva tu próximo viaje ahora!</p>
          </div>
        )}
        <CancelModal
          isOpen={isCancelModalOpen}
          onClose={closeCancelModal}
          onConfirm={handleConfirmCancel}
        />
      </div>
    </div>
  );
};

export default ReservationList;