import { Client } from "minio";

/**
 * Downloads a file from MinIO
 * @param objectName The name of the object to download
 * @param bucketName The name of the bucket (defaults to "uploads")
 * @returns The file content as a string
 */
async function downloadFile(objectName: string, bucketName = "uploads") {
  if (!objectName) {
    throw new Error("objectName is required");
  }

  try {
    console.log("Starting MinIO download operation...");

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

    console.log(`Downloading ${bucketName}/${objectName}...`);

    // Download from MinIO
    const dataStream = await client.getObject(bucketName, objectName);

    // Convert stream to string
    let content = "";
    for await (const chunk of dataStream) {
      content += chunk.toString();
    }

    console.log(`Downloaded ${content.length} bytes`);
    console.log("Content preview:", content.substring(0, 100) + (content.length > 100 ? "..." : ""));

    return content;
  } catch (err) {
    console.error("Error downloading file:", err);
    throw err;
  }
}

// Check if an object name was provided as a command line argument
const objectName = process.argv[2];
if (!objectName) {
  console.log("Usage: bun run test/minio/download-file.ts <objectName>");
  console.log("Example: bun run test/minio/download-file.ts test-folder-123/test-file.txt");
  process.exit(1);
}

// Execute with the provided object name
downloadFile(objectName)
  .then((content) => {
    console.log(`Successfully downloaded file (${content.length} bytes)`);
    console.log("Operation completed successfully");
  })
  .catch((err) => {
    console.error("Operation failed:", err);
    process.exit(1);
  });
