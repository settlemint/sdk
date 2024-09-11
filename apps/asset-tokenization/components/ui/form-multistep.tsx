"use client";

import { parseAsInteger, useQueryState } from "nuqs";
import { createContext, useCallback, useContext, useRef, useState } from "react";

type FormMultiStepConfig = {
  useLocalStorageState?: boolean;
  useQueryState?: boolean;
  useQueryStateComponent?: "Form" | "FormPage";
};

interface FormMultiStepContextType {
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  totalSteps: number;
  setTotalSteps: React.Dispatch<React.SetStateAction<number>>;
  registerFormPage: () => number;
  config: FormMultiStepConfig;
}

const FormMultiStepContext = createContext<FormMultiStepContextType | undefined>(undefined);

export const FormMultiStepProvider = ({
  children,
  config = { useLocalStorageState: false, useQueryState: false, useQueryStateComponent: "FormPage" },
}: React.PropsWithChildren<{
  config: FormMultiStepConfig;
}>) => {
  const [currentStep, setCurrentStep] = useQueryState("currentStep", parseAsInteger.withDefault(1));
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
        config,
      }}
    >
      {children}
    </FormMultiStepContext.Provider>
  );
};

export const useMultiFormStep = (): FormMultiStepContextType => {
  const context = useContext(FormMultiStepContext);
  if (!context) {
    throw new Error("useMultiFormStep must be used within a FormMultiStepProvider");
  }
  return context;
};
