"use client";

import type { ArrayPath, Control, FieldArray, FieldValues, Path } from "react-hook-form";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
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
    append({ walletAddress: "", amount: 0, ID: "" } as FieldArray<T, ArrayPath<T>>);
  };

  // If fields is empty, render a single input set
  const renderFields = fields.length > 0 ? fields : [{ id: "initial" }];

  return (
    <div className="RepeatableForm">
      {renderFields.map((field, index) => (
        <div key={field.id} className="flex flex-col mb-4 gap-y-3">
          <Input {...register(`${name}.${index}.walletAddress`)} placeholder="Wallet" className="flex-1" />
          <Controller
            name={`${name}.${index}.amount` as Path<T>}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="number"
                placeholder="Amount"
                className="flex-1"
                onChange={(e) => field.onChange(Number(e.target.valueAsNumber))}
              />
            )}
          />
          <Textarea {...register(`${name}.${index}.ID`)} placeholder="ID" className="w-full" />
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
