import React from 'react';

const PersonalizedPlans = () => {
  const todaysPlans = [
    {
      type: 'Workout',
      title: 'Upper Body Strength',
      time: '10:00 AM',
      duration: '45 min',
      intensity: 'Medium',
      icon: '🏋️‍♂️',
      color: 'bg-blue-50'
    },
    {
      type: 'Nutrition',
      title: 'Protein-Rich Lunch',
      time: '1:00 PM',
      calories: '650 kcal',
      macros: 'P: 40g C: 65g F: 25g',
      icon: '🥗',
      color: 'bg-green-50'
    },
    {
      type: 'Hydration',
      title: 'Water Intake Goal',
      progress: '1.5/3L',
      icon: '💧',
      color: 'bg-cyan-50'
    }
  ];

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Today's Plan</h2>
        <button className="btn-secondary text-sm">Customize</button>
      </div>
      <div className="space-y-4">
        {todaysPlans.map((plan, index) => (
          <div 
            key={index}
            className={`${plan.color} p-4 rounded-lg hover:scale-102 transition-all duration-200`}
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl">{plan.icon}</span>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{plan.type}</p>
                    <h3 className="font-semibold text-gray-900">{plan.title}</h3>
                  </div>
                  {plan.time && (
                    <span className="text-sm text-gray-500">{plan.time}</span>
                  )}
                </div>
                <div className="mt-1 text-sm text-gray-600">
                  {plan.duration && <span>{plan.duration} • </span>}
                  {plan.intensity && <span>{plan.intensity}</span>}
                  {plan.calories && <span>{plan.calories} • </span>}
                  {plan.macros && <span>{plan.macros}</span>}
                  {plan.progress && <span>{plan.progress}</span>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalizedPlans; 