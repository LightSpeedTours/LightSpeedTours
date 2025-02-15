import type { TourInfoProps } from './types';
  
  const TourInfo: React.FC<TourInfoProps> = ({ location, duration, contact }) => {
    return (
      <div className="tour-info">
        <p><strong>Localidad:</strong> {location}</p>
        <p><strong>Duración:</strong> {duration} horas</p>
        <p><strong>Contacto:</strong> {contact}</p>
      </div>
    );
  };
  
  export default TourInfo;