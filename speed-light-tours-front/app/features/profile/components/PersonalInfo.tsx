import React from 'react';
import '../app.css';
import DarthVader from 'app/shared/assets/Darth-Vader.png';
import Button from 'app/features/reservation/components/Button';

interface PersonalInfoProps {
  name: string;
  dateOfBirth: string;
  gender: string | null;
  occupation: string | null;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ name, dateOfBirth, gender, occupation }) => {
  return (
    <div className="profile-details">
      <div className="profile-grid">
        <div className="personal-details">
          <img src={DarthVader} alt="Profile" className="profile-pic" />
        </div>
        <div className="button">
          <Button className="edit-button" variant="outline">
            Editar
          </Button>
        </div> 
      </div>       
      <div className="details-grid">
        <div><strong>Nombre:</strong> {name}</div>
        <div><strong>DateOfBirth:</strong> {dateOfBirth}</div>
        <div><strong>Género:</strong> {gender}</div>
        <div><strong>Ocupación:</strong> {occupation}</div>
      </div>
    </div>
  );
};

export default PersonalInfo;