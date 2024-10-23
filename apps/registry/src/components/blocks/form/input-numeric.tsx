import { Input } from "@/components/ui/input";
import { type InputHTMLAttributes, forwardRef } from "react";
import { Controller } from "react-hook-form";

const NumericInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
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
