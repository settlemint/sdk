import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod/v4";

/**
 * Creates a tool for listing blockchain nodes in an application
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @param pat - Personal Access Token for SettleMint API
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformBlockchainNodeList } from "@settlemint/sdk-mcp/tools/platform/blockchain-node/list";
 *
 * platformBlockchainNodeList(server, env, pat);
 */
export const platformBlockchainNodeList = (server: McpServer, env: Partial<DotEnv>, pat: string) => {
  const instance = env.SETTLEMINT_INSTANCE;

  if (!instance) {
    throw new Error("SETTLEMINT_INSTANCE is not set");
  }

  const client = createSettleMintClient({
    accessToken: pat,
    instance: instance,
  });

  server.tool(
    "platform-blockchain-node-list",
    {
      applicationUniqueName: z.string().describe("Unique name of the application to list blockchain nodes from"),
    },
    async (params) => {
      const nodes = await client.blockchainNode.list(params.applicationUniqueName);
      return {
        content: [
          {
            type: "text",
            name: "Blockchain Node List",
            description: `List of blockchain nodes in application: ${params.applicationUniqueName}`,
            mimeType: "application/json",
            text: JSON.stringify(nodes, null, 2),
          },
        ],
      };
    },
  );
};
