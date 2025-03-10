import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export const thegraphPrompt = (server: McpServer) => {
  server.prompt("write-thegraph-query-or-mutation", () => ({
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: `To write a GraphQL query or mutation for The Graph SDK, follow these steps:

1. First, discover available operations:
   - Use thegraph-queries tool to list all available queries

2. Get operation details:
   - Use thegraph-query tool with the query name to get its full schema definition
   - Review the returned SDL for:
     * Required arguments and their types
     * Return type structure
     * Related type definitions

3. Define your GraphQL operation using thegraphGraphql
4. Execute the operation using thegraphClient.request

Example Process:

1. List available queries:
\`\`\`typescript
// Use thegraph-queries tool to get:
tokens
tokenHolders
transfers
// etc...
\`\`\`

2. Get query details:
\`\`\`typescript
// Use thegraph-query tool with "tokens" to get:
# Query
tokens(
  first: Int
  skip: Int
  orderBy: Token_orderBy
  orderDirection: OrderDirection
  where: Token_filter
): [Token!]!

# Types
type Token {
  id: ID!
  symbol: String!
  name: String!
  decimals: Int!
  totalSupply: BigInt!
  holders: [TokenHolder!]!
  transfers: [Transfer!]!
}
\`\`\`

3. Implement the operation:
\`\`\`typescript
const GetTokens = thegraphGraphql(\`
  query GetTokens(
    $first: Int
    $skip: Int
    $orderBy: Token_orderBy
    $orderDirection: OrderDirection
    $where: Token_filter
  ) {
    tokens(
      first: $first
      skip: $skip
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
    ) {
      id
      symbol
      name
      decimals
      totalSupply
      holders {
        id
        balance
      }
    }
  }
\`);

const response = await thegraphClient.request(GetTokens, {
  first: 10,
  skip: 0,
  orderBy: "totalSupply",
  orderDirection: "desc",
  where: {
    totalSupply_gt: "0"
  }
});
\`\`\`

Important Considerations:
- Always use thegraph tools to discover and understand operations
- Review the complete SDL before implementation
- Include pagination parameters when querying lists
- Match argument types exactly as specified
- Handle all possible response fields
- Follow the schema's type definitions
- Consider using fragments for reusable field selections
- Be mindful of rate limits and query complexity`,
        },
      },
    ],
  }));
};
