import { randomUUID } from "node:crypto";
import * as fs from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { Client } from "minio";

/**
 * Demonstrates a complete MinIO operation cycle (upload, list, download, delete)
 */
async function completeCycle() {
  try {
    console.log("Starting MinIO operation cycle...");

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

    // 1. Create a unique test folder
    const testFolder = `test-folder-${randomUUID()}/`;
    console.log(`Using test folder: ${testFolder}`);

    // 2. Create a test file
    const testContent = "This is a test file for demonstrating MinIO operations cycle.";
    const fileName = `test-file-${randomUUID()}.txt`;
    const objectName = testFolder + fileName;

    const tempPath = join(tmpdir(), fileName);
    await fs.writeFile(tempPath, testContent);
    console.log(`Created temporary test file at ${tempPath}`);

    // 3. Upload the file
    console.log(`Uploading to ${bucketName}/${objectName}...`);
    const buffer = await fs.readFile(tempPath);
    const uploadResult = await client.putObject(bucketName, objectName, buffer);
    console.log("Upload successful:", uploadResult);

    // 4. List objects in the test folder
    console.log(`Listing objects in ${bucketName}/${testFolder}...`);
    const objectsList = client.listObjects(bucketName, testFolder, true);

    const objects = [];
    for await (const obj of objectsList) {
      objects.push({
        name: obj.name,
        size: obj.size,
        lastModified: obj.lastModified,
      });
    }
    console.log(`Found ${objects.length} object(s) in the test folder`);
    objects.forEach((obj) => console.log(`- ${obj.name} (${obj.size} bytes)`));

    // 5. Download the file
    console.log(`Downloading ${bucketName}/${objectName}...`);
    const dataStream = await client.getObject(bucketName, objectName);

    let downloadedContent = "";
    for await (const chunk of dataStream) {
      downloadedContent += chunk.toString();
    }
    console.log(`Downloaded content (${downloadedContent.length} bytes): "${downloadedContent}"`);
    console.log(`Content matches: ${downloadedContent === testContent}`);

    // 6. Delete the file
    console.log(`Deleting ${bucketName}/${objectName}...`);
    await client.removeObject(bucketName, objectName);
    console.log("File deleted successfully");

    // 7. Verify deletion
    console.log("Verifying deletion...");
    const afterDeleteList = client.listObjects(bucketName, testFolder, true);

    const remainingObjects = [];
    for await (const obj of afterDeleteList) {
      remainingObjects.push(obj.name);
    }
    console.log(`Remaining objects: ${remainingObjects.length}`);
    console.log(`Object successfully deleted: ${!remainingObjects.includes(objectName)}`);

    // 8. Clean up
    await fs.unlink(tempPath);
    console.log("Temporary file cleaned up");

    return {
      success: true,
      bucketName,
      objectName,
    };
  } catch (err) {
    console.error("Error in MinIO operations cycle:", err);
    throw err;
  }
}

// Execute the cycle
completeCycle()
  .then((result) => {
    console.log("=== MinIO Operations Cycle Complete ===");
    console.log("All operations completed successfully");
  })
  .catch((err) => {
    console.error("Operation cycle failed:", err);
    process.exit(1);
  });
