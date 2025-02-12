import React from 'react';
import '../app.css';

interface PaymentMethodsProps {
  cards: string[];
  onAddCard: () => void;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({ cards, onAddCard }) => {
  return (
    <div className="payment-methods">
      <h3><strong>Mis medios de pago</strong></h3>
      <div className="payment-card">
        <button className="add-card-button" onClick={onAddCard}>Añadir tarjeta</button>
        {cards.map((card, index) => (
          <div key={index}>{card}</div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethods;