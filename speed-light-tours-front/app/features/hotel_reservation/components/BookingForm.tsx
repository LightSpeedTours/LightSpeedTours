import { useState, useEffect } from 'react';
import type { LodgingProps } from '../utils/types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  fetchReservedDates,
  createReservation,
} from '../../reservation/services/reservationService';
import InputField from '~/shared/components/InputField';
import Button from '~/shared/components/Button';

const BookingForm: React.FC<Pick<LodgingProps, 'cost' | 'id'>> = ({ cost, id }) => {
  const [guests, setGuests] = useState<string>('1');
  const [datesReserved, setDatesReserved] = useState<Date[]>([]);
  const [selectedDates, setSelectedDates] = useState<[Date | null, Date | null]>([null, null]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getReservedDates = async () => {
      try {
        const reservedDates = await fetchReservedDates('lodging',id);
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

      const updatedDates = await fetchReservedDates('lodging', id);
      setDatesReserved(updatedDates);
      setSelectedDates([null, null]);
      setGuests('1');
    } catch (err) {
      setError('Hubo un problema con la reserva. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-200 dark:bg-gray-800 shadow-md rounded-lg w-full max-w-md flex flex-col">
      <h3 className="text-xl font-bold mb-4 text-center">Reserva tu estadía</h3>

      {/* Fecha de llegada y salida */}
      <div className="flex flex-col mb-4">
        <label className="text-lg font-semibold">Salida - Regreso</label>
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

      {/* Número de huéspedes */}
      <div className="flex flex-col mb-4">
        <label className="text-lg font-semibold">Huéspedes</label>
        <InputField
          type="number"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          placeholder="# de huéspedes"
          minLength={1}
          required
        />
      </div>

      {/* Precio detallado */}
      <div className="bg-white dark:bg-gray-700 p-4 rounded-md shadow-md">
        <h4 className="text-lg font-semibold mb-2">Precio</h4>
        <p className="text-sm flex justify-between">
          <span>Precio / noche x días</span> <span>${(cost).toFixed(2)}</span>
        </p>
        <p className="text-sm flex justify-between">
          <span>Tarifa por servicio (10%)</span> <span>${(cost * 0.1).toFixed(2)}</span>
        </p>
        <p className="text-lg font-bold flex justify-between mt-2">
          <span>Total</span> <span>${calculateTotal().toFixed(2)}</span>
        </p>
      </div>

      {/* Botón de reserva */}
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      <div className="mt-4">
        <Button text={loading ? 'Reservando...' : 'Reservar'} onClick={handleReserve} />
      </div>
    </div>
  );
};

export default BookingForm;
