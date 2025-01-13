import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { WorkoutService } from '../../Services/WorkoutService';
import WorkoutForm from './WorkoutForm';
import WorkoutStats from './WorkoutStats';
import NextDayPlan from './NextDayPlan';
const WorkoutTracker = () => {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);

  const { data: workouts, isLoading } = useQuery(['workouts'], WorkoutService.getWorkouts);

  const createWorkoutMutation = useMutation(WorkoutService.createWorkout, {
    onSuccess: () => {
      queryClient.invalidateQueries(['workouts']);
      setShowForm(false);
    }
  });

  const completeWorkoutMutation = useMutation(WorkoutService.completeWorkout, {
    onSuccess: () => {
      queryClient.invalidateQueries(['workouts']);
    }
  });

  const deleteWorkoutMutation = useMutation(WorkoutService.deleteWorkout, {
    onSuccess: () => {
      queryClient.invalidateQueries(['workouts']);
    }
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WorkoutStats />
          <div className="flex justify-between items-center mt-6">
            <h1 className="text-2xl font-bold">Workout Center</h1>
            <button 
              className="btn-primary"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? 'Cancel' : 'Add Workout'}
            </button>
          </div>

      {showForm && (
        <WorkoutForm 
          onSubmit={(data) => createWorkoutMutation.mutate(data)}
          isLoading={createWorkoutMutation.isLoading}
        />
      )}

      <div className="grid gap-4">
        {workouts?.map((workout) => (
          <div key={workout._id} className="card p-4 flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{workout.name}</h3>
              <p className="text-sm text-gray-600">
                {workout.type} • {workout.duration} minutes • {workout.intensity}
              </p>
            </div>
            <div className="flex space-x-2">
              {!workout.completed && (
                <button
                  className="btn-secondary"
                  onClick={() => completeWorkoutMutation.mutate(workout._id)}
                  disabled={completeWorkoutMutation.isLoading}
                >
                  Complete
                </button>
              )}
              <button
                className="btn-danger"
                onClick={() => deleteWorkoutMutation.mutate(workout._id)}
                disabled={deleteWorkoutMutation.isLoading}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="lg:col-span-1">
          <NextDayPlan />
        </div>
      </div>
    </div>
  );
};

export default WorkoutTracker;