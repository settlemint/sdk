import { z } from "zod";

/**
 * Schema for validating unique names used across the SettleMint platform.
 * Only accepts lowercase alphanumeric characters and hyphens.
 * Used for workspace names, application names, service names etc.
 *
 * @example
 * import { UniqueNameSchema } from "@settlemint/sdk-utils/validation";
 *
 * // Validate a workspace name
 * const isValidName = UniqueNameSchema.safeParse("my-workspace-123").success;
 * // true
 *
 * // Invalid names will fail validation
 * const isInvalidName = UniqueNameSchema.safeParse("My Workspace!").success;
 * // false
 */
export const UniqueNameSchema = z.string().regex(/^[a-z0-9-]+$/);

/**
 * Type definition for unique names, inferred from UniqueNameSchema.
 */
export type UniqueName = z.infer<typeof UniqueNameSchema>;
