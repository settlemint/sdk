import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";

/**
 * Creates a tool for reading an application by ID
 *
 * @param server - The MCP server instance
 * @param env - Environment variables containing SettleMint credentials
 * @param pat - Personal Access Token for SettleMint API
 * @throws Error if required environment variables are not set
 *
 * @example
 * import { platformApplicationRead } from "@settlemint/sdk-mcp/tools/platform/application/read";
 *
 * platformApplicationRead(server, env, pat);
 */
export const platformApplicationRead = (server: McpServer, env: Partial<DotEnv>, pat: string) => {
  const instance = env.SETTLEMINT_INSTANCE;

  if (!instance) {
    throw new Error("SETTLEMINT_INSTANCE is not set");
  }

  const client = createSettleMintClient({
    accessToken: pat,
    instance: instance,
  });

  server.tool(
    "platform-application-read",
    {
      applicationUniqueName: z.string().describe("Unique name of the application to read"),
    },
    async (params) => {
      const application = await client.application.read(params.applicationUniqueName);
      return {
        content: [
          {
            type: "text",
            name: "Application Details",
            description: `Details for application: ${params.applicationUniqueName}`,
            mimeType: "application/json",
            text: JSON.stringify(application, null, 2),
          },
        ],
      };
    },
  );
};
