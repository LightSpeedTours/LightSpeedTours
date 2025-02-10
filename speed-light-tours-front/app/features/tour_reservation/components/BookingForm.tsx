import { useState } from "react";

interface BookingFormProps {
  pricePerPerson: number;
  onReserve: (guests: number) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ pricePerPerson, onReserve }) => {
  const [guests, setGuests] = useState<number>(1);

  return (
    <div className="booking-form">
      <h3>Precio / Persona</h3>
      <label>
        Cantidad de personas:
        <input
          type="number"
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          min={1}
        />
      </label>
      <p><strong>Total:</strong> ${guests * pricePerPerson}</p>
      <button onClick={() => onReserve(guests)}>Reservar</button>
    </div>
  );
};

export default BookingForm;