"use client";

import { NumericInput } from "@/components/ui/input-numeric";
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

export function RepeatableForm<T extends FieldValues>({ control, name, components }: RepeatableFormProps<T>) {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });
  const { register } = useFormContext();

  const addItem = () => {
    append({ walletAddress: "", amount: 0, ID: "" } as FieldArray<T, ArrayPath<T>>);
  };

  const renderFields = fields.length > 0 ? fields : [{ id: "initial" }];

  return (
    <div className="RepeatableForm">
      {renderFields.map((field, index) => (
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
            <Button onClick={() => remove(index)} type="button" className="w-fit">
              Remove
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
