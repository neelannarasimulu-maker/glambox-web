"use client";

import { cn } from "@/lib/cn";

export type StepperProps = {
  steps: string[];
  currentStep: number;
};

const Stepper = ({ steps, currentStep }: StepperProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs text-white/60">
        <span>
          Step {currentStep} of {steps.length}
        </span>
        <span>{steps[currentStep - 1]}</span>
      </div>
      <div className="flex gap-2">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          return (
            <div
              key={step}
              className={cn(
                "h-1.5 flex-1 rounded-full",
                stepNumber <= currentStep
                  ? "bg-gradient-to-r from-pink-400 via-violet-400 to-cyan-300"
                  : "bg-white/10",
              )}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
