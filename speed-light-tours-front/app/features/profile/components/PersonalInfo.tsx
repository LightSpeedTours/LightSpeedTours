import React, { useState } from 'react';
import './personalInfo.css';
import 'app/features/reservation/components/button.css';
import Button from 'app/features/reservation/components/Button';
import EditModal from './EditModal';

import type { AccountDetailsProps } from '../utils/types';

interface PersonalInfoProps {
  accountDetails: AccountDetailsProps;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ accountDetails }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(accountDetails.profileImage);

  const handleEditClick = () => {
    setModalOpen(true);
  };

  const handleSave = (updatedDetails: AccountDetailsProps) => {
    setProfileImage(updatedDetails.profileImage);
  };

  return (
    <div className="profile-details">
      <div className="personal-pic">
        <img src={profileImage} alt="Profile" className="profile-pic" />
      </div>
      <Button className="button" variant="outline" onClick={handleEditClick}>
        Editar
      </Button>
      <EditModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        accountDetails={accountDetails}
      />
    </div>
  );
};

export default PersonalInfo;