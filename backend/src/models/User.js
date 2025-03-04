import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
    select: false
  },
  profile: {
    age: Number,
    weight: Number,
    height: Number,
    gender: {
      type: String,
      enum: ['male', 'female', 'other']
    },
    fitnessLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner'
    },
    activityLevel: {
      type: String,
      enum: ['sedentary', 'light', 'moderate', 'active', 'very_active'],
      default: 'moderate'
    }
  },
  goals: {
    targetWeight: Number,
    weeklyWorkouts: Number,
    dailyCalories: Number,
    dailyProtein: Number,
    dailyCarbs: Number,
    dailyFats: Number,
    dailyWaterIntake: Number
  },
  stats: {
    dailyCalories: { type: Number, default: 0 },
    dailyProtein: { type: Number, default: 0 },
    dailyCarbs: { type: Number, default: 0 },
    dailyFats: { type: Number, default: 0 },
    dailyWaterIntake: { type: Number, default: 0 },
    streakCount: { type: Number, default: 0 },
    lastActive: { type: Date, default: Date.now }
  },
  preferences: {
    measurementUnit: {
      type: String,
      enum: ['metric', 'imperial'],
      default: 'metric'
    },
    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true }
    },
    theme: {
      type: String,
      enum: ['light', 'dark'],
      default: 'light'
    }
  }
}, {
  timestamps: true
});

// Password hashing middleware
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Update streak count middleware
userSchema.pre('save', function(next) {
  const now = new Date();
  const lastActive = this.stats.lastActive;
  
  if (lastActive) {
    const diffDays = Math.floor((now - lastActive) / (1000 * 60 * 60 * 24));
    if (diffDays === 1) {
      this.stats.streakCount += 1;
    } else if (diffDays > 1) {
      this.stats.streakCount = 0;
    }
  }
  
  this.stats.lastActive = now;
  next();
});
userSchema.methods.comparePassword = async function(candidatePassword) {
    try {
      return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
      throw error;
    }
  };

const User = mongoose.model('User', userSchema);
export default User;