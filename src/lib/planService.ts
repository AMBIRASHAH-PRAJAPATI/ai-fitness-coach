import { GoogleGenAI, Type } from '@google/genai';
import { UserDetails, FitnessPlan } from './types';

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY not found");
}

const geminiModel = "gemini-2.5-pro";
// const geminiModel = "gemini-1.5-flash";

const exerciseSchema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING },
    sets: { type: Type.NUMBER },
    reps: { type: Type.NUMBER },
    rest: { type: Type.STRING },
    duration: { type: Type.STRING },
  },
  required: ['name', 'sets', 'reps', 'rest'],
};
const workoutDaySchema = {
  type: Type.OBJECT,
  properties: {
    focus: { type: Type.STRING },
    exercises: {
      type: Type.ARRAY,
      items: exerciseSchema,
    },
    motivation: { type: Type.STRING, description: "A short motivational quote for the day's workout." },
    tips: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "An array of 2-3 specific tips for the day's workout."
    },
  },
  required: ['focus', 'exercises', 'motivation', 'tips'],
};
const mealSchema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING },
    description: { type: Type.STRING },
    calories: { type: Type.NUMBER },
  },
  required: ['name', 'description', 'calories'],
};
const dietDaySchema = {
  type: Type.OBJECT,
  properties: {
    summary: { type: Type.STRING },
    meals: {
      type: Type.ARRAY,
      items: mealSchema,
    },
  },
  required: ['summary', 'meals'],
};
// Response schema 
const responseSchema = {
  type: Type.OBJECT,
  properties: {
    workoutPlan: {
      type: Type.OBJECT,
      properties: {
        monday: workoutDaySchema,
        tuesday: workoutDaySchema,
        wednesday: workoutDaySchema,
        thursday: workoutDaySchema,
        friday: workoutDaySchema,
        saturday: workoutDaySchema,
        sunday: workoutDaySchema,
      },
    },
    dietPlan: {
      type: Type.OBJECT,
      properties: {
        monday: dietDaySchema,
        tuesday: dietDaySchema,
        wednesday: dietDaySchema,
        thursday: dietDaySchema,
        friday: dietDaySchema,
        saturday: dietDaySchema,
        sunday: dietDaySchema,
      },
    },
  },
};

// Generates the full fitness plan
export const generateFitnessPlan = async (userDetails: UserDetails): Promise<FitnessPlan> => {
  try {
    const prompt = `
      You are a professional fitness and nutrition coach.
      Create a highly personalized 7-day fitness and diet plan plan based on the provided user data in JSON format.
      Ensure the plan is detailed, realistic, and tailored to their specific inputs.

      **User Data:**
      ${JSON.stringify(userDetails, null, 2)}

      **Instructions & Constraints:**
      1.  **Personalization:** Meticulously tailor the plan to the user's specific goals, fitness level, preferences, and constraints (like medical history and workout location).
      2.  **Workout Plan:** For each day of the week:
      - Define a clear 'focus' (e.g., 'Upper Body Strength', 'Cardio & Core', 'Active Recovery').
      - Select appropriate exercises. For 'home' workouts, choose equipment-free exercises.
      - Provide a unique, inspiring 'motivation' quote relevant to the day's focus.
      - Include an array of 2-3 actionable 'tips' that provide specific guidance on form, intensity, or recovery for that day's workout.
      3.  **Diet Plan:** For each day of the week:
      - Create a 'summary' of the day's nutritional approach.
      - Suggest balanced 'meals' (Breakfast, Lunch, Dinner, Snacks) with clear descriptions and estimated calories.
      - Align meal suggestions with the user's dietary preference.
      4.  **Output Format:**
      - Your entire response MUST be a single, valid JSON object.
      - Strictly adhere to the provided JSON schema.
      - Do NOT include any text, markdown, or comments outside of the JSON structure.
    `;
    // Initialize the Gemini client
    const genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await genAI.models.generateContent({
      model: geminiModel,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
      },
    });
    const jsonText = response.text?.trim() ?? '';
    const plan: FitnessPlan = JSON.parse(jsonText);
    return plan;
  } catch (e) {
    console.error("Error while generating Plan:", e);
    throw new Error("'Sorry, something went wrong while generating your plan. Please try again.");
  }
};