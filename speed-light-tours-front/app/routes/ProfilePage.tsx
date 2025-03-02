import React from 'react';
import Header from '../shared/components/OnlyHeader';
import ProfileSections from '../features/profile/components/ProfileSections';

const ProfilePage: React.FC = () => {
  return (
    <div>
      <Header />
      <ProfileSections />
    </div>
  );
};

export default ProfilePage;
