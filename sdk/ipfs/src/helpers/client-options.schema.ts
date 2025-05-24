import { AccessTokenSchema, UrlSchema } from "@settlemint/sdk-utils/validation";
import { z } from "zod/v4";

/**
 * Schema for validating client options for the IPFS client.
 */
export const ClientOptionsSchema = z.object({
  /** The URL of the IPFS instance to connect to */
  instance: UrlSchema,
});

/**
 * Type definition for client options derived from the ClientOptionsSchema.
 */
export type ClientOptions = z.infer<typeof ClientOptionsSchema>;

/**
 * Schema for validating server client options for the IPFS client.
 * Extends the ClientOptionsSchema with additional server-specific fields.
 */
export const ServerClientOptionsSchema = ClientOptionsSchema.extend({
  /** The access token used to authenticate with the SettleMint platform */
  accessToken: AccessTokenSchema,
});

/**
 * Type definition for server client options derived from the ServerClientOptionsSchema.
 */
export type ServerClientOptions = z.infer<typeof ServerClientOptionsSchema>;
