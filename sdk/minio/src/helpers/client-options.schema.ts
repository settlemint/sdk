import { z } from "zod";

/**
 * Schema for validating client options for the MinIO client.
 */
export const ClientOptionsSchema = z.object({
  /** The URL of the MinIO instance to connect to */
  instance: z.string().url(),
});

/**
 * Type definition for client options derived from the ClientOptionsSchema.
 */
export type ClientOptions = z.infer<typeof ClientOptionsSchema>;

/**
 * Schema for validating server client options for the MinIO client.
 * Extends the ClientOptionsSchema with additional server-specific fields.
 */
export const ServerClientOptionsSchema = z.object({
  /** The URL of the MinIO instance to connect to */
  instance: z.string().url(),
  /** The MinIO access key used to authenticate with the MinIO server */
  accessKey: z.string(),
  /** The MinIO secret key used to authenticate with the MinIO server */
  secretKey: z.string(),
});

/**
 * Type definition for server client options derived from the ServerClientOptionsSchema.
 */
export type ServerClientOptions = z.infer<typeof ServerClientOptionsSchema>;
