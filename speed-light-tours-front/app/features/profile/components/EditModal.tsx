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

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedDetails: AccountDetailsProps) => void;
  accountDetails: AccountDetailsProps;
}

interface AccountDetailsProps {
  name: string;
  username: string;
  email: string;
  password: string;
  date: string;
  gender: string;
  occupation: string;
  profileImage: string;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, onSave, accountDetails }) => {
  const [selectedImage, setSelectedImage] = useState(accountDetails.profileImage);
  const [updatedDetails, setUpdatedDetails] = useState(accountDetails);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedDetails({ ...updatedDetails, [name]: value });
  };

  const handleSave = () => {
    onSave({ ...updatedDetails, profileImage: selectedImage });
    onClose();
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
          {/* Add more images as needed */}
        </div>
        <form className="edit-form">
          <label>
            Nombre:
            <input type="text" name="name" value={updatedDetails.name} onChange={handleInputChange} />
          </label>
          <label>
            Nombre de usuario:
            <input type="text" name="username" value={updatedDetails.username} onChange={handleInputChange} />
          </label>   
          <label>
            Fecha de nacimiento:
            <input type="date" name="date" value={updatedDetails.date} onChange={handleInputChange} />
          </label>
          <label>
            Género:
            <input type="text" name="gender" value={updatedDetails.gender} onChange={handleInputChange} />
          </label>
          <label>
            Ocupación:
            <input type="text" name="occupation" value={updatedDetails.occupation} onChange={handleInputChange} />
          </label>
          <Button className="button" variant="outline" onClick={handleSave}>
            Guardar
          </Button>
          <Button className="button" variant="destructive" onClick={handleSave}>
            Cancelar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditModal;