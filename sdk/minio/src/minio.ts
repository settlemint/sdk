import { ensureServer } from "@settlemint/sdk-utils/runtime";
import { validate } from "@settlemint/sdk-utils/validation";
import { Client } from "minio";
import { type ServerClientOptions, ServerClientOptionsSchema } from "./helpers/client-options.schema.js";

/**
 * Creates a MinIO client for server-side use with authentication.
 *
 * @param options - The server client options for configuring the MinIO client
 * @returns An object containing the initialized MinIO client
 * @throws Will throw an error if not called on the server or if the options fail validation
 *
 * @example
 * import { createServerMinioClient } from "@settlemint/sdk-minio";
 *
 * const { client } = createServerMinioClient({
 *   instance: process.env.SETTLEMINT_MINIO_ENDPOINT!,
 *   accessKey: process.env.SETTLEMINT_MINIO_ACCESS_KEY!,
 *   secretKey: process.env.SETTLEMINT_MINIO_SECRET_KEY!
 * });
 * client.listBuckets();
 */
export function createServerMinioClient(options: ServerClientOptions): { client: Client } {
  ensureServer();
  const validatedOptions = validate(ServerClientOptionsSchema, options);

  const url = new URL(validatedOptions.instance);
  return {
    client: new Client({
      endPoint: url.hostname,
      accessKey: validatedOptions.accessKey,
      secretKey: validatedOptions.secretKey,
      useSSL: url.protocol !== "http:",
      port: url.port ? Number(url.port) : undefined,
      region: "eu-central-1",
    }),
  };
}

// Export high-level functions
export {
  getFilesList,
  getFileById,
  uploadFile,
  deleteFile,
  createPresignedUploadUrl,
} from "./helpers/functions.js";

// Export validation utilities and schemas
export {
  type FileMetadata,
  type FileMetadataSchema,
  type Static,
  DEFAULT_BUCKET,
} from "./helpers/schema.js";

// Re-export required types from minio
export type { Client, ItemBucketMetadata } from "minio";
