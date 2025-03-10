import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";

/**
 * Creates a tool for listing private keys in an application
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformPrivateKeyList } from "@settlemint/sdk-mcp/tools/platform/privateKey/list";
 *
 * platformPrivateKeyList(server, env);
 */
export const platformPrivateKeyList = (server: McpServer, env: Partial<DotEnv>) => {
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
    "platform-private-key-list",
    {
      applicationUniqueName: z.string().describe("Unique name of the application to list private keys from"),
    },
    async (params) => {
      const privateKeys = await client.privateKey.list(params.applicationUniqueName);
      return {
        content: [
          {
            type: "text",
            name: "Private Key List",
            description: `List of private keys in application: ${params.applicationUniqueName}`,
            mimeType: "application/json",
            text: JSON.stringify(privateKeys, null, 2),
          },
        ],
      };
    },
  );
};
