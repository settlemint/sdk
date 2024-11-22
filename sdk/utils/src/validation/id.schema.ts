import { z } from "zod";
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
