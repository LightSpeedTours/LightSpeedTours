import React, { useState } from 'react';
import PersonalInfo from '../components/PersonalInfo';
import AccountDetails from '../components/AccountDetails';
import PaymentMethods from '../components/PaymentMethods';
import Notifications from '../components/Notifications';
import HelpAndLegal from '../components/HelpAndLegal';
import '../app.css';

interface Card {
  type: 'credit' | 'debit';
  number: string;
  holderName: string;
  expiryDate: string;
  security: string;
}

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

  const [cards, setCards] = useState<Card[]>([]);

  const handleAddCard = (card: Card) => {
    setCards([...cards, card]);
  };

  const paymentMethods = {
    cards,
    onAddCard: handleAddCard
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
        <h2> Mi Perfil</h2>
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