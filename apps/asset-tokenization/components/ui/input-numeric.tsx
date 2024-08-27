import * as React from "react";

import { Controller } from "react-hook-form";
import { Input } from "./input";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const NumericInput = React.forwardRef<HTMLInputElement, InputProps>(({ className, name = "", placeholder = "" }) => {
  return (
    <Controller
      name={name}
      render={({ field }) => (
        <Input
          {...field}
          type="number"
          placeholder={placeholder}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value === "" ? "" : Number(e.target.value);
            field.onChange(value);
          }}
          value={field.value === "" ? "" : Number(field.value)}
          className={className}
        />
      )}
    />
  );
});
NumericInput.displayName = "NumericInput"; // Fixed displayName

export { NumericInput }; // Export NumericInput instead of Input
