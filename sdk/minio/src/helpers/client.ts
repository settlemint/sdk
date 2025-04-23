import type { Client } from "minio";
import { createServerMinioClient } from "../minio.js";
import { ensureServer } from "./runtime.js";

let cachedClient: Client | null = null;

/**
 * Gets or creates a MinIO client instance
 *
 * @returns A MinIO client instance
 * @throws Will throw an error if not called on the server or if environment variables are missing
 *
 * @example
 * import { getMinioClient } from "@settlemint/sdk-minio";
 *
 * const client = await getMinioClient();
 * const buckets = await client.listBuckets();
 */
export async function getMinioClient(): Promise<Client> {
  ensureServer();

  if (cachedClient) {
    return cachedClient;
  }

  // Check for required environment variables
  const instance = process.env.SETTLEMINT_MINIO_ENDPOINT;
  const accessKey = process.env.SETTLEMINT_MINIO_ACCESS_KEY;
  const secretKey = process.env.SETTLEMINT_MINIO_SECRET_KEY;

  if (!instance || !accessKey || !secretKey) {
    throw new Error(
      "Missing MinIO configuration. Please set SETTLEMINT_MINIO_ENDPOINT, SETTLEMINT_MINIO_ACCESS_KEY, and SETTLEMINT_MINIO_SECRET_KEY environment variables.",
    );
  }

  const { client } = createServerMinioClient({
    instance,
    accessKey,
    secretKey,
  });

  cachedClient = client;
  return client;
}
