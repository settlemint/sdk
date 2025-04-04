import { ApplicationAccessTokenSchema, UrlSchema } from "@settlemint/sdk-utils/validation";
import { z } from "zod";

/**
 * Schema for validating client options for the Portal client.
 */
export const ClientOptionsSchema = z.object({
  /** The URL of the MinIO instance to connect to */
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
  /** The access token used to authenticate with the SettleMint platform */
  accessToken: ApplicationAccessTokenSchema,
  /** The MinIO access key used to authenticate with the MinIO server */
  accessKey: z.string(),
  /** The MinIO secret key used to authenticate with the MinIO server */
  secretKey: z.string(),
});

/**
 * Type definition for server client options derived from the ServerClientOptionsSchema.
 */
export type ServerClientOptions = z.infer<typeof ServerClientOptionsSchema>;
