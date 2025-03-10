import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export const portalPrompt = (server: McpServer) => {
  server.prompt("write-portal-query-or-mutation", () => ({
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: `To write a GraphQL query or mutation for the Portal SDK, follow these steps:

1. First, discover available operations:
   - Use portal-queries tool to list all available queries
   - Use portal-mutations tool to list all available mutations

2. Get operation details:
   - Use portal-query tool with the query name to get its full schema definition
   - Use portal-mutation tool with the mutation name to get its full schema definition
   - Review the returned SDL for:
     * Required arguments and their types
     * Return type structure
     * Related type definitions

3. Define your GraphQL operation using portalGraphql
4. Execute the operation using portalClient.request

Example Process:

1. List available queries:
\`\`\`typescript
// Use portal-queries tool to get:
BondDetail
TokenDetail
NFTDetail
// etc...
\`\`\`

2. Get query details:
\`\`\`typescript
// Use portal-query tool with "BondDetail" to get:
# Query
BondDetail(address: String!): Bond

# Types
type Bond {
  name: String!
  symbol: String!
  decimals: Int!
  totalSupply: String!
}
\`\`\`

3. Implement the operation:
\`\`\`typescript
const GetBondDetail = portalGraphql(\`
  query GetBondDetail($address: String!) {
    BondDetail(address: $address) {
      name
      symbol
      decimals
      totalSupply
    }
  }
\`);

const response = await portalClient.request(GetBondDetail, {
  address: "0x..."
});
\`\`\`

Important Considerations:
- Always use portal tools to discover and understand operations
- Review the complete SDL before implementation
- Include all required fields from the schema
- Match argument types exactly as specified
- Handle all possible response fields
- Follow the schema's type definitions`,
        },
      },
    ],
  }));
};
