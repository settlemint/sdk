import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export const portalPrompt = (server: McpServer) => {
  server.prompt("write-portal-query-or-mutation", () => ({
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: `# Portal SDK GraphQL Query/Mutation Guide

## Overview
The Portal SDK provides a GraphQL interface to interact with blockchain data. This guide will help you construct effective queries and mutations.

## When to Use Portal SDK
- When retrieving on-chain data like tokens, NFTs, or bonds
- When you need real-time blockchain state information
- For operations that read from but don't modify blockchain state

## Step-by-Step Process

### 1. Discovery Phase
First, discover available operations:
   - Use \`portal-queries\` tool to list all available queries
   - Use \`portal-mutations\` tool to list all available mutations

### 2. Schema Exploration
Get detailed operation information:
   - Use \`portal-query\` tool with the query name to get its full schema definition
   - Use \`portal-mutation\` tool with the mutation name to get its full schema definition
   - Carefully analyze the returned SDL for:
     * Required arguments and their types
     * Return type structure and nested fields
     * Related type definitions and their relationships
     * Any constraints or limitations

### 3. Implementation
Define and execute your GraphQL operation:
   - Define using \`portalGraphql\`
   - Execute using \`portalClient.request\`
   - Handle responses appropriately

## Common Patterns and Best Practices

### Pagination
For queries returning lists, implement proper pagination:
\`\`\`typescript
const GetTokens = portalGraphql(\`
  query GetTokens($first: Int!, $skip: Int!) {
    tokens(first: $first, skip: $skip) {
      id
      name
      # Other fields...
    }
  }
\`);

// Initial page
const page1 = await portalClient.request(GetTokens, { first: 10, skip: 0 });
// Next page
const page2 = await portalClient.request(GetTokens, { first: 10, skip: 10 });
\`\`\`

### Error Handling
Always implement proper error handling:
\`\`\`typescript
try {
  const response = await portalClient.request(GetBondDetail, { address: "0x..." });
  // Process response
} catch (error) {
  // Handle specific error types
  if (error.message.includes("not found")) {
    // Handle not found case
  } else if (error.message.includes("rate limit")) {
    // Handle rate limiting
  } else {
    // Handle other errors
  }
}
\`\`\`

### Caching Considerations
- Consider implementing caching for frequently accessed data
- Use appropriate cache invalidation strategies based on data volatility

## Complete Example Workflow

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
  holders: [BondHolder!]
  transactions: [BondTransaction!]
}

type BondHolder {
  address: String!
  balance: String!
}

type BondTransaction {
  hash: String!
  timestamp: Int!
  value: String!
}
\`\`\`

3. Implement the operation with all relevant fields:
\`\`\`typescript
const GetBondDetail = portalGraphql(\`
  query GetBondDetail($address: String!) {
    BondDetail(address: $address) {
      name
      symbol
      decimals
      totalSupply
      holders {
        address
        balance
      }
      transactions(first: 5) {
        hash
        timestamp
        value
      }
    }
  }
\`);

const response = await portalClient.request(GetBondDetail, {
  address: "0x123abc..."
});

// Process the response
const { name, symbol, totalSupply, holders } = response.BondDetail;
console.log(\`Bond \${name} (\${symbol}) has a total supply of \${totalSupply}\`);
console.log(\`Top holders: \${holders.map(h => h.address).join(', ')}\`);
\`\`\`

## Troubleshooting Common Issues
- **Invalid address format**: Ensure addresses follow the correct format (0x followed by 40 hex characters)
- **Missing required fields**: Always include all required fields marked with ! in the schema
- **Rate limiting**: Implement backoff strategies for high-volume requests
- **Network errors**: Check connectivity and implement retries with exponential backoff`,
        },
      },
    ],
  }));
};
