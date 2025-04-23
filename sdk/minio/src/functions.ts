import "server-only";
import { Buffer } from "node:buffer";
import { ensureServer } from "@settlemint/sdk-utils/runtime";
import { t } from "@settlemint/sdk-utils/typebox";
import { validate } from "@settlemint/sdk-utils/validation";
import { getMinioClient } from "./helpers/client.js";
import { executeMinioOperation } from "./helpers/executor.js";
import {
  createDeleteOperation,
  createListObjectsOperation,
  createPresignedPutOperation,
  createPresignedUrlOperation,
  createSimpleUploadOperation,
  createStatObjectOperation,
  createUploadOperation,
} from "./helpers/operations.js";

// FileMetadata schema
const FileMetadataSchema = t.Object(
  {
    id: t.String(),
    name: t.String(),
    contentType: t.String(),
    size: t.Number(),
    uploadedAt: t.String({ format: "date-time" }),
    etag: t.String(),
    url: t.Optional(t.String({ format: "uri" })),
  },
  { $id: "FileMetadata" },
);

// Default bucket name
export const DEFAULT_BUCKET = "uploads";

/**
 * Gets a list of files with optional prefix filter
 *
 * @param prefix - Optional prefix to filter files (like a folder path)
 * @param bucket - Optional bucket name (defaults to DEFAULT_BUCKET)
 * @returns Array of file metadata objects
 * @throws Will throw an error if client initialization fails
 *
 * @example
 * import { getFilesList } from "@settlemint/sdk-minio";
 *
 * const files = await getFilesList("documents/");
 */
