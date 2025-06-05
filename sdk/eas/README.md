# @settlemint/sdk-eas

Ethereum Attestation Service (EAS) integration for SettleMint SDK with Portal GraphQL support.

## Features

- ✅ **Portal SDK Integration**: Full integration with SettleMint Portal GraphQL API
- ✅ **Complete EAS Support**: All 14 EAS mutations and queries implemented
- ✅ **Type Safety**: Full TypeScript support with proper type definitions
- ✅ **Contract Deployment**: Deploy EAS contracts via Portal
- ✅ **Schema Management**: Register and retrieve attestation schemas
- ✅ **Attestation Operations**: Create, revoke, and query attestations
- ✅ **Multi-Operations**: Support for batch attestations and revocations
- ✅ **Validation**: Built-in attestation validation and timestamp queries

## Installation

```bash
npm install @settlemint/sdk-eas
# or
yarn add @settlemint/sdk-eas
# or
bun add @settlemint/sdk-eas
```

## Quick Start

```typescript
import { createEASClient } from "@settlemint/sdk-eas";

// Initialize EAS client with Portal credentials
const client = createEASClient({
  instance: "https://attestation-portal-ee231.gke-europe.settlemint.com/graphql",
  accessToken: "sm_aat_your_access_token",
  debug: true,
});

// Deploy EAS contracts (if needed)
const deployment = await client.deploy();
console.log("EAS deployed at:", deployment.easAddress);
console.log("Schema Registry at:", deployment.schemaRegistryAddress);

// Register a schema
const schemaResult = await client.registerSchema({
  fields: [
    { name: "user", type: "address", description: "User's wallet address" },
    { name: "score", type: "uint256", description: "Reputation score" },
    { name: "verified", type: "bool", description: "Verification status" },
  ],
  resolver: "0x0000000000000000000000000000000000000000",
  revocable: true,
});

// Create an attestation
const attestationResult = await client.attest({
  schema: schemaResult.hash,
  data: {
    recipient: "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
    expirationTime: BigInt(0),
    revocable: true,
    refUID: "0x0000000000000000000000000000000000000000000000000000000000000000",
    data: "0x", // Encoded attestation data
    value: BigInt(0),
  },
});

console.log("Attestation created:", attestationResult.hash);
```

## Portal GraphQL Integration

This package integrates with SettleMint's Portal GraphQL API, providing access to all EAS operations:

### Available Mutations

- `EasSchemaRegistryRegister` - Register new schemas
- `EasDeploymentAttest` - Create single attestation
- `EasDeploymentAttestByDelegation` - Create delegated attestation
- `EasDeploymentMultiAttest` - Create multiple attestations
- `EasDeploymentMultiAttestByDelegation` - Create multiple delegated attestations
- `EasDeploymentRevoke` - Revoke single attestation
- `EasDeploymentRevokeByDelegation` - Revoke by delegation
- `EasDeploymentMultiRevoke` - Revoke multiple attestations
- `EasDeploymentMultiRevokeByDelegation` - Revoke multiple by delegation
- `EasDeploymentRevokeOffchain` - Revoke offchain attestation
- `EasDeploymentMultiRevokeOffchain` - Revoke multiple offchain
- `EasDeploymentTimestamp` - Timestamp operation
- `EasDeploymentMultiTimestamp` - Timestamp multiple operations
- `EasDeploymentIncreaseNonce` - Increase nonce for delegations

### Available Queries

- Contract deployment status and addresses
- Schema retrieval and validation
- Attestation lookup and verification
- Transaction monitoring and history

## API Reference

### EASClient

The main client class for interacting with EAS via Portal.

#### Constructor Options

```typescript
interface EASClientOptions {
  instance: string;                           // Portal GraphQL endpoint
  accessToken: string;                        // Portal access token
  easContractAddress?: Address;               // Optional: EAS contract address
  schemaRegistryContractAddress?: Address;    // Optional: Schema registry address
  debug?: boolean;                           // Optional: Enable debug logging
}
```

