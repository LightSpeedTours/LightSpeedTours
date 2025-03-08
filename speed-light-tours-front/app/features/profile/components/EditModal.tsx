import React, { useState } from 'react';
import Button from '../../reservation/components/Button';
import './editModal.css';
import DarthVader from 'app/shared/assets/profile/vader.jpg';
import LukeSkywalker from 'app/shared/assets/profile/luke.jpg';
import LeiaOrgana from 'app/shared/assets/profile/leia.jpg';
import HanSolo from 'app/shared/assets/profile/solo.jpg';
import Yoda from 'app/shared/assets/profile/yoda.jpg';
import Chewbacca from 'app/shared/assets/profile/chewbacca.jpg';
import ObiWanKenobi from 'app/shared/assets/profile/kenobi.jpg';
import R2D2 from 'app/shared/assets/profile/r2.jpg';
import C3PO from 'app/shared/assets/profile/c3po.jpg';
import Emperor from 'app/shared/assets/profile/emperor.jpg';
import DarthMaul from 'app/shared/assets/profile/maul.jpg';
import Padme from 'app/shared/assets/profile/padme.jpg';
import Trooper from 'app/shared/assets/profile/trooper.jpg';
import { updateUserProfile } from '../services/userServices';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  accountDetails: {
    name: string;
    username: string;
    gender: string;
    occupation: string;
    profileImage: string;
  };
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, accountDetails }) => {
  const [selectedImage, setSelectedImage] = useState(accountDetails.profileImage);
  const [updatedDetails, setUpdatedDetails] = useState(accountDetails);
  const [error, setError] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
  
    if (!updatedDetails.name || !updatedDetails.username) {
      setError('El nombre y el nombre de usuario son obligatorios.');
      return;
    }
  
    setError('');
  
    const response = await updateUserProfile(updatedDetails);
    if (response) {
      onClose();
    } else {
      setError('Hubo un problema al actualizar la información.');
    }
  };
  

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Editar Perfil</h2>
        <div className="carousel">
          <img src={DarthVader} alt="Darth Vader" onClick={() => setSelectedImage(DarthVader)} className={selectedImage === DarthVader ? 'selected' : ''} />
          <img src={LukeSkywalker} alt="Luke Skywalker" onClick={() => setSelectedImage(LukeSkywalker)} className={selectedImage === LukeSkywalker ? 'selected' : ''} />
          <img src={LeiaOrgana} alt="Leia Organa" onClick={() => setSelectedImage(LeiaOrgana)} className={selectedImage === LeiaOrgana ? 'selected' : ''} />
          <img src={HanSolo} alt="Han Solo" onClick={() => setSelectedImage(HanSolo)} className={selectedImage === HanSolo ? 'selected' : ''} />
          <img src={Yoda} alt="Yoda" onClick={() => setSelectedImage(Yoda)} className={selectedImage === Yoda ? 'selected' : ''} />
          <img src={Chewbacca} alt="Chewbacca" onClick={() => setSelectedImage(Chewbacca)} className={selectedImage === Chewbacca ? 'selected' : ''} />
          <img src={ObiWanKenobi} alt="Obi Wan Kenobi" onClick={() => setSelectedImage(ObiWanKenobi)} className={selectedImage === ObiWanKenobi ? 'selected' : ''} />
          <img src={R2D2} alt="R2-D2" onClick={() => setSelectedImage(R2D2)} className={selectedImage === R2D2 ? 'selected' : ''} />
          <img src={C3PO} alt="C-3PO" onClick={() => setSelectedImage(C3PO)} className={selectedImage === C3PO ? 'selected' : ''} />
          <img src={Emperor} alt="Emperor" onClick={() => setSelectedImage(Emperor)} className={selectedImage === Emperor ? 'selected' : ''} />
          <img src={DarthMaul} alt="Darth Maul" onClick={() => setSelectedImage(DarthMaul)} className={selectedImage === DarthMaul ? 'selected' : ''} />
          <img src={Padme} alt="Padme" onClick={() => setSelectedImage(Padme)} className={selectedImage === Padme ? 'selected' : ''} />
          <img src={Trooper} alt="Trooper" onClick={() => setSelectedImage(Trooper)} className={selectedImage === Trooper ? 'selected' : ''} />
        </div>
        {error && <p className="error-text">{error}</p>}
        <form className="edit-form">
          <label>
            Nombre:
            <input type="text" name="name" value={updatedDetails.name} onChange={handleInputChange} required />
          </label>
          <label>
            Nombre de usuario:
            <input type="text" name="username" value={updatedDetails.username} onChange={handleInputChange} required />
          </label>
          <label>
            Género:
            <select name="gender" value={updatedDetails.gender} onChange={handleInputChange}>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="otro">Otro</option>
            </select>
          </label>
          <label>
            Ocupación:
            <input type="text" name="occupation" value={updatedDetails.occupation} onChange={handleInputChange} />
          </label>
          <Button className="button" variant="outline" onClick={() => handleSave()}>
            Guardar
          </Button>
          <Button className="button" variant="destructive" onClick={onClose}>
            Cancelar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
