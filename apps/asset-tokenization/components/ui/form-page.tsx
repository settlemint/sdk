"use client";

import type { TokenizationWizardFormPageFields } from "@/components/features/tokenization-wizard.validator";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { parseAsJson, useQueryState } from "nuqs";
import { useEffect, useRef, useState } from "react";
import { useWatch } from "react-hook-form";
import { useMultiFormStep } from "./form-multistep";

export const FormPage = <T extends TokenizationWizardFormPageFields[]>({
  title,
  fields,
  children,
}: {
  title?: string;
  fields: T;
  children: React.ReactNode;
}) => {
  const { currentStep, nextStep, prevStep, totalSteps, registerFormPage, form, config } = useMultiFormStep();

  const [fieldState, setFieldState] = useQueryState("state", parseAsJson<Record<string, unknown>>());
  const pageRef = useRef<number | null>(null);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (pageRef.current === null) {
      pageRef.current = registerFormPage();
    }
  }, [registerFormPage]);

  const page = pageRef.current ?? currentStep ?? 1;

  const fieldValues = useWatch({
    control: form.control,
    name: fields,
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (config.useQueryState) {
      //  page === currentStep && form.trigger(fields);
    }
  }, []);

  useEffect(() => {
    const validFields = fields.map((field) => {
      const fieldState = form.getFieldState(field);
      return !fieldState.invalid;
    });

    const dirtyFields = fields.map((field) => {
      const fieldState = form.getFieldState(field);
      return fieldState.isDirty;
    });

    const isValid = validFields.every((isValid) => isValid);
    const isDirty = dirtyFields.length > 0 ? dirtyFields.some((isDirty) => isDirty) : true;
    page === currentStep && setIsValid(isValid && isDirty);
  }, [fields, form, page, currentStep]);

  useEffect(() => {
    if (config.useQueryState) {
      const fieldState = Object.fromEntries(fields.map((key, index) => [key, fieldValues[index]]));
      page === currentStep && setFieldState(fieldState);
    }
  }, [fields, fieldValues, setFieldState, page, currentStep, config.useQueryState]);

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

        <Button type="submit" className={cn({ hidden: currentStep !== totalSteps })} disabled={!form.formState.isValid}>
          Submit
        </Button>
      </div>
    </div>
  );
};
