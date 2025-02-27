import React from 'react';
import PersonalInfo from '../components/PersonalInfo';
import AccountDetails from '../components/AccountDetails';
import Notifications from '../components/Notifications';
import '../app.css';

const ProfileSections: React.FC = () => {
  const personalInfo = {
    name: "Darth Vader",
    dateOfBirth: "1990-01-01",
    gender: "Masculino",
    occupation: "Lord Sith and Galactic Executor Commander"
  };

  const accountDetails = {
    username: "Juanito123",
    email: "juanito@example.com",
    password: "********",
    phone: "123456789"
  };

  const notifications = {
    emailNotifications: true,
    smsNotifications: false,
    onToggleEmail: () => alert("Toggle Email Notifications"),
  };

  return (
    <div className="profile-sections">
      <div className='profile-title'>
        <h2> Mi Perfil</h2>
      </div>
      <div className='profile-info'>
        <PersonalInfo {...personalInfo} />
        <AccountDetails {...accountDetails} />
        <Notifications {...notifications} />
      </div>
    </div>
  );
};

export default ProfileSections;