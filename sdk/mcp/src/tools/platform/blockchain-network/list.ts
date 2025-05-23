import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod/v4";

/**
 * Creates a tool for listing blockchain networks in an application
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @param pat - Personal Access Token for SettleMint API
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformBlockchainNetworkList } from "@settlemint/sdk-mcp/tools/platform/blockchain-network/list";
 *
 * platformBlockchainNetworkList(server, env, pat);
 */
export const platformBlockchainNetworkList = (server: McpServer, env: Partial<DotEnv>, pat: string) => {
  const instance = env.SETTLEMINT_INSTANCE;

  if (!instance) {
    throw new Error("SETTLEMINT_INSTANCE is not set");
  }

  const client = createSettleMintClient({
    accessToken: pat,
    instance: instance,
  });

  server.tool(
    "platform-blockchain-network-list",
    {
      applicationUniqueName: z
        .string()
        .describe("Unique name of the application to list blockchain networks from")
        .optional(),
    },
    async (params) => {
      // Prioritize environment variable over LLM-provided parameter
      const applicationUniqueName = env.SETTLEMINT_APPLICATION || params.applicationUniqueName;

      if (!applicationUniqueName) {
        throw new Error(
          "Application unique name is required. Set SETTLEMINT_APPLICATION environment variable or provide applicationUniqueName parameter.",
        );
      }

      const networks = await client.blockchainNetwork.list(applicationUniqueName);
      return {
        content: [
          {
            type: "text",
            name: "Blockchain Network List",
            description: `List of blockchain networks in application: ${applicationUniqueName}`,
            mimeType: "application/json",
            text: JSON.stringify(networks, null, 2),
          },
        ],
      };
    },
  );
};
