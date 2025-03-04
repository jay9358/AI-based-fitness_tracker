import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import Nutrition from '../models/Nutrition.js';

export const getUserProfile = async (req, res) => {
  try {
    // Remove populate('stats') as stats is not a reference but embedded document
    const user = await User.findById(req.user.id)
      .select('-password')
      .lean();
      
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get today's nutrition stats
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const todayNutrition = await Nutrition.aggregate([
      {
        $match: {
          user: user._id,
          date: { $gte: startOfDay, $lte: endOfDay }
        }
      },
      {
        $group: {
          _id: null,
          dailyCalories: { $sum: '$calories' },
          dailyProtein: { $sum: '$protein' },
          dailyCarbs: { $sum: '$carbs' },
          dailyFats: { $sum: '$fats' },
          dailyWaterIntake: {
            $sum: {
              $cond: [{ $eq: ['$type', 'water'] }, '$amount', 0]
            }
          }
        }
      }
    ]);

    const userResponse = {
      ...user,
      stats: {
        ...user.stats,
        ...(todayNutrition[0] || {
          dailyCalories: 0,
          dailyProtein: 0,
          dailyCarbs: 0,
          dailyFats: 0,
          dailyWaterIntake: 0
        })
      }
    };

    res.json(userResponse);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Error fetching profile' });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { name, email, profile, goals, isProfileComplete } = req.body;
    
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update basic fields
    if (name) user.name = name;
    if (email) user.email = email;

    // Update isProfileComplete flag
    if (isProfileComplete === true) {
      user.isProfileComplete = true;
    }

    // Update profile with type checking
    if (profile && typeof profile === 'object') {
      user.profile = {
        ...user.profile,
        age: profile.age ? Number(profile.age) : user.profile?.age,
        weight: profile.weight ? Number(profile.weight) : user.profile?.weight,
        height: profile.height ? Number(profile.height) : user.profile?.height,
        gender: profile.gender || user.profile?.gender,
        fitnessLevel: profile.fitnessLevel || user.profile?.fitnessLevel,
        activityLevel: profile.activityLevel || user.profile?.activityLevel
      };
    }

    // Update goals
    if (goals && typeof goals === 'object') {
      user.goals = {
        ...user.goals,
        targetWeight: goals.targetWeight ? Number(goals.targetWeight) : user.goals?.targetWeight,
        weeklyWorkouts: goals.weeklyWorkouts ? Number(goals.weeklyWorkouts) : user.goals?.weeklyWorkouts
      };
    }

    await user.save();
    res.json(user);
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Failed to update profile' });
  }
};

export const updateUserStats = async (req, res) => {
  try {
    const { stats } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.stats = {
      ...user.stats,
      ...stats
    };

    await user.save();
    res.json(user);
  } catch (error) {
    console.error('Update stats error:', error);
    res.status(500).json({ message: 'Error updating stats' });
  }
};  

export const getWeeklyStats = async (req, res) => {
    try {
      const startOfWeek = new Date();
      startOfWeek.setDate(startOfWeek.getDate() - 7);
      startOfWeek.setHours(0, 0, 0, 0);
  
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const weeklyStats = {
        totalCalories: 0,
        averageProtein: 0,
        averageCarbs: 0,
        averageFats: 0,
        totalWorkouts: 0,
        waterIntake: 0
      };
  
      // Get stats from nutrition collection
      const nutritionStats = await Nutrition.aggregate([
        {
          $match: {
            user: user._id,
            date: { $gte: startOfWeek }
          }
        },
        {
          $group: {
            _id: null,
            totalCalories: { $sum: '$calories' },
            totalProtein: { $sum: '$protein' },
            totalCarbs: { $sum: '$carbs' },
            totalFats: { $sum: '$fats' },
            totalWater: { 
              $sum: { 
                $cond: [{ $eq: ['$type', 'water'] }, '$amount', 0] 
              }
            }
          }
        }
      ]);
  
      if (nutritionStats.length > 0) {
        const stats = nutritionStats[0];
        weeklyStats.totalCalories = stats.totalCalories;
        weeklyStats.averageProtein = stats.totalProtein / 7;
        weeklyStats.averageCarbs = stats.totalCarbs / 7;
        weeklyStats.averageFats = stats.totalFats / 7;
        weeklyStats.waterIntake = stats.totalWater;
      }
  
      res.json(weeklyStats);
    } catch (error) {
      console.error('Get weekly stats error:', error);
      res.status(500).json({ message: 'Error fetching weekly stats' });
    }
  };
  
  export const resetDailyStats = async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.stats = {
        dailyCalories: 0,
        dailyProtein: 0,
        dailyCarbs: 0,
        dailyFats: 0,
        dailyWaterIntake: 0
      };
  
      await user.save();
      res.json({ message: 'Daily stats reset successfully' });
    } catch (error) {
      console.error('Reset stats error:', error);
      res.status(500).json({ message: 'Error resetting stats' });
    }
  };
  
  export const updateUserPreferences = async (req, res) => {
    try {
      const { preferences } = req.body;
      const user = await User.findById(req.user.id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.preferences = {
        ...user.preferences,
        ...preferences
      };
  
      await user.save();
      res.json(user.preferences);
    } catch (error) {
      console.error('Update preferences error:', error);
      res.status(500).json({ message: 'Error updating preferences' });
    }
  };
  
  export const deleteAccount = async (req, res) => {
    try {
      const { password } = req.body;
      const user = await User.findById(req.user.id).select('+password');
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Password is incorrect' });
      }
  
      // Delete user's data from all collections
      await Promise.all([
        Nutrition.deleteMany({ user: user._id }),
        Workout.deleteMany({ user: user._id }),
        User.findByIdAndDelete(user._id)
      ]);
  
      res.json({ message: 'Account deleted successfully' });
    } catch (error) {
      console.error('Delete account error:', error);
      res.status(500).json({ message: 'Error deleting account' });
    }
  };
  