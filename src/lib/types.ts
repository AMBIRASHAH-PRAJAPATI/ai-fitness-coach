import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(2),
  age: z.number().min(16).max(100),
  gender: z.enum(["male", "female", "other"]),
  height: z.number(),
  weight: z.number(),
  fitnessGoal: z.enum(['weight_loss', 'muscle_gain', 'improve_endurance', 'maintain_fitness', 'flexibility']),
  fitnessLevel: z.enum(['beginner', 'intermediate', 'advanced']),
  workoutLocation: z.enum(['home', 'gym', 'outdoor']),
  dietaryPreference: z.enum(['veg', 'non-veg', 'vegan', 'keto']),
  medicalHistory: z.string().optional(),
  stressLevel: z.string().optional(),
});

// export interface UserDetails {
//   name: string;
//   age: number;
//   gender: 'male' | 'female' | 'other';
//   height: number;
//   weight: number;
//   fitnessGoal: 'weight_loss' | 'muscle_gain' | 'improve_endurance' | 'maintain_fitness' | 'flexibility';
//   fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
//   workoutLocation: 'home' | 'gym' | 'outdoor';
//   dietaryPreference: 'veg' | 'non-veg' | 'vegan' | 'keto';
//   medicalHistory?: string;
//   stressLevel?: 'low' | 'medium' | 'high';
// }
export type FormData = z.infer<typeof formSchema>;
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