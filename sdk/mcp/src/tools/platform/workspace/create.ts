import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";

/**
 * Creates a tool for creating a new workspace
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformWorkspaceCreate } from "@settlemint/sdk-mcp/tools/platform/workspace/create";
 *
 * platformWorkspaceCreate(server, env);
 */
export const platformWorkspaceCreate = (server: McpServer, env: Partial<DotEnv>) => {
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
    "platform-workspace-create",
    {
      name: z.string().describe("Name of the workspace"),
      addressLine1: z.string().optional().describe("Address line 1"),
      addressLine2: z.string().optional().describe("Address line 2"),
      city: z.string().optional().describe("City"),
      companyName: z.string().optional().describe("Company name"),
      country: z.string().optional().describe("Country"),
      parentId: z.string().optional().describe("Parent workspace ID"),
      paymentMethodId: z.string().optional().describe("Payment method ID"),
      postalCode: z.string().optional().describe("Postal code"),
      taxIdType: z.string().optional().describe("Tax ID type"),
      taxIdValue: z.string().optional().describe("Tax ID value"),
    },
    async (params) => {
      const workspace = await client.workspace.create(params);

      return {
        content: [
          {
            type: "text",
            name: "Workspace Created",
            description: `Created workspace: ${params.name}`,
            mimeType: "application/json",
            text: JSON.stringify(workspace, null, 2),
          },
        ],
      };
    },
  );
};
