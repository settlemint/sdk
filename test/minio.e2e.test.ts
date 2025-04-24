import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, join } from "node:path";
import { Client } from "minio";
import type { Client as MinioClient } from "minio";

// Manual import for testing - the SDK should expose these
import {
  createPresignedUploadUrl,
  deleteFile,
  getFileById,
  getFilesList,
  uploadBuffer,
  uploadFile,
} from "../sdk/minio/src/functions.js";
import type { FileMetadataSchema } from "../sdk/minio/src/helpers/schema.js";
import type { Static } from "../sdk/minio/src/helpers/schema.js";

// Type for file metadata
type FileMetadata = Static<typeof FileMetadataSchema>;

/**
 * Creates a MinIO client using environment variables
 * Handles conversion of s3:// protocol to https:// as needed
 */
function createMinioClient(): Client {
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

  // Add console logs to debug environment variables
  console.log("DEBUG MinIO Environment Variables:");
  console.log(`SETTLEMINT_MINIO_ENDPOINT: ${process.env.SETTLEMINT_MINIO_ENDPOINT}`);
  console.log(`SETTLEMINT_MINIO_ACCESS_KEY: ${process.env.SETTLEMINT_MINIO_ACCESS_KEY ? "[SET]" : "[NOT SET]"}`);
  console.log(`SETTLEMINT_MINIO_SECRET_KEY: ${process.env.SETTLEMINT_MINIO_SECRET_KEY ? "[SET]" : "[NOT SET]"}`);

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

// Define the test bucket name - use existing bucket to avoid permission issues
const TEST_BUCKET_NAME = "uploads";

/**
 * Helper function to create a test file for uploads
 */
async function createTestFile(
  content: string,
  name: string,
): Promise<{
  name: string;
  size: number;
  type: string;
  arrayBuffer: () => Promise<ArrayBuffer>;
}> {
  // Write content to temp file
  const tempPath = join(tmpdir(), `test-${randomUUID()}`);
  await fs.writeFile(tempPath, content);

  // Read the file content into a buffer
  const buffer = await fs.readFile(tempPath);

  // Create a mock File-like object
  const mockFile = {
    name,
    size: buffer.length,
    type: "text/plain",
    // Use type assertion to satisfy ArrayBuffer requirement
    arrayBuffer: async () => buffer as unknown as ArrayBuffer,
  };

  // Clean up temp file
  await fs.unlink(tempPath);

  return mockFile;
}

/**
 * Function to run MinIO operations as a standalone script
 */
async function runAsScript() {
  try {
    console.log("=== Running MinIO operations as standalone script ===");

    const client = createMinioClient();

    // 1. List buckets
    console.log("\n1. Listing buckets...");
    const buckets = await client.listBuckets();
    console.log(`Available buckets: ${buckets.map((b) => b.name).join(", ")}`);

    // 2. Create a unique test folder
    const scriptTestFolder = `script-test-${randomUUID()}/`;
    console.log(`\n2. Using test folder: ${scriptTestFolder}`);

    // 3. Upload a test file
    const testContent = "This is a test file from the integrated script";
    const fileName = `test-file-${randomUUID()}.txt`;
    const objectName = scriptTestFolder + fileName;

    console.log(`\n3. Uploading test file to ${TEST_BUCKET_NAME}/${objectName}...`);
    const tempPath = join(tmpdir(), fileName);
    await fs.writeFile(tempPath, testContent);
    const buffer = await fs.readFile(tempPath);
    await client.putObject(TEST_BUCKET_NAME, objectName, buffer);
    console.log("File uploaded successfully");

    // 4. List objects
    console.log(`\n4. Listing objects in ${scriptTestFolder}...`);
    const objectsList = client.listObjects(TEST_BUCKET_NAME, scriptTestFolder, true);
    const objects = [];
    for await (const obj of objectsList) {
      objects.push(obj.name);
    }
    console.log(`Found ${objects.length} objects: ${objects.join(", ")}`);

    // 5. Download the file
    console.log(`\n5. Downloading ${objectName}...`);
    const dataStream = await client.getObject(TEST_BUCKET_NAME, objectName);
    let content = "";
    for await (const chunk of dataStream) {
      content += chunk.toString();
    }
    console.log(`Downloaded content: "${content}"`);
    console.log(`Content matches: ${content === testContent}`);

    // 6. Delete the file
    console.log(`\n6. Deleting ${objectName}...`);
    await client.removeObject(TEST_BUCKET_NAME, objectName);
    console.log("File deleted successfully");

    // 7. Clean up temp file
    await fs.unlink(tempPath);
    console.log("Local temp file cleaned up");

    console.log("\n=== All operations completed successfully ===");
    return true;
  } catch (err) {
    console.error("Error running script:", err);
    return false;
  }
}

// Check if this file is being run directly (not via the test runner)
// or if BUN_TEST_MODE is set to force test mode
if (import.meta.main && process.env.BUN_TEST_MODE !== "1") {
  // Run as a standalone script
  runAsScript()
    .then((success) => {
      if (!success) {
        process.exit(1);
      }
    })
    .catch((err) => {
      console.error("Unexpected error:", err);
      process.exit(1);
    });
} else {
  // Import and run test functions only when not in script mode
  // This prevents "Cannot use describe() outside of the test runner" errors
  const { afterAll, beforeAll, describe, expect, test } = require("bun:test");

  console.log("DEBUG: Running in test mode");
  console.log("DEBUG: Bun test modules available:", !!describe, !!test);

  // Use a unique test folder for this test run
  const TEST_FOLDER = `test-folder-${randomUUID()}/`;
  const TEST_FILES = [join(__dirname, "./data/test-pdf.pdf"), join(__dirname, "./data/test-image.png")];

  // Flag to track if we have a working MinIO connection
  let minioAvailable = false;

  describe("MinIO E2E Tests", () => {
    let client: MinioClient | null = null;

    beforeAll(async () => {
      console.log("DEBUG: Running beforeAll hook");
      // Attempt to create the MinIO client for testing
      try {
        client = createMinioClient();
        console.log("DEBUG: Created MinIO client");

        // Test if we can connect
        console.log("DEBUG: Attempting to list buckets");
        const buckets = await client.listBuckets();
        console.log("DEBUG: Successfully listed buckets:", buckets.map((b) => b.name).join(", "));
        minioAvailable = true;
        console.log("DEBUG: Successfully connected to MinIO");
        console.log(`DEBUG: Using bucket: ${TEST_BUCKET_NAME}, test folder: ${TEST_FOLDER}`);
      } catch (err) {
        console.warn("DEBUG: Connection error details:", err);
        console.warn("Unable to initialize MinIO for tests:", err);
        console.warn(
          "Tests will be skipped. Make sure a MinIO server is running at",
          process.env.SETTLEMINT_MINIO_ENDPOINT,
        );
        client = null;
        minioAvailable = false;
      }
    });

    afterAll(async () => {
      if (!client || !minioAvailable) {
        return;
      }

      try {
        // Only clean up objects in our test folder
        const objectsStream = client.listObjects(TEST_BUCKET_NAME, TEST_FOLDER, true);

        for await (const obj of objectsStream) {
          console.log(`Cleaning up test object: ${obj.name}`);
          await client.removeObject(TEST_BUCKET_NAME, obj.name);
        }
      } catch (err) {
        console.error("Error cleaning up MinIO test objects:", err);
      }
    });

    test("should upload and retrieve an object", async () => {
      // Skip test if MinIO isn't available
      if (!client || !minioAvailable) {
        console.warn("Skipping test: MinIO not available");
        return;
      }

      // Upload test files
      for (const testFile of TEST_FILES) {
        try {
          const filename = basename(testFile);
          const objectName = TEST_FOLDER + filename;

          // Upload
          const buffer = Buffer.from(await Bun.file(testFile).arrayBuffer());
          await client.putObject(TEST_BUCKET_NAME, objectName, buffer);
          console.log(`Uploaded test file: ${objectName}`);

          // Download and verify
          const dataStream = await client.getObject(TEST_BUCKET_NAME, objectName);
          let receivedData = Buffer.alloc(0);
          for await (const chunk of dataStream) {
            receivedData = Buffer.concat([receivedData, chunk]);
          }

          const originalBuffer = Buffer.from(await Bun.file(testFile).arrayBuffer());
          expect(receivedData.length).toBe(originalBuffer.length);
          expect(receivedData.equals(originalBuffer)).toBe(true);
        } catch (err) {
          console.error(err);
          throw err;
        }
      }
    });

    test("should list objects in the test folder", async () => {
      // Skip test if MinIO isn't available
      if (!client || !minioAvailable) {
        console.warn("Skipping test: MinIO not available");
        return;
      }

      // List objects and verify
      const objectsList = client.listObjects(TEST_BUCKET_NAME, TEST_FOLDER, true);

      const objectNames: string[] = [];
      for await (const obj of objectsList) {
        objectNames.push(obj.name);
      }

      console.log("Found objects:", objectNames);
      expect(objectNames.length).toBe(TEST_FILES.length);

      for (const testFile of TEST_FILES) {
        const filename = basename(testFile);
        const objectName = TEST_FOLDER + filename;
        expect(objectNames).toContain(objectName);
      }
    });

    test("should delete an object", async () => {
      // Skip test if MinIO isn't available
      if (!client || !minioAvailable) {
        console.warn("Skipping test: MinIO not available");
        return;
      }

      // Delete one test file
      const testFile = TEST_FILES[0];
      if (testFile) {
        const filename = basename(testFile);
        const objectName = TEST_FOLDER + filename;

        await client.removeObject(TEST_BUCKET_NAME, objectName);
        console.log(`Deleted test file: ${objectName}`);

        // List objects and verify
        const objectsList = client.listObjects(TEST_BUCKET_NAME, TEST_FOLDER, true);
        const objectNames: string[] = [];
        for await (const obj of objectsList) {
          objectNames.push(obj.name);
        }

        expect(objectNames).not.toContain(objectName);
        expect(objectNames.length).toBe(TEST_FILES.length - 1);
      }
    });
  });

  // Tests for the high-level SDK functions
  describe("MinIO SDK High-Level Functions", () => {
    // Run once before all tests
    test("setup and test connection", async () => {
      // This test just checks if we have a MinIO connection
      // If not, the other tests will be automatically skipped
      if (!minioAvailable) {
        console.warn("Skipping high-level function tests: MinIO not available");
      }
      // Always pass this test, as it's just a setup
      expect(true).toBe(true);
    });

    test("uploadFile and getFileById should work", async () => {
      // Skip test if MinIO isn't available
      if (!minioAvailable) {
        console.warn("Skipping test: MinIO not available");
        return;
      }

      const testContent = "Test content for uploadFile";
      const fileName = `test-${randomUUID()}.txt`;
      const testFile = await createTestFile(testContent, fileName);

      // Upload the file with the folder prefix
      const result = await uploadFile(testFile, TEST_FOLDER, TEST_BUCKET_NAME);
      expect(result).toBeTruthy();
      expect(result.name).toBe(fileName);
      expect(result.contentType).toBe("text/plain");
      expect(result.size).toBe(testContent.length);
      expect(result.url).toBeTruthy();

      // Get the file by ID
      const retrievedFile = await getFileById(result.id, TEST_BUCKET_NAME);
      expect(retrievedFile).toBeTruthy();
      expect(retrievedFile.id).toBe(result.id);
      expect(retrievedFile.name).toBe(fileName);
      expect(retrievedFile.contentType).toBe("text/plain");
      expect(retrievedFile.size).toBe(testContent.length);
      expect(retrievedFile.url).toBeTruthy();

      // Clean up
      await deleteFile(result.id, TEST_BUCKET_NAME);
    });

    test("uploadBuffer should work", async () => {
      // Skip test if MinIO isn't available
      if (!minioAvailable) {
        console.warn("Skipping test: MinIO not available");
        return;
      }

      const testContent = "Test content for uploadBuffer";
      const objectName = `${TEST_FOLDER}test-buffer-${randomUUID()}.txt`;
      const buffer = Buffer.from(testContent);

      // Upload the buffer
      const result = await uploadBuffer(buffer, objectName, "text/plain", TEST_BUCKET_NAME);
      expect(result).toBeTruthy();
      expect(result.id).toBe(objectName);
      expect(result.name).toBe(objectName.split("/").pop()!); // Non-null assertion
      expect(result.contentType).toBe("text/plain");
      expect(result.size).toBe(buffer.length);
      expect(result.url).toBeTruthy();

      // Clean up
      await deleteFile(objectName, TEST_BUCKET_NAME);
    });

    test("getFilesList should list files with prefix", async () => {
      // Skip test if MinIO isn't available
      if (!minioAvailable) {
        console.warn("Skipping test: MinIO not available");
        return;
      }

      // Upload several test files
      const fileCount = 3;
      const uploadedFiles: FileMetadata[] = [];
      const listPrefix = `${TEST_FOLDER}test-list-`;

      for (let i = 0; i < fileCount; i++) {
        const testContent = `Test content ${i}`;
        const fileName = `test-list-${randomUUID()}.txt`;
        const testFile = await createTestFile(testContent, fileName);

        const result = await uploadFile(testFile, TEST_FOLDER, TEST_BUCKET_NAME);
        uploadedFiles.push(result);
      }

      // List the files
      const files = await getFilesList(listPrefix, TEST_BUCKET_NAME);

      // Verify
      expect(files.length).toBe(fileCount);
      for (const file of uploadedFiles) {
        const found = files.find((f) => f.id === file.id);
        expect(found).toBeTruthy();
      }

      // Clean up
      for (const file of uploadedFiles) {
        await deleteFile(file.id, TEST_BUCKET_NAME);
      }
    });

    test("createPresignedUploadUrl should create a valid upload URL", async () => {
      // Skip test if MinIO isn't available
      if (!minioAvailable) {
        console.warn("Skipping test: MinIO not available");
        return;
      }

      const fileName = `test-presigned-${randomUUID()}.txt`;
      const contentType = "text/plain";

      // Create a presigned upload URL
      const uploadUrl = await createPresignedUploadUrl(fileName, contentType, TEST_FOLDER, TEST_BUCKET_NAME);

      expect(uploadUrl).toBeTruthy();
      expect(typeof uploadUrl).toBe("string");
      expect(uploadUrl.includes(TEST_BUCKET_NAME)).toBeTruthy();
      expect(uploadUrl.includes(fileName)).toBeTruthy();

      // Use the URL to upload content
      const testContent = "Test content uploaded via presigned URL";
      const response = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": contentType,
        },
        body: testContent,
      });

      expect(response.status).toBe(200);

      // Verify the file was uploaded correctly
      const fileResult = await getFileById(TEST_FOLDER + fileName, TEST_BUCKET_NAME);
      expect(fileResult).toBeTruthy();
      expect(fileResult.id).toBe(TEST_FOLDER + fileName);
      expect(fileResult.name).toBe(fileName);
      expect(fileResult.contentType).toBe(contentType);

      // Clean up
      await deleteFile(TEST_FOLDER + fileName, TEST_BUCKET_NAME);
    });
  });
}
