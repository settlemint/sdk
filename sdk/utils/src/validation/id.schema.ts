import { z } from "zod";

/**
 * Schema for validating database IDs. Accepts both PostgreSQL UUIDs and MongoDB ObjectIDs.
 * PostgreSQL UUIDs are 32 hexadecimal characters with hyphens (e.g. 123e4567-e89b-12d3-a456-426614174000).
 * MongoDB ObjectIDs are 24 hexadecimal characters (e.g. 507f1f77bcf86cd799439011).
 *
 * @example
 * import { IdSchema } from "@settlemint/sdk-utils/validation";
 *
 * // Validate PostgreSQL UUID
 * const isValidUuid = IdSchema.safeParse("123e4567-e89b-12d3-a456-426614174000").success;
 *
 * // Validate MongoDB ObjectID
 * const isValidObjectId = IdSchema.safeParse("507f1f77bcf86cd799439011").success;
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
 * Type definition for database IDs, inferred from IdSchema.
 * Can be either a PostgreSQL UUID string or MongoDB ObjectID string.
 */
export type Id = z.infer<typeof IdSchema>;
