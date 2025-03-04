import express from 'express';
import { 
  logMeal,
  getMeals,
  updateMeal,
  deleteMeal,
  getDailyNutrition,
  getWeeklyStats
} from '../controllers/nutritionController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.use(auth);

router.post('/meals', logMeal);
router.get('/meals', getMeals);
router.put('/meals/:id', updateMeal);
router.delete('/meals/:id', deleteMeal);
router.get('/daily', getDailyNutrition);
router.get('/stats/weekly', getWeeklyStats);

export default router; 