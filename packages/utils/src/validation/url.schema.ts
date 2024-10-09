import { z } from "zod";
/**
 * Schema for validating URLs.
 */
export const UrlSchema = z.string().url();
export type Url = z.infer<typeof UrlSchema>;

/**
 * Schema for validating URL paths.
 *
 * This schema ensures that the path:
 * - Starts with a forward slash
 * - Can contain letters, numbers, hyphens, underscores, and additional forward slashes
 * - Does not end with a forward slash (unless it's the root path "/")
 * - Is case-sensitive
 */
export const UrlPathSchema = z.string().regex(/^\/(?:[a-zA-Z0-9-_]+(?:\/[a-zA-Z0-9-_]+)*\/?)?$/, {
  message: "Invalid URL path format. Must start with '/' and can contain letters, numbers, hyphens, and underscores.",
});

export type UrlPath = z.infer<typeof UrlPathSchema>;

export const UrlOrPathSchema = z.union([UrlSchema, UrlPathSchema]);
export type UrlOrPath = z.infer<typeof UrlOrPathSchema>;
