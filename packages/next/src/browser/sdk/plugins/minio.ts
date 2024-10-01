import { Client } from "minio";

export function createMinioS3Client(options?: { endPoint?: string }) {
  if (!options?.endPoint || !process.env.SETTLEMINT_MINIO_ACCESS_KEY || !process.env.SETTLEMINT_MINIO_SECRET_KEY) {
    return null;
  }
  return new Client({
    endPoint: options.endPoint,
    port: 443,
    useSSL: true,
    accessKey: process.env.SETTLEMINT_MINIO_ACCESS_KEY ?? "",
    secretKey: process.env.SETTLEMINT_MINIO_SECRET_KEY ?? "",
  });
}
