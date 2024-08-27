"use client";

import type { ArrayPath, Control, FieldArray, FieldValues } from "react-hook-form";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "./button";
import { Input } from "./input";
import { Textarea } from "./textarea";

interface FormItem {
  walletAddress: string;
  amount: string;
  ID: string;
}

interface RepeatableFormProps<T extends FieldValues> {
  control: Control<T>;
  name: ArrayPath<T>;
}

export function RepeatableForm<T extends FieldValues>({ control, name }: RepeatableFormProps<T>) {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });
  const { register } = useFormContext();

  console.log("fields", fields);

  // Function to add a new item
  const addItem = () => {
    append({ walletAddress: "", amount: "", notes: "" } as FieldArray<T, ArrayPath<T>>);
  };

  // If fields is empty, render a single input set
  const renderFields = fields.length > 0 ? fields : [{ id: "initial" }];

  return (
    <div className="RepeatableForm">
      {renderFields.map((field, index) => (
        <div key={field.id} className="flex flex-col mb-4 gap-y-2">
          <Input {...register(`${name}.${index}.walletAddress`)} placeholder="Wallet" className="flex-1" />
          <Input {...register(`${name}.${index}.amount`)} type="number" placeholder="Amount" className="flex-1" />
          <Textarea {...register(`${name}.${index}.notes`)} placeholder="Notes" className="w-full" />
          <div className="RepeatableForm__buttons flex justify-between">
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
