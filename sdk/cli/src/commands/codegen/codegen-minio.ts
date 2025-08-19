import { projectRoot } from "@settlemint/sdk-utils/filesystem";
import { installDependencies, isPackageInstalled } from "@settlemint/sdk-utils/package-manager";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { writeTemplate } from "@/commands/codegen/utils/write-template";

const PACKAGE_NAME = "@settlemint/sdk-minio";

export function shouldCodegenMinio(env: DotEnv) {
  return !!(env.SETTLEMINT_MINIO_ENDPOINT && env.SETTLEMINT_MINIO_ACCESS_KEY && env.SETTLEMINT_MINIO_SECRET_KEY);
}

export async function codegenMinio(env: DotEnv) {
  const endpoint = env.SETTLEMINT_MINIO_ENDPOINT;
  if (!endpoint) {
    return;
  }

  const clientTemplate = `import { createServerMinioClient } from "${PACKAGE_NAME}";

// Validate required environment variables
const minioEndpoint = process.env.SETTLEMINT_MINIO_ENDPOINT;
const minioAccessKey = process.env.SETTLEMINT_MINIO_ACCESS_KEY;
const minioSecretKey = process.env.SETTLEMINT_MINIO_SECRET_KEY;

if (!minioEndpoint) {
  throw new Error('SETTLEMINT_MINIO_ENDPOINT environment variable is required');
}

if (!minioAccessKey) {
  throw new Error('SETTLEMINT_MINIO_ACCESS_KEY environment variable is required');
}

if (!minioSecretKey) {
  throw new Error('SETTLEMINT_MINIO_SECRET_KEY environment variable is required');
}

export const { client } = createServerMinioClient({
  instance: minioEndpoint,
  accessKey: minioAccessKey,
  secretKey: minioSecretKey
});`;

  await writeTemplate(clientTemplate, "/lib/settlemint", "minio.ts");

  const projectDir = await projectRoot();
  // Install the package only if it's not already installed
  if (!(await isPackageInstalled(PACKAGE_NAME, projectDir))) {
    await installDependencies(PACKAGE_NAME, projectDir);
  }
}
