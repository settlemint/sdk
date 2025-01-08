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
 *   accessToken: process.env.SETTLEMINT_ACCESS_TOKEN!,
 *   accessKey: process.env.SETTLEMINT_MINIO_ACCESS_KEY!,
 *   secretKey: process.env.SETTLEMINT_MINIO_SECRET_KEY!
 * });
 * client.listBuckets();
 */
export function createServerMinioClient(options: ServerClientOptions): { client: Client } {
  ensureServer();
  const validatedOptions = validate(ServerClientOptionsSchema, options);

  return {
    client: new Client({
      endPoint: new URL(validatedOptions.instance).host,
      accessKey: validatedOptions.accessKey,
      secretKey: validatedOptions.secretKey,
      region: "eu-central-1",
    }),
  };
}
