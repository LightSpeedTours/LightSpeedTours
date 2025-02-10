interface TourInfoProps {
    name: string;
    location: string;
    duration: number;
    contact: string;
  }
  
  const TourInfo: React.FC<TourInfoProps> = ({ name, location, duration, contact }) => {
    return (
      <div className="tour-info">
        <h1>{name}</h1>
        <p><strong>Localidad:</strong> {location}</p>
        <p><strong>Duración:</strong> {duration} horas</p>
        <p><strong>Contacto:</strong> {contact}</p>
      </div>
    );
  };
  
  export default TourInfo;