import React from 'react';
import '../app.css';

interface AccountDetailsProps {
  username: string;
  email: string;
  password: string;
}

const AccountDetails: React.FC<AccountDetailsProps> = ({ username, email, password}) => {
  return (
    <div className="account-details">
      <h3><strong>Datos de cuenta</strong></h3>
      <div className="account-grid">
        <div className="account-title">Nombre de usuario:</div>
        <div className="account-info">{username}</div>
        <div className="account-title">Correo:</div>
        <div className="account-info">{email}</div>
        <div className="account-title">Contraseña:</div>
        <div className="account-info">{password}</div>
      </div>
    </div>
  );
};

export default AccountDetails;