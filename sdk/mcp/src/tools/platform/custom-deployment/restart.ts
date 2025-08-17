import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

/**
 * Creates a tool for restarting a custom deployment
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @param pat - Personal Access Token for SettleMint API
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformCustomDeploymentRestart } from "@settlemint/sdk-mcp/tools/platform/custom-deployment/restart";
 *
 * platformCustomDeploymentRestart(server, env, pat);
 */
export const platformCustomDeploymentRestart = (server: McpServer, env: Partial<DotEnv>, pat: string) => {
  const instance = env.SETTLEMINT_INSTANCE;

  if (!instance) {
    throw new Error("SETTLEMINT_INSTANCE is not set");
  }

  const client = createSettleMintClient({
    accessToken: pat,
    instance: instance,
  });

  const schema = z.object({
    customDeploymentUniqueName: z.string().describe("Unique name of the custom deployment to restart"),
  });

  server.tool("platform-custom-deployment-restart", { inputSchema: zodToJsonSchema(schema) }, async (params) => {
    const { customDeploymentUniqueName } = schema.parse(params);
    const customDeployment = await client.customDeployment.restart(customDeploymentUniqueName);
    return {
      content: [
        {
          type: "text",
          name: "Custom Deployment Restarted",
          description: `Restarted custom deployment: ${customDeploymentUniqueName}`,
          mimeType: "application/json",
          text: JSON.stringify(customDeployment, null, 2),
        },
      ],
    };
  });
};
