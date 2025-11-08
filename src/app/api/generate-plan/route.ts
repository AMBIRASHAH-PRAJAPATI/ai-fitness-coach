import { NextResponse } from 'next/server';
import { generateFitnessPlan } from '@/lib/planService';
import { FormData } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const userDetails = await request.json() as FormData;
    // Simple validation
    if (!userDetails.name || !userDetails.age || !userDetails.gender || !userDetails.height || !userDetails.weight || !userDetails.fitnessGoal || !userDetails.fitnessLevel || !userDetails.workoutLocation || !userDetails.dietaryPreference) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const plan = await generateFitnessPlan(userDetails);
    return NextResponse.json(plan);
  } catch (error: any) {
    console.error("Error in plan generation:", error);
    return NextResponse.json(
      { error: "Failed to generate fitness plan", details: error.message },
      { status: 500 }
    );
  }
}