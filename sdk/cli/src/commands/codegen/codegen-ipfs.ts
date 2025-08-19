import { projectRoot } from "@settlemint/sdk-utils/filesystem";
import { installDependencies, isPackageInstalled } from "@settlemint/sdk-utils/package-manager";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { writeTemplate } from "@/commands/codegen/utils/write-template";

const PACKAGE_NAME = "@settlemint/sdk-ipfs";

export function shouldCodegenIpfs(env: DotEnv) {
  return !!env.SETTLEMINT_IPFS_API_ENDPOINT;
}

export async function codegenIpfs(env: DotEnv) {
  const endpoint = env.SETTLEMINT_IPFS_API_ENDPOINT;
  if (!endpoint) {
    return;
  }

  const clientTemplate = `import { createServerIpfsClient } from "${PACKAGE_NAME}";

// Validate required environment variables
const ipfsApiEndpoint = process.env.SETTLEMINT_IPFS_API_ENDPOINT;

if (!ipfsApiEndpoint) {
  throw new Error('SETTLEMINT_IPFS_API_ENDPOINT environment variable is required');
}

export const { client } = createServerIpfsClient({
  instance: ipfsApiEndpoint,
  accessToken: process.env.SETTLEMINT_ACCESS_TOKEN,
});`;

  await writeTemplate(clientTemplate, "/lib/settlemint", "ipfs.ts");

  const projectDir = await projectRoot();
  // Install the package only if it's not already installed
  if (!(await isPackageInstalled(PACKAGE_NAME, projectDir))) {
    await installDependencies(PACKAGE_NAME, projectDir);
  }
}
