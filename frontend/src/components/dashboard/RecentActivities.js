import React from 'react';

const RecentActivities = () => {
  const activities = [
    { type: 'Morning Run', duration: '30 minutes', distance: '3.5 miles', time: '8:00 AM', icon: '🏃‍♂️', color: 'bg-blue-50' },
    { type: 'Weight Training', duration: '45 minutes', muscle: 'Upper Body', time: '5:30 PM', icon: '🏋️‍♂️', color: 'bg-purple-50' },
    { type: 'Yoga', duration: '60 minutes', focus: 'Flexibility', time: '7:00 AM', icon: '🧘‍♂️', color: 'bg-green-50' }
  ];

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Recent Activities</h2>
        <button className="btn-secondary text-sm">View All</button>
      </div>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div 
            key={index} 
            className={`flex items-center p-4 ${activity.color} rounded-lg hover:scale-102 transition-all duration-200 cursor-pointer`}
          >
            <span className="text-2xl mr-4">{activity.icon}</span>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">{activity.type}</p>
              <p className="text-sm text-gray-600">
                {activity.duration} • {activity.distance || activity.muscle || activity.focus}
              </p>
            </div>
            <span className="text-sm text-gray-500">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivities; 