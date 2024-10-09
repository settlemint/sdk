import { AccessTokenSchema, UrlOrPathSchema, UrlSchema } from "@settlemint/sdk-utils/validation";
import { z } from "zod";

/**
 * Schema for validating client options for the Hasura client.
 */
export const ClientOptionsSchema = z.object({
  instance: UrlOrPathSchema,
});

/**
 * Type definition for client options derived from the ClientOptionsSchema.
 */
export type ClientOptions = z.infer<typeof ClientOptionsSchema>;

/**
 * Schema for validating server client options for the Hasura client.
 * Extends the ClientOptionsSchema with additional server-specific fields.
 */
export const ServerClientOptionsSchema = ClientOptionsSchema.extend({
  instance: UrlSchema,
  accessToken: AccessTokenSchema,
  adminSecret: z.string(),
});

/**
 * Type definition for server client options derived from the ServerClientOptionsSchema.
 */
export type ServerClientOptions = z.infer<typeof ServerClientOptionsSchema>;
