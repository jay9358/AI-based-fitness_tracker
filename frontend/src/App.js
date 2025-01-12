import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import WorkoutTracker from './components/workout/WorkoutTracker';
import NutritionTracker from './components/nutrition/NutritionTracker';
import Profile from './components/profile/Profile';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <Navbar />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/workout" element={<WorkoutTracker />} />
            <Route path="/nutrition" element={<NutritionTracker />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
      </div>
    </Router>
  );
}

export default App;