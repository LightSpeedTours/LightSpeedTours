import React, { useEffect, useState } from 'react';
import './lodgingModal.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  fetchReservedDates,
  createReservation,
}  from '../../reservation/services/reservationService';
import InputField from '~/shared/components/InputField';
import Button from '~/shared/components/Button';
import type { FormProps } from '../utils/ReservationTypes';
import { set } from 'node_modules/react-datepicker/dist/date_utils';

const TourForm: React.FC<FormProps> = ({
  cost,
  id,
  quantity,
  isOpen,
  onClose,
  startDate,
  endDate,
}) => {

  const [attendees, setAttendees] = useState<number>(quantity);
  const [dateReserved, setDateReserved] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const calculateTotal = () => {
    if (!selectedDate) return 0;

    const attendeesNum = attendees || 1;
    const basePrice = attendeesNum * cost;
    const serviceFee = basePrice * 0.1;

    return basePrice + serviceFee;
  };

  const getEndDate = () => {
    if (!selectedDate) return null;
    const endDate = new Date(selectedDate);
    endDate.setHours(endDate.getHours());
    return endDate;
  };

  const validateFields = () => {
    if (!selectedDate) {
      setError('Debes seleccionar una fecha.');
      return false;
    }
    if (attendees < 1 || isNaN(attendees)) {
      setError('Debe haber al menos 1 participante.');
      return false;
    }

    setError(null);
    return true;
  };

  const handleReserve = async () => {
    if (!validateFields()) return;

    setLoading(true);

    const reservationData = {
      userId: 1, // TODO: Obtener ID real del usuario autenticado
      entityType: 'tour',
      entityId: id,
      quantity: attendees,
      subtotal: calculateTotal(),
      startDate: selectedDate || new Date(),
      endDate: getEndDate() || new Date(), 
    };

    try {
      await createReservation(reservationData);
      alert('Reserva realizada con éxito!');
      const updatedDates = await fetchReservedDates('tour', id);
      setDateReserved(updatedDates);
      setSelectedDate(null);
      setAttendees(1);
    } catch (err) {
      setError('Hubo un problema con la reserva. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Modificar Reserva</h2>
          <button className="close-button" onClick={onClose}>
            X
          </button>
        </div>
        <div className="modal-body">
          <div className="input-section">
            <div className="input-group-row">
              <div className="input-group">
                <label htmlFor="departure">Fecha del tour</label>
                <DatePicker
                  selected={selectedDate}
                  onChange={(update) => setSelectedDate(update)}
                  minDate={new Date()}
                  excludeDates={dateReserved}
                  className="mt-2 p-2 border rounded w-full"
                  placeholderText="MM/DD/YYYY"
                />
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="guests">Participantes</label>
              <InputField
                type="number"
                value={attendees.toString()}
                onChange={(e) => setAttendees(Number(e.target.value))}
                placeholder="# de participantes"
                minLength={1}
                required
                min={1}
              />
            </div>
            <div className="price-section">
              <div className="price-title">
                <h3>Precio</h3>                
              </div>
              <div className="price-item">
                <p>Precio / noche x días</p>
                <p>${(cost)}</p>
              </div>
              <div className="price-item">
                <p>Tarifa por servicio</p>
                <p>${(cost * 0.1)}</p>
              </div>
              <div className="price-item total">
                <p>Total</p>
                <p>${calculateTotal()}</p>
              </div>
            </div>
          </div>
        </div>{
        error && <p className="text-red-500 text-center mt-2">{error}</p>}
        <div className="modal-footer">          
          <Button text={loading ? 'Reservando...' : 'Reservar'} onClick={handleReserve} />
        </div>
      </div>
    </div>
  );
};

export default TourForm;
