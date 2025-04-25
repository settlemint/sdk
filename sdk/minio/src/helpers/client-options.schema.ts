import { UrlSchema } from "@settlemint/sdk-utils/validation";
import { z } from "zod";

/**
 * Schema for validating server client options for the MinIO client.
 */
export const ServerClientOptionsSchema = z.object({
  /** The URL of the MinIO instance to connect to */
  instance: UrlSchema,
  /** The MinIO access key used to authenticate with the MinIO server */
  accessKey: z.string(),
  /** The MinIO secret key used to authenticate with the MinIO server */
  secretKey: z.string(),
});

/**
 * Type definition for server client options derived from the ServerClientOptionsSchema.
 */
export type ServerClientOptions = z.infer<typeof ServerClientOptionsSchema>;
