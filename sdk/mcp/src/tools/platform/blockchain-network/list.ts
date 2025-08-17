import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

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

  const schema = z.object({
    applicationUniqueName: z
      .string()
      .describe("Unique name of the application to list blockchain networks from")
      .optional(),
  });

  server.tool("platform-blockchain-network-list", { inputSchema: zodToJsonSchema(schema) }, async (params) => {
    const { applicationUniqueName: provided } = schema.parse(params);
    // Prioritize environment variable over LLM-provided parameter
    const applicationUniqueName = env.SETTLEMINT_APPLICATION || provided;

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
  });
};
