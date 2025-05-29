<p align="center">
  <img src="https://github.com/settlemint/sdk/blob/main/logo.svg" width="200px" align="center" alt="SettleMint logo" />
  <h1 align="center">SettleMint SDK</h1>
  <p align="center">
    ✨ <a href="https://settlemint.com">https://settlemint.com</a> ✨
    <br/>
    Integrate SettleMint into your application with ease.
  </p>
</p>

<p align="center">
<a href="https://github.com/settlemint/sdk/actions?query=branch%3Amain"><img src="https://github.com/settlemint/sdk/actions/workflows/build.yml/badge.svg?event=push&branch=main" alt="CI status" /></a>
<a href="https://fsl.software" rel="nofollow"><img src="https://img.shields.io/npm/l/@settlemint/sdk-eas" alt="License"></a>
<a href="https://www.npmjs.com/package/@settlemint/sdk-eas" rel="nofollow"><img src="https://img.shields.io/npm/dw/@settlemint/sdk-eas" alt="npm"></a>
<a href="https://github.com/settlemint/sdk" rel="nofollow"><img src="https://img.shields.io/github/stars/settlemint/sdk" alt="stars"></a>
</p>

<div align="center">
  <a href="https://console.settlemint.com/documentation">Documentation</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://www.npmjs.com/package/@settlemint/sdk-eas">NPM</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://github.com/settlemint/sdk/issues">Issues</a>
  <br />
</div>

## Table of Contents

