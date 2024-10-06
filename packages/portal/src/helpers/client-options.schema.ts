import { AccessTokenSchema, UrlSchema } from "@settlemint/sdk-utils/validation";
import { z } from "zod";

/**
 * Schema for validating client options for the Portal client.
 */
export const ClientOptionsSchema = z.object({
  instance: UrlSchema,
});

/**
 * Type definition for client options derived from the ClientOptionsSchema.
 */
export type ClientOptions = z.infer<typeof ClientOptionsSchema>;

/**
 * Schema for validating server client options for the Portal client.
 * Extends the ClientOptionsSchema with additional server-specific fields.
 */
export const ServerClientOptionsSchema = ClientOptionsSchema.extend({
  accessToken: AccessTokenSchema,
});

/**
 * Type definition for server client options derived from the ServerClientOptionsSchema.
 */
export type ServerClientOptions = z.infer<typeof ServerClientOptionsSchema>;
