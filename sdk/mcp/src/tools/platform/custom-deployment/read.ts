import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod/v4";

/**
 * Creates a tool for reading a custom deployment by ID
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @param pat - Personal Access Token for SettleMint API
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformCustomDeploymentRead } from "@settlemint/sdk-mcp/tools/platform/custom-deployment/read";
 *
 * platformCustomDeploymentRead(server, env, pat);
 */
export const platformCustomDeploymentRead = (server: McpServer, env: Partial<DotEnv>, pat: string) => {
  const instance = env.SETTLEMINT_INSTANCE;

  if (!instance) {
    throw new Error("SETTLEMINT_INSTANCE is not set");
  }

  const client = createSettleMintClient({
    accessToken: pat,
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
