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

  // Get environment variables and let createServerMinioClient handle validation
  const { client } = createServerMinioClient({
    instance: process.env.SETTLEMINT_MINIO_ENDPOINT || "",
    accessKey: process.env.SETTLEMINT_MINIO_ACCESS_KEY || "",
    secretKey: process.env.SETTLEMINT_MINIO_SECRET_KEY || "",
  });

  cachedClient = client;
  return client;
}
