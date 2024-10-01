import { ZodError, type ZodSchema } from "zod";

/**
 * Validates the given value against the provided Zod schema.
 * @param schema The Zod schema to validate against.
 * @param value The value to validate.
 * @returns The validated and parsed data if successful.
 * @throws {Error} If validation fails, with a formatted error message.
 */
export function validate<T extends ZodSchema>(schema: T, value: unknown): T["_output"] {
  try {
    return schema.parse(value);
  } catch (error) {
    if (error instanceof ZodError) {
      const formattedErrors = error.errors.map((err) => `- ${err.path.join(".")}: ${err.message}`).join("\n");
      throw new Error(`Validation error(s):\n${formattedErrors}`);
    }
    throw error; // Re-throw if it's not a ZodError
  }
}
