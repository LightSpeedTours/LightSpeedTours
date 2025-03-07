import React from 'react';
import PersonalInfo from './PersonalInfo';
import AccountDetails from './AccountDetails';
import ChewbaccaImage from 'app/shared/assets/profile/chewbacca.jpg'; // Assuming you have an image file
import './profileSections.css';

const ProfileSections: React.FC = () => {
  const accountDetails = {
    name: 'Juan Pérez',
    username: 'Juanito123',
    email: 'juanito@example.com',
    password: '********',
    date: '01/01/1990',
    gender: 'Masculino',
    occupation: 'Desarrollador de software',
    profileImage: ChewbaccaImage,
  };

  return (
    <div className="profile-sections">
      <div className="profile-title">
        <h2> Mi Perfil</h2>
      </div>
      <div className="profile-info">
        <PersonalInfo accountDetails={accountDetails} />
        <AccountDetails {...accountDetails} />
      </div>
    </div>
  );
};

export default ProfileSections;