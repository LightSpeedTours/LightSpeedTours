import React from 'react';
import '../app.css';
import brainImage from 'app/shared/assets/brain.jpg';

interface PersonalInfoProps {
  name: string;
  id: string | null;
  dateOfBirth: string;
  gender: string | null;
  occupation: string | null;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ name, id, dateOfBirth, gender, occupation }) => {
  return (
    <div className="personal-info">
      <div className="profile-title">
        <h2>Perfil</h2>
      </div>
      <div className="profile-details">
        <div className="profile-flex">
          <div className="personal-details">
            <img src={brainImage} alt="Profile" className="profile-pic" />
          </div>
          <div className="button">
            <button className="edit-button">Editar</button>
          </div> 
        </div>       
        <div className="details-grid">
          <div><strong>Nombre:</strong> {name}</div>
          <div><strong>Cédula:</strong> {id}</div>
          <div><strong>DateOfBirth:</strong> {dateOfBirth}</div>
          <div><strong>Género:</strong> {gender}</div>
          <div><strong>Ocupación:</strong> {occupation}</div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;