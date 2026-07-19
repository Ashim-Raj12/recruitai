import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialState = {
  currentStep: 1,
  careerGoal: '',
  experienceLevel: '',
  skills: [],
  targetCompanies: [],
  targetSalary: 100000,
  resumeFile: null,
  careerGoalsText: '',
};

export const useOnboardingStore = create(
  persist(
    (set) => ({
      ...initialState,
      setStep: (step) => set({ currentStep: step }),
      nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 8) })),
      prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),
      updateField: (field, value) => set({ [field]: value }),
      resetOnboarding: () => set(initialState),
    }),
    {
      name: 'onboarding-storage', // name of the item in the storage (must be unique)
      partialize: (state) => Object.fromEntries(
        Object.entries(state).filter(([key]) => key !== 'resumeFile') // don't persist files
      ),
    }
  )
);
