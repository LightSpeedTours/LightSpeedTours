import React from 'react';
import '../app.css';

interface AccountDetailsProps {
  username: string;
  email: string;
  password: string;
  phone: string | null;
}

const AccountDetails: React.FC<AccountDetailsProps> = ({ username, email, password, phone }) => {
  return (
    <div className="account-details">
      <h3>Datos de cuenta</h3>
      <div className="details-grid">
        <div><strong>Nombre de usuario:</strong> {username}</div>
        <div><strong>Correo:</strong> {email}</div>
        <div><strong>Contraseña:</strong> {password}</div>
        <div><strong>Teléfono:</strong> {phone}</div>
      </div>
    </div>
  );
};

export default AccountDetails;