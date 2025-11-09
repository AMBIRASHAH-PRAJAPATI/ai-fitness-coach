import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { FormData } from "@/lib/types";

const goalMap: Record<string, string> = {
  weight_loss: "Lose Weight",
  muscle_gain: "Gain Muscle",
  improve_endurance: "Improve Endurance",
  maintain_fitness: "Maintain Fitness",
  flexibility: "Improve Flexibility",
};

const levelMap: Record<string, string> = { beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced" };
const locationMap: Record<string, string> = { home: "Home", gym: "Gym", outdoor: "Outdoor" };
const dietMap: Record<string, string> = { veg: "Vegetarian", "non-veg": "Non-Veg", vegan: "Vegan", keto: "Keto" };

export default function Step2({ form }: { form: UseFormReturn<FormData> }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Your Fitness Preferences</h2>
      <div className="grid grid-cols-2 gap-x-4 gap-y-6">
        <div className="space-y-1.5">
          <Label htmlFor="height" isRequired>Height (cm)</Label>
          <Input id="height" type="number" {...form.register("height", { valueAsNumber: true })} placeholder="Enter height - cm"/>
          {form.formState.errors.height && <p className="text-sm text-destructive mt-1">{form.formState.errors.height.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="weight" isRequired>Weight (kg)</Label>
          <Input id="weight" type="number" {...form.register("weight", { valueAsNumber: true })} placeholder="Enter Weight - kg"/>
          {form.formState.errors.weight && <p className="text-sm text-destructive mt-1">{form.formState.errors.weight.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label isRequired>Fitness Goal</Label>
          <Select onValueChange={(v) => form.setValue("fitnessGoal", v as any)} value={form.watch("fitnessGoal")}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select goal" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(goalMap).map(([k, v]) => (
                <SelectItem key={k} value={k}>{v}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {form.formState.errors.fitnessGoal && <p className="text-sm text-destructive mt-1">{form.formState.errors.fitnessGoal.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label isRequired>Fitness Level</Label>
          <Select onValueChange={(v) => form.setValue("fitnessLevel", v as any)} value={form.watch("fitnessLevel")}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(levelMap).map(([k, v]) => (
                <SelectItem key={k} value={k}>{v}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {form.formState.errors.fitnessLevel && <p className="text-sm text-destructive mt-1">{form.formState.errors.fitnessLevel.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label isRequired>Workout Location</Label>
          <Select onValueChange={(v) => form.setValue("workoutLocation", v as any)} value={form.watch("workoutLocation")}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(locationMap).map(([k, v]) => (
                <SelectItem key={k} value={k}>{v}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {form.formState.errors.workoutLocation && <p className="text-sm text-destructive mt-1">{form.formState.errors.workoutLocation.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label isRequired>Dietary Preference</Label>
          <Select onValueChange={(v) => form.setValue("dietaryPreference", v as any)} value={form.watch("dietaryPreference")}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select diet" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(dietMap).map(([k, v]) => (
                <SelectItem key={k} value={k}>{v}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {form.formState.errors.dietaryPreference && <p className="text-sm text-destructive mt-1">{form.formState.errors.dietaryPreference.message}</p>}
        </div>
      </div>
    </div>
  );
}