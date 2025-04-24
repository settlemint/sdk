import { randomUUID } from "node:crypto";
import * as fs from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { Client } from "minio";

/**
 * Uploads a test file to MinIO
 * @param content Optional content for the test file (defaults to "Test content")
 * @param folder Optional folder path inside the bucket (defaults to a randomly generated folder)
 * @param fileName Optional file name (defaults to a randomly generated name)
 */
async function uploadTestFile(
  content = "Test content for MinIO upload",
  folder = `test-folder-${randomUUID()}/`,
  fileName = `test-file-${randomUUID()}.txt`,
) {
  try {
    console.log("Starting MinIO upload operation...");

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

    // Create the MinIO client
    const client = new Client({
      endPoint: url.hostname,
      port: url.port ? Number.parseInt(url.port) : undefined,
      useSSL: url.protocol === "https:",
      accessKey: process.env.SETTLEMINT_MINIO_ACCESS_KEY || "",
      secretKey: process.env.SETTLEMINT_MINIO_SECRET_KEY || "",
      region: "eu-central-1",
    });

    // Use the existing bucket
    const bucketName = "uploads";

    // Create a temporary file
    console.log("Creating test file...");
    const tempPath = join(tmpdir(), `minio-test-${randomUUID()}.txt`);
    await fs.writeFile(tempPath, content);

    // Read file into buffer
    const buffer = await fs.readFile(tempPath);

    // Generate the object name
    const objectName = folder + fileName;
    console.log(`Uploading to ${bucketName}/${objectName}`);

    // Upload to MinIO
    const result = await client.putObject(bucketName, objectName, buffer);
    console.log("Upload successful!", result);

    // Clean up temporary file
    await fs.unlink(tempPath);
    console.log("Temporary file cleaned up");

    return {
      bucketName,
      objectName,
      result,
    };
  } catch (err) {
    console.error("Error uploading file:", err);
    throw err;
  }
}

// Execute with default parameters
uploadTestFile()
  .then((result) => {
    console.log(`File uploaded to ${result.bucketName}/${result.objectName}`);
    console.log("Operation completed successfully");
  })
  .catch((err) => {
    console.error("Operation failed:", err);
    process.exit(1);
  });
