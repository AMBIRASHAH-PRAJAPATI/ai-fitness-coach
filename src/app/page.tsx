'use client';

import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Step1 from "@/components/form/Step1";
import Step2 from "@/components/form/Step2";
import Step3 from "@/components/form/Step3";
import ProgressSteps from "@/components/form/ProgressSteps";
import LoadingModal from "@/components/LoadingModal";
import DailyQuoteCard from "@/components/DailyQuoteCard";
import { useFormSteps } from "./hooks/useFormSteps";
import { useRouter } from "next/navigation";
import { formSchema, FormData, FitnessPlan } from "@/lib/types";
import QuoteSkeleton from "@/components/QuoteSkeleton";

export default function Home() {
  const { step, next, prev } = useFormSteps();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      age: 25,
      gender: "male",
      height: 170,
      weight: 70,
      fitnessGoal: "weight_loss",
      fitnessLevel: "beginner",
      workoutLocation: "home",
      dietaryPreference: "non-veg",
      medicalHistory: "",
      stressLevel: "medium",
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to generate plan");

      const plan: FitnessPlan = await res.json();
      localStorage.setItem("fitnessPlan", JSON.stringify(plan));
      router.push("/plan");
    } catch (err) {
      alert("Sorry, something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
<Suspense fallback={<QuoteSkeleton />}>
  <DailyQuoteCard />
</Suspense>
      <div className="max-w-2xl mx-auto">
        <ProgressSteps current={step} />

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -300, opacity: 0 }}>
                <Step1 form={form} />
              </motion.div>
            )}
            {step === 2 && (
              <motion.div key="step2" initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -300, opacity: 0 }}>
                <Step2 form={form} />
              </motion.div>
            )}
            {step === 3 && (
              <motion.div key="step3" initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -300, opacity: 0 }}>
                <Step3 form={form} />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between mt-8">
            {step > 1 && (
              <Button type="button" variant="outline" onClick={prev}>
                Previous
              </Button>
            )}
            {step < 3 ? (
              <Button type="button" onClick={next} className="ml-auto">
                Next
              </Button>
            ) : (
              <Button type="submit" className="ml-auto">
                Generate My Plan
              </Button>
            )}
          </div>
        </form>
      </div>

      <LoadingModal open={loading} />
    </>
  );
}