import { generateNextDayPlan } from '../services/aiService.js';
import Workout from '../models/Workout.js';
import WorkoutPlan from '../models/WorkoutPlan.js';
import User from '../models/User.js';
import Nutrition from '../models/Nutrition.js';

export const getNextDayPlan = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Fetch user data
    const user = await User.findById(userId);
    
    // Get recent workouts
    const workouts = await Workout
      .find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(7);
      
    // Get nutrition history
    const nutritionHistory = await Nutrition
      .find({ user: userId })
      .sort({ date: -1 })
      .limit(7);

    let plan;
    if (process.env.DISABLE_AI === 'true' || !process.env.OPENAI_API_KEY) {
      plan = generateBasicPlan(user, workouts);
    } else {
      plan = await generateNextDayPlan(user, workouts, nutritionHistory);
    }
    
    res.json(plan);
  } catch (error) {
    console.error('AI Plan Generation Error:', error);
    res.status(500).json({ message: 'Failed to generate plan' });
  }
};

export const saveNextDayPlan = async (req, res) => {
  try {
    const userId = req.user.id;
    const { workout } = req.body;
    
    // Save as scheduled workout
    const newWorkout = new Workout({
      user: userId,
      name: workout.type,
      type: workout.type,
      duration: workout.duration,
      intensity: workout.intensity,
      scheduledFor: getTomorrow(),
      isAIGenerated: true
    });
    
    await newWorkout.save();
    
    res.json({ message: 'Plan saved successfully', workout: newWorkout });
  } catch (error) {
    console.error('Save Plan Error:', error);
    res.status(500).json({ message: 'Failed to save plan' });
  }
};

const getTomorrow = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow;
};


export const getWeightGoalPlan = async (req, res) => {
  console.log('Generating weight goal plan for user:', req.user.id);
  
  try {
    const userId = req.user.id;
    
    // Fetch complete user data with validation
    const user = await User.findById(userId)
      .populate('profile')
      .populate('goals');
      
    if (!user) {
      console.error('User not found:', userId);
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate required user data
    if (!user.profile?.weight || !user.goals?.targetWeight) {
      console.warn('Missing user weight data:', {
        currentWeight: user.profile?.weight,
        targetWeight: user.goals?.targetWeight
      });
      return res.status(400).json({ 
        message: 'Weight information missing. Please complete your profile.' 
      });
    }
    
    // Get recent workouts with error handling
    const workouts = await Workout
      .find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(7)
      .catch(err => {
        console.error('Error fetching workouts:', err);
        return [];
      });
      
    // Get nutrition history with error handling  
    const nutritionHistory = await Nutrition
      .find({ user: userId })
      .sort({ date: -1 })
      .limit(7)
      .catch(err => {
        console.error('Error fetching nutrition:', err);
        return [];
      });

    console.log('Fetched data:', {
      workoutsCount: workouts.length,
      nutritionCount: nutritionHistory.length
    });

    // Generate AI weight goal plan
    const plan = await generateWeightGoalPlan(user, workouts, nutritionHistory);
    
    console.log('Generated plan:', {
      type: plan.type,
      workoutCount: plan.workoutPlan?.exercises?.length,
      hasNutrition: !!plan.nutritionPlan
    });
    
    res.json(plan);
  } catch (error) {
    console.error('Weight Goal Plan Error:', error);
    res.status(500).json({ 
      message: 'Failed to generate weight goal plan',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const saveWeightGoalPlan = async (req, res) => {
  console.log('Saving weight goal plan for user:', req.user.id);
  
  try {
    const userId = req.user.id;
    const { plan } = req.body;
    
    // Validate plan data
    if (!plan?.type || !plan?.workoutPlan) {
      console.warn('Invalid plan data received:', plan);
      return res.status(400).json({ 
        message: 'Invalid plan data' 
      });
    }

    console.log('Creating workout plan:', {
      type: plan.type,
      duration: plan.timeline?.duration,
      exercises: plan.workoutPlan?.exercises?.length
    });

    // Create new workout plan with validation
    const workoutPlan = new WorkoutPlan({
      user: userId,
      name: `Weight ${plan.type} Plan`,
      description: plan.workoutPlan.description || 'AI Generated Weight Management Plan',
      duration: plan.timeline?.duration || '12 weeks',
      workoutsPerWeek: parseInt(plan.workoutPlan.schedule) || 3,
      difficulty: plan.workoutPlan.intensity || 'moderate',
      exercises: Array.isArray(plan.workoutPlan.exercises) ? plan.workoutPlan.exercises : [],
      nutritionGuidelines: plan.nutritionPlan || {},
      considerations: Array.isArray(plan.considerations) ? plan.considerations : [],
      active: true,
      isAIGenerated: true
    });

    // Save with error handling
    await workoutPlan.save().catch(err => {
      console.error('Error saving workout plan:', err);
      throw new Error('Failed to save workout plan');
    });

    console.log('Deactivating other plans for user:', userId);

    // Deactivate other active plans with error handling
    await WorkoutPlan.updateMany(
      { user: userId, _id: { $ne: workoutPlan._id } },
      { active: false }
    ).catch(err => {
      console.error('Error deactivating other plans:', err);
    });
    
    res.json({ 
      message: 'Weight goal plan saved successfully', 
      plan: workoutPlan 
    });
  } catch (error) {
    console.error('Save Weight Goal Plan Error:', error);
    res.status(500).json({ 
      message: 'Failed to save weight goal plan',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};