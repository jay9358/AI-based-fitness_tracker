import express from 'express';
import { auth } from '../middleware/auth.js';
import { 
    getNextDayPlan, 
    saveNextDayPlan,
    getWeightGoalPlan,
    saveWeightGoalPlan 
  } from '../controllers/aiPlanController.js';
const router = express.Router();

// Add request logging middleware
router.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

router.use(auth);

// Add error handling middleware
const asyncHandler = (fn) => (req, res, next) => {
  return Promise.resolve(fn(req, res, next)).catch(next);
};

router.get('/next-day', getNextDayPlan);
router.post('/next-day/save', saveNextDayPlan);
router.post('/weight-goal', getWeightGoalPlan);
router.post('/weight-goal/save', saveWeightGoalPlan);

// Error handling middleware
router.use((err, req, res, next) => {
  console.error('Route Error:', {
    path: req.path,
    method: req.method,
    error: err.message
  });
  res.status(500).json({ 
    message: 'An error occurred',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

export default router; 