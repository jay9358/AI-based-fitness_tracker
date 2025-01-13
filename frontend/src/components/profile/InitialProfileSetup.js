import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import api from '../../Services/api';

const InitialProfileSetup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    profile: {
      age: '',
      weight: '',
      height: '',
      gender: '',
      fitnessLevel: 'beginner',
      activityLevel: 'sedentary'
    },
    goals: {
      targetWeight: '',
      weeklyWorkouts: '',
      dailyCalories: ''
    }
  });

  const updateProfileMutation = useMutation(
    async (updatedProfile) => {
      const response = await api.put('/users/profile', {
        ...updatedProfile,
        isProfileComplete: true
      });
      return response.data;
    },
    {
      onSuccess: () => {
        toast.success('Profile setup completed!');
        navigate('/dashboard');
      },
      onError: (error) => {
        console.error('Profile setup error:', error);
        toast.error('Failed to setup profile');
      }
    }
  );

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
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfileMutation.mutateAsync(formData);
    } catch (error) {
      console.error('Profile setup error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome! Let's Set Up Your Profile</h1>
          <p className="mt-2 text-gray-600">
            Help us customize your fitness journey by providing some basic information
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Age</label>
              <input
                type="number"
                name="profile.age"
                value={formData.profile.age}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <select
                name="profile.gender"
                value={formData.profile.gender}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Current Weight (kg)</label>
              <input
                type="number"
                name="profile.weight"
                value={formData.profile.weight}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
              <input
                type="number"
                name="profile.height"
                value={formData.profile.height}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Target Weight (kg)</label>
              <input
                type="number"
                name="goals.targetWeight"
                value={formData.goals.targetWeight}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Weekly Workouts</label>
              <input
                type="number"
                name="goals.weeklyWorkouts"
                value={formData.goals.weeklyWorkouts}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Fitness Level</label>
            <select
              name="profile.fitnessLevel"
              value={formData.profile.fitnessLevel}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={updateProfileMutation.isLoading}
          >
            {updateProfileMutation.isLoading ? 'Setting up...' : 'Complete Profile Setup'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InitialProfileSetup;