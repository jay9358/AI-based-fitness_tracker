import React, { useState } from 'react';
import MealForm from './MealForm';
import NutritionLog from './NutritionLog';

const NutritionTracker = () => {
  const [meals, setMeals] = useState([]);

  const addMeal = (meal) => {
    setMeals([...meals, meal]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Nutrition Tracker</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MealForm onSubmit={addMeal} />
        <NutritionLog meals={meals} />
      </div>
    </div>
  );
};

export default NutritionTracker; 