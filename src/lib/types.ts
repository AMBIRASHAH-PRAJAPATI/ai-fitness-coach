export interface UserDetails {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  height: number;
  weight: number;
  fitnessGoal: 'weight_loss' | 'muscle_gain' | 'improve_endurance' | 'maintain_fitness' | 'flexibility';
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  workoutLocation: 'home' | 'gym' | 'outdoor';
  dietaryPreference: 'veg' | 'non-veg' | 'vegan' | 'keto';
  medicalHistory: string;
  stressLevel: 'low' | 'medium' | 'high';
}

export interface Exercise {
  name: string;
  sets: number;
  reps: number;
  rest: string;
}

export interface WorkoutDay {
  focus: string;
  exercises: Exercise[];
  motivation: string;
  tips: string[];
}

export interface Meal {
  name: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks';
  description: string;
  calories: number;
}

export interface DietDay {
  summary: string;
  meals: Meal[];
}

export type Day = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export interface FitnessPlan {
  workoutPlan: Record<Day, WorkoutDay>;
  dietPlan: Record<Day, DietDay>;
}