#### Methods

- `deploy()` - Deploy EAS contracts
- `registerSchema(request)` - Register new schema
- `attest(request)` - Create attestation
- `multiAttest(requests)` - Create multiple attestations
- `revoke(uid, value?)` - Revoke attestation
- `getSchema(uid)` - Get schema by UID
- `getSchemas(options?)` - Get all schemas (paginated)
- `getAttestation(uid)` - Get attestation by UID
- `getAttestations(options?)` - Get all attestations (paginated)
- `isValidAttestation(uid)` - Check attestation validity
- `getTimestamp()` - Get contract timestamp
- `getOptions()` - Get client configuration
- `getPortalClient()` - Get Portal client instance
- `getContractAddresses()` - Get current contract addresses

## Examples

See the [examples](./examples/) directory for complete usage examples:

- `simple-eas-workflow.ts` - Complete EAS workflow demonstration
- Real-world attestation scenarios
- Schema design patterns
- Multi-attestation operations

## Development Status

- ✅ **Portal Client Integration**: Complete
- ✅ **GraphQL Operations**: All 14 EAS mutations implemented
- ✅ **Type Safety**: Full TypeScript support
- ✅ **Error Handling**: Comprehensive error handling
- ✅ **Testing**: Complete test suite
- ✅ **Documentation**: Full API documentation
- 🔄 **Real Portal Access**: Requires valid EAS Portal access token

## Requirements

- Node.js 20+
- Valid SettleMint Portal access token
- Access to EAS Portal instance

## License

FSL-1.1-MIT

# EAS Portal SDK

A TypeScript SDK for interacting with Ethereum Attestation Service (EAS) via SettleMint Portal.

## Features

- **Portal Integration**: Direct integration with SettleMint Portal GraphQL API
- **Type Safety**: Full TypeScript support with proper type definitions
- **Contract Management**: Deploy or connect to existing EAS contracts
- **Schema Management**: Register and retrieve attestation schemas
- **Attestation Operations**: Create, retrieve, and validate attestations
- **Configurable**: No hardcoded values - all addresses and references are configurable

## Installation

```bash
npm install @settlemint/sdk-eas
# or
bun add @settlemint/sdk-eas
```

## Quick Start

```typescript
import { createEASClient, ZERO_ADDRESS, ZERO_BYTES32 } from "@settlemint/sdk-eas";

const client = createEASClient({
  instance: "https://attestation-portal-ee231.gke-europe.settlemint.com/graphql",
  accessToken: "your-portal-access-token",
  debug: true,
});

// Deploy contracts
const deployment = await client.deploy("0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6");

// Register schema
const schema = await client.registerSchema({
  fields: [
    { name: "user", type: "address" },
    { name: "score", type: "uint256" },
  ],
  resolver: ZERO_ADDRESS, // No resolver
  revocable: true,
}, "0x8ba1f109551bD432803012645Hac136c22C177ec");

// Create attestation
const attestation = await client.attest({
  schema: schema.hash,
  data: {
    recipient: "0x9876543210987654321098765432109876543210",
    expirationTime: BigInt(0), // No expiration
    revocable: true,
    refUID: ZERO_BYTES32, // No reference
    data: "0x1234",
    value: BigInt(0),
  },
}, "0x8ba1f109551bD432803012645Hac136c22C177ec");
```

## Configuration Constants

The SDK provides configurable constants instead of hardcoded values:

### Address Constants

```typescript
import { ZERO_ADDRESS, ZERO_BYTES32 } from "@settlemint/sdk-eas";

// Use ZERO_ADDRESS for:
ZERO_ADDRESS // "0x0000000000000000000000000000000000000000"

// Use ZERO_BYTES32 for:
ZERO_BYTES32 // "0x0000000000000000000000000000000000000000000000000000000000000000"
```

