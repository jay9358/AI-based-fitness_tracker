import api from './api';

export const WorkoutService = {
  getWorkouts: async () => {
    const response = await api.get('/workouts');
    return response.data;
  },

  createWorkout: async (workoutData) => {
    const response = await api.post('/workouts', workoutData);
    return response.data;
  },

  updateWorkout: async (id, workoutData) => {
    const response = await api.put(`/workouts/${id}`, workoutData);
    return response.data;
  },

  deleteWorkout: async (id) => {
    const response = await api.delete(`/workouts/${id}`);
    return response.data;
  },

  completeWorkout: async (id) => {
    const response = await api.post(`/workouts/${id}/complete`);
    return response.data;
  },
  
  // Add new method for next day plan
  getNextDayPlan: async () => {
    const response = await api.get('/ai-plan/next-day');
    return response.data;
  },

  // Add method to save next day plan
  saveNextDayPlan: async (planData) => {
    const response = await api.post('/ai-plan/save', planData);
    return response.data;
  },

  getWeightGoalPlan: async (weight) => {
    const response = await api.post('/ai-plan/weight-goal', { weight });
    return response.data;
  }
};