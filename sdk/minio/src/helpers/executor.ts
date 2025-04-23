import { ensureServer } from "@settlemint/sdk-utils/runtime";
import type { Client } from "minio";
import type { MinioOperation } from "./operations.js";

/**
 * Executes a MinIO operation using the provided client
 *
 * @param operation - The operation to execute
 * @param client - Optional MinIO client to use (if not provided, current client must be available)
 * @returns The result of the operation execution
 * @throws Will throw an error if the operation fails
 *
 * @example
 * import { createListObjectsOperation, executeMinioOperation } from "@settlemint/sdk-minio";
 *
 * const operation = createListObjectsOperation("my-bucket", "prefix/");
 * const result = await executeMinioOperation(operation);
 */
export async function executeMinioOperation<T>(operation: MinioOperation<T>, client?: Client): Promise<T> {
  ensureServer();

  if (!client) {
    throw new Error("MinIO client is required. Provide a client or use getMinioClient to get the default client.");
  }

  return operation.execute(client);
}
