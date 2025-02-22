import { useState } from "react";
import type { BookingFormProps } from './types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BookingForm: React.FC<BookingFormProps> = ({ pricePerPerson, onReserve, checkAvailability }) => {
  const [guests, setGuests] = useState<number>(1);
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [availabilityMessage, setAvailabilityMessage] = useState<string>("");

  const handleCheckAvailability = () => {
    if (checkInDate && checkOutDate) {
      const isAvailable = checkAvailability(checkInDate, checkOutDate);
      setAvailabilityMessage(isAvailable ? "Fechas disponibles" : "Fechas no disponibles");
    }
  };

  const calculateTotal = () => {
    if (checkInDate && checkOutDate) {
      const timeDiff = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return guests * pricePerPerson * daysDiff;
    }
    return 0;
  };

  return (
    <div className="booking-form p-4 bg-white shadow-md rounded-lg">
      <h3 className="text-xl font-bold mb-4">Reserva tu estadía</h3>
      <label className="block mb-4">
        <span className="text-lg font-semibold">Fecha de llegada:</span>
        <DatePicker
          selected={checkInDate}
          onChange={(date) => setCheckInDate(date)}
          className="mt-2 ml-2 p-2 border rounded w-full"
        />
      </label>
      <label className="block mb-4">
        <span className="text-lg font-semibold">Fecha de salida:</span>
        <DatePicker
          selected={checkOutDate}
          onChange={(date) => setCheckOutDate(date)}
          className="mt-2 ml-2 p-2 border rounded w-full"
        />
      </label>
      <label className="block mb-4">
        <span className="text-lg font-semibold">Cantidad de personas:</span>
        <input
          type="number"
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          min={1}
          className="mt-2 p-2 border rounded w-full"
        />
      </label>
      <button
        onClick={handleCheckAvailability}
        className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 mb-4"
      >
        Revisar disponibilidad
      </button>
      {availabilityMessage && <p className="text-lg mb-4">{availabilityMessage}</p>}
      <p className="text-lg font-semibold mb-4"><strong>Total:</strong> ${calculateTotal()}</p>
      <button
        onClick={() => checkInDate && checkOutDate && onReserve(guests, checkInDate, checkOutDate)}
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
      >
        Reservar
      </button>
    </div>
  );
};

export default BookingForm;