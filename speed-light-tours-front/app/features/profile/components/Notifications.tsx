import React from 'react';
import '../app.css';

interface NotificationsProps {
  emailNotifications: boolean;
  onToggleEmail: () => void;
}

const Notifications: React.FC<NotificationsProps> = ({ emailNotifications, onToggleEmail}) => {
  return (
    <div className="notifications">
      <h3><strong>Notificaciones</strong></h3>
      <div>
        <span>Correo electrónico</span>
        <input type="checkbox" checked={emailNotifications} onChange={onToggleEmail} />
      </div>
    </div>
  );
};

export default Notifications;