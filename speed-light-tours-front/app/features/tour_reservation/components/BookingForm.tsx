import { useState } from "react";
import type { TourProps } from "../utils/types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createReservation } from "../../reservation/services/reservationService";
import InputField from "~/shared/components/InputField";
import Button from "~/shared/components/Button";

const TourBookingForm: React.FC<Pick<TourProps, "cost" | "id">> = ({ cost, id }) => {
  const [attendees, setAttendees] = useState<string>("1");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const calculateTotal = () => {
    if (!selectedDate) return 0;
    
    const attendeesNum = parseInt(attendees, 10) || 1;
    const basePrice = attendeesNum * cost;
    const serviceFee = basePrice * 0.10;
    
    return basePrice + serviceFee;
  };

  const validateFields = () => {
    if (!selectedDate) {
      setError("Debes seleccionar una fecha.");
      return false;
    }
    if (parseInt(attendees, 10) < 1 || isNaN(parseInt(attendees, 10))) {
      setError("Debe haber al menos 1 participante.");
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
      entityType: "tour",
      entityId: id,
      quantity: parseInt(attendees, 10),
      subtotal: calculateTotal(),
      startDate: selectedDate?.toISOString() || "",
      endDate: selectedDate?.toISOString() || "", // TODO: Adjust endDate if needed
    };

    try {
      await createReservation(reservationData);
      alert("Reserva realizada con éxito!");

      setSelectedDate(null);
      setAttendees("1");

    } catch (err) {
      setError("Hubo un problema con la reserva. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-200 dark:bg-gray-800 shadow-md rounded-lg w-full max-w-md flex flex-col">
      <h3 className="text-xl font-bold mb-4 text-center">Reserva tu tour</h3>

      {/* Selección de fecha */}
      <div className="flex flex-col mb-4">
        <label className="text-lg font-semibold">Fecha del tour</label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          minDate={new Date()}
          className="mt-2 p-2 border rounded w-full"
          placeholderText="Selecciona una fecha"
        />
      </div>

      {/* Número de asistentes */}
      <div className="flex flex-col mb-4">
        <label className="text-lg font-semibold">Participantes</label>
        <InputField
          type="number"
          value={attendees}
          onChange={(e) => setAttendees(e.target.value)}
          placeholder="# de participantes"
          minLength={1}
          required
        />
      </div>

      {/* Precio detallado */}
      <div className="bg-white dark:bg-gray-700 p-4 rounded-md shadow-md">
        <h4 className="text-lg font-semibold mb-2">Precio</h4>
        <p className="text-sm flex justify-between">
          <span>Precio por persona</span> <span>${(calculateTotal() * 0.90).toFixed(2)}</span>
        </p>
        <p className="text-sm flex justify-between">
          <span>Tarifa por servicio (10%)</span> <span>${(calculateTotal() * 0.10).toFixed(2)}</span>
        </p>
        <p className="text-lg font-bold flex justify-between mt-2">
          <span>Total</span> <span>${calculateTotal().toFixed(2)}</span>
        </p>
      </div>

      {/* Botón de reserva */}
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      <div className="mt-4">
        <Button text={loading ? "Reservando..." : "Reservar"} onClick={handleReserve}/>
      </div>
    </div>
  );
};

export default TourBookingForm;
