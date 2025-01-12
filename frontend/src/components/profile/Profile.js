import React, { useState } from 'react';
import ProfileForm from './ProfileForm';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    age: '',
    height: '',
    weight: '',
    goals: '',
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
      <div className="max-w-2xl mx-auto">
        <ProfileForm profile={profile} setProfile={setProfile} />
      </div>
    </div>
  );
};

export default Profile; 