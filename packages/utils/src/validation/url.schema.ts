import { z } from "zod";
/**
 * Schema for validating URLs.
 */
export const UrlSchema = z.string().url();
export type Url = z.infer<typeof UrlSchema>;
