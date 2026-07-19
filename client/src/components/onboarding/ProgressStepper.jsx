import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export const ProgressStepper = ({ currentStep, totalSteps }) => {
  return (
    <div className="w-full flex items-center justify-between mb-8 relative">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-muted/50 w-full -z-10 rounded-full" />
      
      <motion.div 
        className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary -z-10 rounded-full origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: (currentStep - 1) / (totalSteps - 1) }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />

      {Array.from({ length: totalSteps }).map((_, index) => {
        const step = index + 1;
        const isActive = step === currentStep;
        const isCompleted = step < currentStep;

        return (
          <div key={step} className="flex flex-col items-center gap-2">
            <motion.div
              initial={false}
              animate={{
                backgroundColor: isActive || isCompleted ? 'var(--color-primary)' : 'var(--color-background)',
                borderColor: isActive || isCompleted ? 'var(--color-primary)' : 'var(--color-border)',
                color: isActive || isCompleted ? 'var(--color-primary-foreground)' : 'var(--color-muted-foreground)',
              }}
              className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-semibold z-10 transition-colors duration-300"
            >
              {isCompleted ? <Check size={14} /> : step}
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};
