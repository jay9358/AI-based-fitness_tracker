import React, { useState } from 'react';

const WorkoutForm = ({ onSubmit }) => {
  const [workout, setWorkout] = useState({
    type: '',
    duration: '',
    intensity: 'medium'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(workout);
    setWorkout({ type: '', duration: '', intensity: 'medium' });
  };

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Add New Workout</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">Workout Type</label>
          <input
            type="text"
            value={workout.type}
            onChange={(e) => setWorkout({...workout, type: e.target.value})}
            className="input-field"
            placeholder="e.g., Running, Yoga, Weight Training"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Duration (minutes)</label>
          <input
            type="number"
            value={workout.duration}
            onChange={(e) => setWorkout({...workout, duration: e.target.value})}
            className="input-field"
            min="1"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Intensity</label>
          <select
            value={workout.intensity}
            onChange={(e) => setWorkout({...workout, intensity: e.target.value})}
            className="input-field"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <button type="submit" className="btn-primary w-full">
          Add Workout
        </button>
      </form>
    </div>
  );
};

export default WorkoutForm; 