import { Client } from "minio";

/**
 * Lists all buckets in the MinIO instance
 */
async function listBuckets() {
  try {
    console.log("Starting MinIO list buckets operation...");

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

    // List buckets
    console.log("Listing buckets...");
    const buckets = await client.listBuckets();
    console.log("Available buckets:", buckets.map((b) => b.name).join(", "));

    return buckets;
  } catch (err) {
    console.error("Error listing buckets:", err);
    throw err;
  }
}

// Execute the function
listBuckets()
  .then((buckets) => {
    console.log(`Found ${buckets.length} bucket(s)`);
    console.log("Operation completed successfully");
  })
  .catch((err) => {
    console.error("Operation failed:", err);
    process.exit(1);
  });
