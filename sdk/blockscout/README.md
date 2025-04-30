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
  <a href="https://console.settlemint.com/documentation">Documentation</a>
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

## API Reference

### Functions

#### createBlockscoutClient()

> **createBlockscoutClient**\<`Setup`\>(`options`, `clientOptions?`): `object`

Defined in: [sdk/blockscout/src/blockscout.ts:75](https://github.com/settlemint/sdk/blob/v2.2.0/sdk/blockscout/src/blockscout.ts#L75)

Creates a Blockscout GraphQL client with proper type safety using gql.tada

##### Type Parameters

| Type Parameter |
| ------ |
| `Setup` *extends* `AbstractSetupSchema` |

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | \{ `accessToken`: `string`; `instance`: `string`; \} | Configuration options for the client |
| `options.accessToken` | `string` | - |
| `options.instance?` | `string` | - |
| `clientOptions?` | `RequestConfig` | Optional GraphQL client configuration options |

##### Returns

`object`

An object containing the GraphQL client and initialized gql.tada function

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `client` | `GraphQLClient` | [sdk/blockscout/src/blockscout.ts:79](https://github.com/settlemint/sdk/blob/v2.2.0/sdk/blockscout/src/blockscout.ts#L79) |
| `graphql` | `initGraphQLTada`\<`Setup`\> | [sdk/blockscout/src/blockscout.ts:80](https://github.com/settlemint/sdk/blob/v2.2.0/sdk/blockscout/src/blockscout.ts#L80) |

##### Throws

Will throw an error if the options fail validation

##### Example

```ts
import { createBlockscoutClient } from '@settlemint/sdk-blockscout';
import type { introspection } from "@schemas/blockscout-env";
import { createLogger, requestLogger } from '@settlemint/sdk-utils/logging';

const logger = createLogger();

const { client, graphql } = createBlockscoutClient<{
  introspection: introspection;
  disableMasking: true;
  scalars: {
    AddressHash: string;
    Data: string;
    DateTime: string;
    Decimal: string;
    FullHash: string;
    Json: string;
    NonceHash: string;
    Wei: string;
  };
}>({
  instance: process.env.SETTLEMINT_BLOCKSCOUT_ENDPOINT,
  accessToken: process.env.SETTLEMINT_ACCESS_TOKEN
}, {
  fetch: requestLogger(logger, "blockscout", fetch) as typeof fetch,
});

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

> **ClientOptions** = `object`

Defined in: [sdk/blockscout/src/blockscout.ts:23](https://github.com/settlemint/sdk/blob/v2.2.0/sdk/blockscout/src/blockscout.ts#L23)

Type definition for client options derived from the ClientOptionsSchema

##### Type declaration

| Name | Type | Default value | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="accesstoken"></a> `accessToken` | `string` | `ApplicationAccessTokenSchema` | [sdk/blockscout/src/blockscout.ts:17](https://github.com/settlemint/sdk/blob/v2.2.0/sdk/blockscout/src/blockscout.ts#L17) |
| <a id="instance"></a> `instance` | `string` | `UrlOrPathSchema` | [sdk/blockscout/src/blockscout.ts:16](https://github.com/settlemint/sdk/blob/v2.2.0/sdk/blockscout/src/blockscout.ts#L16) |

***

#### RequestConfig

> **RequestConfig** = `ConstructorParameters`\<*typeof* `GraphQLClient`\>\[`1`\]

Defined in: [sdk/blockscout/src/blockscout.ts:10](https://github.com/settlemint/sdk/blob/v2.2.0/sdk/blockscout/src/blockscout.ts#L10)

Type definition for GraphQL client configuration options

### Variables

#### ClientOptionsSchema

> `const` **ClientOptionsSchema**: `ZodObject`\<[`ClientOptions`](#clientoptions)\>

Defined in: [sdk/blockscout/src/blockscout.ts:15](https://github.com/settlemint/sdk/blob/v2.2.0/sdk/blockscout/src/blockscout.ts#L15)

Schema for validating client options for the Blockscout client.

## Contributing

We welcome contributions from the community! Please check out our [Contributing](https://github.com/settlemint/sdk/blob/main/.github/CONTRIBUTING.md) guide to learn how you can help improve the SettleMint SDK through bug reports, feature requests, documentation updates, or code contributions.

## License

The SettleMint SDK is released under the [FSL Software License](https://fsl.software). See the [LICENSE](https://github.com/settlemint/sdk/blob/main/LICENSE) file for more details.
