import { writeTemplate } from "@/commands/codegen/write-template";
import type { DotEnv } from "@settlemint/sdk-utils";

export function shouldCodegenMinio(env: DotEnv) {
  return !!(env.SETTLEMINT_MINIO_ENDPOINT && env.SETTLEMINT_MINIO_ACCESS_KEY && env.SETTLEMINT_MINIO_SECRET_KEY);
}

export async function codegenMinio(env: DotEnv) {
  const endpoint = env.SETTLEMINT_MINIO_ENDPOINT;
  if (!endpoint) {
    return;
  }

  const clientTemplate = `import { createServerMinioClient } from "@settlemint/sdk-minio";
import type { Client } from "minio";

export const { client: Client } = createServerMinioClient({
  instance: process.env.SETTLEMINT_HASURA_ENDPOINT!,
  accessToken: process.env.SETTLEMINT_ACCESS_TOKEN!,
  accessKey: process.env.SETTLEMINT_MINIO_ACCESS_KEY
  secretKey: process.env.SETTLEMINT_MINIO_SECRET_KEY
});`;

  await writeTemplate(clientTemplate, "/lib/settlemint", "minio.ts");
}