### Configurable Parameters

#### 1. Forwarder Address (Contract Deployment)

```typescript
// Option 1: No meta-transaction forwarder (default)
await client.deploy(deployerAddress); // Uses ZERO_ADDRESS

// Option 2: Custom forwarder for meta-transactions
await client.deploy(deployerAddress, "0x1234567890123456789012345678901234567890");
```

#### 2. Resolver Address (Schema Registration)

```typescript
// Option 1: No resolver (most common)
await client.registerSchema({
  fields: [...],
  resolver: ZERO_ADDRESS, // No custom validation
  revocable: true,
}, fromAddress);

// Option 2: Custom resolver contract
await client.registerSchema({
  fields: [...],
  resolver: "0x5678901234567890123456789012345678901234", // Custom validation
  revocable: true,
}, fromAddress);
```

#### 3. Reference UID (Attestation Creation)

```typescript
// Option 1: Standalone attestation (most common)
await client.attest({
  schema: schemaUID,
  data: {
    recipient: recipientAddress,
    refUID: ZERO_BYTES32, // No reference to other attestations
    // ... other fields
  },
}, fromAddress);

// Option 2: Reference another attestation
await client.attest({
  schema: schemaUID,
  data: {
    recipient: recipientAddress,
    refUID: "0x1234567890123456789012345678901234567890123456789012345678901234", // Links to parent
    // ... other fields
  },
}, fromAddress);
```

#### 4. Expiration Time

```typescript
// Option 1: No expiration (permanent)
expirationTime: BigInt(0)

// Option 2: Expires in 24 hours
expirationTime: BigInt(Math.floor(Date.now() / 1000) + 86400)

// Option 3: Specific timestamp
expirationTime: BigInt(1735689600) // January 1, 2025
```

#### 5. Value (ETH Amount)

```typescript
// Option 1: No ETH sent (most common)
value: BigInt(0)

// Option 2: Send ETH with attestation
value: BigInt("1000000000000000000") // 1 ETH in wei
```

## API Reference

### Client Creation

```typescript
interface EASClientOptions {
  instance: string;                           // Portal GraphQL endpoint
  accessToken: string;                        // Portal access token
  easContractAddress?: Address;               // Optional: existing EAS contract
  schemaRegistryContractAddress?: Address;    // Optional: existing Schema Registry
  debug?: boolean;                           // Optional: enable debug logging
}
```

### Contract Deployment

```typescript
async deploy(
  deployerAddress: Address,
  forwarderAddress?: Address,  // Optional: defaults to ZERO_ADDRESS
  gasLimit?: string           // Optional: defaults to "0x3d0900"
): Promise<DeploymentResult>
```

### Schema Registration

```typescript
interface SchemaRequest {
  fields?: SchemaField[];     // Alternative to schema string
  schema?: string;           // Alternative to fields
  resolver: Address;         // Use ZERO_ADDRESS for no resolver
  revocable: boolean;        // Whether attestations can be revoked
}

async registerSchema(
  request: SchemaRequest,
  fromAddress: Address,
  gasLimit?: string
): Promise<TransactionResult>
```

### Attestation Creation

```typescript
interface AttestationData {
  recipient: Address;        // Who receives the attestation
  expirationTime: bigint;   // Use 0 for no expiration
  revocable: boolean;       // Whether this can be revoked
  refUID: Hex;             // Use ZERO_BYTES32 for no reference
  data: Hex;               // Encoded attestation data
  value: bigint;           // ETH amount to send (usually 0)
}

async attest(
  request: AttestationRequest,
  fromAddress: Address,
  gasLimit?: string
): Promise<TransactionResult>
```

## Examples

See the [examples](./examples/) directory for complete workflows:

- [`simple-eas-workflow.ts`](./examples/simple-eas-workflow.ts) - Complete EAS workflow with configuration options
- Configuration examples for different use cases

## Testing

```bash
bun test
```

## License

MIT
