import React from 'react';
import PersonalInfo from '../components/PersonalInfo';
import AccountDetails from '../components/AccountDetails';
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
  };

  return (
    <div className="profile-sections">
      <div className="profile-title">
        <h2> Mi Perfil</h2>
      </div>
      <div className="profile-info">
        <PersonalInfo />
        <AccountDetails {...accountDetails} />
      </div>
    </div>
  );
};

export default ProfileSections;
