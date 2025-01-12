import React from 'react';

const NutritionLog = ({ meals }) => {
  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-xl font-bold mb-4">Nutrition Log</h2>
      <div className="space-y-4">
        {meals.map((meal, index) => (
          <div key={index} className="border-b pb-2">
            <p className="font-semibold">{meal.name}</p>
            <p className="text-gray-600">Calories: {meal.calories}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NutritionLog; 