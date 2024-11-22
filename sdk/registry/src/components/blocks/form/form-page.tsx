"use client";

import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { parseAsInteger, parseAsJson, useQueryState } from "nuqs";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { type FieldPath, type FieldValues, type UseFormReturn, useWatch } from "react-hook-form";
import { useLocalStorage } from "usehooks-ts";
import { useMultiFormStep } from "./form-multistep";

export const FormPage = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  title,
  form,
  fields = [],
  controls,
  withSheetClose,
  children,
}: {
  title?: string;
  form: UseFormReturn<TFieldValues>;
  fields?: TName[];
  children: React.ReactNode;
  withSheetClose?: boolean;
  controls?: {
    prev?: { buttonText: string };
    next?: { buttonText: string };
    submit?: { buttonText: string };
  };
}) => {
  const { currentStep, nextStep, prevStep, totalSteps, registerFormPage, config } = useMultiFormStep();
  const [SheetCloseWrapper, sheetCloseWrapperProps] = withSheetClose
    ? [SheetClose, { asChild: true }]
    : [React.Fragment, {}];

  // TODO: Add querySchema https://nuqs.47ng.com/docs/parsers/built-in#json
  const [, setQueryState] = useQueryState(
    "state",
    parseAsJson((value) => value as Record<string, unknown>),
  );
  const [, setStorageState] = useLocalStorage<Record<string, unknown>>("state", {});
  const [isNavigate, setIsNavigate] = useState(true);
  const pageRef = useRef<number | null>(null);
  const page = pageRef.current ?? currentStep ?? 1;

  const [, setCurrentStep] = useQueryState("currentStep", parseAsInteger.withDefault(1));

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
      if (page === currentStep) {
        await form.trigger(fields);
      }
      const validFields = fields.map((field) => {
        const fieldState = form.getFieldState(field);
        return !fieldState.invalid;
      });
      const isValid = validFields.every((isValid) => isValid);
      return isValid;
    }

    if (navigationType === "reload") {
      if (config.useQueryState && config.useQueryStateComponent === "FormPage") {
        setCurrentStep(1);
      }
      triggerFields().then((isValid) => {
        if (page === currentStep) {
          setIsValid(isValid);
        }
      });
      const validFields = fields.map((field) => {
        const fieldState = form.getFieldState(field);
        return !fieldState.invalid;
      });
      const isValid = validFields.every((isValid) => isValid);
      if (page === currentStep) {
        setIsValid(isValid);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      if (page === currentStep) {
        setIsValid(isValid && isDirty);
      }
    }
  }, [fields, form, page, currentStep]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (config.useQueryState) {
      const fieldState = Object.fromEntries(fields.map((key, index) => [key, fieldValues[index]]));
      if (page === currentStep) {
        setQueryState((prevState) => ({ ...prevState, ...fieldState }));
      }
    }
    if (config.useLocalStorageState) {
      const fieldState = Object.fromEntries(fields.map((key, index) => [key, fieldValues[index]]));
      if (page === currentStep) {
        setStorageState((prevState) => {
          return {
            ...prevState,
            ...fieldState,
          };
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldValues, setQueryState, page, currentStep, config.useQueryState]);

  return (
    <div className={`${cn("FormPage space-y-4", { hidden: page !== currentStep })}`}>
      {title && <h3>{title}</h3>}
      {children}
      <div className="flex gap-x-4 !mt-16 justify-end">
        <Button type="button" className={cn({ hidden: currentStep === 1 })} onClick={() => prevStep()}>
          {controls?.prev?.buttonText}
        </Button>
        <Button
          type="button"
          className={cn({ hidden: currentStep === totalSteps })}
          disabled={(!isValid && isNavigate) || (!isValidPage && !isNavigate)}
          onClick={() => {
            nextStep();
          }}
        >
          {controls?.next?.buttonText}
        </Button>

        <SheetCloseWrapper {...sheetCloseWrapperProps}>
          <Button
            type="submit"
            className={cn({ hidden: currentStep !== totalSteps })}
            disabled={!form.formState.isValid}
          >
            {controls?.submit?.buttonText}
          </Button>
        </SheetCloseWrapper>
      </div>
    </div>
  );
};
