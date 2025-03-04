import { openai } from '../app.js';

export const generateNextDayPlan = async (user, workoutHistory, nutritionStats) => {
  try {
    if (!process.env.OPENAI_API_KEY || process.env.DISABLE_AI === 'true') {
      return generateBasicPlan(user, workoutHistory);
    }

    const muscleGroupsWorked = workoutHistory.map(w => w.muscleGroups).flat();
    const uniqueMuscleGroups = [...new Set(muscleGroupsWorked)];

    const prompt = `
    Based on the following user data and recent workout history, generate a personalized next-day workout plan focusing on muscle groups:
    
    User Profile:
    - Height: ${user.height || 'Not set'}cm
    - Fitness Level: ${user.fitnessLevel || 'intermediate'}
    
    Recent Muscle Groups Worked:
    ${uniqueMuscleGroups.join(', ')}
    
    Please provide:
    1. Recommended muscle groups to train next
    2. Specific exercises for those muscle groups
    3. Number of repetitions per exercise
    4. Duration and intensity of the workout
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert fitness coach. Provide specific, actionable recommendations."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 800
    });

    return parseAIResponse(response.choices[0].message.content);
  } catch (error) {
    console.error('AI Service Error:', error);
    return generateBasicPlan(user, workoutHistory);
  }
};

const parseAIResponse = (content) => {
  // Parse the AI response to extract workout details
  // This function needs to be implemented to parse the structured response from AI
  // Example parsing logic (pseudo-code):
  // let parsedContent = JSON.parse(content);
  // return {
  //   muscleGroup: parsedContent.muscleGroup,
  //   exercises: parsedContent.exercises.map(ex => ({
  //     name: ex.name,
  //     reps: ex.reps,
  //     duration: ex.duration
  //   })),
  //   duration: parsedContent.duration,
  //   intensity: parsedContent.intensity
  // };
};

