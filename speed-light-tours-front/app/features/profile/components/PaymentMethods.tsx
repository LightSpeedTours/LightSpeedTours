import React, { useState } from 'react';
import { CgAdd } from "react-icons/cg";
import '../app.css';
import AddCardModal from '../components/CardModal';

interface Card {
  type: 'credit' | 'debit';
  number: string;
  holderName: string;
  expiryDate: string;
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
        <div className="add-card">
          Añadir Tarjeta
        <CgAdd className="icon" onClick={handleAddCardClick}/>
        </div>
        {cards.map((card, index) => (
          <div key={index} className='card-number'>
            <strong>{card.type === 'credit' ? 'Crédito' : 'Débito'}:</strong> {card.number}
          </div>
        ))}
      </div>
      <AddCardModal isOpen={isModalOpen} onClose={handleCloseModal} onAddCard={onAddCard} />
    </div>
  );
};

export default PaymentMethods;