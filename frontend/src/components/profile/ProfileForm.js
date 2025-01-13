import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../Services/api';
import { toast } from 'react-toastify';
const ProfileForm = ({ initialProfile, onComplete, isInitialSetup = false }) => {
  const [formData, setFormData] = useState({
    name: initialProfile?.name || '',
    email: initialProfile?.email || '',
    profile: {
      age: initialProfile?.profile?.age || '',
      weight: initialProfile?.profile?.weight || '',
      height: initialProfile?.profile?.height || '',
      gender: initialProfile?.profile?.gender || '',
      fitnessLevel: initialProfile?.profile?.fitnessLevel || 'beginner'
    },
    goals: {
      targetWeight: initialProfile?.goals?.targetWeight || '',
      weeklyWorkouts: initialProfile?.goals?.weeklyWorkouts || '',
      dailyCalories: initialProfile?.goals?.dailyCalories || ''
    }
  });

  const queryClient = useQueryClient();

  const updateProfileMutation = useMutation(
    async (updatedProfile) => {
      const response = await api.put('/users/profile', {
        ...updatedProfile,
        isProfileComplete: isInitialSetup ? true : undefined
      });
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['profile']);
        if (isInitialSetup && onComplete) {
          onComplete();
        }
      },
      onError: (error) => {
        console.error('Profile update error:', error);
        toast.error('Failed to update profile');
      }
    }
  );

  // Rest of the component remains same

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfileMutation.mutateAsync(formData);
    } catch (error) {
      console.error('Profile update error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card space-y-6">
      <h2 className="text-xl font-semibold">Profile Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 input-field"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Age</label>
          <input
            type="number"
            name="profile.age"
            value={formData.profile.age}
            onChange={handleChange}
            className="mt-1 input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
          <input
            type="number"
            name="profile.weight"
            value={formData.profile.weight}
            onChange={handleChange}
            className="mt-1 input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
          <input
            type="number"
            name="profile.height"
            value={formData.profile.height}
            onChange={handleChange}
            className="mt-1 input-field"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Target Weight (kg)</label>
          <input
            type="number"
            name="goals.targetWeight"
            value={formData.goals.targetWeight}
            onChange={handleChange}
            className="mt-1 input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Weekly Workouts</label>
          <input
            type="number"
            name="goals.weeklyWorkouts"
            value={formData.goals.weeklyWorkouts}
            onChange={handleChange}
            className="mt-1 input-field"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full btn-primary"
        disabled={updateProfileMutation.isLoading}
      >
        {updateProfileMutation.isLoading ? 'Updating...' : 'Update Profile'}
      </button>
    </form>
  );
};

export default ProfileForm; 