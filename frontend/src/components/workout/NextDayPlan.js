import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { WorkoutService } from '../../Services/WorkoutService';
import { toast } from 'react-toastify';

const NextDayPlan = () => {
  const [showWeightGoal, setShowWeightGoal] = useState(false);
  const [targetWeight, setTargetWeight] = useState('');
  const [weightPlan, setWeightPlan] = useState(null);
  const queryClient = useQueryClient();
  const weightGoalMutation = useMutation(
    async (weight) => {
      const response = await WorkoutService.getWeightGoalPlan(weight);
      return response;
    },
    {
      onSuccess: (data) => {
        setWeightPlan(data);
        setShowWeightGoal(true);
      },
      onError: () => {
        toast.error('Failed to generate weight goal plan');
      }
    }
  );
  const weightGoalSection = (
    <div className="mt-6">
      <div className="flex gap-4 items-center mb-4">
        <input
          type="number"
          value={targetWeight}
          onChange={(e) => setTargetWeight(e.target.value)}
          placeholder="Target weight (kg)"
          className="input-primary w-40"
        />
        <button
          className="btn-secondary"
          onClick={() => weightGoalMutation.mutate(targetWeight)}
          disabled={!targetWeight || weightGoalMutation.isLoading}
        >
          Get Plan
        </button>
      </div>

      {weightPlan && (
        <div className="bg-purple-50 p-4 rounded-lg mt-4">
          <h3 className="font-semibold text-gray-900 mb-2">Weight Goal Plan</h3>
          <div className="space-y-2 text-gray-600">
            <p><span className="font-medium">Recommended Exercises:</span> {weightPlan.exercises.join(', ')}</p>
            <p><span className="font-medium">Schedule:</span> {weightPlan.schedule}</p>
            <p><span className="font-medium">Intensity:</span> {weightPlan.intensity}</p>
            <p><span className="font-medium">Timeline:</span> {weightPlan.timeline}</p>
            <p><span className="font-medium">Important Notes:</span> {weightPlan.considerations}</p>
          </div>
        </div>
      )}
    </div>
  );
  const savePlanMutation = useMutation(WorkoutService.saveNextDayPlan, {
    onSuccess: () => {
      queryClient.invalidateQueries(['workouts']);
      toast.success('Plan added for tomorrow!');
    },
    onError: () => {
      toast.error('Failed to save plan');
    }
  });

  const { data: plan, isLoading } = useQuery(
    ['nextDayPlan'],
    WorkoutService.getNextDayPlan,
    {
      refetchInterval: false,
      staleTime: 5 * 60 * 1000 // 5 minutes
    }
  );

  if (isLoading) {
    return (
      <div className="card p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Tomorrow's AI Generated Workout Plan
      </h2>
      
      {plan && (
        <div className="space-y-6">
          <div className="bg-indigo-50 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🏋️‍♂️</span>
              <h3 className="font-semibold text-gray-900">Recommended Workout</h3>
            </div>
            <div className="space-y-2 text-gray-600">
              <p><span className="font-medium">Type:</span> {plan.workout.type}</p>
              <p><span className="font-medium">Duration:</span> {plan.workout.duration} minutes</p>
              <p><span className="font-medium">Intensity:</span> {plan.workout.intensity}</p>
              <p className="text-sm text-gray-500 mt-2">{plan.workout.reasoning}</p>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🥗</span>
              <h3 className="font-semibold text-gray-900">Nutrition Recommendations</h3>
            </div>
            <div className="space-y-2 text-gray-600">
              <p><span className="font-medium">Calories:</span> {plan.nutrition.calories} kcal</p>
              <div>
                <p className="font-medium mb-1">Macros:</p>
                <ul className="list-disc pl-5">
                  <li>Protein: {plan.nutrition.macros.protein}g</li>
                  <li>Carbs: {plan.nutrition.macros.carbs}g</li>
                  <li>Fats: {plan.nutrition.macros.fats}g</li>
                </ul>
              </div>
              <p className="text-sm text-gray-500 mt-2">{plan.nutrition.recommendations}</p>
            </div>
          </div>

          <button 
            className="btn-primary w-full"
            onClick={() => savePlanMutation.mutate(plan)}
            disabled={savePlanMutation.isLoading}
          >
            {savePlanMutation.isLoading ? 'Saving...' : 'Add to Tomorrow\'s Plan'}
          </button>
        </div>
      )}
      {weightGoalSection}
    </div>
  );
};

export default NextDayPlan;