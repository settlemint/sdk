import { Client } from "minio";

/**
 * Creates a MinIO client using environment variables
 * Handles conversion of s3:// protocol to https:// as needed
 *
 * @returns A configured MinIO client instance
 */
export function createMinioClient(): Client {
  // Convert s3:// protocol to https:// if needed
  const minioEndpoint = process.env.SETTLEMINT_MINIO_ENDPOINT || "";
  let endpoint = minioEndpoint;

  if (endpoint.startsWith("s3://")) {
    const url = new URL(endpoint.replace("s3://", "https://"));
    endpoint = `https://${url.hostname}`;
    console.log(`Converted MinIO endpoint to: ${endpoint}`);
  }

  // Parse the URL
  const url = new URL(endpoint);

  // Create and return the MinIO client
  return new Client({
    endPoint: url.hostname,
    port: url.port ? Number.parseInt(url.port) : undefined,
    useSSL: url.protocol === "https:",
    accessKey: process.env.SETTLEMINT_MINIO_ACCESS_KEY || "",
    secretKey: process.env.SETTLEMINT_MINIO_SECRET_KEY || "",
    region: "eu-central-1",
  });
}

/**
 * The default bucket name used across test scripts
 */
export const DEFAULT_BUCKET = "uploads";
