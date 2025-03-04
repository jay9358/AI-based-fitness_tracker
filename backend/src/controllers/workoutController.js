import Workout from '../models/Workout.js';
import User from '../models/User.js';
import { generateNextDayPlan } from '../services/aiService.js';


import Nutrition from '../models/Nutrition.js';

export const createWorkout = async (req, res) => {
  try {
    const workout = new Workout({
      ...req.body,
      user: req.user.id
    });
    await workout.save();

    // Update user stats
    await User.findByIdAndUpdate(req.user.id, {
      $inc: { 
        'stats.totalWorkouts': 1,
        'stats.totalMinutes': workout.duration
      }
    });

    res.status(201).json(workout);
  } catch (error) {
    console.error("Error creating workout:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user.id })
      .sort({ createdAt: -1 });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getWorkoutById = async (req, res) => {
  try {
    const workout = await Workout.findOne({
      _id: req.params.id,
      user: req.user.id
    });
    
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    
    res.json(workout);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateWorkout = async (req, res) => {
  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.json(workout);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });
    
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    
    res.json({ message: 'Workout deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const completeWorkout = async (req, res) => {
  try {
    const workout = await Workout.findOne({
      _id: req.params.id,
      user: req.user.id
    });
    
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    
    workout.completed = true;
    workout.completedAt = new Date();
    await workout.save();
    
    res.json(workout);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getNextDayPlan = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Fetch user stats including target weight
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Fetch recent workouts
    const recentWorkouts = await WorkoutModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .limit(7);
      
  

    // Include target weight in the plan generation
    const plan = await generateNextDayPlan(
      user, // passing the entire user object including target weight
      recentWorkouts,
      nutritionStats
    );
    
    res.json(plan);
  } catch (error) {
    console.error('Next Day Plan Error:', error);
    res.status(500).json({ message: 'Failed to generate plan' });
  }
};

export const saveNextDayPlan = async (req, res) => {
  try {
    const userId = req.user.id;
    const plan = req.body;
    
    // Save workout plan
    const workout = new WorkoutModel({
      userId,
      name: plan.workout.type,
      type: plan.workout.type,
      duration: plan.workout.duration,
      intensity: plan.workout.intensity,
      scheduledFor: getTomorrow(),
      isAIGenerated: true
    });
    
    await workout.save();
    
    res.json({ message: 'Plan saved successfully' });
  } catch (error) {
    console.error('Save Plan Error:', error);
    res.status(500).json({ message: 'Failed to save plan' });
  }
};

export const getWeightGoalPlan = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // यूजर का डेटा फेच करें
    const user = await User.findById(userId);
    
    // वर्तमान वजन और लक्ष्य वजन की जांच
    const currentWeight = user.profile.weight;
    const targetWeight = user.goals.targetWeight;
    
    if (!currentWeight || !targetWeight) {
      return res.status(400).json({ 
        message: 'Weight information missing' 
      });
    }

    // पिछले वर्कआउट्स फेच करें
    const recentWorkouts = await Workout.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(7);

    // न्यूट्रिशन हिस्ट्री फेच करें
    const nutritionHistory = await Nutrition.find({ user: userId })
      .sort({ date: -1 })
      .limit(7);

    // AI से प्लान जनरेट करें
    const plan = await generateWeightGoalPlan({
      currentWeight,
      targetWeight,
      profile: user.profile,
      workoutHistory: recentWorkouts,
      nutritionHistory,
      fitnessLevel: user.profile.fitnessLevel
    });

    res.json(plan);
  } catch (error) {
    console.error('Weight Goal Plan Error:', error);
    res.status(500).json({ message: 'Failed to generate weight goal plan' });
  }
};