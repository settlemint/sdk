import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

/**
 * Creates a tool for listing custom deployments in an application
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @param pat - Personal Access Token for SettleMint API
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformCustomDeploymentList } from "@settlemint/sdk-mcp/tools/platform/customDeployment/list";
 *
 * platformCustomDeploymentList(server, env, pat);
 */
export const platformCustomDeploymentList = (server: McpServer, env: Partial<DotEnv>, pat: string) => {
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
      .describe("Unique name of the application to list custom deployments from"),
  });

  server.tool(
    "platform-custom-deployment-list",
    { inputSchema: zodToJsonSchema(schema) },
    async (params) => {
      const { applicationUniqueName } = schema.parse(params);
      const customDeployments = await client.customDeployment.list(applicationUniqueName);
      return {
        content: [
          {
            type: "text",
            name: "Custom Deployment List",
            description: `List of custom deployments in application: ${applicationUniqueName}`,
            mimeType: "application/json",
            text: JSON.stringify(customDeployments, null, 2),
          },
        ],
      };
    },
  );
};
