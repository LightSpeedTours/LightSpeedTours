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
      <h3><strong>Datos de cuenta</strong></h3>
      <div className="account-grid">
          <div>Nombre de usuario: {username}</div>
          <div>Correo: {email}</div>
          <div>Contraseña: {password}</div>
          <div>Teléfono: {phone}</div>
      </div>
    </div>
  );
};

export default AccountDetails;