"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { useWatch } from "react-hook-form"; // Add this import
import { useMultiFormStep } from "./form-multistep";

export const FormPage: React.FC<{ title?: string; fields: string[]; children: React.ReactNode }> = ({
  title,
  fields = [],
  children,
}) => {
  const { currentStep, nextStep, prevStep, totalSteps, registerFormPage, form } = useMultiFormStep();
  const pageRef = useRef<number | null>(null);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (pageRef.current === null) {
      pageRef.current = registerFormPage();
    }
  }, [registerFormPage]);

  const page = pageRef.current ?? 1;

  useWatch({
    control: form.control,
    name: fields,
  });

  useEffect(() => {
    console.log("fields", fields);
    console.log("form", form.formState);
    const isValid = fields.every((field) => {
      const fieldState = form.getFieldState(field);
      console.log("fieldState", field, fieldState);
      return fieldState.isDirty && !fieldState.invalid;
    });
    setIsValid(isValid);
  }, [fields, form]);

  console.log("isValid", isValid);
  return (
    <div className={`${cn("FormPage space-y-4", { hidden: page !== currentStep })}`}>
      {title && <h3>{title}</h3>}
      {children}
      <div className="flex gap-x-4 !mt-16 justify-end">
        <Button type="button" className={cn({ hidden: currentStep === 1 })} onClick={() => prevStep()}>
          Back
        </Button>
        <Button
          type="button"
          className={cn({ hidden: currentStep === totalSteps })}
          disabled={!isValid}
          onClick={() => {
            if (isValid) {
              nextStep();
            }
          }}
        >
          Continue
        </Button>

        <Button type="submit" className={cn({ hidden: currentStep !== totalSteps })}>
          Submit
        </Button>
      </div>
    </div>
  );
};
