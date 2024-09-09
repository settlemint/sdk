"use client";

import { NumericInput } from "@/components/ui/input-numeric";
import { parseAsJson, useQueryState } from "nuqs";
import { useState } from "react";
import type { ArrayPath, Control, FieldArray, FieldValues, Path } from "react-hook-form";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "./button";
import { Input } from "./input";
import { Textarea } from "./textarea";

interface RepeatableFormProps<T extends FieldValues> {
  control: Control<T>;
  name: ArrayPath<T>;
  components: Array<{ type: ComponentType; field: string; placeholder?: string }>;
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
  const [state, setState] = useQueryState("state", parseAsJson<T>());

  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });
  const { register } = useFormContext();
  const [isCleared, setIsCleared] = useState(false);

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
                // renderFields.length === 1 && addItem();
                //       renderFields.length === 1 && setIsCleared((prev) => !prev);
                remove(index);
                setState((prev) => {
                  console.log("state", state);
                  const newState = { ...prev };
                  delete newState?.[name];
                  console.log("newState", prev, newState);
                  return newState;
                });
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
