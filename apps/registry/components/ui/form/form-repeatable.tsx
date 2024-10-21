"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NumericInput } from "@/components/ui/input-numeric/input-numeric";
import { Textarea } from "@/components/ui/textarea";
import { parseAsJson, useQueryState } from "nuqs";
import type { ArrayPath, Control, FieldArray, FieldValues, Path } from "react-hook-form";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useLocalStorage } from "usehooks-ts";
import { useMultiFormStep } from "./form-multistep";

interface RepeatableFormProps<T extends FieldValues> {
  control: Control<T>;
  name: ArrayPath<T>;
  components: Array<{
    type: ComponentType;
    field: string;
    placeholder?: string;
  }>;
}

type ComponentType = "Input" | "Textarea" | "NumericInput";

const componentMap: Record<ComponentType, React.ElementType> = {
  Input,
  Textarea,
  NumericInput,
};

interface FieldItem extends Record<string, unknown> {
  id: string;
}

export function RepeatableForm<T extends FieldValues>({ control, name, components }: RepeatableFormProps<T>) {
  const [, setQueryState] = useQueryState("state", parseAsJson<T>());
  const [, setStorageState] = useLocalStorage<Record<string, unknown>>("state", {});
  const { config } = useMultiFormStep();

  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });
  const { register } = useFormContext();

  const addItem = () => {
    append({} as FieldArray<T, ArrayPath<T>>);
  };

  const renderFields = fields.length > 0 ? fields : [{ id: "initial" }];

  return (
    <div className="RepeatableForm">
      {renderFields.map((field: FieldItem, index) => (
        <div key={field.id} className="flex flex-col mb-4 gap-y-3">
          {components.map((component) => {
            const ComponentType = componentMap[component.type];
            return (
              <ComponentType
                key={component.field}
                {...register(`${name}.${index}.${component.field}` as Path<T>)}
                placeholder={component.placeholder}
                className="flex-1"
              />
            );
          })}

          <div className="RepeatableForm__buttons flex justify-between mt-1">
            {renderFields.length === index + 1 ? (
              <Button onClick={addItem} type="button" variant="ghost" className="underline">
                + Add item
              </Button>
            ) : (
              <div />
            )}
            <Button
              onClick={() => {
                remove(index);
                if (config.useQueryState) {
                  setQueryState((prev) => {
                    const newState = { ...prev };
                    delete newState?.[name];
                    return newState;
                  });
                }
                if (config.useLocalStorageState) {
                  setStorageState((prev) => {
                    const newState = { ...prev };
                    delete newState?.[name];
                    return newState;
                  });
                }
              }}
              type="button"
              className="w-fit"
            >
              Remove
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
