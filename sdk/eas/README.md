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
  - [Classes](#classes)
    - [EASClient](#easclient)
  - [Interfaces](#interfaces)
    - [AttestationData](#attestationdata)
    - [AttestationInfo](#attestationinfo)
    - [AttestationRequest](#attestationrequest)
    - [DeploymentResult](#deploymentresult)
    - [GetAttestationsOptions](#getattestationsoptions)
    - [GetSchemasOptions](#getschemasoptions)
    - [~~RegisterSchemaOptions~~](#~~registerschemaoptions~~)
    - [SchemaData](#schemadata)
    - [SchemaField](#schemafield)
    - [SchemaRequest](#schemarequest)
    - [TransactionResult](#transactionresult)
  - [Type Aliases](#type-aliases)
    - [EASClientOptions](#easclientoptions)
  - [Variables](#variables)
    - [EAS\_FIELD\_TYPES](#eas_field_types)
    - [EASClientOptionsSchema](#easclientoptionsschema)
    - [ZERO\_ADDRESS](#zero_address)
- [Contributing](#contributing)
- [License](#license)

## About

The SettleMint EAS SDK provides a lightweight wrapper for the Ethereum Attestation Service (EAS), enabling developers to easily create, manage, and verify attestations within their applications. It simplifies the process of working with EAS by handling contract interactions, schema management, and The Graph integration, while ensuring proper integration with the SettleMint platform. This allows developers to quickly implement document verification, identity attestation, and other EAS-based features without manual setup.

## API Reference

### Functions

#### createEASClient()

> **createEASClient**(`options`): [`EASClient`](#easclient)

Defined in: [sdk/eas/src/eas.ts:632](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/eas.ts#L632)

Create an EAS client instance

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | \{ `accessToken?`: `string`; `debug?`: `boolean`; `easContractAddress?`: `` `0x${string}` ``; `instance`: `string`; `schemaRegistryContractAddress?`: `` `0x${string}` ``; \} | Configuration options for the EAS client |
| `options.accessToken?` | `string` | The application access token |
| `options.debug?` | `boolean` | Whether to enable debug mode |
| `options.easContractAddress?` | `` `0x${string}` `` | The EAS contract address |
| `options.instance` | `string` | The EAS instance URL |
| `options.schemaRegistryContractAddress?` | `` `0x${string}` `` | The schema registry contract address |

##### Returns

[`EASClient`](#easclient)

EAS client instance

##### Example

```typescript
import { createEASClient } from "@settlemint/sdk-eas";

const easClient = createEASClient({
  instance: "https://your-portal-instance.settlemint.com",
  accessToken: "your-access-token"
});

// Use the client
const deployment = await easClient.deploy("0x1234...deployer-address");
```

### Classes

#### EASClient

Defined in: [sdk/eas/src/eas.ts:44](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/eas.ts#L44)

Main EAS client class for interacting with Ethereum Attestation Service via Portal

##### Example

```typescript
import { createEASClient } from "@settlemint/sdk-eas";

const easClient = createEASClient({
  instance: "https://your-portal-instance.settlemint.com",
  accessToken: "your-access-token"
});

// Deploy EAS contracts
const deployment = await easClient.deploy("0x1234...deployer-address");
console.log("EAS deployed at:", deployment.easAddress);
```

##### Constructors

###### Constructor

> **new EASClient**(`options`): [`EASClient`](#easclient)

Defined in: [sdk/eas/src/eas.ts:55](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/eas.ts#L55)

Create a new EAS client instance

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | \{ `accessToken?`: `string`; `debug?`: `boolean`; `easContractAddress?`: `` `0x${string}` ``; `instance`: `string`; `schemaRegistryContractAddress?`: `` `0x${string}` ``; \} | Configuration options for the EAS client |
| `options.accessToken?` | `string` | The application access token |
| `options.debug?` | `boolean` | Whether to enable debug mode |
| `options.easContractAddress?` | `` `0x${string}` `` | The EAS contract address |
| `options.instance` | `string` | The EAS instance URL |
| `options.schemaRegistryContractAddress?` | `` `0x${string}` `` | The schema registry contract address |

###### Returns

[`EASClient`](#easclient)

##### Methods

###### attest()

> **attest**(`request`, `fromAddress`, `gasLimit?`): `Promise`\<[`TransactionResult`](#transactionresult)\>

Defined in: [sdk/eas/src/eas.ts:295](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/eas.ts#L295)

Create an attestation

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `request` | [`AttestationRequest`](#attestationrequest) | Attestation request containing schema and data |
| `fromAddress` | `` `0x${string}` `` | Address that will create the attestation |
| `gasLimit?` | `string` | Optional gas limit for the transaction (defaults to "0x3d0900") |

###### Returns

`Promise`\<[`TransactionResult`](#transactionresult)\>

Promise resolving to transaction result

###### Example

```typescript
import { createEASClient } from "@settlemint/sdk-eas";

const easClient = createEASClient({
  instance: "https://your-portal-instance.settlemint.com",
  accessToken: "your-access-token"
});

const attestationResult = await easClient.attest(
  {
    schema: "0x1234567890123456789012345678901234567890123456789012345678901234",
    data: {
      recipient: "0x1234567890123456789012345678901234567890",
      expirationTime: BigInt(0), // No expiration
      revocable: true,
      refUID: "0x0000000000000000000000000000000000000000000000000000000000000000",
      data: "0x1234", // ABI-encoded data
      value: BigInt(0)
    }
  },
  "0x1234567890123456789012345678901234567890" // from address
);

console.log("Attestation created:", attestationResult.hash);
```

###### deploy()

> **deploy**(`deployerAddress`, `forwarderAddress?`, `gasLimit?`): `Promise`\<[`DeploymentResult`](#deploymentresult)\>

Defined in: [sdk/eas/src/eas.ts:106](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/eas.ts#L106)

Deploy EAS contracts via Portal

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `deployerAddress` | `` `0x${string}` `` | The address that will deploy the contracts |
| `forwarderAddress?` | `` `0x${string}` `` | Optional trusted forwarder address (defaults to zero address) |
| `gasLimit?` | `string` | Optional gas limit for deployment transactions (defaults to "0x7a1200") |

###### Returns

`Promise`\<[`DeploymentResult`](#deploymentresult)\>

Promise resolving to deployment result with contract addresses and transaction hashes

###### Example

```typescript
import { createEASClient } from "@settlemint/sdk-eas";

const easClient = createEASClient({
  instance: "https://your-portal-instance.settlemint.com",
  accessToken: "your-access-token"
});

const deployment = await easClient.deploy(
  "0x1234567890123456789012345678901234567890", // deployer address
  "0x0000000000000000000000000000000000000000", // forwarder (optional)
  "0x7a1200" // gas limit (optional)
);

console.log("Schema Registry:", deployment.schemaRegistryAddress);
console.log("EAS Contract:", deployment.easAddress);
```

###### getAttestation()

> **getAttestation**(`uid`): `Promise`\<[`AttestationInfo`](#attestationinfo)\>

Defined in: [sdk/eas/src/eas.ts:528](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/eas.ts#L528)

Get an attestation by UID

TODO: Implement using The Graph subgraph for EAS data queries

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `uid` | `` `0x${string}` `` |

###### Returns

`Promise`\<[`AttestationInfo`](#attestationinfo)\>

###### getAttestations()

> **getAttestations**(`options?`): `Promise`\<[`AttestationInfo`](#attestationinfo)[]\>

Defined in: [sdk/eas/src/eas.ts:539](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/eas.ts#L539)

Get attestations with pagination and filtering

TODO: Implement using The Graph subgraph for EAS data queries

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `options?` | [`GetAttestationsOptions`](#getattestationsoptions) |

###### Returns

`Promise`\<[`AttestationInfo`](#attestationinfo)[]\>

###### getContractAddresses()

> **getContractAddresses**(): `object`

Defined in: [sdk/eas/src/eas.ts:578](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/eas.ts#L578)

Get current contract addresses

###### Returns

`object`

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `easAddress?` | `` `0x${string}` `` | [sdk/eas/src/eas.ts:578](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/eas.ts#L578) |
| `schemaRegistryAddress?` | `` `0x${string}` `` | [sdk/eas/src/eas.ts:578](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/eas.ts#L578) |

###### getOptions()

> **getOptions**(): `object`

Defined in: [sdk/eas/src/eas.ts:564](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/eas.ts#L564)

Get client configuration

###### Returns

| Name | Type | Default value | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| `accessToken?` | `string` | - | The application access token | [sdk/eas/src/utils/validation.ts:21](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/utils/validation.ts#L21) |
| `debug?` | `boolean` | - | Whether to enable debug mode | [sdk/eas/src/utils/validation.ts:33](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/utils/validation.ts#L33) |
| `easContractAddress?` | `` `0x${string}` `` | - | The EAS contract address | [sdk/eas/src/utils/validation.ts:25](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/utils/validation.ts#L25) |
| `instance` | `string` | `UrlSchema` | The EAS instance URL | [sdk/eas/src/utils/validation.ts:17](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/utils/validation.ts#L17) |
| `schemaRegistryContractAddress?` | `` `0x${string}` `` | - | The schema registry contract address | [sdk/eas/src/utils/validation.ts:29](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/utils/validation.ts#L29) |

###### getPortalClient()

> **getPortalClient**(): `GraphQLClient`

Defined in: [sdk/eas/src/eas.ts:571](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/eas.ts#L571)

Get the Portal client instance for advanced operations

###### Returns

`GraphQLClient`

###### getSchema()

> **getSchema**(`uid`): `Promise`\<[`SchemaData`](#schemadata)\>

Defined in: [sdk/eas/src/eas.ts:508](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/eas.ts#L508)

Get a schema by UID

TODO: Implement using The Graph subgraph for EAS data queries

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `uid` | `` `0x${string}` `` |

###### Returns

`Promise`\<[`SchemaData`](#schemadata)\>

###### getSchemas()

> **getSchemas**(`options?`): `Promise`\<[`SchemaData`](#schemadata)[]\>

Defined in: [sdk/eas/src/eas.ts:519](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/eas.ts#L519)

Get all schemas with pagination

TODO: Implement using The Graph subgraph for EAS data queries

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `options?` | [`GetSchemasOptions`](#getschemasoptions) |

###### Returns

`Promise`\<[`SchemaData`](#schemadata)[]\>

###### getTimestamp()

> **getTimestamp**(): `Promise`\<`bigint`\>

Defined in: [sdk/eas/src/eas.ts:557](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/eas.ts#L557)

Get the current timestamp from the contract

TODO: Fix Portal GraphQL query parameter encoding or use The Graph subgraph

###### Returns

`Promise`\<`bigint`\>

###### isValidAttestation()

> **isValidAttestation**(`uid`): `Promise`\<`boolean`\>

Defined in: [sdk/eas/src/eas.ts:548](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/eas.ts#L548)

Check if an attestation is valid

TODO: Implement using The Graph subgraph for EAS data queries

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `uid` | `` `0x${string}` `` |

###### Returns

`Promise`\<`boolean`\>

###### multiAttest()

> **multiAttest**(`requests`, `fromAddress`, `gasLimit?`): `Promise`\<[`TransactionResult`](#transactionresult)\>

Defined in: [sdk/eas/src/eas.ts:386](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/eas.ts#L386)

Create multiple attestations in a single transaction

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `requests` | [`AttestationRequest`](#attestationrequest)[] | Array of attestation requests |
| `fromAddress` | `` `0x${string}` `` | Address that will create the attestations |
| `gasLimit?` | `string` | Optional gas limit for the transaction (defaults to "0x3d0900") |

###### Returns

`Promise`\<[`TransactionResult`](#transactionresult)\>

Promise resolving to transaction result

###### Example

```typescript
import { createEASClient } from "@settlemint/sdk-eas";

const easClient = createEASClient({
  instance: "https://your-portal-instance.settlemint.com",
  accessToken: "your-access-token"
});

const multiAttestResult = await easClient.multiAttest(
  [
    {
      schema: "0x1234567890123456789012345678901234567890123456789012345678901234",
      data: {
        recipient: "0x1234567890123456789012345678901234567890",
        expirationTime: BigInt(0),
        revocable: true,
        refUID: "0x0000000000000000000000000000000000000000000000000000000000000000",
        data: "0x1234",
        value: BigInt(0)
      }
    },
    {
      schema: "0x5678901234567890123456789012345678901234567890123456789012345678",
      data: {
        recipient: "0x5678901234567890123456789012345678901234",
        expirationTime: BigInt(0),
        revocable: false,
        refUID: "0x0000000000000000000000000000000000000000000000000000000000000000",
        data: "0x5678",
        value: BigInt(0)
      }
    }
  ],
  "0x1234567890123456789012345678901234567890" // from address
);

console.log("Multiple attestations created:", multiAttestResult.hash);
```

###### registerSchema()

> **registerSchema**(`request`, `fromAddress`, `gasLimit?`): `Promise`\<[`TransactionResult`](#transactionresult)\>

Defined in: [sdk/eas/src/eas.ts:216](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/eas.ts#L216)

Register a new schema in the EAS Schema Registry

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `request` | [`SchemaRequest`](#schemarequest) | Schema registration request containing schema definition |
| `fromAddress` | `` `0x${string}` `` | Address that will register the schema |
| `gasLimit?` | `string` | Optional gas limit for the transaction (defaults to "0x3d0900") |

###### Returns

`Promise`\<[`TransactionResult`](#transactionresult)\>

Promise resolving to transaction result

###### Example

```typescript
import { createEASClient } from "@settlemint/sdk-eas";

const easClient = createEASClient({
  instance: "https://your-portal-instance.settlemint.com",
  accessToken: "your-access-token"
});

const schemaResult = await easClient.registerSchema(
  {
    schema: "uint256 eventId, uint8 voteIndex",
    resolver: "0x0000000000000000000000000000000000000000",
    revocable: true
  },
  "0x1234567890123456789012345678901234567890" // from address
);

console.log("Schema registered:", schemaResult.hash);
```

###### revoke()

> **revoke**(`schemaUID`, `attestationUID`, `fromAddress`, `value?`, `gasLimit?`): `Promise`\<[`TransactionResult`](#transactionresult)\>

Defined in: [sdk/eas/src/eas.ts:464](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/eas.ts#L464)

Revoke an existing attestation

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `schemaUID` | `` `0x${string}` `` | UID of the schema used for the attestation |
| `attestationUID` | `` `0x${string}` `` | UID of the attestation to revoke |
| `fromAddress` | `` `0x${string}` `` | Address that will revoke the attestation |
| `value?` | `bigint` | Optional ETH value to send with the revocation |
| `gasLimit?` | `string` | Optional gas limit for the transaction (defaults to "0x3d0900") |

###### Returns

`Promise`\<[`TransactionResult`](#transactionresult)\>

Promise resolving to transaction result

###### Example

```typescript
import { createEASClient } from "@settlemint/sdk-eas";

const easClient = createEASClient({
  instance: "https://your-portal-instance.settlemint.com",
  accessToken: "your-access-token"
});

const revokeResult = await easClient.revoke(
  "0x1234567890123456789012345678901234567890123456789012345678901234", // schema UID
  "0x5678901234567890123456789012345678901234567890123456789012345678", // attestation UID
  "0x1234567890123456789012345678901234567890", // from address
  BigInt(0) // value (optional)
);

console.log("Attestation revoked:", revokeResult.hash);
```

### Interfaces

#### AttestationData

Defined in: [sdk/eas/src/schema.ts:63](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L63)

Attestation data structure

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="data"></a> `data` | `` `0x${string}` `` | Encoded attestation data | [sdk/eas/src/schema.ts:73](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L73) |
| <a id="expirationtime"></a> `expirationTime` | `bigint` | Expiration time (0 for no expiration) | [sdk/eas/src/schema.ts:67](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L67) |
| <a id="recipient"></a> `recipient` | `` `0x${string}` `` | Recipient of the attestation | [sdk/eas/src/schema.ts:65](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L65) |
| <a id="refuid"></a> `refUID` | `` `0x${string}` `` | Reference UID (use ZERO_BYTES32 for no reference) | [sdk/eas/src/schema.ts:71](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L71) |
| <a id="revocable"></a> `revocable` | `boolean` | Whether this attestation can be revoked | [sdk/eas/src/schema.ts:69](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L69) |
| <a id="value"></a> `value` | `bigint` | Value sent with the attestation | [sdk/eas/src/schema.ts:75](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L75) |

***

#### AttestationInfo

Defined in: [sdk/eas/src/schema.ts:115](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L115)

Attestation information

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="attester"></a> `attester` | `` `0x${string}` `` | Address that created the attestation | [sdk/eas/src/schema.ts:121](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L121) |
| <a id="data-1"></a> `data` | `` `0x${string}` `` | Encoded attestation data | [sdk/eas/src/schema.ts:133](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L133) |
| <a id="expirationtime-1"></a> `expirationTime` | `bigint` | Expiration timestamp | [sdk/eas/src/schema.ts:127](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L127) |
| <a id="recipient-1"></a> `recipient` | `` `0x${string}` `` | Recipient of the attestation | [sdk/eas/src/schema.ts:123](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L123) |
| <a id="refuid-1"></a> `refUID` | `` `0x${string}` `` | Reference UID | [sdk/eas/src/schema.ts:131](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L131) |
| <a id="revocable-1"></a> `revocable` | `boolean` | Whether this attestation can be revoked | [sdk/eas/src/schema.ts:129](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L129) |
| <a id="schema"></a> `schema` | `` `0x${string}` `` | Schema UID | [sdk/eas/src/schema.ts:119](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L119) |
| <a id="time"></a> `time` | `bigint` | Creation timestamp | [sdk/eas/src/schema.ts:125](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L125) |
| <a id="uid"></a> `uid` | `` `0x${string}` `` | Attestation UID | [sdk/eas/src/schema.ts:117](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L117) |
| <a id="value-1"></a> `value` | `bigint` | Value sent with the attestation | [sdk/eas/src/schema.ts:135](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L135) |

***

#### AttestationRequest

Defined in: [sdk/eas/src/schema.ts:81](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L81)

Attestation request

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="data-2"></a> `data` | [`AttestationData`](#attestationdata) | Attestation data | [sdk/eas/src/schema.ts:85](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L85) |
| <a id="schema-1"></a> `schema` | `` `0x${string}` `` | Schema UID to attest against | [sdk/eas/src/schema.ts:83](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L83) |

***

#### DeploymentResult

Defined in: [sdk/eas/src/schema.ts:167](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L167)

Contract deployment result

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="easaddress"></a> `easAddress` | `` `0x${string}` `` | Deployed EAS contract address | [sdk/eas/src/schema.ts:169](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L169) |
| <a id="eastransactionhash"></a> `easTransactionHash?` | `` `0x${string}` `` | EAS deployment transaction hash (when address not immediately available) | [sdk/eas/src/schema.ts:173](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L173) |
| <a id="schemaregistryaddress"></a> `schemaRegistryAddress` | `` `0x${string}` `` | Deployed Schema Registry contract address | [sdk/eas/src/schema.ts:171](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L171) |
| <a id="schemaregistrytransactionhash"></a> `schemaRegistryTransactionHash?` | `` `0x${string}` `` | Schema Registry deployment transaction hash (when address not immediately available) | [sdk/eas/src/schema.ts:175](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L175) |

***

#### GetAttestationsOptions

Defined in: [sdk/eas/src/schema.ts:151](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L151)

Options for retrieving attestations

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="attester-1"></a> `attester?` | `` `0x${string}` `` | Filter by attester address | [sdk/eas/src/schema.ts:159](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L159) |
| <a id="limit"></a> `limit?` | `number` | Maximum number of attestations to return | [sdk/eas/src/schema.ts:153](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L153) |
| <a id="offset"></a> `offset?` | `number` | Number of attestations to skip | [sdk/eas/src/schema.ts:155](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L155) |
| <a id="recipient-2"></a> `recipient?` | `` `0x${string}` `` | Filter by recipient address | [sdk/eas/src/schema.ts:161](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L161) |
| <a id="schema-2"></a> `schema?` | `` `0x${string}` `` | Filter by schema UID | [sdk/eas/src/schema.ts:157](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L157) |

***

#### GetSchemasOptions

Defined in: [sdk/eas/src/schema.ts:141](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L141)

Options for retrieving schemas

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="limit-1"></a> `limit?` | `number` | Maximum number of schemas to return | [sdk/eas/src/schema.ts:143](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L143) |
| <a id="offset-1"></a> `offset?` | `number` | Number of schemas to skip | [sdk/eas/src/schema.ts:145](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L145) |

***

#### ~~RegisterSchemaOptions~~

Defined in: [sdk/eas/src/schema.ts:181](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L181)

##### Deprecated

Use SchemaRequest instead

##### Extends

- [`SchemaRequest`](#schemarequest)

##### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="fields"></a> ~~`fields?`~~ | [`SchemaField`](#schemafield)[] | Schema fields (alternative to schema string) | [`SchemaRequest`](#schemarequest).[`fields`](#fields-1) | [sdk/eas/src/schema.ts:51](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L51) |
| <a id="resolver"></a> ~~`resolver`~~ | `` `0x${string}` `` | Resolver contract address (use ZERO_ADDRESS for no resolver) | [`SchemaRequest`](#schemarequest).[`resolver`](#resolver-2) | [sdk/eas/src/schema.ts:55](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L55) |
| <a id="revocable-2"></a> ~~`revocable`~~ | `boolean` | Whether attestations using this schema can be revoked | [`SchemaRequest`](#schemarequest).[`revocable`](#revocable-4) | [sdk/eas/src/schema.ts:57](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L57) |
| <a id="schema-3"></a> ~~`schema?`~~ | `string` | Raw schema string (alternative to fields) | [`SchemaRequest`](#schemarequest).[`schema`](#schema-5) | [sdk/eas/src/schema.ts:53](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L53) |

***

#### SchemaData

Defined in: [sdk/eas/src/schema.ts:101](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L101)

Schema information

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="resolver-1"></a> `resolver` | `` `0x${string}` `` | Resolver contract address | [sdk/eas/src/schema.ts:105](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L105) |
| <a id="revocable-3"></a> `revocable` | `boolean` | Whether attestations can be revoked | [sdk/eas/src/schema.ts:107](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L107) |
| <a id="schema-4"></a> `schema` | `string` | Schema string | [sdk/eas/src/schema.ts:109](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L109) |
| <a id="uid-1"></a> `uid` | `` `0x${string}` `` | Schema UID | [sdk/eas/src/schema.ts:103](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L103) |

***

#### SchemaField

Defined in: [sdk/eas/src/schema.ts:32](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L32)

Represents a single field in an EAS schema.

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="description"></a> `description?` | `string` | Optional description of the field's purpose | [sdk/eas/src/schema.ts:38](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L38) |
| <a id="name"></a> `name` | `string` | The name of the field | [sdk/eas/src/schema.ts:34](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L34) |
| <a id="type"></a> `type` | `"string"` \| `"address"` \| `"bool"` \| `"bytes"` \| `"bytes32"` \| `"uint256"` \| `"int256"` \| `"uint8"` \| `"int8"` | The Solidity type of the field | [sdk/eas/src/schema.ts:36](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L36) |

***

#### SchemaRequest

Defined in: [sdk/eas/src/schema.ts:49](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L49)

Schema registration request

##### Extended by

- [`RegisterSchemaOptions`](#registerschemaoptions)

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="fields-1"></a> `fields?` | [`SchemaField`](#schemafield)[] | Schema fields (alternative to schema string) | [sdk/eas/src/schema.ts:51](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L51) |
| <a id="resolver-2"></a> `resolver` | `` `0x${string}` `` | Resolver contract address (use ZERO_ADDRESS for no resolver) | [sdk/eas/src/schema.ts:55](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L55) |
| <a id="revocable-4"></a> `revocable` | `boolean` | Whether attestations using this schema can be revoked | [sdk/eas/src/schema.ts:57](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L57) |
| <a id="schema-5"></a> `schema?` | `string` | Raw schema string (alternative to fields) | [sdk/eas/src/schema.ts:53](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L53) |

***

#### TransactionResult

Defined in: [sdk/eas/src/schema.ts:91](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L91)

Transaction result

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="hash"></a> `hash` | `` `0x${string}` `` | Transaction hash | [sdk/eas/src/schema.ts:93](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L93) |
| <a id="success"></a> `success` | `boolean` | Whether the transaction was successful | [sdk/eas/src/schema.ts:95](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L95) |

### Type Aliases

#### EASClientOptions

> **EASClientOptions** = `z.infer`\<*typeof* [`EASClientOptionsSchema`](#easclientoptionsschema)\>

Defined in: [sdk/eas/src/schema.ts:44](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L44)

Configuration options for the EAS client

### Variables

#### EAS\_FIELD\_TYPES

> `const` **EAS\_FIELD\_TYPES**: `object`

Defined in: [sdk/eas/src/schema.ts:15](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L15)

Supported field types for EAS schema fields.
Maps to the Solidity types that can be used in EAS schemas.

##### Type declaration

| Name | Type | Default value | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="address"></a> `address` | `"address"` | `"address"` | [sdk/eas/src/schema.ts:17](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L17) |
| <a id="bool"></a> `bool` | `"bool"` | `"bool"` | [sdk/eas/src/schema.ts:18](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L18) |
| <a id="bytes"></a> `bytes` | `"bytes"` | `"bytes"` | [sdk/eas/src/schema.ts:19](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L19) |
| <a id="bytes32"></a> `bytes32` | `"bytes32"` | `"bytes32"` | [sdk/eas/src/schema.ts:20](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L20) |
| <a id="int256"></a> `int256` | `"int256"` | `"int256"` | [sdk/eas/src/schema.ts:22](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L22) |
| <a id="int8"></a> `int8` | `"int8"` | `"int8"` | [sdk/eas/src/schema.ts:24](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L24) |
| <a id="string"></a> `string` | `"string"` | `"string"` | [sdk/eas/src/schema.ts:16](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L16) |
| <a id="uint256"></a> `uint256` | `"uint256"` | `"uint256"` | [sdk/eas/src/schema.ts:21](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L21) |
| <a id="uint8"></a> `uint8` | `"uint8"` | `"uint8"` | [sdk/eas/src/schema.ts:23](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L23) |

***

#### EASClientOptionsSchema

> `const` **EASClientOptionsSchema**: `ZodObject`\<\{ `accessToken`: `ZodOptional`\<`ZodString`\>; `debug`: `ZodOptional`\<`ZodBoolean`\>; `easContractAddress`: `ZodOptional`\<`ZodCustom`\<`` `0x${string}` ``, `` `0x${string}` ``\>\>; `instance`: `ZodString`; `schemaRegistryContractAddress`: `ZodOptional`\<`ZodCustom`\<`` `0x${string}` ``, `` `0x${string}` ``\>\>; \}, `$strip`\>

Defined in: [sdk/eas/src/utils/validation.ts:13](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/utils/validation.ts#L13)

Zod schema for EASClientOptions.

***

#### ZERO\_ADDRESS

> `const` **ZERO\_ADDRESS**: `"0x0000000000000000000000000000000000000000"` = `zeroAddress`

Defined in: [sdk/eas/src/schema.ts:8](https://github.com/settlemint/sdk/blob/v2.3.14/sdk/eas/src/schema.ts#L8)

Common address constants

## Contributing

We welcome contributions from the community! Please check out our [Contributing](https://github.com/settlemint/sdk/blob/main/.github/CONTRIBUTING.md) guide to learn how you can help improve the SettleMint SDK through bug reports, feature requests, documentation updates, or code contributions.

## License

The SettleMint SDK is released under the [FSL Software License](https://fsl.software). See the [LICENSE](https://github.com/settlemint/sdk/blob/main/LICENSE) file for more details.
