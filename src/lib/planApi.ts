'use client'; // This function uses localStorage, so it's a client-side utility

import { FitnessPlan, FormData } from "./types";

/**
 * Calls the API to generate a new fitness plan, then saves the
 * successful plan and form data to local storage.
 * @param data The user's form data.
 * @returns A Promise that resolves with the new FitnessPlan.
 * @throws An error if the API call or data saving fails.
 */
export const fetchAndSavePlan = async (data: FormData): Promise<FitnessPlan> => {
  const res = await fetch("/api/generate-plan", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorDetails = await res.json().catch(() => null);
    console.error("API Error Response:", errorDetails);
    throw new Error(errorDetails?.error || "Failed to generate plan");
  }

  const plan: FitnessPlan = await res.json();
  localStorage.setItem("fitnessPlan", JSON.stringify(plan));
  localStorage.setItem("fitnessUserName", data.name);
  localStorage.setItem("formData", JSON.stringify(data)); 
  return plan;
};