import { writeTemplate } from "@/commands/codegen/write-template";
import type { DotEnv } from "@settlemint/sdk-utils";

export function shouldCodegenIpfs(env: DotEnv) {
  return !!env.SETTLEMINT_IPFS_API_ENDPOINT;
}

export async function codegenIpfs(env: DotEnv) {
  const endpoint = env.SETTLEMINT_IPFS_API_ENDPOINT;
  if (!endpoint) {
    return;
  }

  const clientTemplate = `import { createServerIpfsClient } from "@settlemint/sdk-ipfs";

export const { client } = createServerIpfsClient({
  instance: process.env.SETTLEMINT_HASURA_ENDPOINT!,
  accessToken: process.env.SETTLEMINT_ACCESS_TOKEN!,
});`;

  await writeTemplate(clientTemplate, "/lib/settlemint", "ipfs.ts");
}
