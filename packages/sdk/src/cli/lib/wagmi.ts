import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { findProjectRoot } from "@settlemint/sdk-common/utils/path";
import { createChainConfig } from "./chain.js";

/**
 * Creates a Portal REST client based on the OpenAPI specification.
 * This function generates TypeScript types and a client for the Portal REST API.
 *
 * @param portalRest - The base URL of the Portal REST API
 * @param personalAccessToken - The personal access token for authentication
 */
export async function createWagmiClient(options: {
  framework: string;
  nodeUrl?: string;
  personalAccessToken: string;
}) {
  const { framework, nodeUrl } = options;

  if (nodeUrl) {
    // Create directory structure
    const settleMintDir = join(findProjectRoot(process.cwd()), ".settlemint");
    const nodeDir = join(settleMintDir, "node");
    const codegenDir = join(nodeDir, "codegen");
    mkdirSync(codegenDir, { recursive: true });

    await createChainConfig(options);

    const clientConfigPath = join(nodeDir, "wagmi.ts");

    if (framework === "nextjs") {
      writeFileSync(
        clientConfigPath,
        `import { createSettleMintWagmiConfig } from "@settlemint/sdk-next/connectors/wagmi";
import { chain } from "./codegen/chain";

export const settleMintWagmiConfig = createSettleMintWagmiConfig(chain)
`,
      );
    }
  }
}
