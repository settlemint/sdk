"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "./button";
import { Input } from "./input";

export function RepeatableForm() {
  const methods = useForm({
    defaultValues: {
      records: [{ wallet: "", amount: "" }],
    },
  });
  const { control } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "records",
  });

  return (
    <div>
      {fields.map((field, index) => (
        <div key={field.id} className="mb-4 flex space-x-2">
          <Input {...{ control, name: `records.${index}.wallet` }} placeholder="Wallet" className="flex-1" />
          <Input
            {...{ control, name: `records.${index}.amount` }}
            type="number"
            placeholder="Amount"
            className="flex-1"
          />
          <Button onClick={() => remove(index)} type="button" className="ml-2">
            Remove
          </Button>
        </div>
      ))}
      <Button onClick={() => append({ wallet: "", amount: "" })} type="button">
        Add
      </Button>
    </div>
  );
}
