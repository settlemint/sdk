import fs from "node:fs/promises";
import path from "node:path";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { z } from "zod/v4";

/**
 * Registers a tool to get a specific prompt from the SDK
 *
 * @param server - The MCP server instance
 * @param env - Environment variables
 *
 * @example
 * import { promptsGet } from "@settlemint/sdk-mcp/tools/prompts/get";
 *
 * promptsGet(server, env);
 */
export const promptsGet = (server: McpServer, _env: Partial<DotEnv>) => {
  server.tool(
    "prompts-get",
    {
      category: z.string().describe("The prompt category (e.g., hasura, portal, thegraph, tool-usage)"),
      name: z.string().describe("The name of the prompt file without extension"),
    },
    async ({ category, name }) => {
      try {
        // Get the prompts directory path
        const promptsDir = path.resolve(__dirname, "../../prompts");
        const promptPath = path.join(promptsDir, category, `${name}.ts`);

        // Check if the file exists
        try {
          await fs.access(promptPath);
        } catch (error) {
          return {
            content: [
              {
                type: "text",
                name: "Prompt Not Found",
                description: `Prompt '${name}' in category '${category}' not found`,
                mimeType: "text/plain",
                text: `Prompt '${name}' in category '${category}' does not exist. Use the prompts-list tool to see available prompts.`,
              },
            ],
          };
        }

        // Read the file content
        const fileContent = await fs.readFile(promptPath, "utf-8");

        return {
          content: [
            {
              type: "text",
              name: `${category}/${name} Prompt`,
              description: `Content of the ${category}/${name} prompt`,
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
              description: "Error getting prompt",
              mimeType: "text/plain",
              text: `Error: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
        };
      }
    },
  );
};
