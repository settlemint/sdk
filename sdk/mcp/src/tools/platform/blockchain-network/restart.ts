import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";

/**
 * Creates a tool for restarting a blockchain network by its unique name
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformBlockchainNetworkRestart } from "@settlemint/sdk-mcp/tools/platform/blockchainNetwork/restart";
 *
 * platformBlockchainNetworkRestart(server, env);
 */
export const platformBlockchainNetworkRestart = (server: McpServer, env: Partial<DotEnv>) => {
  const instance = env.SETTLEMINT_INSTANCE;
  const accessToken = env.SETTLEMINT_ACCESS_TOKEN;

  if (!instance) {
    throw new Error("SETTLEMINT_INSTANCE is not set");
  }

  if (!accessToken) {
    throw new Error("SETTLEMINT_ACCESS_TOKEN is not set");
  }

  const client = createSettleMintClient({
    accessToken: accessToken,
    instance: instance,
  });

  server.tool(
    "platform-blockchain-network-restart",
    {
      networkUniqueName: z.string().describe("Unique name of the blockchain network to restart"),
    },
    async (params) => {
      const network = await client.blockchainNetwork.restart(params.networkUniqueName);
      return {
        content: [
          {
            type: "text",
            name: "Blockchain Network Restarted",
            description: `Restarted blockchain network: ${params.networkUniqueName}`,
            mimeType: "application/json",
            text: JSON.stringify(network, null, 2),
          },
        ],
      };
    },
  );
};
