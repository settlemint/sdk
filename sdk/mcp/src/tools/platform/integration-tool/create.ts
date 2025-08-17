import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

/**
 * Creates a tool for creating a new integration tool
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @param pat - Personal Access Token for SettleMint API
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformIntegrationToolCreate } from "@settlemint/sdk-mcp/tools/platform/integration-tool/create";
 *
 * platformIntegrationToolCreate(server, env, pat);
 */
export const platformIntegrationToolCreate = (server: McpServer, env: Partial<DotEnv>, pat: string) => {
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
      .describe("Unique name of the application to create the integration tool in"),
    name: z.string().describe("Name of the integration tool"),
    type: z.enum(["DEDICATED", "SHARED"]).describe(
      "Type of the integration tool (DEDICATED or SHARED)",
    ),
    size: z.enum(["SMALL", "MEDIUM", "LARGE"]).describe("Size of the integration tool"),
    provider: z.string().describe("Provider for the integration tool"),
    region: z.string().describe("Region for the integration tool"),
    integrationType: z
      .enum(["CHAINLINK", "HASURA", "INTEGRATION_STUDIO"])
      .describe("Type of integration"),
  });

  server.tool(
    "platform-integration-tool-create",
    { inputSchema: zodToJsonSchema(schema) },
    async (params) => {
      const parsed = schema.parse(params);
      const integrationTool = await client.integrationTool.create({
        applicationUniqueName: parsed.applicationUniqueName,
        name: parsed.name,
        type: parsed.type,
        size: parsed.size,
        provider: parsed.provider,
        region: parsed.region,
        integrationType: parsed.integrationType,
      });

      return {
        content: [
          {
            type: "text",
            name: "Integration Tool Created",
            description: `Created integration tool: ${parsed.name} in application: ${parsed.applicationUniqueName}`,
            mimeType: "application/json",
            text: JSON.stringify(integrationTool, null, 2),
          },
        ],
      };
    },
  );
};
