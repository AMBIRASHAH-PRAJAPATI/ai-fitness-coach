import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const goalMap: Record<string, string> = {
  weight_loss: "Lose Weight",
  muscle_gain: "Gain Muscle",
  improve_endurance: "Improve Endurance",
  maintain_fitness: "Maintain Fitness",
  flexibility: "Improve Flexibility",
};

const levelMap = { beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced" };
const locationMap = { home: "Home", gym: "Gym", outdoor: "Outdoor" };
const dietMap = { veg: "Vegetarian", "non-veg": "Non-Veg", vegan: "Vegan", keto: "Keto" };

export default function Step2({ form }: { form: any }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Your Fitness Preferences</h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="height">Height (cm)</Label>
          <Input id="height" type="number" {...form.register("height", { valueAsNumber: true })} />
        </div>
        <div>
          <Label htmlFor="weight">Weight (kg)</Label>
          <Input id="weight" type="number" {...form.register("weight", { valueAsNumber: true })} />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Fitness Goal</Label>
          <Select onValueChange={(v) => form.setValue("fitnessGoal", v as any)}>
            <SelectTrigger>
              <SelectValue placeholder="Select goal" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(goalMap).map(([k, v]) => (
                <SelectItem key={k} value={k}>{v}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Fitness Level</Label>
            <Select onValueChange={(v) => form.setValue("fitnessLevel", v as any)}>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                {Object.entries(levelMap).map(([k, v]) => (
                  <SelectItem key={k} value={k}>{v}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Workout Location</Label>
            <Select onValueChange={(v) => form.setValue("workoutLocation", v as any)}>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                {Object.entries(locationMap).map(([k, v]) => (
                  <SelectItem key={k} value={k}>{v}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Dietary Preference</Label>
            <Select onValueChange={(v) => form.setValue("dietaryPreference", v as any)}>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                {Object.entries(dietMap).map(([k, v]) => (
                  <SelectItem key={k} value={k}>{v}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}