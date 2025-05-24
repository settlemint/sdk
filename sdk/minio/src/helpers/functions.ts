import type { Buffer } from "node:buffer";
import { ensureServer } from "@settlemint/sdk-utils/runtime";
import { validate } from "@settlemint/sdk-utils/validation";
import type { Client } from "minio";
import { executeMinioOperation } from "./executor.js";
import {
  createDeleteOperation,
  createListObjectsOperation,
  createPresignedPutOperation,
  createPresignedUrlOperation,
  createSimpleUploadOperation,
  createStatObjectOperation,
} from "./operations.js";
import { DEFAULT_BUCKET, FileMetadataSchema } from "./schema.js";
import type { FileMetadata } from "./schema.js";

/**
 * Helper function to normalize paths and prevent double slashes
 *
 * @param path - The path to normalize
 * @param fileName - The filename to append
 * @returns The normalized path with filename
 * @throws Will throw an error if the path is too long (max 1000 characters)
 */
function normalizePath(path: string, fileName: string): string {
  if (path.length > 1_000) {
    throw new Error("Path is too long");
  }

  // Remove trailing slashes from path
  const cleanPath = path.replace(/\/+$/, "");

  // If path is empty, return just the filename
  if (!cleanPath) {
    return fileName;
  }

  // Join with a single slash
  return `${cleanPath}/${fileName}`;
}

/**
 * Gets a list of files with optional prefix filter
 *
 * @param client - The MinIO client to use
 * @param prefix - Optional prefix to filter files (like a folder path)
 * @param bucket - Optional bucket name (defaults to DEFAULT_BUCKET)
 * @returns Array of file metadata objects
 * @throws Will throw an error if the operation fails or client initialization fails
 *
 * @example
 * import { createServerMinioClient, getFilesList } from "@settlemint/sdk-minio";
 *
 * const { client } = createServerMinioClient({
 *   instance: process.env.SETTLEMINT_MINIO_ENDPOINT!,
 *   accessKey: process.env.SETTLEMINT_MINIO_ACCESS_KEY!,
 *   secretKey: process.env.SETTLEMINT_MINIO_SECRET_KEY!
 * });
 *
 * const files = await getFilesList(client, "documents/");
 */
