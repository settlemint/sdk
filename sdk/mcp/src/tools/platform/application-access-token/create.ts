import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";

/**
 * Creates a tool for creating a new application access token
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformApplicationAccessTokenCreate } from "@settlemint/sdk-mcp/tools/platform/applicationAccessToken/create";
 *
 * platformApplicationAccessTokenCreate(server, env);
 */
export const platformApplicationAccessTokenCreate = (server: McpServer, env: Partial<DotEnv>) => {
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

  const scopeSchema = z.object({
    type: z.enum(["ALL", "SPECIFIC"]).describe("Scope type (ALL or SPECIFIC)"),
    values: z.array(z.string()).describe("Specific values if type is SPECIFIC"),
  });

  server.tool(
    "platform-application-access-token-create",
    {
      applicationUniqueName: z.string().describe("Unique name of the application to create the access token for"),
      name: z.string().describe("Name of the access token"),
      validityPeriod: z
        .enum(["CUSTOM", "DAYS_7", "DAYS_30", "DAYS_60", "DAYS_90", "NONE"])
        .describe("Validity period for the access token"),
      blockchainNetworkScope: scopeSchema.describe("Blockchain network scope"),
      blockchainNodeScope: scopeSchema.describe("Blockchain node scope"),
      customDeploymentScope: scopeSchema.describe("Custom deployment scope"),
      insightsScope: scopeSchema.describe("Insights scope"),
      integrationScope: scopeSchema.describe("Integration scope"),
      loadBalancerScope: scopeSchema.describe("Load balancer scope"),
      middlewareScope: scopeSchema.describe("Middleware scope"),
      privateKeyScope: scopeSchema.describe("Private key scope"),
      smartContractSetScope: scopeSchema.describe("Smart contract set scope"),
      storageScope: scopeSchema.describe("Storage scope"),
    },
    async (params) => {
      const token = await client.applicationAccessToken.create({
        applicationUniqueName: params.applicationUniqueName,
        name: params.name,
        validityPeriod: params.validityPeriod,
        blockchainNetworkScope: params.blockchainNetworkScope,
        blockchainNodeScope: params.blockchainNodeScope,
        customDeploymentScope: params.customDeploymentScope,
        insightsScope: params.insightsScope,
        integrationScope: params.integrationScope,
        loadBalancerScope: params.loadBalancerScope,
        middlewareScope: params.middlewareScope,
        privateKeyScope: params.privateKeyScope,
        smartContractSetScope: params.smartContractSetScope,
        storageScope: params.storageScope,
      });

      return {
        content: [
          {
            type: "text",
            name: "Application Access Token Created",
            description: `Created access token: ${params.name} for application: ${params.applicationUniqueName}`,
            mimeType: "text/plain",
            text: token,
          },
        ],
      };
    },
  );
};
