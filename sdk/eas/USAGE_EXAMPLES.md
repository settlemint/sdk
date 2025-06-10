# EAS SDK Usage Examples

This document shows how to use the SettleMint EAS SDK with its unified API that supports both schema strings and schema fields with automatic validation.

## Basic Setup

```typescript
import { createEASClient } from '@settlemint/sdk-eas';

const eas = createEASClient({
  instance: "https://portal.settlemint.com",
  accessToken: "your-access-token",
  easContractAddress: "0x1234567890123456789012345678901234567890",
  schemaRegistryContractAddress: "0x1234567890123456789012345678901234567890",
});
```

## Schema Registration

### Option 1: Using Schema String (Traditional)

```typescript
const result = await eas.registerSchema({
  schema: "address user, uint256 score, string description",
  resolver: "0x0000000000000000000000000000000000000000",
  revocable: true,
});

console.log("Schema registered:", result.hash);
```

### Option 2: Using Schema Fields (With Validation)

```typescript
const result = await eas.registerSchema({
  fields: [
    { name: "user", type: "address", description: "User's wallet address" },
    { name: "score", type: "uint256", description: "User's reputation score" },
    { name: "description", type: "string", description: "Additional details" }
  ],
  resolver: "0x0000000000000000000000000000000000000000",
  revocable: true,
});

console.log("Schema registered:", result.hash);
```

## Schema Validation

### Standalone Validation (Without Registration)

```typescript
import { validateAndBuildSchema } from '@settlemint/sdk-eas';

try {
  const schemaString = validateAndBuildSchema([
    { name: "user", type: "address" },
    { name: "score", type: "uint256" },
    { name: "isActive", type: "bool" }
  ]);
  
  console.log("Valid schema:", schemaString);
  // Output: "address user,uint256 score,bool isActive"
} catch (error) {
  console.error("Schema validation failed:", error.message);
}
```

### Available Field Types

```typescript
import { EAS_FIELD_TYPES } from '@settlemint/sdk-eas';

// All supported EAS field types
console.log(EAS_FIELD_TYPES);
// Output: ["address", "bool", "bytes", "bytes32", "string", "uint8", "uint16", "uint32", "uint64", "uint128", "uint256"]
```

## Creating Attestations

```typescript
// After registering a schema, create attestations
const attestation = await eas.attest({
  schema: "0x...", // Schema UID from registration
  data: {
    recipient: "0x1234567890123456789012345678901234567890",
    expirationTime: 0n,
    revocable: true,
    data: "0x...", // Encoded attestation data
  },
});

console.log("Attestation created:", attestation.hash);
```

## Querying Data

```typescript
// Get schema information
const schema = await eas.getSchema("0x...");
console.log("Schema:", schema);

// Get attestation information
const attestation = await eas.getAttestation("0x...");
console.log("Attestation:", attestation);

// Validate an attestation
const isValid = await eas.isValidAttestation("0x...");
console.log("Is valid:", isValid);
```

## Error Handling

```typescript
import { EASPortalError, EASErrorCode } from '@settlemint/sdk-eas';

try {
  const result = await eas.registerSchema({
    fields: [
      { name: "invalid-name", type: "address" }, // Invalid: contains hyphen
    ],
    resolver: "0x0000000000000000000000000000000000000000",
    revocable: true,
  });
} catch (error) {
  if (error instanceof EASPortalError) {
    console.error("EAS Error:", error.code, error.message);
    
    switch (error.code) {
      case EASErrorCode.VALIDATION_FAILED:
        console.error("Schema validation failed");
        break;
      case EASErrorCode.TRANSACTION_FAILED:
        console.error("Transaction failed");
        break;
      default:
        console.error("Unknown EAS error");
    }
  }
}
```

## Advanced Configuration

### Custom ABIs

```typescript
import { createEASClient } from '@settlemint/sdk-eas';

const eas = createEASClient({
  instance: "https://portal.settlemint.com",
  accessToken: "your-access-token",
  easContractAddress: "0x1234567890123456789012345678901234567890",
  schemaRegistryContractAddress: "0x1234567890123456789012345678901234567890",
  
  // Override with custom ABIs
  customAbis: {
    eas: customEasAbi,
    schemaRegistry: customSchemaRegistryAbi,
  },
});
```

### Using Predeployed ABIs

```typescript
const eas = createEASClient({
  instance: "https://portal.settlemint.com",
  accessToken: "your-access-token",
  easContractAddress: "0x1234567890123456789012345678901234567890",
  schemaRegistryContractAddress: "0x1234567890123456789012345678901234567890",
  
  // Use Portal's predeployed ABIs
  usePredeployedAbis: true,
});
```

## Key Benefits

1. **Unified API**: Single `registerSchema` method handles both string and field formats
2. **Automatic Validation**: Schema fields are validated automatically
3. **Type Safety**: Full TypeScript support with proper error types
4. **Flexible Configuration**: Support for custom ABIs, predeployed ABIs, or hardcoded defaults
5. **Portal Integration**: Leverages Portal's GraphQL API for efficient blockchain interactions
6. **Real-time Monitoring**: Built-in transaction monitoring and receipt waiting

## Migration from Old SDK

If you're migrating from the old EAS SDK:

```typescript
// Old approach (no longer supported)
// import { EAS } from '@ethereum-attestation-service/eas-sdk';

// New approach
import { createEASClient } from '@settlemint/sdk-eas';

const eas = createEASClient({
  // Portal configuration instead of provider
  instance: "https://portal.settlemint.com",
  accessToken: "your-access-token",
  easContractAddress: "0x...",
  schemaRegistryContractAddress: "0x...",
});

// Same method names, but now Portal-powered
await eas.registerSchema({ /* ... */ });
await eas.attest({ /* ... */ });
``` 