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
<a href="https://fsl.software" rel="nofollow"><img src="https://img.shields.io/npm/l/@settlemint/sdk-blockscout" alt="License"></a>
<a href="https://www.npmjs.com/package/@settlemint/sdk-blockscout" rel="nofollow"><img src="https://img.shields.io/npm/dw/@settlemint/sdk-blockscout" alt="npm"></a>
<a href="https://github.com/settlemint/sdk" rel="nofollow"><img src="https://img.shields.io/github/stars/settlemint/sdk" alt="stars"></a>
</p>

<div align="center">
  <a href="https://console.settlemint.com/documentation/docs/using-platform/dev-tools/SDK/">Documentation</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://www.npmjs.com/package/@settlemint/sdk-blockscout">NPM</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://github.com/settlemint/sdk/issues">Issues</a>
  <br />
</div>

## Table of Contents

- [About](#about)
- [API Reference](#api-reference)
  - [Functions](#functions)
    - [createBlockscoutClient()](#createblockscoutclient)
  - [Type Aliases](#type-aliases)
    - [ClientOptions](#clientoptions)
    - [RequestConfig](#requestconfig)
  - [Variables](#variables)
    - [ClientOptionsSchema](#clientoptionsschema)
- [Contributing](#contributing)
- [License](#license)

## About

The SettleMint Blockscout SDK provides a seamless way to interact with Blockscout APIs for blockchain data exploration and analysis. It enables you to easily query transaction data, blocks, addresses, smart contracts and more from your SettleMint-powered blockchain networks.

For detailed information about using Blockscout with the SettleMint platform, check out our [official documentation](https://console.settlemint.com/documentation/docs/using-platform/insights/).

## API Reference

### Functions

#### createBlockscoutClient()

> **createBlockscoutClient**\<`Setup`\>(`options`, `clientOptions`?): `object`

Defined in: [sdk/blockscout/src/blockscout.ts:106](https://github.com/settlemint/sdk/blob/v1.1.8/sdk/blockscout/src/blockscout.ts#L106)

Creates a Blockscout GraphQL client with proper type safety using gql.tada

##### Type Parameters

| Type Parameter |
| ------ |
| `Setup` *extends* `AbstractSetupSchema` |

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | `Omit`\<\{ `accessToken`: `string`; `instance`: `string`; `runtime`: `"server"`; \} \| \{ `runtime`: `"browser"`; \}, `"runtime"`\> & `Record`\<`string`, `unknown`\> | Configuration options for the client |
| `clientOptions`? | `RequestConfig` | Optional GraphQL client configuration options |

##### Returns

`object`

An object containing the GraphQL client and initialized gql.tada function

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `client` | `GraphQLClient` | [sdk/blockscout/src/blockscout.ts:110](https://github.com/settlemint/sdk/blob/v1.1.8/sdk/blockscout/src/blockscout.ts#L110) |
| `graphql` | `initGraphQLTada`\<`Setup`\> | [sdk/blockscout/src/blockscout.ts:111](https://github.com/settlemint/sdk/blob/v1.1.8/sdk/blockscout/src/blockscout.ts#L111) |

##### Throws

Will throw an error if the options fail validation

##### Example

```ts
import { createBlockscoutClient } from '@settlemint/sdk-blockscout';
import type { introspection } from "@schemas/blockscout-env";

// Server-side usage
const { client, graphql } = createBlockscoutClient<{
  introspection: introspection;
  disableMasking: true;
  scalars: {
    DateTime: Date;
    JSON: Record<string, unknown>;
    Bytes: string;
    Int8: string;
    BigInt: string;
    BigDecimal: string;
    Timestamp: string;
  };
}>({
  instance: process.env.SETTLEMINT_BLOCKSCOUT_ENDPOINT,
  accessToken: process.env.SETTLEMINT_ACCESS_TOKEN
});

// Browser-side usage
const { client, graphql } = createBlockscoutClient<{
  introspection: introspection;
  disableMasking: true;
  scalars: {
    DateTime: Date;
    JSON: Record<string, unknown>;
    Bytes: string;
    Int8: string;
    BigInt: string;
    BigDecimal: string;
    Timestamp: string;
  };
}>({});

// Making GraphQL queries
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

const result = await client.request(query, {
  hash: "0x123abc..."
});
```

### Type Aliases

#### ClientOptions

> **ClientOptions**: \{ `accessToken`: `string`; `instance`: `string`; `runtime`: `"server"`; \} \| \{ `runtime`: `"browser"`; \}

Defined in: [sdk/blockscout/src/blockscout.ts:32](https://github.com/settlemint/sdk/blob/v1.1.8/sdk/blockscout/src/blockscout.ts#L32)

Type definition for client options derived from the ClientOptionsSchema

***

#### RequestConfig

> **RequestConfig**: `ConstructorParameters`\<*typeof* `GraphQLClient`\>\[`1`\]

Defined in: [sdk/blockscout/src/blockscout.ts:10](https://github.com/settlemint/sdk/blob/v1.1.8/sdk/blockscout/src/blockscout.ts#L10)

Type definition for GraphQL client configuration options

### Variables

#### ClientOptionsSchema

> `const` **ClientOptionsSchema**: `ZodDiscriminatedUnion`\<[`ClientOptions`](README.md#clientoptions)\>

Defined in: [sdk/blockscout/src/blockscout.ts:18](https://github.com/settlemint/sdk/blob/v1.1.8/sdk/blockscout/src/blockscout.ts#L18)

Schema for validating client options for the Blockscout client.
Defines two possible runtime configurations:
1. Server-side with instance URL and access token
2. Browser-side with no additional configuration needed

## Contributing

We welcome contributions from the community! Please check out our [Contributing](https://github.com/settlemint/sdk/blob/main/.github/CONTRIBUTING.md) guide to learn how you can help improve the SettleMint SDK through bug reports, feature requests, documentation updates, or code contributions.

## License

The SettleMint SDK is released under the [FSL Software License](https://fsl.software). See the [LICENSE](https://github.com/settlemint/sdk/blob/main/LICENSE) file for more details.
