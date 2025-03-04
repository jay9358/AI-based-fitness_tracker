import React, { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { WorkoutService } from '../../Services/WorkoutService';
import WorkoutForm from './WorkoutForm';
import WorkoutStats from './WorkoutStats';
import NextDayPlan from './NextDayPlan';
import { toast } from 'react-toastify';

const WorkoutTracker = () => {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [todaysWorkouts, setTodaysWorkouts] = useState([]);
  const [tomorrowsWorkouts, setTomorrowsWorkouts] = useState([]);

  const { data: workouts, isLoading, error } = useQuery(['workouts'], WorkoutService.getWorkouts, {
    onError: (error) => {
      console.error('Error fetching workouts:', error);
    }
  });

  const createWorkoutMutation = useMutation(WorkoutService.createWorkout, {
    onSuccess: () => {
      queryClient.invalidateQueries(['workouts']);
      setShowForm(false);
    },
    onError: (error) => {
      console.error('Error creating workout:', error);
      toast.error('Failed to create workout: ' + error.response.data.message);
    }
  });



  const deleteWorkoutMutation = useMutation(WorkoutService.deleteWorkout, {
    onSuccess: () => {
      queryClient.invalidateQueries(['workouts']);
      toast.success('Workout deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete workout');
    }
  });

  const addAIToTomorrow = (aiPlan) => {
    setTomorrowsWorkouts([...tomorrowsWorkouts, aiPlan]);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading workouts. Please try again later.</div>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WorkoutStats />
          <div className="flex justify-between items-center mt-6">
            <h1 className="text-2xl font-bold">Today's Workout Details</h1>
            <button 
              className="btn-primary"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? 'Cancel' : 'Add Workout'}
            </button>
          </div>

          <div>
            {showForm && (
              <WorkoutForm 
                onSubmit={(data) => createWorkoutMutation.mutate(data)}
                isLoading={createWorkoutMutation.isLoading}
              />
            )}
          </div>

          <div className="grid gap-4">
            {workouts && workouts.length > 0 ? (
              workouts.map((workout) => (
                <div key={workout._id} className="card p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{workout.name}</h3>
                    <p className="text-sm text-gray-600">
                      Muscle Groups: {workout.muscleGroups ? workout.muscleGroups.join(', ') : 'Not specified'}
                    </p>
                    <p className="text-sm text-gray-600">
                      Duration: {workout.duration} minutes • Intensity: {workout.intensity}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                  
                    <button
                      className="btn-danger"
                      onClick={() => deleteWorkoutMutation.mutate(workout._id)}
                      disabled={deleteWorkoutMutation.isLoading}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div>No workouts found.</div>
            )}
          </div>
        </div>
        <div className="lg:col-span-1">
          <NextDayPlan />
          <div className="flex justify-between items-center mt-6">
            <h2 className="text-2xl font-bold">Tomorrow's Workout</h2>
            <button 
              className="btn-primary"
              onClick={() => addAIToTomorrow({ name: "AI Generated Plan", details: "Custom plan details" })}
            >
              Add AI Plan
            </button>
          </div>
          <div className="grid gap-4">
            {tomorrowsWorkouts.map((workout, index) => (
              <div key={index} className="card p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{workout.name}</h3>
                  <p className="text-sm text-gray-600">
                    Details: {workout.details}
                  </p>
                </div>
                <div className="flex space-x-2">
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
      </div>
    </div>
  );
};

export default WorkoutTracker;