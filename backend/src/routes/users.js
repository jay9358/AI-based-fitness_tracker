import express from 'express';
import { 
  getUserProfile, 
  updateUserProfile, 
  updateUserStats,
  getWeeklyStats,
  resetDailyStats,
  updateUserPreferences,
  deleteAccount
} from '../controllers/userController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Apply auth middleware to all routes
router.use(auth);

// Profile routes
router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);

// Stats routes
router.get('/stats/weekly', getWeeklyStats);
router.put('/stats', updateUserStats);
router.post('/stats/reset', resetDailyStats);

// Preferences route
router.put('/preferences', updateUserPreferences);

// Account management
router.delete('/account', deleteAccount);

export default router;