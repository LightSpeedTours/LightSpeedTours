import { useState } from "react";
import type { BookingFormProps } from './types';

const BookingForm: React.FC<BookingFormProps> = ({ pricePerPerson, onReserve }) => {
  const [guests, setGuests] = useState<number>(1);

  return (
    <div className="booking-form p-4 bg-white shadow-md rounded-lg">
      <h3 className="text-xl font-bold mb-4">Precio / Persona</h3>
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
      <p className="text-lg font-semibold mb-4"><strong>Total:</strong> ${guests * pricePerPerson}</p>
      <button
        onClick={() => onReserve(guests)}
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
      >
        Reservar
      </button>
    </div>
  );
};

export default BookingForm;