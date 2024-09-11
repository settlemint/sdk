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

  const [state, setState] = useQueryState("state", parseAsJson<Record<string, unknown>>());
  const [isNavigate, setIsNavigate] = useState(true);
  const pageRef = useRef<number | null>(null);
  const page = pageRef.current ?? currentStep ?? 1;

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (pageRef.current === null) {
      pageRef.current = registerFormPage();
    }
  }, [registerFormPage]);

  const fieldValues = useWatch({
    control: form.control,
    name: fields,
  });

  const isValidPage =
    page === currentStep &&
    fields
      .map((field) => {
        const fieldState = form.getFieldState(field);
        return !fieldState.invalid;
      })
      .every((isValid) => isValid);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setIsNavigate(false);
    const navigationEntry = window.performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
    const navigationType = navigationEntry?.type;
    async function triggerFields() {
      page === currentStep && (await form.trigger(fields));
      const validFields = fields.map((field) => {
        const fieldState = form.getFieldState(field);
        return !fieldState.invalid;
      });
      const isValid = validFields.every((isValid) => isValid);
      return isValid;
    }

    if (navigationType === "reload") {
      triggerFields().then((isValid) => {
        page === currentStep && setIsValid(isValid);
      });
      const validFields = fields.map((field) => {
        const fieldState = form.getFieldState(field);
        return !fieldState.invalid;
      });
      const isValid = validFields.every((isValid) => isValid);
      page === currentStep && setIsValid(isValid);
    }
  }, []);

  useEffect(() => {
    const navigationEntry = window.performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
    const navigationType = navigationEntry?.type;

    if (navigationType === "navigate") {
      setIsNavigate(true);
      const validFields = fields.map((field) => {
        const fieldState = form.getFieldState(field);
        return !fieldState.invalid;
      });

      const dirtyFields = fields.map((field) => {
        const fieldState = form.getFieldState(field);
        return fieldState.isDirty;
      });

      const isValid = validFields.every((isValid) => isValid);
      const isDirty = dirtyFields.length > 0 ? dirtyFields.every((isDirty) => isDirty) : true;
      page === currentStep && setIsValid(isValid && isDirty);
    }
  }, [fields, form, page, currentStep, state]);

  useEffect(() => {
    if (config.useQueryState) {
      const fieldState = Object.fromEntries(fields.map((key, index) => [key, fieldValues[index]]));
      page === currentStep && setState((prevState) => ({ ...prevState, ...fieldState }));
    }
  }, [fields, fieldValues, setState, page, currentStep, config.useQueryState]);

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
          disabled={(!isValid && isNavigate) || (!isValidPage && !isNavigate)}
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
