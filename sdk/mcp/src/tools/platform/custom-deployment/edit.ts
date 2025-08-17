import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

/**
 * Creates a tool for editing an existing custom deployment
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @param pat - Personal Access Token for SettleMint API
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformCustomDeploymentEdit } from "@settlemint/sdk-mcp/tools/platform/custom-deployment/edit";
 *
 * platformCustomDeploymentEdit(server, env, pat);
 */
export const platformCustomDeploymentEdit = (server: McpServer, env: Partial<DotEnv>, pat: string) => {
  const instance = env.SETTLEMINT_INSTANCE;

  if (!instance) {
    throw new Error("SETTLEMINT_INSTANCE is not set");
  }

  const client = createSettleMintClient({
    accessToken: pat,
    instance: instance,
  });

  const schema = z.object({
    customDeploymentUniqueName: z.string().describe(
      "Unique name of the custom deployment to edit",
    ),
    imageTag: z.string().describe("The new tag of the Docker image"),
  });

  server.tool(
    "platform-custom-deployment-edit",
    { inputSchema: zodToJsonSchema(schema) },
    async (params) => {
      const { customDeploymentUniqueName, imageTag } = schema.parse(params);
      const customDeployment = await client.customDeployment.update(
        customDeploymentUniqueName,
        imageTag,
      );

      return {
        content: [
          {
            type: "text",
            name: "Custom Deployment Updated",
            description: `Updated custom deployment: ${customDeploymentUniqueName} to tag: ${imageTag}`,
            mimeType: "application/json",
            text: JSON.stringify(customDeployment, null, 2),
          },
        ],
      };
    },
  );
};
