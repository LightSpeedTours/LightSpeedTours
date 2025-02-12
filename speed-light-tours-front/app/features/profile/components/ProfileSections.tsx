import React from 'react';
import PersonalInfo from '../components/PersonalInfo';
import AccountDetails from '../components/AccountDetails';
import PaymentMethods from '../components/PaymentMethods';
import Notifications from '../components/Notifications';
import HelpAndLegal from '../components/HelpAndLegal';
import '../app.css';

const ProfileSections: React.FC = () => {
  const personalInfo = {
    name: "Darth Vader",
    id: "123456789",
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

  const paymentMethods = {
    cards: ["**** **** **** 6789"],
    onAddCard: () => alert("Añadir tarjeta")
  };

  const notifications = {
    emailNotifications: true,
    smsNotifications: false,
    onToggleEmail: () => alert("Toggle Email Notifications"),
    onToggleSms: () => alert("Toggle SMS Notifications")
  };

  const helpAndLegal = {
    faqLink: "#",
    contactLink: "#",
    termsLink: "#",
    privacyLink: "#",
    dataAuthLink: "#",
    sicLink: "#"
  };

  return (
    <div className="profile-sections">
      <div className='profile-title'>
        <h2>Perfil</h2>
      </div>
      <div className='profile-info'>
        <PersonalInfo {...personalInfo} />
        <AccountDetails {...accountDetails} />
        <PaymentMethods {...paymentMethods} />
        <Notifications {...notifications} />
        <HelpAndLegal {...helpAndLegal} />
      </div>
    </div>
  );
};

export default ProfileSections;