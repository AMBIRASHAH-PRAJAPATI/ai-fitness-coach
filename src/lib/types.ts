import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  age: z.number({ error: "Age must be a number." })
    .min(16, { message: "You must be at least 16 years old." })
    .max(100, { message: "Please enter a valid age." }),
  gender: z.enum(["male", "female", "other"], { error: "Please select a gender." }),
  height: z.number({ error: "Height must be a number." })
    .min(50, { message: "Please enter a valid height in cm." }),
  weight: z.number({ error: "Weight must be a number." })
    .min(20, { message: "Please enter a valid weight in kg." }),
  fitnessGoal: z.enum(['weight_loss', 'muscle_gain', 'improve_endurance', 'maintain_fitness', 'flexibility'], {
    error: "Please select a fitness goal.",
  }),
  fitnessLevel: z.enum(['beginner', 'intermediate', 'advanced'], {
    error: "Please select your fitness level.",
  }),
  workoutLocation: z.enum(['home', 'gym', 'outdoor'], {
    error: "Please select a workout location.",
  }),
  dietaryPreference: z.enum(['veg', 'non-veg', 'vegan', 'keto'], {
    error: "Please select your dietary preference.",
  }),
  medicalHistory: z.string().optional(),
  stressLevel: z.enum(['low', 'medium', 'high']).optional(),
});

export type FormData = z.infer<typeof formSchema>;
export interface Exercise {
  name: string;
  sets: number;
  reps: number | string;
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