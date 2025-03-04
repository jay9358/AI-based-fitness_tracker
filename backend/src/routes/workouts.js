import express from 'express';
import { auth } from '../middleware/auth.js';
import { 
  createWorkout,
  getWorkouts,
  getWorkoutById,
  updateWorkout,
  deleteWorkout,
  completeWorkout
} from '../controllers/workoutController.js';

const router = express.Router();

// Apply auth middleware to all routes
router.use(auth);

// Base workout routes
router.post('/', createWorkout);
router.get('/', getWorkouts);
router.get('/:id', getWorkoutById);
router.put('/:id', updateWorkout);
router.delete('/:id', deleteWorkout);
router.post('/:id/complete', completeWorkout);


export default router; 