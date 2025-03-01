import Header from "../shared/components/Header";
import HotelReservation from "~/features/hotel_reservation/components/HotelReservation";
import mainImage from "../shared/assets/imagenp.jpeg";
import image1 from "../shared/assets/imagen1.jpeg";
import image2 from "../shared/assets/imagen2.jpeg";
import image3 from "../shared/assets/imagen3.jpeg";

const HotelReservationPage = () => {
  const hotelName = "Hotel en la Montaña";
  const images = [
    mainImage,
    image1,
    image2,
    image3,
  ];
  const location = "Montaña XYZ";
  const capacity = 100;
  const contact = "contacto@ejemplo.com";
  const services = [
    "Wi-Fi gratuito",
    "Desayuno incluido",
    "Piscina",
    "Gimnasio"
  ];
  const pricePerPerson = 150;
  const onReserve = (guests: number, checkInDate: Date, checkOutDate: Date) => {
    alert(`Reserva realizada para ${guests} personas desde ${checkInDate.toLocaleDateString()} hasta ${checkOutDate.toLocaleDateString()}.`);
  };
  const checkAvailability = (checkInDate: Date, checkOutDate: Date) => {
    // Lógica para verificar la disponibilidad de las fechas
    // Retorna true si las fechas están disponibles, de lo contrario false
    return true; // Ejemplo: siempre disponible
  };
  const description = "Este es un hotel increíble en la montaña XYZ.";
  const reviews = [
    { user: "Juan", rating: 5, comment: "¡Excelente hotel!" },
    { user: "María", rating: 4, comment: "Muy bueno, pero podría mejorar." }
  ];

  return (
    <main>
      <Header />
      <HotelReservation
        hotelName={hotelName}
        images={images}
        location={location}
        capacity={capacity}
        contact={contact}
        services={services}
        pricePerPerson={pricePerPerson}
        onReserve={onReserve}
        checkAvailability={checkAvailability}
        description={description}
        reviews={reviews}
      />
    </main>
  );
};

export default HotelReservationPage;