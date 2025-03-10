import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";

/**
 * Creates a tool for reading a specific custom deployment by its unique name
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformCustomDeploymentRead } from "@settlemint/sdk-mcp/tools/platform/customDeployment/read";
 *
 * platformCustomDeploymentRead(server, env);
 */
export const platformCustomDeploymentRead = (server: McpServer, env: Partial<DotEnv>) => {
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
    "platform-custom-deployment-read",
    {
      customDeploymentUniqueName: z.string().describe("Unique name of the custom deployment to read"),
    },
    async (params) => {
      const customDeployment = await client.customDeployment.read(params.customDeploymentUniqueName);
      return {
        content: [
          {
            type: "text",
            name: "Custom Deployment Details",
            description: `Details for custom deployment: ${params.customDeploymentUniqueName}`,
            mimeType: "application/json",
            text: JSON.stringify(customDeployment, null, 2),
          },
        ],
      };
    },
  );
};
