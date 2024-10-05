import { ZodError, type ZodSchema, z } from "zod";

/**
 * Schema for validating access tokens.
 */
const AccessTokenSchema = z.string().regex(/^btp_pat_.*|btp_aat_.*$/);

/**
 * Schema for validating URLs.
 */
const UrlSchema = z.string().url();

/**
 * Schema for validating IDs. Accepts both PostgreSQL UUIDs and MongoDB ObjectIDs.
 */
export const IdSchema = z.union([
  z
    .string()
    .uuid(), // PostgreSQL UUID
  z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/), // MongoDB ObjectID
]);

/**
 * Type definition for ID, inferred from IdSchema.
 */
export type Id = z.infer<typeof IdSchema>;

/**
 * Schema for validating SettleMint client options.
 */
export const SettleMintClientOptionsSchema = z.object({
  accessToken: AccessTokenSchema,
  instance: UrlSchema,
});

/**
 * Type definition for SettleMint client options, inferred from SettleMintClientOptionsSchema.
 */
export type SettleMintClientOptions = z.infer<typeof SettleMintClientOptionsSchema>;

/**
 * Validates a value against a given Zod schema.
 *
 * @param schema - The Zod schema to validate against.
 * @param value - The value to validate.
 * @returns The validated and parsed value.
 * @throws Will throw an error if validation fails, with formatted error messages.
 *
 * @example
 * const validatedId = validate(IdSchema, "550e8400-e29b-41d4-a716-446655440000");
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
