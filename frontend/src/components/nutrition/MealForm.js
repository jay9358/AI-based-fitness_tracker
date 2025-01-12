import React, { useState } from 'react';

const MealForm = ({ onSubmit }) => {
  const [meal, setMeal] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fats: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(meal);
    setMeal({ name: '', calories: '', protein: '', carbs: '', fats: '' });
  };

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Add Meal</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">Meal Name</label>
          <input
            type="text"
            value={meal.name}
            onChange={(e) => setMeal({...meal, name: e.target.value})}
            className="input-field"
            placeholder="e.g., Breakfast, Lunch, Snack"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Calories</label>
            <input
              type="number"
              value={meal.calories}
              onChange={(e) => setMeal({...meal, calories: e.target.value})}
              className="input-field"
              min="0"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Protein (g)</label>
            <input
              type="number"
              value={meal.protein}
              onChange={(e) => setMeal({...meal, protein: e.target.value})}
              className="input-field"
              min="0"
            />
          </div>
        </div>
        <button type="submit" className="btn-primary w-full">
          Add Meal
        </button>
      </form>
    </div>
  );
};

export default MealForm; 