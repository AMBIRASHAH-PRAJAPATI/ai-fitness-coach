'use client';

import { Suspense, useState, useEffect } from "react";
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
import FormSkeleton from "@/components/form/FormSkeleton";
import { fetchAndSavePlan } from "@/lib/planApi";

const emptyDefaults: FormData = {
  name: "",
  age: "" as any,
  gender: "" as any,
  height: "" as any,
  weight: "" as any,
  fitnessGoal: "" as any,
  fitnessLevel: "" as any,
  workoutLocation: "" as any,
  dietaryPreference: "" as any,
  medicalHistory: "",
  stressLevel: "" as any,
};

export default function Home() {
  const { step, next, prev } = useFormSteps();
  const [loading, setLoading] = useState(false);
  const [isFormInitialized, setIsFormInitialized] = useState(false);
  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  useEffect(() => {
    const storedData = localStorage.getItem("formData");
    let initialValues = emptyDefaults;

    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        initialValues = { ...emptyDefaults, ...parsedData };
      } catch (e) {
        console.error("Failed to parse form data, using empty defaults", e);
      }
    }
    form.reset(initialValues);
    setIsFormInitialized(true);
  }, [form]);
  const handleNext = async () => {
    let fields: (keyof FormData)[] = [];
    if (step === 1) {
      fields = ["name", "age", "gender"];
    } else if (step === 2) {
      fields = ["height", "weight", "fitnessGoal", "fitnessLevel", "workoutLocation", "dietaryPreference"];
    }
    const isStepValid = await form.trigger(fields);
    if (isStepValid) {
      next();
    }
  };
  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await fetchAndSavePlan(data);
      router.push("/plan");
    } catch (err) {
      console.error("Failed to generate plan:", err);
      alert("Sorry, something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isFormInitialized) {
    return (
      <>
        <Suspense fallback={<QuoteSkeleton />}>
          <DailyQuoteCard />
        </Suspense>
        <div className="max-w-2xl mx-auto bg-card text-card-foreground rounded-xl border p-6 shadow-sm">
          <FormSkeleton />
        </div>
      </>
    );
  }

  return (
    <>
      <Suspense fallback={<QuoteSkeleton />}>
        <DailyQuoteCard />
      </Suspense>
      <div className="max-w-2xl mx-auto bg-card text-card-foreground rounded-xl border p-6 shadow-sm">
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
              <Button type="button" onClick={(e) => {
                e.preventDefault()
                handleNext()
              }} className="ml-auto">
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