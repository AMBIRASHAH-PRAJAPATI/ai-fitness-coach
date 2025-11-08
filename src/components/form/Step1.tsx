import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Step1({ form }: { form: any }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Tell us about yourself</h2>

      <div className="grid gap-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" {...form.register("name")} placeholder="John Doe" />
          {form.formState.errors.name && <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="age">Age</Label>
            <Input id="age" type="number" {...form.register("age", { valueAsNumber: true })} />
          </div>
          <div>
            <Label>Gender</Label>
            <Select onValueChange={(v) => form.setValue("gender", v as any)} defaultValue={form.getValues("gender")}>
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}