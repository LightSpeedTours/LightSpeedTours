import React from 'react';
import './personalInfo.css';
import DarthVader from 'app/shared/assets/Darth-Vader.png';
import Button from 'app/features/reservation/components/Button';

const PersonalInfo: React.FC = () => {
  return (
    <div className="profile-details">
      <div className="personal-pic">
        <img src={DarthVader} alt="Profile" className="profile-pic" />
      </div>
        <Button className="button" variant="outline">
          Editar
        </Button>
    </div>      
  );
};

export default PersonalInfo;