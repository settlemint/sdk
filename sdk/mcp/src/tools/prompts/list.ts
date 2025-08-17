import fs from "node:fs/promises";
import path from "node:path";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

/**
 * Registers a tool to list available prompts in the SDK
 *
 * @param server - The MCP server instance
 * @param env - Environment variables
 *
 * @example
 * import { promptsList } from "@settlemint/sdk-mcp/tools/prompts/list";
 *
 * promptsList(server, env);
 */
export const promptsList = (server: McpServer, _env: Partial<DotEnv>) => {
  const schema = z.object({});

  server.tool("prompts-list", { inputSchema: zodToJsonSchema(schema) }, async (params) => {
    schema.parse(params);
    try {
      // Get the prompts directory path
      const promptsDir = path.resolve(__dirname, "../../prompts");

      // Read all directories in the prompts folder
      const promptCategories = await fs.readdir(promptsDir, { withFileTypes: true });

      // Filter for directories only
      const categories = promptCategories.filter((dirent) => dirent.isDirectory()).map((dirent) => dirent.name);

      // Collect all prompts from each category
      const promptsMap: Record<string, string[]> = {};

      for (const category of categories) {
        const categoryPath = path.join(promptsDir, category);
        const files = await fs.readdir(categoryPath, { withFileTypes: true });

        // Filter for TypeScript files
        const promptFiles = files
          .filter((file) => file.isFile() && file.name.endsWith(".ts"))
          .map((file) => file.name.replace(".ts", ""));

        promptsMap[category] = promptFiles;
      }

      // Format the output
      let output = "# Available Prompts\n\n";

      for (const [category, prompts] of Object.entries(promptsMap)) {
        output += `## ${category}\n\n`;

        for (const prompt of prompts) {
          output += `- ${prompt}\n`;
        }

        output += "\n";
      }

      return {
        content: [
          {
            type: "text",
            name: "Available Prompts",
            description: "List of all available prompts in the SDK",
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
            description: "Error listing prompts",
            mimeType: "text/plain",
            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
      };
    }
  });
};
