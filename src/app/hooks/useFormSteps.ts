import { useState } from "react";

export type Step = 1 | 2 | 3;

export function useFormSteps(initial: Step = 1) {
  const [step, setStep] = useState<Step>(initial);

  const next = () => setStep((prev) => (prev < 3 ? (prev + 1) as Step : prev));
  const prev = () => setStep((prev) => (prev > 1 ? (prev - 1) as Step : prev));
  const goTo = (s: Step) => setStep(s);

  return { step, next, prev, goTo, setStep };
}