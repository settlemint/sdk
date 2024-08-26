"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { useMultiFormStep } from "./form-multistep";

export const FormPage: React.FC<{ title?: string; page?: number; children: React.ReactNode }> = ({
  title,
  children,
}) => {
  const { currentStep, nextStep, prevStep, goToStep, totalSteps, setTotalSteps, registerFormPage } = useMultiFormStep();
  const pageRef = useRef<number | null>(null);

  useEffect(() => {
    if (pageRef.current === null) {
      pageRef.current = registerFormPage();
    }
  }, [registerFormPage]);

  const page = pageRef.current ?? 1;

  return (
    <div className={cn("FormPage space-y-4", { hidden: page !== currentStep })}>
      {title && <h3>{title}</h3>}
      {children}
      <div className="flex gap-2">
        <Button type="button" className={cn({ hidden: currentStep === 1 })} onClick={() => prevStep()}>
          Back
        </Button>
        <Button type="button" className={cn({ hidden: currentStep === totalSteps })} onClick={() => nextStep()}>
          Continue
        </Button>

        <Button type="submit" className={cn({ hidden: currentStep !== totalSteps })}>
          Submit
        </Button>
      </div>
    </div>
  );
};
