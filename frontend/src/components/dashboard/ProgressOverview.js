import React from 'react';

const ProgressOverview = () => {
  const goals = [
    {
      title: "Weekly Distance",
      current: 8.5,
      target: 10,
      unit: "km",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Weight Goal",
      current: 75,
      target: 70,
      unit: "kg",
      color: "from-green-500 to-green-600"
    },
    {
      title: "Monthly Workouts",
      current: 12,
      target: 20,
      unit: "sessions",
      color: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Progress Overview</h2>
        <button className="btn-secondary text-sm">Set Goals</button>
      </div>
      <div className="space-y-6">
        {goals.map((goal, index) => (
          <div key={index}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">{goal.title}</span>
              <span className="text-sm text-gray-600">
                {goal.current}/{goal.target} {goal.unit}
              </span>
            </div>
            <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`absolute top-0 left-0 h-full bg-gradient-to-r ${goal.color} rounded-full transition-all duration-500`}
                style={{ width: `${(goal.current / goal.target) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressOverview; 