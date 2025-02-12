import React from 'react';
import Header from '../features/profile/components/Header';
import ProfileSections from '../features/profile/components/ProfileSections';
import '../features/profile/app.css';

const ProfilePage: React.FC = () => {
  return (
    <div>
      <Header />
      <ProfileSections />
    </div>
  );
};

export default ProfilePage;