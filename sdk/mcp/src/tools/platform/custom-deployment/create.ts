import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

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

  const schema = z.object({
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
  });

  server.tool("platform-custom-deployment-create", { inputSchema: zodToJsonSchema(schema) }, async (params) => {
    const parsed = schema.parse(params);
    const customDeployment = await client.customDeployment.create({
      applicationUniqueName: parsed.applicationUniqueName,
      name: parsed.name,
      imageTag: parsed.imageTag,
      imageName: parsed.imageName,
      imageRepository: parsed.imageRepository,
      port: parsed.port,
      environmentVariables: parsed.environmentVariables,
      provider: parsed.provider,
      region: parsed.region,
      type: parsed.type,
      size: parsed.size,
    });

    return {
      content: [
        {
          type: "text",
          name: "Custom Deployment Created",
          description: `Created custom deployment: ${parsed.name} in application: ${parsed.applicationUniqueName}`,
          mimeType: "application/json",
          text: JSON.stringify(customDeployment, null, 2),
        },
      ],
    };
  });
};
