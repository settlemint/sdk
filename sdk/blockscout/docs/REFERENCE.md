### Creating a Blockscout Client

#### Server-side Usage

```typescript
import { createBlockscoutClient } from '@settlemint/sdk-blockscout';

const { client } = createBlockscoutClient({
  instance: 'https://your-blockscout-instance.com',
  accessToken: 'your-access-token',
});
```

#### Browser-side Usage

```typescript
import { createBlockscoutClient } from '@settlemint/sdk-blockscout';

const { client } = createBlockscoutClient({});
```

### Making GraphQL Queries

```typescript
import { createBlockscoutClient } from '@settlemint/sdk-blockscout';

const { client, graphql } = createBlockscoutClient({
  instance: 'https://your-blockscout-instance.com',
  accessToken: 'your-access-token',
});

// Define your query using the type-safe graphql template literal
const query = graphql(`
  query GetTransaction($hash: String!) {
    transaction(hash: $hash) {
      hash
      blockNumber
      value
      gasUsed
    }
  }
`);

// Execute the query
const result = await client.request(query, {
  hash: "0x123abc..."
});
```
