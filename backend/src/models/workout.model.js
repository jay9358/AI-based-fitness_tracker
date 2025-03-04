import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  intensity: {
    type: String,
    enum: ['low', 'medium', 'high'],
    required: true
  },
  scheduledFor: {
    type: Date
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: Date,
  isAIGenerated: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

export const WorkoutModel = mongoose.model('Workout', workoutSchema); 