import type { Buffer } from "node:buffer";
import type { Client, ItemBucketMetadata } from "minio";

/**
 * Base interface for all MinIO operations
 *
 * @template T The return type of the operation
 */
export interface MinioOperation<T> {
  execute: (client: Client) => Promise<T>;
}

/**
 * Creates an operation to list objects in a bucket
 *
 * @param bucket - The bucket name to list objects from
 * @param prefix - Optional prefix to filter objects (like a folder path)
 * @returns A MinioOperation that lists objects when executed
 *
 * @example
 * import { createListObjectsOperation, executeMinioOperation } from "@settlemint/sdk-minio";
 *
 * const listOperation = createListObjectsOperation("my-bucket", "folder/");
 * const objects = await executeMinioOperation(listOperation);
 */
export function createListObjectsOperation(
  bucket: string,
  prefix = "",
): MinioOperation<
  Array<{
    name: string;
    prefix?: string;
    size: number;
    etag: string;
    lastModified: Date;
  }>
> {
  return {
    execute: async (client: Client) => {
      const objectsStream = client.listObjects(bucket, prefix, true);
      const objects: Array<{
        name: string;
        prefix?: string;
        size: number;
        etag: string;
        lastModified: Date;
      }> = [];

      return new Promise((resolve, reject) => {
        objectsStream.on("data", (obj) => {
          // Ensure required properties are not undefined before adding to the array
          if (obj.name && typeof obj.size === "number" && obj.etag && obj.lastModified) {
            objects.push({
              name: obj.name,
              prefix: obj.prefix,
              size: obj.size,
              etag: obj.etag,
              lastModified: obj.lastModified,
            });
          }
        });

        objectsStream.on("error", (err) => {
          reject(err);
        });

        objectsStream.on("end", () => {
          resolve(objects);
        });
      });
    },
  };
}

/**
 * Creates an operation to get an object's metadata
 *
 * @param bucket - The bucket name containing the object
 * @param objectName - The object name/path
 * @returns A MinioOperation that gets object stats when executed
 *
 * @example
 * import { createStatObjectOperation, executeMinioOperation } from "@settlemint/sdk-minio";
 *
 * const statOperation = createStatObjectOperation("my-bucket", "folder/file.txt");
 * const stats = await executeMinioOperation(statOperation);
 */
export function createStatObjectOperation(
  bucket: string,
  objectName: string,
): MinioOperation<{
  size: number;
  etag: string;
  metaData: Record<string, string>;
  lastModified: Date;
}> {
  return {
    execute: async (client: Client) => {
      return client.statObject(bucket, objectName);
    },
  };
}

/**
 * Creates an operation to upload a buffer to MinIO
 *
 * @param bucket - The bucket name to upload to
 * @param objectName - The object name/path to create
 * @param buffer - The buffer containing the file data
 * @param metadata - Optional metadata to attach to the object
 * @returns A MinioOperation that uploads the buffer when executed
 *
 * @example
 * import { createUploadOperation, executeMinioOperation } from "@settlemint/sdk-minio";
 *
 * const buffer = Buffer.from("file content");
 * const uploadOperation = createUploadOperation("my-bucket", "folder/file.txt", buffer, { "content-type": "text/plain" });
 * const result = await executeMinioOperation(uploadOperation);
 */
export function createUploadOperation(
  bucket: string,
  objectName: string,
  buffer: Buffer,
  metadata?: ItemBucketMetadata,
): MinioOperation<{ etag: string }> {
  return {
    execute: async (client: Client) => {
      return client.putObject(bucket, objectName, buffer, undefined, metadata);
    },
  };
}

/**
 * Creates an operation to delete an object from MinIO
 *
 * @param bucket - The bucket name containing the object
 * @param objectName - The object name/path to delete
 * @returns A MinioOperation that deletes the object when executed
 *
 * @example
 * import { createDeleteOperation, executeMinioOperation } from "@settlemint/sdk-minio";
 *
 * const deleteOperation = createDeleteOperation("my-bucket", "folder/file.txt");
 * await executeMinioOperation(deleteOperation);
 */
export function createDeleteOperation(bucket: string, objectName: string): MinioOperation<void> {
  return {
    execute: async (client: Client) => {
      return client.removeObject(bucket, objectName);
    },
  };
}

/**
 * Creates an operation to generate a presigned URL for an object
 *
 * @param bucket - The bucket name containing the object
 * @param objectName - The object name/path
 * @param expirySeconds - How long the URL should be valid for in seconds
 * @returns A MinioOperation that creates a presigned URL when executed
 *
 * @example
 * import { createPresignedUrlOperation, executeMinioOperation } from "@settlemint/sdk-minio";
 *
 * const urlOperation = createPresignedUrlOperation("my-bucket", "folder/file.txt", 3600);
 * const url = await executeMinioOperation(urlOperation);
 */
export function createPresignedUrlOperation(
  bucket: string,
  objectName: string,
  expirySeconds: number,
): MinioOperation<string> {
  return {
    execute: async (client: Client) => {
      return client.presignedGetObject(bucket, objectName, expirySeconds);
    },
  };
}

/**
 * Creates an operation to generate a presigned PUT URL for direct uploads
 *
 * @param bucket - The bucket name to upload to
 * @param objectName - The object name/path to create
 * @param expirySeconds - How long the URL should be valid for in seconds
 * @param metadata - Optional object with metadata to attach
 * @returns A MinioOperation that creates a presigned PUT URL when executed
 *
 * @example
 * import { createPresignedPutOperation, executeMinioOperation } from "@settlemint/sdk-minio";
 *
 * const putUrlOperation = createPresignedPutOperation("my-bucket", "folder/file.txt", 3600);
 * const url = await executeMinioOperation(putUrlOperation);
 */
export function createPresignedPutOperation(
  bucket: string,
  objectName: string,
  expirySeconds: number,
  metadata?: Record<string, string>,
): MinioOperation<string> {
  return {
    execute: async (client: Client) => {
      // The MinIO client only accepts the first three parameters for presignedPutObject
      // Metadata needs to be applied when actually uploading via the presigned URL
      return client.presignedPutObject(bucket, objectName, expirySeconds);
    },
  };
}

/**
 * Creates a simplified upload function bound to a specific client
 *
 * @param client - The MinIO client to use for uploads
 * @returns A function that uploads buffers to MinIO
 *
 * @example
 * import { createSimpleUploadOperation, getMinioClient } from "@settlemint/sdk-minio";
 *
 * const client = await getMinioClient();
 * const uploadFn = createSimpleUploadOperation(client);
 * const result = await uploadFn(buffer, "my-bucket", "folder/file.txt", { "content-type": "text/plain" });
 */
export function createSimpleUploadOperation(client: Client) {
  return async (
    buffer: Buffer,
    bucket: string,
    objectName: string,
    metadata?: ItemBucketMetadata,
  ): Promise<{ etag: string }> => {
    return client.putObject(bucket, objectName, buffer, undefined, metadata);
  };
}
