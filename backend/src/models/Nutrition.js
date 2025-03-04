import mongoose from 'mongoose';

const nutritionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['breakfast', 'lunch', 'dinner', 'snack'],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  calories: {
    type: Number,
    required: true
  },
  protein: {
    type: Number,
    default: 0
  },
  carbs: {
    type: Number,
    default: 0
  },
  fats: {
    type: Number,
    default: 0
  },
  type: {
    type: String,
    enum: ['meal', 'water'],
    default: 'meal'
  },
  amount: Number,
  unit: String,
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Nutrition = mongoose.model('Nutrition', nutritionSchema);
export default Nutrition; 