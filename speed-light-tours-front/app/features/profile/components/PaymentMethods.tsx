import React, { useState } from 'react';
import { CgAdd } from "react-icons/cg";
import '../app.css';
import AddCardModal from './CardModal';

interface Card {
  type: 'credit' | 'debit';
  number: string;
  holderName: string;
  expiryDate: string;
  security: string;
}

interface PaymentMethodsProps {
  cards: Card[];
  onAddCard: (card: Card) => void;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({ cards, onAddCard }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleAddCardClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="payment-methods">
      <h3><strong>Mis medios de pago</strong></h3>
      <div className="payment-card">
        <div className="add-card" onClick={handleAddCardClick}>
          Añadir Tarjeta
          <CgAdd className="icon" />
        </div>
        {cards.map((card, index) => (
          <div key={index} className='card-number'>
            <strong>{card.type === 'credit' ? 'Crédito' : 'Débito'}:</strong> **** **** **** {card.number.slice(-4)}
          </div>
        ))}
      </div>
      <AddCardModal isOpen={isModalOpen} onClose={handleCloseModal} onAddCard={onAddCard} />
    </div>
  );
};

export default PaymentMethods;