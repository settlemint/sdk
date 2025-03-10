import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";

/**
 * Creates a tool for restarting a blockchain node by its unique name
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformBlockchainNodeRestart } from "@settlemint/sdk-mcp/tools/platform/blockchainNode/restart";
 *
 * platformBlockchainNodeRestart(server, env);
 */
export const platformBlockchainNodeRestart = (server: McpServer, env: Partial<DotEnv>) => {
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
    "platform-blockchain-node-restart",
    {
      nodeUniqueName: z.string().describe("Unique name of the blockchain node to restart"),
    },
    async (params) => {
      const node = await client.blockchainNode.restart(params.nodeUniqueName);
      return {
        content: [
          {
            type: "text",
            name: "Blockchain Node Restarted",
            description: `Restarted blockchain node: ${params.nodeUniqueName}`,
            mimeType: "application/json",
            text: JSON.stringify(node, null, 2),
          },
        ],
      };
    },
  );
};
