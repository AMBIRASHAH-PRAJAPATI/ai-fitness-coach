import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Step3({ form }: { form: any }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Optional Details</h2>

      <div className="space-y-4">
        <div>
          <Label htmlFor="medicalHistory">Medical History (optional)</Label>
          <Textarea
            id="medicalHistory"
            {...form.register("medicalHistory")}
            placeholder="e.g., knee injury, asthma"
            rows={3}
          />
        </div>

        <div>
          <Label>Stress Level</Label>
          <Select onValueChange={(v) => form.setValue("stressLevel", v as any)}>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
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