import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export const hasuraPrompt = (server: McpServer) => {
  server.prompt("write-hasura-query-or-mutation", () => ({
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: `To write a GraphQL query or mutation for Hasura, follow these steps:

1. First, discover available operations:
   - Use hasura-queries tool to list all available queries
   - Use hasura-mutations tool to list all available mutations

2. Get operation details:
   - Use hasura-query tool with the query name to get its full schema definition
   - Use hasura-mutation tool with the mutation name to get its full schema definition
   - Review the returned SDL for:
     * Required arguments and their types
     * Return type structure
     * Related type definitions
     * Permissions and access control

3. Define your GraphQL operation using hasuraGraphql
4. Execute the operation using hasuraClient.request

Example Process:

1. List available queries:
\`\`\`typescript
// Use hasura-queries tool to get:
get_users
get_user_by_pk
get_organizations
// etc...
\`\`\`

2. Get query details:
\`\`\`typescript
// Use hasura-query tool with "get_user_by_pk" to get:
# Query
get_user_by_pk(id: uuid!): users

# Types
type users {
  id: uuid!
  name: String!
  email: String!
  created_at: timestamptz!
  organization_id: uuid
  organization: organizations
}

type organizations {
  id: uuid!
  name: String!
  created_at: timestamptz!
}
\`\`\`

3. Implement the operation:
\`\`\`typescript
const GetUserDetail = hasuraGraphql(\`
  query GetUserDetail($id: uuid!) {
    get_user_by_pk(id: $id) {
      id
      name
      email
      created_at
      organization {
        id
        name
      }
    }
  }
\`);

const response = await hasuraClient.request(GetUserDetail, {
  id: "123e4567-e89b-12d3-a456-426614174000"
});
\`\`\`

Important Considerations:
- Always use hasura tools to discover and understand operations
- Review permissions and access control before implementation
- Include necessary relationships in your queries
- Use proper Hasura-specific types (uuid, timestamptz, etc.)
- Consider using variables for filtering and pagination
- Follow Hasura's naming conventions (_by_pk, _aggregate, etc.)
- Handle nested relationships appropriately
- Be mindful of performance with deep nested queries`,
        },
      },
    ],
  }));
};
