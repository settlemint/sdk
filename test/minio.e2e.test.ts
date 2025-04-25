import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import { randomUUID } from "node:crypto";
import { basename, join } from "node:path";
import { createServerMinioClient } from "@settlemint/sdk-minio";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import type { Client } from "minio";

const TEST_BUCKET_NAME = `test-bucket-${randomUUID()}`;
const TEST_FILES = [join(__dirname, "./data/test-pdf.pdf"), join(__dirname, "./data/test-image.png")];

describe("MinIO E2E Tests", () => {
  let client: Client;

  beforeAll(async () => {
    const env = await loadEnv(true, false);
    const { client: minioClient } = createServerMinioClient({
      instance: env.SETTLEMINT_MINIO_ENDPOINT!,
      accessKey: env.SETTLEMINT_MINIO_ACCESS_KEY!,
      secretKey: env.SETTLEMINT_MINIO_SECRET_KEY!,
    });

    client = minioClient;

    // Create test bucket
    const bucketExists = await client.bucketExists(TEST_BUCKET_NAME);
    if (!bucketExists) {
      await client.makeBucket(TEST_BUCKET_NAME, "eu-central-1");
    }
  });

  afterAll(async () => {
    if (!client) {
      return;
    }

    const objectsStream = client.listObjects(TEST_BUCKET_NAME);

    for await (const obj of objectsStream) {
      await client.removeObject(TEST_BUCKET_NAME, obj.name);
    }

    await client.removeBucket(TEST_BUCKET_NAME);
  });

  test("should create and retrieve an object", async () => {
    // Upload test files
    for (const testFile of TEST_FILES) {
      try {
        const filename = basename(testFile);

        // Upload
        const buffer = Buffer.from(await Bun.file(testFile).arrayBuffer());
        await client.putObject(TEST_BUCKET_NAME, filename, buffer);

        // Donwload and verify
        const dataStream = await client.getObject(TEST_BUCKET_NAME, filename);
        let receivedData = "";
        for await (const chunk of dataStream) {
          receivedData += chunk.toString();
        }
        const rawContents = await Bun.file(testFile).text();
        expect(receivedData).toBe(rawContents);
      } catch (err) {
        console.error(err);
        throw err;
      }
    }
  });

  test("should list objects in a bucket", async () => {
    // List objects and verify
    const objectsList = client.listObjects(TEST_BUCKET_NAME, "", true);

    const objectNames: string[] = [];
    for await (const obj of objectsList) {
      objectNames.push(obj.name);
    }

    expect(objectNames.length).toBe(TEST_FILES.length);
    for (const testFile of TEST_FILES) {
      const filename = basename(testFile);
      expect(objectNames).toContain(filename);
    }
  });

  test("should delete an object", async () => {
    for (const testFile of TEST_FILES) {
      // Delete the test file
      const filename = basename(testFile);
      await client.removeObject(TEST_BUCKET_NAME, filename, {
        forceDelete: true,
      });
    }

    // List objects and verify
    const objectsList = client.listObjects(TEST_BUCKET_NAME, "", true);
    const objectNames: string[] = [];
    for await (const obj of objectsList) {
      objectNames.push(obj.name);
    }
    expect(objectNames.length).toBe(0);
  });
});