export async function getFilesList(
  client: Client,
  prefix = "",
  bucket: string = DEFAULT_BUCKET,
): Promise<FileMetadata[]> {
  ensureServer();
  console.log(`Listing files with prefix: "${prefix}" in bucket: "${bucket}"`);

  try {
    const listOperation = createListObjectsOperation(bucket, prefix);
    const objects = await executeMinioOperation(client, listOperation);
    console.log(`Found ${objects.length} files in MinIO`);

    const fileObjects = await Promise.allSettled(
      objects.map(async (obj): Promise<FileMetadata> => {
        try {
          const presignedUrlOperation = createPresignedUrlOperation(
            bucket,
            obj.name,
            3600, // 1 hour expiry
          );
          const url = await executeMinioOperation(client, presignedUrlOperation);

          return {
            id: obj.name,
            name: obj.name.split("/").pop() || obj.name,
            contentType: "application/octet-stream", // Default type
            size: obj.size,
            uploadedAt: obj.lastModified.toISOString(),
            etag: obj.etag,
            url,
          };
        } catch (error) {
          console.warn(`Failed to generate presigned URL for ${obj.name}:`, error);
          // Return metadata without URL for failed presigned URL operations
          return {
            id: obj.name,
            name: obj.name.split("/").pop() || obj.name,
            contentType: "application/octet-stream", // Default type
            size: obj.size,
            uploadedAt: obj.lastModified.toISOString(),
            etag: obj.etag,
            // url is omitted for failed operations (undefined)
          };
        }
      }),
    ).then((results) =>
      results
        .filter((result): result is PromiseFulfilledResult<FileMetadata> => result.status === "fulfilled")
        .map((result) => result.value),
    );

    return validate(FileMetadataSchema.array(), fileObjects);
  } catch (error) {
    console.error("Failed to list files:", error);
    throw new Error(`Failed to list files: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Gets a single file by its object name
 *
 * @param client - The MinIO client to use
 * @param fileId - The file identifier/path
 * @param bucket - Optional bucket name (defaults to DEFAULT_BUCKET)
 * @returns File metadata with presigned URL
 * @throws Will throw an error if the file doesn't exist or client initialization fails
 *
 * @example
 * import { createServerMinioClient, getFileByObjectName } from "@settlemint/sdk-minio";
 *
 * const { client } = createServerMinioClient({
 *   instance: process.env.SETTLEMINT_MINIO_ENDPOINT!,
 *   accessKey: process.env.SETTLEMINT_MINIO_ACCESS_KEY!,
 *   secretKey: process.env.SETTLEMINT_MINIO_SECRET_KEY!
 * });
 *
 * const file = await getFileByObjectName(client, "documents/report.pdf");
 */
export async function getFileById(
  client: Client,
  fileId: string,
  bucket: string = DEFAULT_BUCKET,
): Promise<FileMetadata> {
  ensureServer();
  console.log(`Getting file details for: ${fileId} in bucket: ${bucket}`);

  try {
    // Get the file metadata
    const statOperation = createStatObjectOperation(bucket, fileId);
    const statResult = await executeMinioOperation(client, statOperation);

    // Generate a presigned URL for access
    const presignedUrlOperation = createPresignedUrlOperation(
      bucket,
      fileId,
      3600, // 1 hour expiry
    );
    const url = await executeMinioOperation(client, presignedUrlOperation);

    // Try to get size from metadata first, then from stat result
    let size = 0;

    // Check for content-length in metadata
    if (statResult.metaData["content-length"]) {
      const parsedSize = Number.parseInt(statResult.metaData["content-length"], 10);
      if (!Number.isNaN(parsedSize) && parsedSize >= 0 && Number.isFinite(parsedSize)) {
        size = parsedSize;
      }
    }
    // Fallback to statResult.size if available and valid
    else if (typeof statResult.size === "number" && !Number.isNaN(statResult.size)) {
      size = statResult.size;
    }

    const fileMetadata: FileMetadata = {
      id: fileId,
      name: fileId.split("/").pop() || fileId,
      contentType: statResult.metaData["content-type"] || "application/octet-stream",
      size,
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
 * Deletes a file from storage
 *
 * @param client - The MinIO client to use
 * @param fileId - The file identifier/path
 * @param bucket - Optional bucket name (defaults to DEFAULT_BUCKET)
 * @returns Success status
 * @throws Will throw an error if deletion fails or client initialization fails
 *
 * @example
 * import { createServerMinioClient, deleteFile } from "@settlemint/sdk-minio";
 *
 * const { client } = createServerMinioClient({
 *   instance: process.env.SETTLEMINT_MINIO_ENDPOINT!,
 *   accessKey: process.env.SETTLEMINT_MINIO_ACCESS_KEY!,
 *   secretKey: process.env.SETTLEMINT_MINIO_SECRET_KEY!
 * });
 *
 * await deleteFile(client, "documents/report.pdf");
 */
export async function deleteFile(client: Client, fileId: string, bucket: string = DEFAULT_BUCKET): Promise<boolean> {
  ensureServer();
  try {
    const deleteOperation = createDeleteOperation(bucket, fileId);
    await executeMinioOperation(client, deleteOperation);
    return true;
  } catch (error) {
    console.error(`Failed to delete file ${fileId}:`, error);
    throw new Error(`Failed to delete file ${fileId}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Creates a presigned upload URL for direct browser uploads
 *
 * @param client - The MinIO client to use
 * @param fileName - The file name to use
 * @param path - Optional path/folder
 * @param bucket - Optional bucket name (defaults to DEFAULT_BUCKET)
 * @param expirySeconds - How long the URL should be valid for
 * @returns Presigned URL for PUT operation
 * @throws Will throw an error if URL creation fails or client initialization fails
 *
 * @example
 * import { createServerMinioClient, createPresignedUploadUrl } from "@settlemint/sdk-minio";
 *
 * const { client } = createServerMinioClient({
 *   instance: process.env.SETTLEMINT_MINIO_ENDPOINT!,
 *   accessKey: process.env.SETTLEMINT_MINIO_ACCESS_KEY!,
 *   secretKey: process.env.SETTLEMINT_MINIO_SECRET_KEY!
 * });
 *
 * // Generate the presigned URL on the server
 * const url = await createPresignedUploadUrl(client, "report.pdf", "documents/");
 *
 * // Send the URL to the client/browser via HTTP response
 * return Response.json({ uploadUrl: url });
 *
 * // Then in the browser:
 * const response = await fetch('/api/get-upload-url');
 * const { uploadUrl } = await response.json();
 * await fetch(uploadUrl, {
 *  method: 'PUT',
 *  headers: { 'Content-Type': 'application/pdf' },
 *  body: pdfFile
 * });
 */
export async function createPresignedUploadUrl(
  client: Client,
  fileName: string,
  path = "",
  bucket: string = DEFAULT_BUCKET,
  expirySeconds = 3600,
): Promise<string> {
  ensureServer();
  try {
    const safeFileName = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
    const objectName = normalizePath(path, safeFileName);

    // Create operation for presigned PUT URL
    const presignedPutOperation = createPresignedPutOperation(bucket, objectName, expirySeconds);

    const url = await executeMinioOperation(client, presignedPutOperation);
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
 * @param client - The MinIO client to use
 * @param buffer - The buffer to upload
 * @param objectName - The full object name/path
 * @param contentType - The content type of the file
 * @param bucket - Optional bucket name (defaults to DEFAULT_BUCKET)
 * @returns The uploaded file metadata
 * @throws Will throw an error if upload fails or client initialization fails
 *
 * @example
 * import { createServerMinioClient, uploadBuffer } from "@settlemint/sdk-minio";
 *
 * const { client } = createServerMinioClient({
 *   instance: process.env.SETTLEMINT_MINIO_ENDPOINT!,
 *   accessKey: process.env.SETTLEMINT_MINIO_ACCESS_KEY!,
 *   secretKey: process.env.SETTLEMINT_MINIO_SECRET_KEY!
 * });
 *
 * const buffer = Buffer.from("Hello, world!");
 * const uploadedFile = await uploadFile(client, buffer, "documents/hello.txt", "text/plain");
 */
export async function uploadFile(
  client: Client,
  buffer: Buffer,
  objectName: string,
  contentType: string,
  bucket: string = DEFAULT_BUCKET,
): Promise<FileMetadata> {
  ensureServer();
  try {
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
    const url = await executeMinioOperation(client, presignedUrlOperation);

    const fileName = objectName.split("/").pop() || objectName;

    const fileMetadata: FileMetadata = {
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
    console.error("Failed to upload file:", error);
    throw new Error(`Failed to upload file: ${error instanceof Error ? error.message : String(error)}`);
  }
}
