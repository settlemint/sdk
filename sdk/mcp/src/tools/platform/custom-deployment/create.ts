import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod/v4";

/**
 * Creates a tool for creating a new custom deployment
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @param pat - Personal Access Token for SettleMint API
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformCustomDeploymentCreate } from "@settlemint/sdk-mcp/tools/platform/custom-deployment/create";
 *
 * platformCustomDeploymentCreate(server, env, pat);
 */
export const platformCustomDeploymentCreate = (server: McpServer, env: Partial<DotEnv>, pat: string) => {
  const instance = env.SETTLEMINT_INSTANCE;

  if (!instance) {
    throw new Error("SETTLEMINT_INSTANCE is not set");
  }

  const client = createSettleMintClient({
    accessToken: pat,
    instance: instance,
  });

  server.tool(
    "platform-custom-deployment-create",
    {
      applicationUniqueName: z.string().describe("Unique name of the application to create the custom deployment in"),
      name: z.string().describe("Name of the custom deployment"),
      imageTag: z.string().describe("The tag of the Docker image"),
      imageName: z.string().describe("The name of the Docker image"),
      imageRepository: z.string().describe("The repository of the Docker image"),
      port: z.number().describe("The port number for the custom deployment"),
      environmentVariables: z
        .record(z.string(), z.any())
        .optional()
        .describe("Environment variables for the custom deployment"),
      provider: z.string().describe("Provider for the custom deployment"),
      region: z.string().describe("Region for the custom deployment"),
      type: z.enum(["DEDICATED", "SHARED"]).describe("Type of the custom deployment (DEDICATED or SHARED)"),
      size: z.enum(["SMALL", "MEDIUM", "LARGE"]).describe("Size of the custom deployment"),
    },
    async (params) => {
      const customDeployment = await client.customDeployment.create({
        applicationUniqueName: params.applicationUniqueName,
        name: params.name,
        imageTag: params.imageTag,
        imageName: params.imageName,
        imageRepository: params.imageRepository,
        port: params.port,
        environmentVariables: params.environmentVariables,
        provider: params.provider,
        region: params.region,
        type: params.type,
        size: params.size,
      });

      return {
        content: [
          {
            type: "text",
            name: "Custom Deployment Created",
            description: `Created custom deployment: ${params.name} in application: ${params.applicationUniqueName}`,
            mimeType: "application/json",
            text: JSON.stringify(customDeployment, null, 2),
          },
        ],
      };
    },
  );
};
