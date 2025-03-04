import express from 'express';
import { 
  getProgress,
  updateGoals,
  getAchievements,
  getStats,
  getStreak
} from '../controllers/progressController';
import { auth } from '../middleware/auth';

const router = express.Router();


router.use(auth);

router.get('/', getProgress);
router.put('/goals', updateGoals);
router.get('/achievements', getAchievements);
router.get('/stats', getStats);
router.get('/streak', getStreak);

export default router; 