import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { WorkoutService } from '../../Services/WorkoutService';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine 
} from 'recharts';

const WorkoutStats = () => {
  const { data: workouts = [], isLoading } = useQuery(
    ['workouts'], 
    WorkoutService.getWorkouts,
    {
      refetchInterval: 1000,
      staleTime: 0,
      cacheTime: 0,
      refetchOnMount: true,
      refetchOnWindowFocus: true
    }
  );

  const stats = useMemo(() => {
    // Sort workouts by date first
    const sortedWorkouts = [...workouts].sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    );

    const weeklyData = Array(7).fill(0).map((_, index) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - index));
      date.setHours(0, 0, 0, 0);

      const dayWorkouts = sortedWorkouts.filter(workout => {
        const workoutDate = new Date(workout.createdAt || new Date());
        workoutDate.setHours(0, 0, 0, 0);
        return workoutDate.getTime() === date.getTime();
      });

      return {
        name: date.toLocaleDateString('en-US', { weekday: 'short' }),
        date: date.toISOString(),
        duration: dayWorkouts.reduce((acc, curr) => acc + (Number(curr.duration) || 0), 0),
        workouts: dayWorkouts.length,
        details: dayWorkouts
      };
    });

    const totalWorkouts = sortedWorkouts.length;
    const totalDuration = sortedWorkouts.reduce((acc, curr) => acc + (Number(curr.duration) || 0), 0);
    const averageDuration = totalWorkouts ? Math.round(totalDuration / totalWorkouts) : 0;
    const maxDuration = Math.max(...weeklyData.map(d => d.duration), 1);

    return {
      weeklyData,
      totalWorkouts,
      totalDuration,
      averageDuration,
      maxDuration
    };
  }, [workouts]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 shadow-xl rounded-lg border border-gray-100">
          <div className="font-semibold text-gray-900 mb-2">
            {data.name}
          </div>
          <div className="space-y-1">
            <div className="flex items-center text-indigo-600">
              <span className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></span>
              <span className="font-medium">{data.duration} minutes</span>
            </div>
            <div className="text-gray-600">
              {data.workouts} {data.workouts === 1 ? 'workout' : 'workouts'}
            </div>
            {data.details.length > 0 && (
              <div className="mt-2 pt-2 border-t border-gray-100">
                <div className="text-xs text-gray-500 mb-1">Workouts:</div>
                {data.details.map((workout, i) => (
                  <div key={i} className="text-sm text-gray-600 flex justify-between">
                    <span>• {workout.name}</span>
                    <span className="ml-2 text-indigo-500">{workout.duration}min</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomYAxisTick = ({ x, y, payload }) => {
    return (
      <text x={x} y={y} dy={3} textAnchor="end" fill="#6B7280" fontSize={12}>
        {`${payload.value}min`}
      </text>
    );
  };

  const CustomXAxisTick = ({ x, y, payload }) => {
    return (
      <text x={x} y={y} dy={16} textAnchor="middle" fill="#6B7280" fontSize={12}>
        {payload.value}
      </text>
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card p-4">
              <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-20"></div>
              <div className="h-8 bg-gray-200 rounded animate-pulse w-16"></div>
            </div>
          ))}
        </div>
        <div className="card p-6">
          <div className="h-72 bg-gray-100 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-4">
          <h3 className="text-sm font-medium text-gray-500">Total Workouts</h3>
          <p className="text-2xl font-bold text-indigo-600">{stats.totalWorkouts}</p>
        </div>
        <div className="card p-4">
          <h3 className="text-sm font-medium text-gray-500">Total Minutes</h3>
          <p className="text-2xl font-bold text-indigo-600">{stats.totalDuration}</p>
        </div>
        <div className="card p-4">
          <h3 className="text-sm font-medium text-gray-500">Avg. Duration</h3>
          <p className="text-2xl font-bold text-indigo-600">{stats.averageDuration} min</p>
        </div>
      </div>

      <div className="card p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Weekly Activity</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Duration (minutes)</span>
            </div>
          </div>
        </div>
        
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={stats.weeklyData}
              margin={{ top: 10, right: 10, left: 40, bottom: 20 }}
            >
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#818CF8" stopOpacity={1}/>
                  <stop offset="100%" stopColor="#6366F1" stopOpacity={1}/>
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                vertical={false} 
                stroke="#E5E7EB"
              />
              <XAxis 
                dataKey="name" 
                tick={<CustomXAxisTick />}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                tick={<CustomYAxisTick />}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                content={<CustomTooltip />}
                cursor={{ fill: '#F3F4F6' }}
              />
              <ReferenceLine 
                y={0} 
                stroke="#E5E7EB" 
                strokeWidth={2}
              />
              <Bar 
                dataKey="duration" 
                fill="url(#barGradient)"
                radius={[4, 4, 0, 0]}
                maxBarSize={50}
                animationDuration={1000}
                animationBegin={0}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex justify-between text-sm text-gray-500 mt-6">
          <div>
            Total Duration: <span className="font-medium text-indigo-600">{stats.totalDuration} minutes</span>
          </div>
          <div>
            Average: <span className="font-medium text-indigo-600">{stats.averageDuration} min/workout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutStats;