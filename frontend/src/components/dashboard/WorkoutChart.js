import React from 'react';

const WorkoutChart = () => {
  const weeklyData = [
    { day: 'Mon', workouts: 2, duration: 90 },
    { day: 'Tue', workouts: 1, duration: 45 },
    { day: 'Wed', workouts: 3, duration: 120 },
    { day: 'Thu', workouts: 2, duration: 75 },
    { day: 'Fri', workouts: 1, duration: 60 },
    { day: 'Sat', workouts: 2, duration: 90 },
    { day: 'Sun', workouts: 0, duration: 0 },
  ];

  const maxDuration = Math.max(...weeklyData.map(d => d.duration));

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Weekly Activity</h2>
        <div className="flex space-x-2">
          <span className="text-sm text-gray-500">This Week</span>
        </div>
      </div>
      
      <div className="flex items-end justify-between h-48 mb-4">
        {weeklyData.map((data, index) => (
          <div key={index} className="flex flex-col items-center w-full">
            <div className="relative w-full flex justify-center">
              <div 
                className="w-4/6 bg-indigo-200 rounded-t-lg hover:bg-indigo-300 transition-all cursor-pointer"
                style={{ 
                  height: `${(data.duration / maxDuration) * 100}%`,
                  minHeight: '4px'
                }}
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity bg-gray-800 text-white px-2 py-1 rounded text-xs">
                  {data.duration}min
                </div>
              </div>
            </div>
            <div className="text-xs font-medium text-gray-500 mt-2">{data.day}</div>
            <div className="text-xs text-gray-400">{data.workouts}</div>
          </div>
        ))}
      </div>

      <div className="flex justify-between text-sm text-gray-500 mt-4">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-indigo-200 rounded mr-2"></div>
          <span>Duration (minutes)</span>
        </div>
        <div>Total: 480 min</div>
      </div>
    </div>
  );
};

export default WorkoutChart; 