// Simple script to test MinIO functionality
import { describe, expect, test } from "bun:test";
import { Client } from "minio";

// Get environment variables from process
const {
  SETTLEMINT_MINIO_ENDPOINT = "",
  SETTLEMINT_MINIO_ACCESS_KEY = "",
  SETTLEMINT_MINIO_SECRET_KEY = "",
} = process.env;

console.log("MinIO Test Script");
console.log("Environment variables:");
console.log(`- Endpoint: ${SETTLEMINT_MINIO_ENDPOINT}`);
console.log(`- Access Key: ${SETTLEMINT_MINIO_ACCESS_KEY ? "[SET]" : "[NOT SET]"}`);
console.log(`- Secret Key: ${SETTLEMINT_MINIO_SECRET_KEY ? "[SET]" : "[NOT SET]"}`);

// Create MinIO client
function createMinioClient() {
  let endpoint = SETTLEMINT_MINIO_ENDPOINT;

  if (endpoint.startsWith("s3://")) {
    const url = new URL(endpoint.replace("s3://", "https://"));
    endpoint = `https://${url.hostname}`;
    console.log(`Converted MinIO endpoint to: ${endpoint}`);
  }

  const url = new URL(endpoint);

  return new Client({
    endPoint: url.hostname,
    port: url.port ? Number.parseInt(url.port) : undefined,
    useSSL: url.protocol === "https:",
    accessKey: SETTLEMINT_MINIO_ACCESS_KEY,
    secretKey: SETTLEMINT_MINIO_SECRET_KEY,
    region: "eu-central-1",
  });
}

// Run tests
describe("MinIO Connectivity Test", () => {
  test("should connect to MinIO and list buckets", async () => {
    const client = createMinioClient();

    try {
      const buckets = await client.listBuckets();
      console.log("Successfully listed buckets:", buckets.map((b) => b.name).join(", "));
      expect(buckets.length).toBeGreaterThan(0);
    } catch (err) {
      console.error("Error connecting to MinIO:", err);
      throw err;
    }
  });
});
