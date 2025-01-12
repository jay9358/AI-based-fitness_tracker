import React from 'react';

const AchievementSection = () => {
  const achievements = [
    { 
      title: "Early Bird",
      description: "Complete 5 morning workouts",
      progress: 80,
      icon: "🌅",
      points: 100
    },
    { 
      title: "Strength Master",
      description: "Lift 1000kg total in a week",
      progress: 65,
      icon: "💪",
      points: 200
    },
    { 
      title: "Consistency King",
      description: "7-day workout streak",
      progress: 40,
      icon: "👑",
      points: 300
    }
  ];

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Achievements</h2>
        <span className="text-sm text-indigo-600 font-medium">View All</span>
      </div>
      <div className="space-y-4">
        {achievements.map((achievement, index) => (
          <div key={index} className="relative">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 flex items-center justify-center bg-white rounded-lg shadow-sm text-2xl">
                {achievement.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                <p className="text-sm text-gray-600">{achievement.description}</p>
                <div className="mt-2 relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                        {achievement.progress}%
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-indigo-600">
                        {achievement.points} pts
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
                    <div 
                      style={{ width: `${achievement.progress}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementSection;