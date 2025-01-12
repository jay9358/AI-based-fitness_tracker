import React from 'react';

const StatCard = ({ title, value, icon, trend, color }) => {
  return (
    <div className={`card stat-card ${color} hover:scale-102 transition-all duration-300`}>
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-gray-700 font-medium">{title}</h2>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-sm 
            ${trend.startsWith('+') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            <span className="mr-1">{trend.startsWith('+') ? '↑' : '↓'}</span>
            {trend}
          </div>
        </div>
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-white/60 to-white/20 
          flex items-center justify-center shadow-sm">
          <span className="text-2xl transform hover:scale-110 transition-transform">{icon}</span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;