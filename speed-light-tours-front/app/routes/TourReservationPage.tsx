import Header from "../shared/components/Header"
import TourReservation from "~/features/tour_reservation/components/tourReservation";
import mainImage from "../shared/assets/imagenp.jpeg";
import image1 from "../shared/assets/imagen1.jpeg";
import image2 from "../shared/assets/imagen2.jpeg";
import image3 from "../shared/assets/imagen3.jpeg";

const TourReservationPage = () => {
  const tourName = "Tour a la Montaña";
  const images = [
    mainImage,
    image1,
    image2,
    image3,
  ];
    const location = "Montaña XYZ";
    const duration = 5;
    const contact = "contacto@ejemplo.com";
    const services = [
      "Guía turístico",
      "Transporte incluido",
      "Comida y bebida",
      "Seguro de viaje"
    ];
    const recommendations = [
      "Llevar ropa cómoda",
      "No olvidar protector solar",
      "Llevar agua suficiente"
    ];
    const pricePerPerson = 100;
    const onReserve = (guests: number) => {
      alert(`Reserva realizada para ${guests} personas.`);
    };
    const description = "Este es un tour increíble a la montaña XYZ.";
    const reviews = [
      { user: "Juan", rating: 5, comment: "¡Excelente tour!" },
      { user: "María", rating: 4, comment: "Muy bueno, pero podría mejorar." }
    ];
  
    return (
      <main className="min-h-screen bg-white">
        <Header /> 
        <TourReservation
          tourName={tourName} 
          images={images} 
          location={location} 
          duration={duration} 
          contact={contact} 
          services={services} 
          recommendations={recommendations} 
          pricePerPerson={pricePerPerson} 
          onReserve={onReserve} 
          description={description} 
          reviews={reviews} 
        />
      </main>
    );
  };
  
  export default TourReservationPage;