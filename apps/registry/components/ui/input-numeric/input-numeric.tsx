import * as React from "react";

import { Input } from "@/components/ui/input";
import { Controller } from "react-hook-form";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const NumericInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, name = "", placeholder = "", ...props }, ref) => {
    return (
      <Controller
        name={name}
        render={({ field }) => {
          const _value = field.value === "" ? 0 : Number(field.value);
          return (
            <Input
              {...field}
              {...props}
              ref={ref}
              name={field.name}
              type="number"
              placeholder={placeholder}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value === "" ? "" : Number(e.target.value);
                field.onChange(value);
              }}
              value={Number.isNaN(_value) ? 0 : _value}
              className={className}
            />
          );
        }}
      />
    );
  },
);
NumericInput.displayName = "NumericInput";

export { NumericInput };
