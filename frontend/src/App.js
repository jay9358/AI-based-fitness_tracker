import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import WorkoutTracker from './components/workout/WorkoutTracker';
import NutritionTracker from './components/nutrition/NutritionTracker';
import Profile from './components/profile/Profile';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import InitialProfileSetup from './components/profile/InitialProfileSetup';

const PrivateRoute = ({ children }) => {

  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return !token ? children : <Navigate to="/dashboard" />;
};

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
          <Navbar />
          <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
              <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
              <Route 
              path="/initial-setup" 
              element={
                <PrivateRoute>
                  <InitialProfileSetup />
                </PrivateRoute>
              } 
        />
              <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/workout" element={<PrivateRoute><WorkoutTracker /></PrivateRoute>} />
              <Route path="/nutrition" element={<PrivateRoute><NutritionTracker /></PrivateRoute>} />
              
              <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            </Routes>
          </main>
          <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;