import { ensureServer } from "@settlemint/sdk-utils/runtime";
import type { Client } from "minio";
import type { MinioOperation } from "./operations.js";

/**
 * Executes a MinIO operation using the provided client
 *
 * @param client - MinIO client to use
 * @param operation - The operation to execute
 * @returns The result of the operation execution
 * @throws Will throw an error if the operation fails
 *
 * @example
 * import { createServerMinioClient, createListObjectsOperation, executeMinioOperation } from "@settlemint/sdk-minio";
 * const { client } = createServerMinioClient({
 *   instance: process.env.SETTLEMINT_MINIO_ENDPOINT!,
 *   accessKey: process.env.SETTLEMINT_MINIO_ACCESS_KEY!,
 *   secretKey: process.env.SETTLEMINT_MINIO_SECRET_KEY!
 * });
 * const listOperation = createListObjectsOperation("my-bucket", "prefix/");
 * const result = await executeMinioOperation(client, listOperation);
 */
export async function executeMinioOperation<T>(client: Client, operation: MinioOperation<T>): Promise<T> {
  ensureServer();

  return operation.execute(client);
}
