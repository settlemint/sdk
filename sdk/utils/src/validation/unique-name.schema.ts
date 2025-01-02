import { z } from "zod";
/**
 * Schema for validating unique names. Only accepts lowercase alphanumeric characters.
 */
export const UniqueNameSchema = z.string().regex(/^[a-z0-9-]+$/);
