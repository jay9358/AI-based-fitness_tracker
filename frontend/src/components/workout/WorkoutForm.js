import React, { useState } from 'react';

const WorkoutForm = ({ onSubmit, isLoading }) => {
  const [workout, setWorkout] = useState({
    name: '',
    type: 'cardio',
    duration: '',
    intensity: 'medium',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(workout);
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Workout Name</label>
          <input
            type="text"
            value={workout.name}
            onChange={(e) => setWorkout({...workout, name: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select
            value={workout.type}
            onChange={(e) => setWorkout({...workout, type: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="cardio">Cardio</option>
            <option value="strength">Strength</option>
            <option value="flexibility">Flexibility</option>
            <option value="hiit">HIIT</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
          <input
            type="number"
            value={workout.duration}
            onChange={(e) => setWorkout({...workout, duration: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Intensity</label>
          <select
            value={workout.intensity}
            onChange={(e) => setWorkout({...workout, intensity: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Notes</label>
          <textarea
            value={workout.notes}
            onChange={(e) => setWorkout({...workout, notes: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows="3"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full btn-primary"
        >
          {isLoading ? 'Adding...' : 'Add Workout'}
        </button>
      </form>
    </div>
  );
};

export default WorkoutForm;