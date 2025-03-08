import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirigir al usuario
import PersonalInfo from './PersonalInfo';
import AccountDetails from './AccountDetails';
import './profileSections.css';
import ChewbaccaImage from 'app/shared/assets/profile/chewbacca.jpg';
import { fetchUserProfile } from '../services/userServices';

const ProfileSections: React.FC = () => {
  const [userData, setUserData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Hook para redirección

  useEffect(() => {
    const getUserData = async () => {
      try {
        const profileData = await fetchUserProfile();

        const finalProfileData = {
          ...profileData,
          profileImage: profileData.profileImage || ChewbaccaImage,
        };

        setUserData(finalProfileData);
      } catch (err) {
        setError('Error al cargar el perfil del usuario.');
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, []);

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('token'); // Elimina el token
    navigate('/'); // Redirige al usuario a la página principal
  };

  if (loading) return <p>Cargando perfil...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="profile-sections">
      <div className="profile-header">
        <h2>Mi Perfil</h2>
        <button onClick={handleLogout} className="logout-button">
          Cerrar Sesión
        </button>
      </div>
      <div className="profile-info">
        <PersonalInfo accountDetails={userData} />
        <AccountDetails {...userData} />
      </div>
    </div>
  );
};

export default ProfileSections;
