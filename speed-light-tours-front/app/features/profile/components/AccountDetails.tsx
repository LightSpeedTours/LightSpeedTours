import React from 'react';
import './accountDetails.css';
import type { AccountDetailsProps } from '../utils/types';

const AccountDetails: React.FC<AccountDetailsProps> = ({
  name,
  username,
  email,
  password,
  date,
  gender,
  occupation,
}) => {
  return (
    <div className="account-details">
      <h3>
        <strong>Datos de cuenta</strong>
      </h3>
      <div className="account-grid">
        <div className="account-title">Nombre: {name}</div>
        <div className="account-title">Nombre de usuario: {username}</div>
        <div className="account-title">Correo: {email}</div>
        <div className="account-title">Contraseña: {password}</div>
        <div className="account-title">Fecha de nacimiento: {date}</div>
        <div className="account-title">Género: {gender}</div>
        <div className="account-title">Ocupación: {occupation}</div>
      </div>
    </div>
  );
};

export default AccountDetails;