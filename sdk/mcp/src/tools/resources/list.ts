import fs from "node:fs/promises";
import path from "node:path";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

/**
 * Registers a tool to list available resources in the SDK
 *
 * @param server - The MCP server instance
 * @param env - Environment variables
 *
 * @example
 * import { resourcesList } from "@settlemint/sdk-mcp/tools/resources/list";
 *
 * resourcesList(server, env);
 */
export const resourcesList = (server: McpServer, _env: Partial<DotEnv>) => {
  const schema = z.object({});

  server.tool("resources-list", { inputSchema: zodToJsonSchema(schema) }, async (params) => {
    schema.parse(params);
    try {
      // Get the resources directory path
      const resourcesDir = path.resolve(__dirname, "../../resources");

      // Read all files in the resources folder
      const resourceFiles = await fs.readdir(resourcesDir, { withFileTypes: true });

      // Filter for TypeScript files
      const resources = resourceFiles
        .filter((file) => file.isFile() && file.name.endsWith(".ts"))
        .map((file) => file.name.replace(".ts", ""));

      // Format the output
      let output = "# Available Resources\n\n";

      for (const resource of resources) {
        output += `- ${resource}\n`;
      }

      return {
        content: [
          {
            type: "text",
            name: "Available Resources",
            description: "List of all available resources in the SDK",
            mimeType: "text/markdown",
            text: output,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            name: "Error",
            description: "Error listing resources",
            mimeType: "text/plain",
            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
      };
    }
  });
};
