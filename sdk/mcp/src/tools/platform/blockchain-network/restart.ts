import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod/v4";

/**
 * Creates a tool for restarting a blockchain network
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @param pat - Personal Access Token for SettleMint API
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformBlockchainNetworkRestart } from "@settlemint/sdk-mcp/tools/platform/blockchain-network/restart";
 *
 * platformBlockchainNetworkRestart(server, env, pat);
 */
export const platformBlockchainNetworkRestart = (server: McpServer, env: Partial<DotEnv>, pat: string) => {
  const instance = env.SETTLEMINT_INSTANCE;

  if (!instance) {
    throw new Error("SETTLEMINT_INSTANCE is not set");
  }

  const client = createSettleMintClient({
    accessToken: pat,
    instance: instance,
  });

  server.tool(
    "platform-blockchain-network-restart",
    {
      networkUniqueName: z.string().describe("Unique name of the blockchain network to restart").optional(),
    },
    async (params) => {
      // Prioritize environment variable over LLM-provided parameter
      const networkUniqueName = env.SETTLEMINT_BLOCKCHAIN_NETWORK || params.networkUniqueName;

      if (!networkUniqueName) {
        throw new Error(
          "Blockchain network unique name is required. Set SETTLEMINT_BLOCKCHAIN_NETWORK environment variable or provide networkUniqueName parameter.",
        );
      }

      const network = await client.blockchainNetwork.restart(networkUniqueName);
      return {
        content: [
          {
            type: "text",
            name: "Blockchain Network Restarted",
            description: `Restarted blockchain network: ${networkUniqueName}`,
            mimeType: "application/json",
            text: JSON.stringify(network, null, 2),
          },
        ],
      };
    },
  );
};
