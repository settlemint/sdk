import { Client } from "minio";

/**
 * Deletes a file from MinIO
 * @param objectName The name of the object to delete
 * @param bucketName The name of the bucket (defaults to "uploads")
 * @returns true if successful
 */
async function deleteFile(objectName: string, bucketName = "uploads") {
  if (!objectName) {
    throw new Error("objectName is required");
  }

  try {
    console.log("Starting MinIO delete operation...");

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

    console.log(`Deleting ${bucketName}/${objectName}...`);

    // Delete the object
    await client.removeObject(bucketName, objectName);

    console.log(`Successfully deleted ${bucketName}/${objectName}`);

    return true;
  } catch (err) {
    console.error("Error deleting file:", err);
    throw err;
  }
}

// Check if an object name was provided as a command line argument
const objectName = process.argv[2];
if (!objectName) {
  console.log("Usage: bun run test/minio/delete-file.ts <objectName>");
  console.log("Example: bun run test/minio/delete-file.ts test-folder-123/test-file.txt");
  process.exit(1);
}

// Execute with the provided object name
deleteFile(objectName)
  .then((success) => {
    console.log("Operation completed successfully");
  })
  .catch((err) => {
    console.error("Operation failed:", err);
    process.exit(1);
  });
