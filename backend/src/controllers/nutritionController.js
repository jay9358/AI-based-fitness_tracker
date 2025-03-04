import Nutrition from '../models/Nutrition.js';
import User from '../models/User.js';

export const logMeal = async (req, res) => {
  try {
    const meal = new Nutrition({
      ...req.body,
      user: req.user.id,
      date: new Date()
    });
    await meal.save();

    // Update user's daily nutrition stats
    await User.findByIdAndUpdate(req.user.id, {
      $inc: {
        'stats.dailyCalories': meal.calories,
        'stats.dailyProtein': meal.protein,
        'stats.dailyCarbs': meal.carbs,
        'stats.dailyFats': meal.fats
      }
    });

    res.status(201).json(meal);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getMeals = async (req, res) => {
  try {
    const { date } = req.query;
    const query = { user: req.user.id };
    
    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      query.date = { $gte: startOfDay, $lte: endOfDay };
    }

    const meals = await Nutrition.find(query).sort({ date: -1 });
    res.json(meals);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateMeal = async (req, res) => {
  try {
    const meal = await Nutrition.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    
    if (!meal) {
      return res.status(404).json({ message: 'Meal not found' });
    }
    
    res.json(meal);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteMeal = async (req, res) => {
  try {
    const meal = await Nutrition.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });
    
    if (!meal) {
      return res.status(404).json({ message: 'Meal not found' });
    }
    
    res.json({ message: 'Meal deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getDailyNutrition = async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const meals = await Nutrition.find({
      user: req.user.id,
      date: { $gte: startOfDay, $lte: endOfDay }
    });

    const dailyTotal = meals.reduce((acc, meal) => ({
      calories: acc.calories + (meal.calories || 0),
      protein: acc.protein + (meal.protein || 0),
      carbs: acc.carbs + (meal.carbs || 0),
      fats: acc.fats + (meal.fats || 0)
    }), { calories: 0, protein: 0, carbs: 0, fats: 0 });

    res.json(dailyTotal);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getWeeklyStats = async (req, res) => {
  try {
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - 7);
    startOfWeek.setHours(0, 0, 0, 0);

    const meals = await Nutrition.find({
      user: req.user.id,
      date: { $gte: startOfWeek }
    });

    const weeklyStats = {
      totalCalories: 0,
      averageProtein: 0,
      averageCarbs: 0,
      averageFats: 0,
      mealCount: meals.length
    };

    meals.forEach(meal => {
      weeklyStats.totalCalories += meal.calories || 0;
      weeklyStats.averageProtein += meal.protein || 0;
      weeklyStats.averageCarbs += meal.carbs || 0;
      weeklyStats.averageFats += meal.fats || 0;
    });

    if (meals.length > 0) {
      weeklyStats.averageProtein /= meals.length;
      weeklyStats.averageCarbs /= meals.length;
      weeklyStats.averageFats /= meals.length;
    }

    res.json(weeklyStats);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const logWaterIntake = async (req, res) => {
  try {
    const { amount, unit, time } = req.body;
    
    const waterLog = new Nutrition({
      user: req.user.id,
      type: 'water',
      name: 'Water Intake',
      amount,
      unit,
      time: time || new Date(),
      calories: 0
    });

    await waterLog.save();

    // Update user's daily water intake stats
    await User.findByIdAndUpdate(req.user.id, {
      $inc: { 'stats.dailyWaterIntake': amount }
    });

    res.status(201).json(waterLog);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}; 