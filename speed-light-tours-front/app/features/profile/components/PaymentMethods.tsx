import React from 'react';
import { FaPlus } from 'react-icons/fa';
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
        <p>Añadir tarjeta</p>
        <button className="add-card-button" onClick={onAddCard}>
          <FaPlus />
        </button>
        {cards.map((card, index) => (
          <div key={index}>{card}</div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethods;