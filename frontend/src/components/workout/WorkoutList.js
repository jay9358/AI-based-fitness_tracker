import React from 'react';

const WorkoutList = ({ workouts }) => {
  return (
    <div className="bg-white shadow-md rounded p-4 mt-4">
      <h2 className="text-xl font-bold mb-4">Workout History</h2>
      <div className="space-y-4">
        {workouts.map((workout, index) => (
          <div key={index} className="border-b pb-2">
            <p className="font-semibold">{workout.type}</p>
            <p className="text-gray-600">{workout.duration} minutes</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutList;