import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";

/**
 * Creates a tool for creating a new integration tool
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformIntegrationToolCreate } from "@settlemint/sdk-mcp/tools/platform/integrationTool/create";
 *
 * platformIntegrationToolCreate(server, env);
 */
export const platformIntegrationToolCreate = (server: McpServer, env: Partial<DotEnv>) => {
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
    "platform-integration-tool-create",
    {
      applicationUniqueName: z.string().describe("Unique name of the application to create the integration tool in"),
      name: z.string().describe("Name of the integration tool"),
      type: z.enum(["DEDICATED", "SHARED"]).describe("Type of the integration tool (DEDICATED or SHARED)"),
      provider: z.string().describe("Provider for the integration tool"),
      region: z.string().describe("Region for the integration tool"),
      integrationType: z.enum(["CHAINLINK", "HASURA", "INTEGRATION_STUDIO"]).describe("Type of integration"),
    },
    async (params) => {
      const integrationTool = await client.integrationTool.create({
        applicationUniqueName: params.applicationUniqueName,
        name: params.name,
        type: params.type,
        provider: params.provider,
        region: params.region,
        integrationType: params.integrationType,
      });

      return {
        content: [
          {
            type: "text",
            name: "Integration Tool Created",
            description: `Created integration tool: ${params.name} in application: ${params.applicationUniqueName}`,
            mimeType: "application/json",
            text: JSON.stringify(integrationTool, null, 2),
          },
        ],
      };
    },
  );
};
