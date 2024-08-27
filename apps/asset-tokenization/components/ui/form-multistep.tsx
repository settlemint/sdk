"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";
import type { UseFormReturn } from "react-hook-form";

interface FormMultiStepContextType<TFieldValues extends Record<string, unknown>> {
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  totalSteps: number;
  setTotalSteps: React.Dispatch<React.SetStateAction<number>>;
  registerFormPage: () => number;
  form: UseFormReturn<TFieldValues>;
}

const FormMultiStepContext = createContext<FormMultiStepContextType<Record<string, unknown>> | undefined>(undefined);

export const FormMultiStepProvider = <TFieldValues extends Record<string, unknown>>({
  children,
  form,
}: React.PropsWithChildren<{ form: UseFormReturn<TFieldValues> }>) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [totalSteps, setTotalSteps] = useState(1);
  const pageCounterRef = useRef(1);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));
  const goToStep = (step: number) => setCurrentStep(Math.min(Math.max(step, 0), totalSteps - 1));

  const registerFormPage = useCallback(() => {
    const pageNumber = pageCounterRef.current;
    setTotalSteps((prev) => Math.max(prev, pageNumber));
    pageCounterRef.current += 1;
    return pageNumber;
  }, []);

  console.log("form", form.formState.errors);

  return (
    <FormMultiStepContext.Provider
      value={{
        currentStep,
        nextStep,
        prevStep,
        goToStep,
        totalSteps,
        setTotalSteps,
        registerFormPage,
        form: form as UseFormReturn<Record<string, unknown>>,
      }}
    >
      {children}
    </FormMultiStepContext.Provider>
  );
};

export const useMultiFormStep = <
  TFieldValues extends Record<string, unknown>,
>(): FormMultiStepContextType<TFieldValues> => {
  const context = useContext(FormMultiStepContext);
  if (!context) {
    throw new Error("useMultiFormStep must be used within a FormMultiStepProvider");
  }
  return context as FormMultiStepContextType<TFieldValues>;
};
