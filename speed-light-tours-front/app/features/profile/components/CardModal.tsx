import React, { useState } from 'react';
import '../app.css';

interface Card {
  type: 'credit' | 'debit';
  number: string;
  holderName: string;
  expiryDate: string;
  security: string;
}

interface AddCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCard: (card: Card) => void;
}

const AddCardModal: React.FC<AddCardModalProps> = ({ isOpen, onClose, onAddCard }) => {
  const [newCard, setNewCard] = useState<Card>({
    type: 'credit',
    number: '',
    holderName: '',
    expiryDate: '',
    security: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewCard({ ...newCard, [name]: value });
  };

  const handleAddCard = () => {
    onAddCard(newCard);
    setNewCard({ type: 'credit', number: '', holderName: '', expiryDate: '', security: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <form>
          <div>
            <label>Tipo de Tarjeta:</label>
            <select name="type" value={newCard.type} onChange={handleInputChange}>
              <option value="credit">Crédito</option>
              <option value="debit">Débito</option>
            </select>
          </div>
          <div>
            <label>Número de Tarjeta:</label>
            <input type="text" name="number" value={newCard.number} onChange={handleInputChange} />
          </div>
          <div>
            <label>Nombre del Titular:</label>
            <input type="text" name="holderName" value={newCard.holderName} onChange={handleInputChange} />
          </div>
          <div>
            <label>Fecha de Expiración:</label>
            <input type="text" name="expiryDate" value={newCard.expiryDate} onChange={handleInputChange} />
          </div> 
          <div>
            <label>Código de seguridad</label>
            <input type="text" name="security" value={newCard.security} onChange={handleInputChange} />
          </div>

          <button type="button" onClick={handleAddCard}>Añadir</button>
          <button type="button" onClick={onClose}>Cancelar</button>
        </form>
      </div>
    </div>
  );
};

export default AddCardModal;