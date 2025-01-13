import React from 'react';

const NutritionLog = ({ meals = [], dailyStats = {} }) => {
  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-xl font-bold mb-4">Nutrition Log</h2>
      
      {/* Daily Stats Summary */}
      <div className="mb-6 grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-3 rounded">
          <p className="text-sm text-gray-600">Total Calories</p>
          <p className="text-xl font-bold">{dailyStats.calories || 0}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <p className="text-sm text-gray-600">Protein (g)</p>
          <p className="text-xl font-bold">{dailyStats.protein || 0}</p>
        </div>
      </div>

      {/* Meals List */}
      <div className="space-y-4">
        {meals.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No meals logged today</p>
        ) : (
          meals.map((meal) => (
            <div key={meal._id} className="border-b pb-2">
              <p className="font-semibold">{meal.name}</p>
              <div className="text-sm text-gray-600">
                <p>Calories: {meal.calories}</p>
                <p>Protein: {meal.protein}g</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NutritionLog;