import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { FormData } from "@/lib/types";

export default function Step1({ form }: { form: UseFormReturn<FormData> }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Tell us about yourself</h2>
      <div className="grid gap-6">
        <div className="space-y-1.5">
          <Label htmlFor="name" isRequired>Full Name</Label>
          <Input id="name" {...form.register("name")} placeholder="Enter Name" />
          {form.formState.errors.name && <p className="text-sm text-destructive mt-1">{form.formState.errors.name.message}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="age" isRequired>Age</Label>
            <Input id="age" type="number" {...form.register("age", { valueAsNumber: true })} placeholder="Enter age"/>
             {form.formState.errors.age && <p className="text-sm text-destructive mt-1">{form.formState.errors.age.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label isRequired>Gender</Label>
            <Select onValueChange={(v) => form.setValue("gender", v as any)} value={form.watch("gender")}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.gender && <p className="text-sm text-destructive mt-1">{form.formState.errors.gender.message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}