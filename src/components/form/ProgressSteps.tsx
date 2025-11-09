import { Check } from "lucide-react";
import { motion } from "framer-motion";
import React from "react"; 

interface ProgressStepsProps {
  current: number;
}

const steps = ["Basic Info", "Preferences", "Details"];

export default function ProgressSteps({ current }: ProgressStepsProps) {
  return (
    <div className="flex items-start justify-between mb-8">
      {steps.map((label, i) => (
        <React.Fragment key={i}>
          <div className="flex items-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: current >= i + 1 ? 1 : 0.8 }}
              className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold text-sm ${
                current > i + 1
                  ? "bg-primary text-primary-foreground"
                  : current === i + 1
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {current > i + 1 ? <Check className="h-5 w-5" /> : i + 1}
            </motion.div>
            <div className="ml-2 hidden sm:block text-sm font-medium">
              {label}
            </div>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`flex-1 h-1 mx-4 mt-5 ${ 
                current > i + 1 ? "bg-primary" : "bg-muted"
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}