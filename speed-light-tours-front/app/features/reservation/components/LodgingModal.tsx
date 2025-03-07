import React, { useEffect } from 'react';
import { useState } from 'react';
import type { LodgingFormProps } from '../utils/ReservationTypes';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  fetchReservedDates,
  createReservation,
} from '../../reservation/services/reservationService';
import InputField from '~/shared/components/InputField';
import Button from '~/shared/components/Button';
import './lodgingModal.css';

const LodgingForm: React.FC<Pick<LodgingFormProps, 'cost' | 'id' | 'quantity' | 'isOpen' | 'onClose'>> = ({
  cost,
  id,
  quantity,
  isOpen,
  onClose,
}) => {

    const [guests, setGuests] = useState<string>('1');
    const [datesReserved, setDatesReserved] = useState<Date[]>([]);
    const [selectedDates, setSelectedDates] = useState<[Date | null, Date | null]>([null, null]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const getReservedDates = async () => {
        try {
          const reservedDates = await fetchReservedDates(id);
          setDatesReserved(reservedDates);
        } catch (err) {
          console.error('Error al obtener fechas reservadas:', err);
        }
      };
      getReservedDates();
    }, []);
  
    const calculateTotal = () => {
      const [checkInDate, checkOutDate] = selectedDates;
      if (checkInDate && checkOutDate) {
        const daysDiff = Math.ceil(
          Math.abs(checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24),
        );
        const guestsNum = parseInt(guests, 10) || 1;
        console.log('guestsNum:', guestsNum, 'cost:', cost, 'daysDiff:', daysDiff);
        const basePrice = guestsNum * cost * daysDiff;
        const serviceFee = basePrice * 0.1;
        return basePrice + serviceFee;
      }
      return 0;
    };
  
    const validateFields = () => {
      const [startDate, endDate] = selectedDates;
      if (!startDate) {
        setError('Debes seleccionar una fecha de inicio.');
        return false;
      }
      if (!endDate) {
        setError('Debes seleccionar una fecha de fin.');
        return false;
      }
      if (startDate.getTime() > endDate.getTime()) {
        setError('La fecha de salida debe ser posterior a la fecha de entrada.');
        return false;
      }
      if (startDate.getTime() === endDate.getTime()) {
        setError('Debe reservar al menos un día.');
        return false;
      }
      if (parseInt(guests, 10) < 1 || isNaN(parseInt(guests, 10))) {
        setError('Debe haber al menos 1 huésped.');
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
        entityType: 'lodging',
        entityId: id,
        quantity: parseInt(guests, 10),
        subtotal: calculateTotal(),
        startDate: selectedDates[0] || new Date(),
        endDate: selectedDates[1] || new Date(),
      };
  
      try {
        await createReservation(reservationData);
        alert('Reserva realizada con éxito!');
  
        const updatedDates = await fetchReservedDates(id);
        setDatesReserved(updatedDates);
        setSelectedDates([null, null]);
        setGuests('1');
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
              placeholderText="MM/DD/YYYY - MM/DD/YYYY"
            />
          </div>
          <div className="input-group">
            <label htmlFor="guests">Huéspedes</label>
            <InputField
              type="number"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              placeholder="# de huéspedes"
              minLength={1}
              required
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
              <p>Tarifa por servicio (10%)</p>
              <p>${(cost * 0.1)}</p>
            </div>
            <div className="price-item total">
              <p>Total</p>
              <p>${calculateTotal()}</p>
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
