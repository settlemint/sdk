import { z } from "zod/v4";

/**
 * Schema for validating URLs.
 *
 * @example
 * import { UrlSchema } from "@settlemint/sdk-utils/validation";
 *
 * // Validate a URL
 * const isValidUrl = UrlSchema.safeParse("https://console.settlemint.com").success;
 * // true
 *
 * // Invalid URLs will fail validation
 * const isInvalidUrl = UrlSchema.safeParse("not-a-url").success;
 * // false
 */
export const UrlSchema = z.string().url();
export type Url = z.infer<typeof UrlSchema>;

/**
 * Schema for validating URL paths.
 *
 * @example
 * import { UrlPathSchema } from "@settlemint/sdk-utils/validation";
 *
 * // Validate a URL path
 * const isValidPath = UrlPathSchema.safeParse("/api/v1/users").success;
 * // true
 *
 * // Invalid paths will fail validation
 * const isInvalidPath = UrlPathSchema.safeParse("not-a-path").success;
 * // false
 */
export const UrlPathSchema = z.string().regex(/^\/(?:[a-zA-Z0-9-_]+(?:\/[a-zA-Z0-9-_]+)*\/?)?$/, {
  message: "Invalid URL path format. Must start with '/' and can contain letters, numbers, hyphens, and underscores.",
});

export type UrlPath = z.infer<typeof UrlPathSchema>;

/**
 * Schema that accepts either a full URL or a URL path.
 *
 * @example
 * import { UrlOrPathSchema } from "@settlemint/sdk-utils/validation";
 *
 * // Validate a URL
 * const isValidUrl = UrlOrPathSchema.safeParse("https://console.settlemint.com").success;
 * // true
 *
 * // Validate a path
 * const isValidPath = UrlOrPathSchema.safeParse("/api/v1/users").success;
 * // true
 */
export const UrlOrPathSchema = z.union([UrlSchema, UrlPathSchema]);
export type UrlOrPath = z.infer<typeof UrlOrPathSchema>;
