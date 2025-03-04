import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { WorkoutService } from '../../Services/WorkoutService';
import { toast } from 'react-toastify';

const NextDayPlan = () => {
  const [plan, setPlan] = useState(null);
 
  const queryClient = useQueryClient();
 

  const savePlanMutation = useMutation(WorkoutService.saveNextDayPlan, {
    onSuccess: () => {
      queryClient.invalidateQueries(['workouts']);
      toast.success('Plan added for tomorrow!');
    },
    onError: () => {
      toast.error('Failed to save plan');
    }
  });


  const fetchPlan = async () => {
    try {
      const fetchedPlan = await WorkoutService.getNextDayPlan();
      setPlan(fetchedPlan);
      toast.success('Plan generated successfully!');
    } catch (error) {
      toast.error('Failed to generate plan');
    }
  };



  if (!plan) {
    return (
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Tomorrow's AI Generated Workout Plan
        </h2>
        <button className="btn-primary" onClick={fetchPlan}>
          Generate AI Plan
        </button>
       
      </div>
    );
  }

  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Tomorrow's AI Generated Workout Plan
      </h2>
      
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl">🏋️‍♂️</span>
        <h3 className="font-semibold text-gray-900">Today's Workout Plan</h3>
      </div>
      <div className="space-y-2 text-gray-600">
        <p><span className="font-medium">Muscle Group:</span> {plan.workout.muscleGroup}</p>
        {plan.workout.exercises.map((exercise, index) => (
          <div key={index}>
            <p><span className="font-medium">Exercise:</span> {exercise.name}</p>
            <p><span className="font-medium">Reps:</span> {exercise.reps}</p>
            <p><span className="font-medium">Duration:</span> {exercise.duration} minutes</p>
          </div>
        ))}
        <p><span className="font-medium">Total Duration:</span> {plan.workout.duration} minutes</p>
        <p><span className="font-medium">Intensity:</span> {plan.workout.intensity}</p>
        <p className="text-sm text-gray-500 mt-2">{plan.workout.reasoning}</p>
      </div>

      <button 
        className="btn-primary w-full"
        onClick={() => savePlanMutation.mutate(plan)}
        disabled={savePlanMutation.isLoading}
      >
        {savePlanMutation.isLoading ? 'Saving...' : 'Add to Tomorrow\'s Plan'}
      </button>
      
    </div>
  );
};

export default NextDayPlan;