import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { http, createPublicClient } from "viem";
import * as chains from "viem/chains";
import { findProjectRoot } from "./path";

function getChain(chainId: number): { chain: chains.Chain; name: string } | undefined {
  for (const [key, chain] of Object.entries(chains)) {
    if ("id" in chain && chain.id === chainId) {
      return { chain, name: key };
    }
  }
  return undefined;
}

/**
 * Creates a Portal REST client based on the OpenAPI specification.
 * This function generates TypeScript types and a client for the Portal REST API.
 *
 * @param portalRest - The base URL of the Portal REST API
 * @param personalAccessToken - The personal access token for authentication
 */
export async function createChainConfig(options: {
  framework: string;
  nodeUrl?: string;
  personalAccessToken: string;
}) {
  const { framework, nodeUrl, personalAccessToken } = options;

  if (nodeUrl) {
    // Create directory structure
    const settleMintDir = join(findProjectRoot(process.cwd()), ".settlemint");
    const nodeDir = join(settleMintDir, "node");
    const codegenDir = join(nodeDir, "codegen");
    mkdirSync(codegenDir, { recursive: true });

    // Generate and write Portal REST client
    const chainPath = join(codegenDir, "chain.ts");

    // Create a temporary public client to fetch the chain ID
    const tempClient = createPublicClient({
      transport: http(nodeUrl, { retryCount: 5, fetchOptions: { headers: { "x-auth-token": personalAccessToken } } }),
    });

    // Fetch the chain ID
    const chainId = await tempClient.getChainId();

    const chain = getChain(chainId);

    if (chain) {
      writeFileSync(
        chainPath,
        `
import { ${chain.name} } from 'viem/chains';
export const chain = ${chain.name};
`,
      );
    } else {
      writeFileSync(
        chainPath,
        `
import { defineChain } from "viem";

export const chain = defineChain({
  id: ${chainId},
  name: "settlemint-${chainId}",
  nativeCurrency: {
    decimals: 18,
    name: "SettleMint",
    symbol: "SM",
  },
  rpcUrls: {
    default: {
      http: [${framework === "nextjs" ? "`${process.env.NEXT_PUBLIC_SETTLEMINT_APP_URL}/node/jsonrpc`" : `"${nodeUrl}"`}],
    },
  },
});
`,
      );
    }
  }
}
