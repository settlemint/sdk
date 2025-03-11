import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

/**
 * Registers a prompt to explain how to use the prompts and resources tools
 *
 * @param server - The MCP server instance
 *
 * @example
 * import { promptsResourcesToolsUsagePrompt } from "@settlemint/sdk-mcp/prompts/tool-usage/prompts-resources-tools";
 *
 * promptsResourcesToolsUsagePrompt(server);
 */
export const promptsResourcesToolsUsagePrompt = (server: McpServer) => {
  server.prompt("prompts-resources-tools-usage", () => ({
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: "I need help understanding how to use the prompts and resources tools in the SettleMint SDK.",
        },
      },
      {
        role: "assistant",
        content: {
          type: "text",
          text: `# Prompts and Resources Tools

The SettleMint SDK provides tools to work with prompts and resources, which are essential components for AI-assisted development.

## Prompts Tools

Prompts are predefined conversation starters or templates that help guide AI interactions for specific tasks.

### Available Tools:

1. **prompts-list**
   - Lists all available prompts in the SDK
   - Usage: \`prompts-list\`
   - No parameters required

2. **prompts-get**
   - Retrieves the content of a specific prompt
   - Usage: \`prompts-get\`
   - Parameters:
     - \`category\`: The prompt category (e.g., hasura, portal, thegraph, tool-usage)
     - \`name\`: The name of the prompt file without extension

### Example Usage:

To list all available prompts:
\`\`\`
prompts-list
\`\`\`

To get a specific prompt:
\`\`\`
prompts-get category: "hasura" name: "hasura"
\`\`\`

## Resources Tools

Resources are knowledge bases or reference materials that provide context and information to the AI.

### Available Tools:

1. **resources-list**
   - Lists all available resources in the SDK
   - Usage: \`resources-list\`
   - No parameters required

2. **resources-get**
   - Retrieves the content of a specific resource
   - Usage: \`resources-get\`
   - Parameters:
     - \`name\`: The name of the resource file without extension

### Example Usage:

To list all available resources:
\`\`\`
resources-list
\`\`\`

To get a specific resource:
\`\`\`
resources-get name: "blockchain-concepts"
\`\`\`

## Best Practices

1. Start by listing available prompts or resources to discover what's available
2. Use the get tools to examine specific prompts or resources of interest
3. Reference these prompts and resources in your development workflow to ensure consistent AI interactions
4. Create custom prompts for repetitive tasks or specialized knowledge areas`,
        },
      },
    ],
  }));
};
