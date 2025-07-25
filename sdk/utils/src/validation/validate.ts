import { ZodError, type ZodType } from "zod";

/**
 * Validates a value against a given Zod schema.
 *
 * @param schema - The Zod schema to validate against.
 * @param value - The value to validate.
 * @returns The validated and parsed value.
 * @throws Will throw an error if validation fails, with formatted error messages.
 *
 * @example
 * import { validate } from "@settlemint/sdk-utils/validation";
 *
 * const validatedId = validate(IdSchema, "550e8400-e29b-41d4-a716-446655440000");
 */
export function validate<T extends ZodType>(schema: T, value: unknown): T["_output"] {
  try {
    return schema.parse(value);
  } catch (error) {
    if (error instanceof ZodError) {
      const formattedErrors = error.issues.map((err) => `- ${err.path.join(".")}: ${err.message}`).join("\n");
      throw new Error(`Validation error${error.issues.length > 1 ? "s" : ""}:\n${formattedErrors}`);
    }
    throw error; // Re-throw if it's not a ZodError
  }
}
