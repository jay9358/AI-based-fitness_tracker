import React from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../../Services/api';
import ProfileForm from './ProfileForm';

const Profile = () => {
  const { data: profile, isLoading, error } = useQuery(['profile'], async () => {
    const response = await api.get('/users/profile'); // Remove /api prefix as it's in baseURL
    return response.data;
  }, {
    retry: 1,
    onError: (error) => {
      console.error('Profile fetch error:', error);
    }
  });

  if (isLoading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  );

  if (error) return (
    <div className="text-center text-red-600 p-4">
      Error loading profile: {error.message}
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="card">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">👤</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
            <p className="text-gray-600">
              Level {profile.profile?.fitnessLevel || 'Beginner'} • Member since {new Date(profile.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <ProfileForm initialProfile={profile} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Daily Calories</h3>
          <p className="text-3xl font-bold text-indigo-600">{profile.stats?.dailyCalories || 0}</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Daily Protein</h3>
          <p className="text-3xl font-bold text-indigo-600">{profile.stats?.dailyProtein || 0}g</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Water Intake</h3>
          <p className="text-3xl font-bold text-indigo-600">{profile.stats?.dailyWaterIntake || 0}ml</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;