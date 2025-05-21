import fs from "node:fs/promises";
import path from "node:path";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod/v4";

/**
 * Registers a tool to get a specific resource from the SDK
 *
 * @param server - The MCP server instance
 * @param env - Environment variables
 *
 * @example
 * import { resourcesGet } from "@settlemint/sdk-mcp/tools/resources/get";
 *
 * resourcesGet(server, env);
 */
export const resourcesGet = (server: McpServer, _env: Partial<DotEnv>) => {
  server.tool(
    "resources-get",
    {
      name: z.string().describe("The name of the resource file without extension"),
    },
    async ({ name }) => {
      try {
        // Get the resources directory path
        const resourcesDir = path.resolve(__dirname, "../../resources");
        const resourcePath = path.join(resourcesDir, `${name}.ts`);

        // Check if the file exists
        try {
          await fs.access(resourcePath);
        } catch (error) {
          return {
            content: [
              {
                type: "text",
                name: "Resource Not Found",
                description: `Resource '${name}' not found`,
                mimeType: "text/plain",
                text: `Resource '${name}' does not exist. Use the resources-list tool to see available resources.`,
              },
            ],
          };
        }

        // Read the file content
        const fileContent = await fs.readFile(resourcePath, "utf-8");

        return {
          content: [
            {
              type: "text",
              name: `${name} Resource`,
              description: `Content of the ${name} resource`,
              mimeType: "text/typescript",
              text: fileContent,
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              name: "Error",
              description: "Error getting resource",
              mimeType: "text/plain",
              text: `Error: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
        };
      }
    },
  );
};
