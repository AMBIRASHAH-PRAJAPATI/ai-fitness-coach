import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { FormData } from "@/lib/types";

export default function Step3({ form }: { form: UseFormReturn<FormData> }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Optional Details</h2>
      <div className="space-y-6">
        <div className="space-y-1.5">
          <Label htmlFor="medicalHistory">Medical History (optional)</Label>
          <Textarea
            id="medicalHistory"
            {...form.register("medicalHistory")}
            placeholder="e.g., knee injury, asthma"
            rows={3}
          />
        </div>
        <div className="space-y-1.5">
          <Label>Stress Level (optional)</Label>
          <Select onValueChange={(v) => form.setValue("stressLevel", v as any)} value={form.watch("stressLevel")}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select stress level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}