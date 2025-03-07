import React, { useEffect, useState } from 'react';
import type { FormProps, ReservationPayload } from '../utils/ReservationTypes';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  fetchReservedDates,
  updateReservation,
} from '../../reservation/services/reservationService';
import InputField from '~/shared/components/InputField';
import Button from '~/shared/components/Button';
import './lodgingModal.css';

const LodgingForm: React.FC<FormProps> = ({
  reservationId,
  cost,
  id,
  quantity,
  isOpen,
  onClose,
  startDate,
  endDate,
}) => {
  const [guests, setGuests] = useState<number>(quantity);
  const [datesReserved, setDatesReserved] = useState<Date[]>([]);
  const [selectedDates, setSelectedDates] = useState<[Date | null, Date | null]>([
    startDate ? new Date(startDate) : null,
    endDate ? new Date(endDate) : null,
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Asegurar que selectedDates se inicialice con startDate y endDate correctamente
    if (startDate && endDate) {
      setSelectedDates([new Date(startDate), new Date(endDate)]);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    const getReservedDates = async () => {
      try {
        const reservedDates = await fetchReservedDates('lodging', id);
        setDatesReserved(reservedDates);
      } catch (err) {
        console.error('Error al obtener fechas reservadas:', err);
      }
    };
    getReservedDates();
  }, [id]);

  const calculateTotal = () => {
    const [checkInDate, checkOutDate] = selectedDates;
    if (checkInDate && checkOutDate) {
      const daysDiff = Math.ceil(
        Math.abs(checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24)
      );
      const guestsNum = guests || 1;
      const basePrice = guestsNum * cost * daysDiff;
      const serviceFee = basePrice * 0.1;
      return basePrice + serviceFee;
    }
    return 0;
  };

  const validateFields = () => {
    const [start, end] = selectedDates;
    if (!start) {
      setError('Debes seleccionar una fecha de inicio.');
      return false;
    }
    if (!end) {
      setError('Debes seleccionar una fecha de fin.');
      return false;
    }
    if (start.getTime() > end.getTime()) {
      setError('La fecha de salida debe ser posterior a la fecha de entrada.');
      return false;
    }
    if (start.getTime() === end.getTime()) {
      setError('Debe reservar al menos un día.');
      return false;
    }
    if (guests < 1 || isNaN(guests)) {
      setError('Debe haber al menos 1 huésped.');
      return false;
    }

    setError(null);
    return true;
  };

  const handleReserve = async () => {
    if (!validateFields()) return;

    setLoading(true);

    const reservationData:ReservationPayload = {
      userId: 1, // TODO: Obtener ID real del usuario autenticado
      entityType: 'lodging',
      entityId: id,
      quantity: guests,
      subtotal: calculateTotal(),
      startDate: selectedDates[0] ? selectedDates[0].toISOString() : new Date().toISOString(),
      endDate: selectedDates[1] ? selectedDates[1].toISOString() : new Date().toISOString(),
    };

    try {
      await updateReservation(reservationData, reservationId);
      alert('Reserva realizada con éxito!');

      const updatedDates = await fetchReservedDates('lodging', id);
      setDatesReserved(updatedDates);
      setSelectedDates([null, null]);
      setGuests(1);
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
            <label htmlFor="departure">Salida - Regreso</label>
            <DatePicker
              selectsRange
              startDate={selectedDates[0]}
              endDate={selectedDates[1]}
              onChange={(update) => setSelectedDates(update)}
              minDate={new Date()}
              excludeDates={datesReserved}
              className="mt-2 p-2 border rounded w-full"
              dateFormat="MM/dd/yyyy"
            />
          </div>
            <div className="input-group">
            <label htmlFor="guests">Huéspedes</label>
            <InputField
              type="number"
              value={guests.toString()}
              onChange={(e) => {
              const value = Number(e.target.value);
              if (value >= 1) {
                setGuests(value);
              }
              }}
              placeholder="# de huéspedes"
              min={1}
              required
            />
            </div>
          <div className="price-section">
            <div className="price-title">
              <h3>Precio</h3>
            </div>
            <div className="price-item">
              <p>Precio / noche x días</p>
              <p>${cost.toFixed(2)}</p>
            </div>
            <div className="price-item">
              <p>Tarifa por servicio (10%)</p>
              <p>${(cost * 0.1).toFixed(2)}</p>
            </div>
            <div className="price-item total">
              <p>Total</p>
              <p>${calculateTotal().toFixed(2)}</p>
            </div>
          </div>
        </div>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        <div className="modal-footer">
          <Button text={loading ? 'Reservando...' : 'Reservar'} onClick={handleReserve} />
        </div>
      </div>
    </div>
  );
};

export default LodgingForm;
