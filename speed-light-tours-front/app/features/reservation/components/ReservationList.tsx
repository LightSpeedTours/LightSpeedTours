import React from "react";
import ReservationCard from "./ReservationCard";
import "../app.css";
import sunImage from "app/shared/assets/sun.jpg";
import worldImage from "app/shared/assets/world.jpg";
import brainImage from "app/shared/assets/brain.jpg";

const ReservationList: React.FC = () => (
  <div className="reservation-list">
    <h1 className="reservation-list-title">Mis Reservas</h1>
    <ReservationCard
      service="Servicio 1"
      price="$100"
      description="Descripción del servicio 1"
      location="Ubicación 1"
      dates="01/01/2025 - 02/01/2025"
      people="2"
      countDown="3 días"
      timeLimitModify="1 semana antes"
      timeLimitCancel="3 días antes"
      imageSrc={sunImage}
    />
    <ReservationCard
      service="Servicio 2"
      price="$200"
      description="Descripción del servicio 2"
      location="Ubicación 2"
      dates="03/01/2025 - 04/01/2025"
      people="4"
      countDown="3 días"
      timeLimitModify="1 semana antes"
      timeLimitCancel="3 días antes"
      imageSrc={worldImage}
    />
    <ReservationCard
      service="Servicio 3"
      price="$300"
      description="Descripción del servicio 3"
      location="Ubicación 3"
      dates="05/01/2025 - 06/01/2025"
      people="6"
      countDown="3 días"
      timeLimitModify="1 semana antes"
      timeLimitCancel="3 días antes"
      imageSrc={brainImage}
    />
  </div>
);

export default ReservationList;
