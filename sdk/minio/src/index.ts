/**
 * This module provides utilities for working with MinIO storage in a Next.js application.
 * It includes functions for file operations like uploading, downloading, listing, and managing files.
 *
 * @packageDocumentation
 */

// Export the client creator function
export { createServerMinioClient } from "./minio.js";

// Export client helper
export { getMinioClient } from "./helpers/client.js";

// Export runtime utilities
export { ensureServer } from "./helpers/runtime.js";

// Export operations and executor
export {
  createDeleteOperation,
  createListObjectsOperation,
  createPresignedPutOperation,
  createPresignedUrlOperation,
  createSimpleUploadOperation,
  createStatObjectOperation,
  createUploadOperation,
  type MinioOperation,
} from "./helpers/operations.js";
export { executeMinioOperation } from "./helpers/executor.js";

// Export high-level functions
export {
  DEFAULT_BUCKET,
  getFilesList,
  getFileById,
  uploadFile,
  uploadBuffer,
  deleteFile,
  createPresignedUploadUrl,
} from "./functions.js";

// Export Zod validation utilities
export { t, validate, type Static } from "./helpers/typebox.js";
export { z } from "zod";

// Re-export required types from minio
export type { Client, ItemBucketMetadata } from "minio";