- [About](#about)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [ABI Configuration](#abi-configuration)
- [API Reference](#api-reference)
  - [Functions](#functions)
    - [createEASClient()](#createeasclient)
  - [Classes](#classes)
    - [EASPortalClient](#easportalclient)
  - [Interfaces](#interfaces)
    - [PortalClientOptions](#portalclientoptions)
    - [SchemaField](#schemafield)
  - [Type Aliases](#type-aliases)
    - [AbiSource](#abisource)
  - [Variables](#variables)
    - [EAS\_FIELD\_TYPES](#eas_field_types)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

## About

The SettleMint EAS SDK provides a Portal-based wrapper for the Ethereum Attestation Service (EAS), enabling developers to easily create, manage, and verify attestations within their applications. It leverages SettleMint's Portal infrastructure for enhanced features like real-time monitoring, flexible ABI support, and improved error handling.

**Key Features:**
- **Portal Integration**: Uses SettleMint's Portal GraphQL API for all contract interactions
- **Flexible ABI Support**: Hardcoded, custom, and predeployed ABI options with clear priority
- **Type Safety**: Full TypeScript support with proper type inference
- **Error Handling**: EAS-specific error codes and detailed error information
- **Real-time Monitoring**: Transaction status monitoring capabilities

## Installation

```bash
npm install @settlemint/sdk-eas
```

## Quick Start

```typescript
import { createEASClient } from "@settlemint/sdk-eas";

const client = createEASClient({
  instance: "https://portal.settlemint.com",
  accessToken: "your-access-token",
  easContractAddress: "0x...", // Your EAS contract address
  schemaRegistryContractAddress: "0x...", // Your Schema Registry address
  // abiSource defaults to { type: "hardcoded" } - uses standard EAS ABIs
});

// Register a schema
const result = await client.registerSchema({
  schema: "address user, uint256 score",
  resolver: "0x0000000000000000000000000000000000000000",
  revocable: true,
});

console.log("Transaction Hash:", result.hash);

// Create an attestation
const attestation = await client.attest({
  schema: "0x...", // Schema UID
  data: {
    recipient: "0x...",
    expirationTime: 0n,
    revocable: true,
    refUID: "0x0000000000000000000000000000000000000000000000000000000000000000",
    data: "0x...", // Encoded attestation data
    value: 0n,
  },
});

// Get an attestation
const attestationData = await client.getAttestation("0x...");
console.log("Attestation:", attestationData);
```

## ABI Configuration

The EAS SDK supports three ABI sources with the following priority:

### 1. Hardcoded ABIs (Default)
Uses standard EAS ABIs built into the SDK:

```typescript
const client = createEASClient({
  instance: "https://portal.settlemint.com",
  accessToken: "your-token",
  easContractAddress: "0x...",
  schemaRegistryContractAddress: "0x...",
  // abiSource defaults to { type: "hardcoded" }
});
```

### 2. Custom ABIs (User Override)
Override with your own ABIs:

```typescript
import { EAS_ABI, SCHEMA_REGISTRY_ABI } from "@settlemint/sdk-eas";

const client = createEASClient({
  instance: "https://portal.settlemint.com",
  accessToken: "your-token",
  easContractAddress: "0x...",
  schemaRegistryContractAddress: "0x...",
  abiSource: {
    type: "custom",
    easAbi: EAS_ABI, // or your custom ABI
    schemaRegistryAbi: SCHEMA_REGISTRY_ABI, // or your custom ABI
  },
});
```

### 3. Predeployed ABIs (Portal's ABIs)
Use Portal's predeployed ABIs:

```typescript
const client = createEASClient({
  instance: "https://portal.settlemint.com",
  accessToken: "your-token",
  easContractAddress: "0x...",
  schemaRegistryContractAddress: "0x...",
  abiSource: {
    type: "predeployed",
    abiNames: ["eas"], // Optional, defaults to ["eas"]
  },
});
```

## API Reference

### Functions

#### createEASClient()

> **createEASClient**(`options`): [`EASPortalClient`](#easportalclient)

Creates a Portal-based EAS client for interacting with the Ethereum Attestation Service.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`PortalClientOptions`](#portalclientoptions) | Configuration options for the Portal-based client |

##### Returns

[`EASPortalClient`](#easportalclient)

An EAS Portal client instance

##### Example

```ts
import { createEASClient } from '@settlemint/sdk-eas';

const client = createEASClient({
  instance: "https://portal.settlemint.com",
  accessToken: "your-access-token",
  easContractAddress: "0x...",
  schemaRegistryContractAddress: "0x...",
});
```

### Classes

#### EASPortalClient

The main client class for interacting with EAS contracts via Portal.

##### Methods

- `registerSchema(request: SchemaRequest): Promise<TransactionResult>` - Register a new schema
- `attest(request: AttestationRequest): Promise<TransactionResult>` - Create an attestation
- `multiAttest(requests: AttestationRequest[]): Promise<TransactionResult>` - Create multiple attestations
- `revoke(uid: Hex, value?: bigint): Promise<TransactionResult>` - Revoke an attestation
- `getAttestation(uid: Hex): Promise<AttestationData>` - Retrieve attestation data
- `getSchema(uid: Hex): Promise<SchemaData>` - Retrieve schema data
- `isValidAttestation(uid: Hex): Promise<boolean>` - Check if attestation is valid
- `getTimestamp(): Promise<bigint>` - Get current contract timestamp
- `getPortalClient(): unknown` - Access underlying Portal client
- `getOptions(): PortalClientOptions` - Get client configuration
- `getAbis(): { easAbi: Abi; schemaRegistryAbi: Abi }` - Get current ABIs

### Interfaces

#### PortalClientOptions

Configuration options for the EAS Portal client.

##### Properties

| Property | Type | Description |
| ------ | ------ | ------ |
| `instance` | `string` | Portal instance URL or path |
| `accessToken` | `string` | Access token for Portal authentication |
| `easContractAddress` | `string` | The address of the EAS Attestation contract |
| `schemaRegistryContractAddress` | `string` | The address of the EAS Schema Registry contract |
| `abiSource?` | [`AbiSource`](#abisource) | ABI source configuration (defaults to hardcoded) |
| `wsUrl?` | `string` | Optional WebSocket URL for real-time monitoring |
| `timeout?` | `number` | Request timeout in milliseconds (default: 30000) |
| `debug?` | `boolean` | Enable debug logging (default: false) |
| `cache?` | `string` | Cache configuration for GraphQL requests |

#### SchemaField

Represents a single field in an EAS schema.

##### Properties

| Property | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The name of the field |
| `type` | `EASFieldType` | The Solidity type of the field |
| `description?` | `string` | Optional description of the field's purpose |

### Type Aliases

#### AbiSource

Configuration for ABI sources with priority system.

```typescript
type AbiSource =
  | { type: "hardcoded" }
  | { type: "custom"; easAbi: Abi; schemaRegistryAbi: Abi }
  | { type: "predeployed"; abiNames?: string[] };
```

### Variables

#### EAS\_FIELD\_TYPES

Supported field types for EAS schema fields. Maps to the Solidity types that can be used in EAS schemas.

```typescript
const EAS_FIELD_TYPES = {
  string: "string",
  address: "address",
  bool: "bool",
  bytes: "bytes",
  bytes32: "bytes32",
  uint256: "uint256",
  int256: "int256",
  uint8: "uint8",
  int8: "int8",
} as const;
```

## Error Handling

The SDK provides comprehensive error handling with EAS-specific error codes:

```typescript
import { EASErrorCode, EASPortalError } from "@settlemint/sdk-eas";

try {
  await client.getAttestation("invalid-uid");
} catch (error) {
  if (error instanceof EASPortalError) {
    switch (error.code) {
      case EASErrorCode.ATTESTATION_NOT_FOUND:
        console.log("Attestation not found");
        break;
      case EASErrorCode.TRANSACTION_FAILED:
        console.log("Transaction failed");
        break;
      case EASErrorCode.SCHEMA_NOT_FOUND:
        console.log("Schema not found");
        break;
      // ... other error codes
    }
  }
}
```

### Available Error Codes

- `INVALID_SCHEMA` - Schema validation failed
- `SCHEMA_NOT_FOUND` - Schema not found
- `ATTESTATION_NOT_FOUND` - Attestation not found
- `UNAUTHORIZED` - Unauthorized access
- `TRANSACTION_FAILED` - Transaction execution failed
- `INVALID_SIGNATURE` - Invalid signature
- `EXPIRED_ATTESTATION` - Attestation has expired
- `NON_REVOCABLE` - Attestation cannot be revoked
- `ALREADY_REVOKED` - Attestation already revoked
- `PORTAL_ERROR` - Portal-specific error

## Contributing

We welcome contributions from the community! Please check out our [Contributing](https://github.com/settlemint/sdk/blob/main/.github/CONTRIBUTING.md) guide to learn how you can help improve the SettleMint SDK through bug reports, feature requests, documentation updates, or code contributions.

## License

The SettleMint SDK is released under the [FSL Software License](https://fsl.software). See the [LICENSE](https://github.com/settlemint/sdk/blob/main/LICENSE) file for more details.
