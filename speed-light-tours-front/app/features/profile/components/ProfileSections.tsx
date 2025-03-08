import React, { useEffect, useState } from 'react';
import PersonalInfo from './PersonalInfo';
import AccountDetails from './AccountDetails';
import './profileSections.css';
import ChewbaccaImage from 'app/shared/assets/profile/chewbacca.jpg';
import { fetchUserProfile } from '../services/userServices';

const ProfileSections: React.FC = () => {
  const [userData, setUserData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) return <p>Cargando perfil...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="profile-sections">
      <div className="profile-title">
        <h2>Mi Perfil</h2>
      </div>
      <div className="profile-info">
        <PersonalInfo accountDetails={userData} />
        <AccountDetails {...userData} />
      </div>
    </div>
  );
};

export default ProfileSections;
