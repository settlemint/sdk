import { writeTemplate } from "@/commands/codegen/write-template";
import { type DotEnv, installDependencies, isPackageInstalled } from "@settlemint/sdk-utils";

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

export const { client } = createServerMinioClient({
  instance: process.env.SETTLEMINT_MINIO_ENDPOINT!,
  accessToken: process.env.SETTLEMINT_ACCESS_TOKEN!,
  accessKey: process.env.SETTLEMINT_MINIO_ACCESS_KEY!,
  secretKey: process.env.SETTLEMINT_MINIO_SECRET_KEY!
});`;

  await writeTemplate(clientTemplate, "/lib/settlemint", "minio.ts");

  // Install the package only if it's not already installed
  if (!(await isPackageInstalled(PACKAGE_NAME))) {
    await installDependencies(PACKAGE_NAME);
  }
}
