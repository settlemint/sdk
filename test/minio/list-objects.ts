import { Client } from "minio";

/**
 * Lists objects in a MinIO bucket with optional prefix
 * @param prefix Optional prefix to filter objects (like a folder path)
 * @param bucketName The name of the bucket (defaults to "uploads")
 * @returns Array of object information
 */
async function listObjects(prefix = "", bucketName = "uploads") {
  try {
    console.log("Starting MinIO list objects operation...");

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

    console.log(`Listing objects in ${bucketName}${prefix ? ` with prefix "${prefix}"` : ""}...`);

    // List objects
    const objectsList = client.listObjects(bucketName, prefix, true);

    // Collect objects
    const objects = [];
    for await (const obj of objectsList) {
      objects.push({
        name: obj.name,
        size: obj.size,
        lastModified: obj.lastModified,
      });
    }

    console.log(`Found ${objects.length} object(s)`);

    // Display found objects
    objects.forEach((obj, index) => {
      console.log(`${index + 1}. ${obj.name} (${formatBytes(obj.size)}, modified: ${obj.lastModified.toISOString()})`);
    });

    return objects;
  } catch (err) {
    console.error("Error listing objects:", err);
    throw err;
  }
}

/**
 * Format bytes to a human-readable format
 */
function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${Number.parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
}

// Check if a prefix was provided as a command line argument
const prefix = process.argv[2] || "";

// Execute with the provided prefix
listObjects(prefix)
  .then((objects) => {
    console.log(`Successfully listed ${objects.length} objects`);
    console.log("Operation completed successfully");
  })
  .catch((err) => {
    console.error("Operation failed:", err);
    process.exit(1);
  });
