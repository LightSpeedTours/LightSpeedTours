import React from 'react';
import '../app.css';

interface NotificationsProps {
  emailNotifications: boolean;
  smsNotifications: boolean;
  onToggleEmail: () => void;
  onToggleSms: () => void;
}

const Notifications: React.FC<NotificationsProps> = ({ emailNotifications, smsNotifications, onToggleEmail, onToggleSms }) => {
  return (
    <div className="notifications">
      <h3>Notificaciones</h3>
      <div>
        <span>Correo electrónico</span>
        <input type="checkbox" checked={emailNotifications} onChange={onToggleEmail} />
      </div>
      <div>
        <span>SMS y Whatsapp</span>
        <input type="checkbox" checked={smsNotifications} onChange={onToggleSms} />
      </div>
    </div>
  );
};

export default Notifications;