import React from 'react';
import StatCard from './StatCard';
import RecentActivities from './RecentActivities';
import WorkoutChart from './WorkoutChart';
import AchievementSection from './AchievementSection';
import PersonalizedPlans from './PersonalizedPlans';
import ProgressOverview from './ProgressOverview';

const Dashboard = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back! 👋</h1>
          <p className="text-gray-600 mt-1">Level 5 Fitness Enthusiast</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary">
            View Plan
          </button>
          <button className="btn-primary">
            Start Workout
          </button>
        </div>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Fitness Score" 
          value="750" 
          icon="🏆" 
          trend="+50 points"
          color="bg-yellow-50"
        />
        <StatCard 
          title="Weekly Streak" 
          value="5 days" 
          icon="🔥" 
          trend="Personal Best!"
          color="bg-red-50"
        />
        <StatCard 
          title="Calories Burned" 
          value="12,400" 
          icon="⚡" 
          trend="+800 today"
          color="bg-blue-50"
        />
        <StatCard 
          title="Next Goal" 
          value="2.5 km" 
          icon="🎯" 
          trend="70% complete"
          color="bg-green-50"
        />
      </div>

      {/* Progress & Plans */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProgressOverview />
        <PersonalizedPlans />
      </div>

      {/* Activity & Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivities />
        <AchievementSection />
      </div>
    </div>
  );
};

export default Dashboard;