"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { parseAsJson, useQueryState } from "nuqs";
import { useEffect, useMemo, useRef } from "react";
import { type FieldPath, type FieldValues, type UseFormReturn, useWatch } from "react-hook-form"; // Add this import
import { useMultiFormStep } from "./form-multistep";

export const FormPage = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  title,
  form,
  fields = [],
  children,
}: {
  title?: string;
  form: UseFormReturn<TFieldValues>;
  fields?: TName[];
  children: React.ReactNode;
}) => {
  const { currentStep, nextStep, prevStep, totalSteps, registerFormPage } = useMultiFormStep();

  const [fieldState, setFieldState] = useQueryState("state", parseAsJson<Record<string, unknown>>());
  const pageRef = useRef<number | null>(null);

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
      for (const field of fields) {
        page === currentStep && fieldState?.[field] && form.trigger(field);
      }
    }
  }, []);

  const isValid = useMemo(() => {
    if (page !== currentStep) {
      return true;
    }
    const isInvalid = fields.some((field) => {
      const fieldState = form.getFieldState(field);
      return fieldState.invalid;
    });
    return !isInvalid;
  }, [fields, form, page, currentStep]);

  useEffect(() => {
    if (config.useQueryState) {
      const fieldState = Object.fromEntries(fields.map((key, index) => [key, fieldValues[index]]));
      page === currentStep && setFieldState(fieldState);
    }
  }, [fields, fieldValues, setFieldState, page, currentStep, config.useQueryState]);

  return (
    <div
      className={`${cn("FormPage space-y-4", {
        hidden: page !== currentStep,
      })}`}
    >
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
