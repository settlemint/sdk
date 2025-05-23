import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import { randomUUID } from "node:crypto";
import { basename, join } from "node:path";
import {
  createPresignedUploadUrl,
  createServerMinioClient,
  deleteFile,
  getFileById,
  getFilesList,
  uploadFile,
} from "@settlemint/sdk-minio";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import type { Client } from "minio";

const TEST_BUCKET_NAME = `test-bucket-${randomUUID()}`;
const TEST_FILES = [join(__dirname, "./data/test-pdf.pdf"), join(__dirname, "./data/test-image.png")];
const DEFAULT_PATH = "docs";

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

        const objectName = `${DEFAULT_PATH}/${filename}`;

        // Upload
        const file = Bun.file(testFile);
        const buffer = Buffer.from(await file.arrayBuffer());
        const uploadUrl = await createPresignedUploadUrl(client, filename, DEFAULT_PATH, TEST_BUCKET_NAME, 3_600);
        if (file.type === "application/pdf") {
          const uploadResponse = await fetch(uploadUrl, {
            method: "PUT",
            body: buffer,
            headers: {
              "Content-Type": file.type,
            },
          });
          expect(uploadResponse.status).toBe(200);
        } else {
          const uploadResult = await uploadFile(client, buffer, objectName, file.type, TEST_BUCKET_NAME);
          expect(uploadResult.contentType).toBe(file.type);
          expect(uploadResult.size).toBe(buffer.length);
          expect(uploadResult.uploadedAt).toBeDefined();
          expect(uploadResult.url).toBeDefined();
          expect(uploadResult.id).toBe(objectName);
          expect(uploadResult.name).toBe(filename);
          expect(uploadResult.etag).toBeDefined();
        }

        // Donwload and verify
        const dataStream = await client.getObject(TEST_BUCKET_NAME, objectName);
        let receivedData = "";
        for await (const chunk of dataStream) {
          receivedData += chunk.toString();
        }
        const rawContents = await Bun.file(testFile).text();
        expect(receivedData).toBe(rawContents);
        const fileInfo = await getFileById(client, objectName, TEST_BUCKET_NAME);
        expect(fileInfo).toBeObject();
        expect(fileInfo.id).toBe(objectName);
        expect(fileInfo.name).toBe(filename);
        expect(fileInfo.size).toBe(buffer.length);
        expect(fileInfo.contentType).toBe(file.type);
        expect(fileInfo.uploadedAt).toBeDefined();
        expect(fileInfo.url).toBeDefined();
        expect(fileInfo.etag).toBeDefined();
      } catch (err) {
        console.error(err);
        throw err;
      }
    }
  });

  test("should list objects in a bucket", async () => {
    // List objects and verify
    const objects = await getFilesList(client, DEFAULT_PATH, TEST_BUCKET_NAME);
    const objectIds = objects.map((obj) => obj.id);
    expect(objects.length).toBe(TEST_FILES.length);
    for (const testFile of TEST_FILES) {
      const filename = basename(testFile);
      expect(objectIds).toContain(`${DEFAULT_PATH}/${filename}`);
    }
  });

  test("should delete an object", async () => {
    for (const testFile of TEST_FILES) {
      // Delete the test file
      const filename = basename(testFile);
      await deleteFile(client, `${DEFAULT_PATH}/${filename}`, TEST_BUCKET_NAME);
    }

    // List objects and verify
    const objects = await getFilesList(client, DEFAULT_PATH, TEST_BUCKET_NAME);
    expect(objects.length).toBe(0);
  });
});
