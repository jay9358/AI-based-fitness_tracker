import React, { useState } from 'react';
import Select from 'react-select';

const muscleGroupOptions = [
  { value: 'back', label: 'Back' },
  { value: 'biceps', label: 'Biceps' },
  { value: 'triceps', label: 'Triceps' },
  { value: 'chest', label: 'Chest' },
  { value: 'shoulders', label: 'Shoulders' },
  { value: 'legs', label: 'Legs' }
];

const WorkoutForm = ({ onSubmit, isLoading }) => {
  const [workout, setWorkout] = useState({
    name: '',
    muscleGroups: [],
    duration: '',
    intensity: 'medium',
    notes: '',
    type: ''
  });

  const handleMuscleGroupChange = (selectedOptions) => {
    setWorkout({...workout, muscleGroups: selectedOptions.map(option => option.value)});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(workout);
  };

  return (
    <div className="card p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Workout Name</label>
          <input
            type="text"
            value={workout.name}
            onChange={(e) => setWorkout({...workout, name: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter workout name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Muscle Groups</label>
          <Select
            isMulti
            options={muscleGroupOptions}
            onChange={handleMuscleGroupChange}
            className="mt-1"
            placeholder="Select muscle groups"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
          <input
            type="number"
            value={workout.duration}
            onChange={(e) => setWorkout({...workout, duration: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            min="1"
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
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <input
            type="text"
            value={workout.type}
            onChange={(e) => setWorkout({...workout, type: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter workout type"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Notes</label>
          <textarea
            value={workout.notes}
            onChange={(e) => setWorkout({...workout, notes: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows="3"
            placeholder="Add any additional notes"
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