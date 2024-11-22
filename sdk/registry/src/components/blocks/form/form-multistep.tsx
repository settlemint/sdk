"use client";

import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

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
  formId: string;
}

const FormMultiStepContext = createContext<FormMultiStepContextType | undefined>(undefined);

export const FormMultiStepProvider = ({
  children,
  config = { useLocalStorageState: false, useQueryState: false, useQueryStateComponent: "FormPage" },
  formId,
}: React.PropsWithChildren<{
  config: FormMultiStepConfig;
  formId: string;
}>) => {
  const [currentStep, setCurrentStep] = useQueryState("currentStep", parseAsInteger.withDefault(1));
  const [, setFormId] = useQueryState("formId", parseAsString.withDefault(formId));
  const [totalSteps, setTotalSteps] = useState<number>(1);
  const pageCounterRef = useRef(1);

  if (config.useLocalStorageState === false) {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("state");
    }
  }

  useEffect(() => {
    setFormId(formId);
  }, [setFormId, formId]);

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
        formId: formId,
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
