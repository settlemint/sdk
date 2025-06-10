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
- [API Reference](#api-reference)
  - [Functions](#functions)
    - [createEASClient()](#createeasclient)
  - [Interfaces](#interfaces)
    - [RegisterSchemaOptions](#registerschemaoptions)
    - [SchemaField](#schemafield)
  - [Type Aliases](#type-aliases)
    - [ClientOptions](#clientoptions)
  - [Variables](#variables)
    - [ClientOptionsSchema](#clientoptionsschema)
    - [EAS\_FIELD\_TYPES](#eas_field_types)
- [Contributing](#contributing)
- [License](#license)

## About

The SettleMint EAS SDK provides a lightweight wrapper for the Ethereum Attestation Service (EAS), enabling developers to easily create, manage, and verify attestations within their applications. It simplifies the process of working with EAS by handling contract interactions, schema management, and The Graph integration, while ensuring proper integration with the SettleMint platform. This allows developers to quickly implement document verification, identity attestation, and other EAS-based features without manual setup.

## API Reference

### Functions

#### createEASClient()

> **createEASClient**(`options`): `object`

Defined in: [sdk/eas/src/eas.ts:36](https://github.com/settlemint/sdk/blob/v2.3.13/sdk/eas/src/eas.ts#L36)

Creates an EAS client for interacting with the Ethereum Attestation Service.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | \{ `accessToken`: `string`; `attestationAddress`: `string`; `chainId`: `string`; `chainName`: `string`; `rpcUrl`: `string`; `schemaRegistryAddress`: `string`; \} | Configuration options for the client |
| `options.accessToken` | `string` | Access token for the RPC provider (must start with 'sm_aat_' or 'sm_pat_') |
| `options.attestationAddress` | `string` | The address of the EAS Attestation contract |
| `options.chainId` | `string` | The chain ID to connect to |
| `options.chainName` | `string` | The name of the chain to connect to |
| `options.rpcUrl` | `string` | The RPC URL to connect to (must be a valid URL) |
| `options.schemaRegistryAddress` | `string` | The address of the EAS Schema Registry contract |

##### Returns

`object`

An object containing the EAS client instance

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `getSchema()` | (`uid`) => `Promise`\<`string`\> | [sdk/eas/src/eas.ts:96](https://github.com/settlemint/sdk/blob/v2.3.13/sdk/eas/src/eas.ts#L96) |
| `registerSchema()` | (`options`) => `Promise`\<`string`\> | [sdk/eas/src/eas.ts:95](https://github.com/settlemint/sdk/blob/v2.3.13/sdk/eas/src/eas.ts#L95) |

##### Throws

Will throw an error if the options fail validation

##### Example

```ts
import { createEASClient } from '@settlemint/sdk-eas';

const client = createEASClient({
  schemaRegistryAddress: "0x1234567890123456789012345678901234567890",
  attestationAddress: "0x1234567890123456789012345678901234567890",
  accessToken: "your-access-token",
  chainId: "1",
  chainName: "Ethereum",
  rpcUrl: "http://localhost:8545"
});
```

### Interfaces

#### RegisterSchemaOptions

Defined in: [sdk/eas/src/types.ts:34](https://github.com/settlemint/sdk/blob/v2.3.13/sdk/eas/src/types.ts#L34)

Options for registering a new schema in the EAS Schema Registry.

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="fields"></a> `fields` | [`SchemaField`](#schemafield)[] | Array of fields that make up the schema | [sdk/eas/src/types.ts:36](https://github.com/settlemint/sdk/blob/v2.3.13/sdk/eas/src/types.ts#L36) |
| <a id="resolveraddress"></a> `resolverAddress` | `string` | Address of the resolver contract that will handle attestations | [sdk/eas/src/types.ts:38](https://github.com/settlemint/sdk/blob/v2.3.13/sdk/eas/src/types.ts#L38) |
| <a id="revocable"></a> `revocable` | `boolean` | Whether attestations using this schema can be revoked | [sdk/eas/src/types.ts:40](https://github.com/settlemint/sdk/blob/v2.3.13/sdk/eas/src/types.ts#L40) |

***

#### SchemaField

Defined in: [sdk/eas/src/types.ts:22](https://github.com/settlemint/sdk/blob/v2.3.13/sdk/eas/src/types.ts#L22)

Represents a single field in an EAS schema.

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="description"></a> `description?` | `string` | Optional description of the field's purpose | [sdk/eas/src/types.ts:28](https://github.com/settlemint/sdk/blob/v2.3.13/sdk/eas/src/types.ts#L28) |
| <a id="name"></a> `name` | `string` | The name of the field | [sdk/eas/src/types.ts:24](https://github.com/settlemint/sdk/blob/v2.3.13/sdk/eas/src/types.ts#L24) |
| <a id="type"></a> `type` | `"string"` \| `"address"` \| `"bool"` \| `"bytes"` \| `"bytes32"` \| `"int8"` \| `"int256"` \| `"uint8"` \| `"uint256"` | The Solidity type of the field | [sdk/eas/src/types.ts:26](https://github.com/settlemint/sdk/blob/v2.3.13/sdk/eas/src/types.ts#L26) |

### Type Aliases

#### ClientOptions

> **ClientOptions** = `z.infer`\<*typeof* [`ClientOptionsSchema`](#clientoptionsschema)\>

Defined in: [sdk/eas/src/client-options.schema.ts:28](https://github.com/settlemint/sdk/blob/v2.3.13/sdk/eas/src/client-options.schema.ts#L28)

Configuration options for creating an EAS client.
Combines EAS-specific options with base Viem client options.

### Variables

#### ClientOptionsSchema

> `const` **ClientOptionsSchema**: `ZodObject`\<\{ `accessToken`: `ZodString`; `attestationAddress`: `ZodString`; `chainId`: `ZodString`; `chainName`: `ZodString`; `rpcUrl`: `ZodString`; `schemaRegistryAddress`: `ZodString`; \}, `$strip`\>

Defined in: [sdk/eas/src/client-options.schema.ts:9](https://github.com/settlemint/sdk/blob/v2.3.13/sdk/eas/src/client-options.schema.ts#L9)

Schema for validating EAS client configuration options.
Extends the base Viem client options with EAS-specific requirements.

***

#### EAS\_FIELD\_TYPES

> `const` **EAS\_FIELD\_TYPES**: `object`

Defined in: [sdk/eas/src/types.ts:5](https://github.com/settlemint/sdk/blob/v2.3.13/sdk/eas/src/types.ts#L5)

Supported field types for EAS schema fields.
Maps to the Solidity types that can be used in EAS schemas.

##### Type declaration

| Name | Type | Default value | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="address"></a> `address` | `"address"` | `"address"` | [sdk/eas/src/types.ts:7](https://github.com/settlemint/sdk/blob/v2.3.13/sdk/eas/src/types.ts#L7) |
| <a id="bool"></a> `bool` | `"bool"` | `"bool"` | [sdk/eas/src/types.ts:8](https://github.com/settlemint/sdk/blob/v2.3.13/sdk/eas/src/types.ts#L8) |
| <a id="bytes"></a> `bytes` | `"bytes"` | `"bytes"` | [sdk/eas/src/types.ts:9](https://github.com/settlemint/sdk/blob/v2.3.13/sdk/eas/src/types.ts#L9) |
| <a id="bytes32"></a> `bytes32` | `"bytes32"` | `"bytes32"` | [sdk/eas/src/types.ts:10](https://github.com/settlemint/sdk/blob/v2.3.13/sdk/eas/src/types.ts#L10) |
| <a id="int256"></a> `int256` | `"int256"` | `"int256"` | [sdk/eas/src/types.ts:12](https://github.com/settlemint/sdk/blob/v2.3.13/sdk/eas/src/types.ts#L12) |
| <a id="int8"></a> `int8` | `"int8"` | `"int8"` | [sdk/eas/src/types.ts:14](https://github.com/settlemint/sdk/blob/v2.3.13/sdk/eas/src/types.ts#L14) |
| <a id="string"></a> `string` | `"string"` | `"string"` | [sdk/eas/src/types.ts:6](https://github.com/settlemint/sdk/blob/v2.3.13/sdk/eas/src/types.ts#L6) |
| <a id="uint256"></a> `uint256` | `"uint256"` | `"uint256"` | [sdk/eas/src/types.ts:11](https://github.com/settlemint/sdk/blob/v2.3.13/sdk/eas/src/types.ts#L11) |
| <a id="uint8"></a> `uint8` | `"uint8"` | `"uint8"` | [sdk/eas/src/types.ts:13](https://github.com/settlemint/sdk/blob/v2.3.13/sdk/eas/src/types.ts#L13) |

## Contributing

We welcome contributions from the community! Please check out our [Contributing](https://github.com/settlemint/sdk/blob/main/.github/CONTRIBUTING.md) guide to learn how you can help improve the SettleMint SDK through bug reports, feature requests, documentation updates, or code contributions.

## License

The SettleMint SDK is released under the [FSL Software License](https://fsl.software). See the [LICENSE](https://github.com/settlemint/sdk/blob/main/LICENSE) file for more details.
