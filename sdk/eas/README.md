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
    - [buildSchemaString()](#buildschemastring)
    - [registerSchema()](#registerschema)
    - [validateEthereumAddress()](#validateethereumaddress)
    - [validateFieldName()](#validatefieldname)
    - [validateFieldType()](#validatefieldtype)
    - [validateSchemaFields()](#validateschemafields)
  - [Interfaces](#interfaces)
    - [RegisterSchemaOptions](#registerschemaoptions)
    - [SchemaField](#schemafield)
  - [Type Aliases](#type-aliases)
    - [EASFieldType](#easfieldtype)
  - [Variables](#variables)
    - [EAS\_FIELD\_TYPES](#eas_field_types)
- [Contributing](#contributing)
- [License](#license)

## About

The SettleMint EAS SDK provides a lightweight wrapper for the Ethereum Attestation Service (EAS), enabling developers to easily create, manage, and verify attestations within their applications. It simplifies the process of working with EAS by handling contract interactions, schema management, and The Graph integration, while ensuring proper integration with the SettleMint platform. This allows developers to quickly implement document verification, identity attestation, and other EAS-based features without manual setup.

## API Reference

### Functions

#### buildSchemaString()

> **buildSchemaString**(`fields`): `string`

Defined in: [schema.ts:166](https://github.com/settlemint/sdk/blob/v2.2.2/sdk/eas/src/schema.ts#L166)

Builds an EAS schema string from an array of fields.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fields` | [`SchemaField`](#schemafield)[] | The fields to include in the schema |

##### Returns

`string`

The EAS-compatible schema string

##### Throws

Error if any field is invalid

##### Example

```ts
import { buildSchemaString, SchemaField } from '@settlemint/sdk-eas';

const fields: SchemaField[] = [
  { name: "userAddress", type: "address" },
  { name: "age", type: "uint8" },
  { name: "isActive", type: "bool" }
];

const schemaString = buildSchemaString(fields);
// Result: "address userAddress, uint8 age, bool isActive"
```

***

#### registerSchema()

> **registerSchema**(`options`): `Promise`\<`string`\>

Defined in: [schema.ts:246](https://github.com/settlemint/sdk/blob/v2.2.2/sdk/eas/src/schema.ts#L246)

Registers a new schema with EAS.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`RegisterSchemaOptions`](#registerschemaoptions) | The schema registration options |

##### Returns

`Promise`\<`string`\>

A promise that resolves to the schema UID

##### Throws

Error if the schema registration fails

##### Example

```ts
import { registerSchema, SchemaField } from '@settlemint/sdk-eas';

const fields: SchemaField[] = [
  { name: "userAddress", type: "address" },
  { name: "age", type: "uint8" }
];

const schemaUID = await registerSchema({
  fields,
  resolverAddress: "0x1234567890123456789012345678901234567890",
  revocable: true
});

console.log(`Schema registered with UID: ${schemaUID}`);
```

***

#### validateEthereumAddress()

> **validateEthereumAddress**(`address`): `void`

Defined in: [schema.ts:214](https://github.com/settlemint/sdk/blob/v2.2.2/sdk/eas/src/schema.ts#L214)

Validates an Ethereum address.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `address` | `string` | The address to validate |

##### Returns

`void`

##### Throws

Error if the address is invalid

##### Example

```ts
import { validateEthereumAddress } from '@settlemint/sdk-eas';

// Valid address
validateEthereumAddress("0x1234567890123456789012345678901234567890"); // OK

// Invalid addresses
validateEthereumAddress("0x123"); // Throws: "Invalid Ethereum address format"
validateEthereumAddress(""); // Throws: "Resolver address cannot be empty"
```

***

#### validateFieldName()

> **validateFieldName**(`name`): `void`

Defined in: [schema.ts:71](https://github.com/settlemint/sdk/blob/v2.2.2/sdk/eas/src/schema.ts#L71)

Validates a schema field name.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The field name to validate |

##### Returns

`void`

##### Throws

Error if the name is invalid

##### Example

```ts
import { validateFieldName } from '@settlemint/sdk-eas';

// Valid names
validateFieldName("userAddress"); // OK
validateFieldName("user_address"); // OK

// Invalid names
validateFieldName("user address"); // Throws: "Field name cannot contain spaces"
validateFieldName("123user"); // Throws: "Field name must start with a letter or underscore"
```

***

#### validateFieldType()

> **validateFieldType**(`type`): asserts type is "string" \| "address" \| "bool" \| "bytes" \| "bytes32" \| "uint256" \| "int256" \| "uint8" \| "int8"

Defined in: [schema.ts:101](https://github.com/settlemint/sdk/blob/v2.2.2/sdk/eas/src/schema.ts#L101)

Validates a schema field type.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `type` | `string` | The field type to validate |

##### Returns

asserts type is "string" \| "address" \| "bool" \| "bytes" \| "bytes32" \| "uint256" \| "int256" \| "uint8" \| "int8"

##### Throws

Error if the type is invalid

##### Example

```ts
import { validateFieldType } from '@settlemint/sdk-eas';

// Valid types
validateFieldType("string"); // OK
validateFieldType("address"); // OK

// Invalid types
validateFieldType("invalidType"); // Throws: "Invalid field type: invalidType"
```

***

#### validateSchemaFields()

> **validateSchemaFields**(`fields`): `void`

Defined in: [schema.ts:130](https://github.com/settlemint/sdk/blob/v2.2.2/sdk/eas/src/schema.ts#L130)

Validates an array of schema fields.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fields` | [`SchemaField`](#schemafield)[] | The fields to validate |

##### Returns

`void`

##### Throws

Error if any field is invalid

##### Example

```ts
import { validateSchemaFields, SchemaField } from '@settlemint/sdk-eas';

const fields: SchemaField[] = [
  { name: "userAddress", type: "address" },
  { name: "age", type: "uint8" }
];

validateSchemaFields(fields); // OK

// Invalid fields
validateSchemaFields([]); // Throws: "Schema must have at least one field"
validateSchemaFields([
  { name: "userAddress", type: "address" },
  { name: "userAddress", type: "uint8" }
]); // Throws: "Duplicate field name: userAddress"
```

### Interfaces

#### RegisterSchemaOptions

Defined in: [schema.ts:187](https://github.com/settlemint/sdk/blob/v2.2.2/sdk/eas/src/schema.ts#L187)

Options for registering a schema.

##### Example

```ts
import { RegisterSchemaOptions, SchemaField } from '@settlemint/sdk-eas';

const options: RegisterSchemaOptions = {
  fields: [
    { name: "userAddress", type: "address" },
    { name: "age", type: "uint8" }
  ],
  resolverAddress: "0x1234567890123456789012345678901234567890",
  revocable: true
};
```

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="fields"></a> `fields` | [`SchemaField`](#schemafield)[] | The fields that make up the schema | [schema.ts:189](https://github.com/settlemint/sdk/blob/v2.2.2/sdk/eas/src/schema.ts#L189) |
| <a id="resolveraddress"></a> `resolverAddress` | `string` | The Ethereum address of the resolver | [schema.ts:191](https://github.com/settlemint/sdk/blob/v2.2.2/sdk/eas/src/schema.ts#L191) |
| <a id="revocable"></a> `revocable` | `boolean` | Whether attestations using this schema can be revoked | [schema.ts:193](https://github.com/settlemint/sdk/blob/v2.2.2/sdk/eas/src/schema.ts#L193) |

***

#### SchemaField

Defined in: [schema.ts:45](https://github.com/settlemint/sdk/blob/v2.2.2/sdk/eas/src/schema.ts#L45)

Interface for defining a schema field.

##### Example

```ts
import { SchemaField } from '@settlemint/sdk-eas';

const field: SchemaField = {
  name: "userAddress",
  type: "address",
  description: "The Ethereum address of the user"
};
```

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="description"></a> `description?` | `string` | Optional description of the field | [schema.ts:51](https://github.com/settlemint/sdk/blob/v2.2.2/sdk/eas/src/schema.ts#L51) |
| <a id="name"></a> `name` | `string` | The name of the field | [schema.ts:47](https://github.com/settlemint/sdk/blob/v2.2.2/sdk/eas/src/schema.ts#L47) |
| <a id="type"></a> `type` | `"string"` \| `"address"` \| `"bool"` \| `"bytes"` \| `"bytes32"` \| `"uint256"` \| `"int256"` \| `"uint8"` \| `"int8"` | The type of the field | [schema.ts:49](https://github.com/settlemint/sdk/blob/v2.2.2/sdk/eas/src/schema.ts#L49) |

### Type Aliases

#### EASFieldType

> **EASFieldType** = keyof *typeof* [`EAS_FIELD_TYPES`](#eas_field_types)

Defined in: [schema.ts:30](https://github.com/settlemint/sdk/blob/v2.2.2/sdk/eas/src/schema.ts#L30)

Type representing all valid EAS field types.

### Variables

#### EAS\_FIELD\_TYPES

> `const` **EAS\_FIELD\_TYPES**: `object`

Defined in: [schema.ts:15](https://github.com/settlemint/sdk/blob/v2.2.2/sdk/eas/src/schema.ts#L15)

Supported EAS schema field types.
Maps user-friendly type names to EAS-compatible type strings.

##### Type declaration

| Name | Type | Default value | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="address"></a> `address` | `"address"` | `"address"` | [schema.ts:17](https://github.com/settlemint/sdk/blob/v2.2.2/sdk/eas/src/schema.ts#L17) |
| <a id="bool"></a> `bool` | `"bool"` | `"bool"` | [schema.ts:18](https://github.com/settlemint/sdk/blob/v2.2.2/sdk/eas/src/schema.ts#L18) |
| <a id="bytes"></a> `bytes` | `"bytes"` | `"bytes"` | [schema.ts:19](https://github.com/settlemint/sdk/blob/v2.2.2/sdk/eas/src/schema.ts#L19) |
| <a id="bytes32"></a> `bytes32` | `"bytes32"` | `"bytes32"` | [schema.ts:20](https://github.com/settlemint/sdk/blob/v2.2.2/sdk/eas/src/schema.ts#L20) |
| <a id="int256"></a> `int256` | `"int256"` | `"int256"` | [schema.ts:22](https://github.com/settlemint/sdk/blob/v2.2.2/sdk/eas/src/schema.ts#L22) |
| <a id="int8"></a> `int8` | `"int8"` | `"int8"` | [schema.ts:24](https://github.com/settlemint/sdk/blob/v2.2.2/sdk/eas/src/schema.ts#L24) |
| <a id="string"></a> `string` | `"string"` | `"string"` | [schema.ts:16](https://github.com/settlemint/sdk/blob/v2.2.2/sdk/eas/src/schema.ts#L16) |
| <a id="uint256"></a> `uint256` | `"uint256"` | `"uint256"` | [schema.ts:21](https://github.com/settlemint/sdk/blob/v2.2.2/sdk/eas/src/schema.ts#L21) |
| <a id="uint8"></a> `uint8` | `"uint8"` | `"uint8"` | [schema.ts:23](https://github.com/settlemint/sdk/blob/v2.2.2/sdk/eas/src/schema.ts#L23) |

##### Example

```ts
import { EAS_FIELD_TYPES } from '@settlemint/sdk-eas';

// Use in type definitions
type MyFieldType = keyof typeof EAS_FIELD_TYPES;

// Check if a type is supported
const isValidType = "string" in EAS_FIELD_TYPES;
```

## Contributing

We welcome contributions from the community! Please check out our [Contributing](https://github.com/settlemint/sdk/blob/main/.github/CONTRIBUTING.md) guide to learn how you can help improve the SettleMint SDK through bug reports, feature requests, documentation updates, or code contributions.

## License

The SettleMint SDK is released under the [FSL Software License](https://fsl.software). See the [LICENSE](https://github.com/settlemint/sdk/blob/main/LICENSE) file for more details.
