import { writeTemplate } from "@/commands/codegen/write-template";
import { type DotEnv, installDependencies, isPackageInstalled } from "@settlemint/sdk-utils";

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

export const { client } = createServerIpfsClient({
  instance: process.env.SETTLEMINT_IPFS_API_ENDPOINT!,
  accessToken: process.env.SETTLEMINT_ACCESS_TOKEN!,
});`;

  await writeTemplate(clientTemplate, "/lib/settlemint", "ipfs.ts");

  // Install the package only if it's not already installed
  if (!(await isPackageInstalled(PACKAGE_NAME))) {
    await installDependencies(PACKAGE_NAME);
  }
}
