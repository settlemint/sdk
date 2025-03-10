import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";

/**
 * Creates a tool for listing blockchain nodes in an application
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformBlockchainNodeList } from "@settlemint/sdk-mcp/tools/platform/blockchainNode/list";
 *
 * platformBlockchainNodeList(server, env);
 */
export const platformBlockchainNodeList = (server: McpServer, env: Partial<DotEnv>) => {
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
