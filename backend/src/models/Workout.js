import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['cardio', 'strength', 'flexibility', 'hiit']
  },
  duration: {
    type: Number,
    required: true
  },
  intensity: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  exercises: [{
    name: String,
    sets: Number,
    reps: Number,
    weight: Number,
    duration: Number,
    notes: String
  }],
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: Date,
  planId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WorkoutPlan'
  },
  isAIGenerated: {
    type: Boolean,
    default: false
  },
  scheduledFor: {
    type: Date
  },
  muscleGroups: [String]
}, { timestamps: true });

export default mongoose.model('Workout', workoutSchema);