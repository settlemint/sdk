/**
 * Type validation utility using Zod
 */
import { z } from "zod";

// Re-export Zod's infer type to maintain API compatibility
export type Static<T extends z.ZodType> = z.infer<T>;

// Simple wrapper around Zod to maintain API compatibility
export const t = {
  String: (options: { format?: string } = {}): z.ZodString => {
    let schema = z.string();
    if (options.format === "date-time") {
      schema = schema.datetime();
    } else if (options.format === "uri") {
      schema = schema.url();
    }
    return schema;
  },

  Number: (): z.ZodNumber => {
    return z.number();
  },

  Boolean: (): z.ZodBoolean => {
    return z.boolean();
  },

  Object: <T extends Record<string, z.ZodType>>(shape: T, options: { $id?: string } = {}): z.ZodObject<T> => {
    // Zod doesn't use $id, we just use it for API compatibility
    return z.object(shape);
  },

  Array: <T extends z.ZodType>(items: T): z.ZodArray<T> => {
    return z.array(items);
  },

  Optional: <T extends z.ZodType>(schema: T): z.ZodOptional<T> => {
    return schema.optional();
  },
};

/**
 * Validate data against a schema
 *
 * @param schema The Zod schema to validate against
 * @param value The value to validate
 * @returns The validated and typed value
 * @throws Will throw an error if validation fails
 */
export function validate<T extends z.ZodType>(schema: T, value: unknown): Static<T> {
  return schema.parse(value);
}