export async function getFilesList(
  prefix = "",
  bucket: string = DEFAULT_BUCKET,
): Promise<Array<t.Static<typeof FileMetadataSchema>>> {
  ensureServer();
  console.log(`Listing files with prefix: "${prefix}" in bucket: "${bucket}"`);

  try {
    const client = await getMinioClient();
    const listOperation = createListObjectsOperation(bucket, prefix);
    const objects = await executeMinioOperation(listOperation, client);
    console.log(`Found ${objects.length} files in MinIO`);

    const fileObjects = await Promise.all(
      objects.map(async (obj) => {
        const presignedUrlOperation = createPresignedUrlOperation(
          bucket,
          obj.name,
          3600, // 1 hour expiry
        );
        const url = await executeMinioOperation(presignedUrlOperation, client);

        return {
          id: obj.name,
          name: obj.name.split("/").pop() || obj.name,
          contentType: "application/octet-stream", // Default type
          size: obj.size,
          uploadedAt: obj.lastModified.toISOString(),
          etag: obj.etag,
          url,
        };
      }),
    );

    return validate(t.Array(FileMetadataSchema), fileObjects);
  } catch (error) {
    console.error("Failed to list files:", error);
    throw new Error(`Failed to list files: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Gets a single file by its path/id
 *
 * @param fileId - The file identifier/path
 * @param bucket - Optional bucket name (defaults to DEFAULT_BUCKET)
 * @returns File metadata with presigned URL
 * @throws Will throw an error if the file doesn't exist or client initialization fails
 *
 * @example
 * import { getFileById } from "@settlemint/sdk-minio";
 *
 * const file = await getFileById("documents/report.pdf");
 */
export async function getFileById(
  fileId: string,
  bucket: string = DEFAULT_BUCKET,
): Promise<t.Static<typeof FileMetadataSchema>> {
  ensureServer();
  console.log(`Getting file details for: ${fileId} in bucket: ${bucket}`);

  try {
    const client = await getMinioClient();

    // Get the file metadata
    const statOperation = createStatObjectOperation(bucket, fileId);
    const statResult = await executeMinioOperation(statOperation, client);

    // Generate a presigned URL for access
    const presignedUrlOperation = createPresignedUrlOperation(
      bucket,
      fileId,
      3600, // 1 hour expiry
    );
    const url = await executeMinioOperation(presignedUrlOperation, client);

    const fileMetadata = {
      id: fileId,
      name: fileId.split("/").pop() || fileId,
      contentType: statResult.metaData["content-type"] || "application/octet-stream",
      size: statResult.size,
      uploadedAt: statResult.lastModified.toISOString(),
      etag: statResult.etag,
      url,
    };

    return validate(FileMetadataSchema, fileMetadata);
  } catch (error) {
    console.error(`Failed to get file ${fileId}:`, error);
    throw new Error(`Failed to get file ${fileId}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Uploads a file to storage
 *
 * @param file - The file to upload (Browser File or Buffer with additional properties)
 * @param path - Optional path/folder to store the file in
 * @param bucket - Optional bucket name (defaults to DEFAULT_BUCKET)
 * @returns The uploaded file metadata
 * @throws Will throw an error if upload fails or client initialization fails
 *
 * @example
 * import { uploadFile } from "@settlemint/sdk-minio";
 *
 * // In a browser environment with a File object:
 * const file = document.querySelector('input[type="file"]').files[0];
 * const uploadedFile = await uploadFile(file, "documents/");
 */
export async function uploadFile(
  file: File | { arrayBuffer: () => Promise<ArrayBuffer>; name: string; size: number; type: string },
  path = "",
  bucket: string = DEFAULT_BUCKET,
): Promise<t.Static<typeof FileMetadataSchema>> {
  ensureServer();
  try {
    const fileName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const objectName = path ? `${path}/${fileName}` : fileName;

    // Add file metadata
    const metadata = {
      "content-type": file.type,
      "original-name": file.name,
      "upload-time": new Date().toISOString(),
    };

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const client = await getMinioClient();

    // Upload the file directly passing the Buffer object
    const uploadOperation = createUploadOperation(bucket, objectName, buffer, metadata);
    const result = await executeMinioOperation(uploadOperation, client);

    // Generate a presigned URL for immediate access
    const presignedUrlOperation = createPresignedUrlOperation(
      bucket,
      objectName,
      3600, // 1 hour expiry
    );
    const url = await executeMinioOperation(presignedUrlOperation, client);

    const fileMetadata = {
      id: objectName,
      name: fileName,
      contentType: file.type,
      size: file.size,
      uploadedAt: new Date().toISOString(),
      etag: result.etag,
      url,
    };

    return validate(FileMetadataSchema, fileMetadata);
  } catch (error) {
    console.error("Failed to upload file:", error);
    throw new Error(`Failed to upload file: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Deletes a file from storage
 *
 * @param fileId - The file identifier/path to delete
 * @param bucket - Optional bucket name (defaults to DEFAULT_BUCKET)
 * @returns Success status
 * @throws Will throw an error if deletion fails or client initialization fails
 *
 * @example
 * import { deleteFile } from "@settlemint/sdk-minio";
 *
 * await deleteFile("documents/report.pdf");
 */
export async function deleteFile(fileId: string, bucket: string = DEFAULT_BUCKET): Promise<boolean> {
  ensureServer();
  try {
    const client = await getMinioClient();
    const deleteOperation = createDeleteOperation(bucket, fileId);
    await executeMinioOperation(deleteOperation, client);
    return true;
  } catch (error) {
    console.error(`Failed to delete file ${fileId}:`, error);
    throw new Error(`Failed to delete file ${fileId}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Creates a presigned upload URL for direct browser uploads
 *
 * @param fileName - The file name to use
 * @param contentType - The content type of the file
 * @param path - Optional path/folder
 * @param bucket - Optional bucket name (defaults to DEFAULT_BUCKET)
 * @param expirySeconds - How long the URL should be valid for
 * @returns Presigned URL for PUT operation
 * @throws Will throw an error if URL creation fails or client initialization fails
 *
 * @example
 * import { createPresignedUploadUrl } from "@settlemint/sdk-minio";
 *
 * const url = await createPresignedUploadUrl("report.pdf", "application/pdf", "documents/");
 * // Use the URL for direct browser upload with fetch:
 * await fetch(url, {
 *   method: 'PUT',
 *   headers: { 'Content-Type': 'application/pdf' },
 *   body: pdfFile
 * });
 */
export async function createPresignedUploadUrl(
  fileName: string,
  contentType: string,
  path = "",
  bucket: string = DEFAULT_BUCKET,
  expirySeconds = 3600,
): Promise<string> {
  ensureServer();
  try {
    const safeFileName = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
    const objectName = path ? `${path}/${safeFileName}` : safeFileName;
    const client = await getMinioClient();

    // Create operation for presigned PUT URL
    const presignedPutOperation = createPresignedPutOperation(bucket, objectName, expirySeconds);

    const url = await executeMinioOperation(presignedPutOperation, client);
    if (!url) {
      throw new Error("Failed to generate presigned upload URL");
    }

    return url;
  } catch (error) {
    console.error("Failed to create presigned upload URL:", error);
    throw new Error(`Failed to create presigned upload URL: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Uploads a buffer directly to storage
 *
 * @param buffer - The buffer to upload
 * @param objectName - The full object name/path
 * @param contentType - The content type of the file
 * @param bucket - Optional bucket name (defaults to DEFAULT_BUCKET)
 * @returns The uploaded file metadata
 * @throws Will throw an error if upload fails or client initialization fails
 *
 * @example
 * import { uploadBuffer } from "@settlemint/sdk-minio";
 *
 * const buffer = Buffer.from("Hello, world!");
 * const uploadedFile = await uploadBuffer(buffer, "documents/hello.txt", "text/plain");
 */
export async function uploadBuffer(
  buffer: Buffer,
  objectName: string,
  contentType: string,
  bucket: string = DEFAULT_BUCKET,
): Promise<t.Static<typeof FileMetadataSchema>> {
  ensureServer();
  try {
    const client = await getMinioClient();

    // Add file metadata
    const metadata = {
      "content-type": contentType,
      "upload-time": new Date().toISOString(),
    };

    // Use the createSimpleUploadOperation
    const simpleUploadFn = createSimpleUploadOperation(client);
    const result = await simpleUploadFn(buffer, bucket, objectName, metadata);

    // Generate a presigned URL for immediate access
    const presignedUrlOperation = createPresignedUrlOperation(
      bucket,
      objectName,
      3600, // 1 hour expiry
    );
    const url = await executeMinioOperation(presignedUrlOperation, client);

    const fileName = objectName.split("/").pop() || objectName;

    const fileMetadata = {
      id: objectName,
      name: fileName,
      contentType,
      size: buffer.length,
      uploadedAt: new Date().toISOString(),
      etag: result.etag,
      url,
    };

    return validate(FileMetadataSchema, fileMetadata);
  } catch (error) {
    console.error("Failed to upload buffer:", error);
    throw new Error(`Failed to upload buffer: ${error instanceof Error ? error.message : String(error)}`);
  }
}
