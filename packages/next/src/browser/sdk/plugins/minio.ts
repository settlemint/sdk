import { Client } from "minio";

export function createMinioS3Client({ endPoint }: { endPoint: string }) {
  return new Client({
    endPoint: endPoint,
    port: 443,
    useSSL: true,
    accessKey: process.env.SETTLEMINT_MINIO_ACCESS_KEY ?? "",
    secretKey: process.env.SETTLEMINT_MINIO_SECRET_KEY ?? "",
  });
}
