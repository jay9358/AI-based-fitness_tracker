import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import WorkoutForm from './WorkoutForm';
import WorkoutList from './WorkoutList';
import WorkoutChart from '../dashboard/WorkoutChart';

const WorkoutTracker = () => {
  const [workouts, setWorkouts] = useState([]);
  const [activeTab, setActiveTab] = useState('tracker'); // ['tracker', 'plans']

  const addWorkout = (workout) => {
    setWorkouts([...workouts, { 
      ...workout, 
      date: new Date(),
      id: Date.now()
    }]);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Workout Center</h1>
          <p className="text-gray-600 mt-1">Track your progress and manage your workout plans</p>
        </div>
        <Link to="/workout-plans/new" className="btn-primary">
          Create New Plan
        </Link>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('tracker')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'tracker'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Workout Tracker
          </button>
          <button
            onClick={() => setActiveTab('plans')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'plans'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            My Plans
          </button>
        </nav>
      </div>

      {/* Content Area */}
      {activeTab === 'tracker' ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <WorkoutForm onSubmit={addWorkout} />
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Activity Overview</h2>
              <WorkoutChart />
            </div>
          </div>
          <WorkoutList workouts={workouts} />
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Active Plan Card */}
          <div className="card bg-gradient-to-br from-indigo-50 to-blue-50 border-2 border-indigo-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Current Plan</h3>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                Active
              </span>
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">Strength Builder</h4>
            <p className="text-gray-600 mb-4">Week 3 of 8</p>
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span>35%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-full bg-indigo-500 rounded-full"
                  style={{ width: '35%' }}
                />
              </div>
            </div>
            <button className="btn-primary w-full">Continue Workout</button>
          </div>

          {/* Quick Start Card */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Start</h3>
            <div className="space-y-3">
              <button className="w-full p-3 text-left rounded-lg hover:bg-gray-50 transition-colors">
                🏃‍♂️ Start Cardio Session
              </button>
              <button className="w-full p-3 text-left rounded-lg hover:bg-gray-50 transition-colors">
                💪 Start Strength Training
              </button>
              <button className="w-full p-3 text-left rounded-lg hover:bg-gray-50 transition-colors">
                🧘‍♂️ Start Flexibility Workout
              </button>
            </div>
          </div>

          {/* Stats Card */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Stats</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Total Workouts</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Minutes</p>
                <p className="text-2xl font-bold text-gray-900">420</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Calories Burned</p>
                <p className="text-2xl font-bold text-gray-900">2,800</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutTracker;