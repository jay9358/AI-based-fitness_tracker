import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../Services/api';
import MealForm from './MealForm';
import NutritionLog from './NutritionLog';

const NutritionTracker = () => {
  const queryClient = useQueryClient();
  
  const { data: meals = [], isLoading: mealsLoading, error: mealsError } = useQuery(
    ['nutrition', 'meals'],
    async () => {
      try {
        const response = await api.get('/nutrition/meals');
        return response.data;
      } catch (err) {
        console.error('Error fetching meals:', err);
        throw err;
      }
    }
  );

  const { data: dailyStats = {}, isLoading: statsLoading } = useQuery(
    ['nutrition', 'daily'],
    async () => {
      try {
        const response = await api.get('/nutrition/daily');
        return response.data;
      } catch (err) {
        console.error('Error fetching daily stats:', err);
        throw err;
      }
    }
  );

  const addMealMutation = useMutation(
    async (mealData) => {
      const response = await api.post('/nutrition/meals', mealData);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['nutrition', 'meals']);
        queryClient.invalidateQueries(['nutrition', 'daily']);
      },
      onError: (error) => {
        console.error('Mutation error:', error);
      }
    }
  );

  if (mealsLoading || statsLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (mealsError) {
    return <div className="text-red-500 text-center py-4">Error loading nutrition data</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Nutrition Tracker</h1>
          <p className="text-gray-600">Track your daily nutrition intake</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MealForm onSubmit={(data) => addMealMutation.mutate(data)} />
        <NutritionLog meals={meals} dailyStats={dailyStats} />
      </div>
    </div>
  );
};

export default NutritionTracker;