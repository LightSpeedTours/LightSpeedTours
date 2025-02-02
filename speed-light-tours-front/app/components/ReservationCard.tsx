import React from "react";
import Card from "./Card";
import Button from "./Button";
import '../app.css';

interface ReservationCardProps {
    service: string;
    price: string;
    description: string;
    location: string;
    dates: string;
    people: string;
    countDown: string;
    timeLimitModify: string;
    timeLimitCancel: string;
    imageSrc: string;
}

const ReservationCard: React.FC<ReservationCardProps> = ({
    service,
    price,
    description,
    location,
    dates,
    people,
    countDown,
    timeLimitModify,
    timeLimitCancel,
    imageSrc,
}) => (
    <Card className="reservation-card">
        <div className="reservation-card-left">
            <div className="service-info">
                <h6 className="service-title">{service}</h6>
                <img src={imageSrc} alt={service} className="service-image" />
            </div>

            <div className="price-description">
                <p className="price">Precio: {price}</p>
                <p className="description">{description}</p>
            </div>
        </div>

        <div className="reservation-info">
            <p>Ubicación: {location}</p>
            <p>Fechas: {dates}</p>
            <p>Cantidad de personas: {people}</p>
        </div>

        <div className="reservation-card-right">
            <p className="countdown">{countDown}</p>
            <Button className="modify-button" variant="outline">
                Modificar reserva
            </Button>
            <Button variant="destructive">Cancelar</Button>
            <br /><p className="time-limit">Válido hasta: <br />{timeLimitModify}</p>
            <p className="time-limit">Válido hasta: <br />{timeLimitCancel}</p>                   
        </div>
    </Card>
);

export default ReservationCard;