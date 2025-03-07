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
<a href="https://fsl.software" rel="nofollow"><img src="https://img.shields.io/npm/l/@settlemint/sdk-thegraph" alt="License"></a>
<a href="https://www.npmjs.com/package/@settlemint/sdk-thegraph" rel="nofollow"><img src="https://img.shields.io/npm/dw/@settlemint/sdk-thegraph" alt="npm"></a>
<a href="https://github.com/settlemint/sdk" rel="nofollow"><img src="https://img.shields.io/github/stars/settlemint/sdk" alt="stars"></a>
</p>

<div align="center">
  <a href="https://console.settlemint.com/documentation/docs/using-platform/dev-tools/SDK/">Documentation</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://www.npmjs.com/package/@settlemint/sdk-thegraph">NPM</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://github.com/settlemint/sdk/issues">Issues</a>
  <br />
</div>

## Table of Contents

- [About](#about)
- [API Reference](#api-reference)
  - [Functions](#functions)
    - [createTheGraphClient()](#createthegraphclient)
  - [Type Aliases](#type-aliases)
    - [ClientOptions](#clientoptions)
    - [RequestConfig](#requestconfig)
  - [Variables](#variables)
    - [ClientOptionsSchema](#clientoptionsschema)
- [Contributing](#contributing)
- [License](#license)

## About

The SettleMint TheGraph SDK provides a seamless way to interact with TheGraph APIs for blockchain data indexing and querying. It enables you to easily create and manage subgraphs, define schemas, and query indexed blockchain data using GraphQL from your SettleMint-powered blockchain networks.

The SDK offers a type-safe interface for all TheGraph operations, with comprehensive error handling and validation. It integrates smoothly with modern TypeScript applications while providing a simple and intuitive developer experience.

For detailed information about using TheGraph with the SettleMint platform, check out our [official documentation](https://console.settlemint.com/documentation/docs/using-platform/middleware/#the-graph-middleware).

## API Reference

### Functions

#### createTheGraphClient()

> **createTheGraphClient**\<`Setup`\>(`options`, `clientOptions`?): `object`

Defined in: [sdk/thegraph/src/thegraph.ts:119](https://github.com/settlemint/sdk/blob/v1.1.15/sdk/thegraph/src/thegraph.ts#L119)

Creates a TheGraph GraphQL client with proper type safety using gql.tada

##### Type Parameters

| Type Parameter |
| ------ |
| `Setup` *extends* `AbstractSetupSchema` |

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | `Omit`\<\{ `accessToken`: `string`; `cache`: `"default"` \| `"force-cache"` \| `"no-cache"` \| `"no-store"` \| `"only-if-cached"` \| `"reload"`; `instances`: `string`[]; `runtime`: `"server"`; `subgraphName`: `string`; \} \| \{ `cache`: `"default"` \| `"force-cache"` \| `"no-cache"` \| `"no-store"` \| `"only-if-cached"` \| `"reload"`; `runtime`: `"browser"`; `subgraphName`: `string`; \}, `"runtime"`\> & `Record`\<`string`, `unknown`\> | Configuration options for the client: - For server-side: instance URLs, access token and subgraph name - For browser-side: just subgraph name |
| `clientOptions`? | `RequestConfig` | Optional GraphQL client configuration options |

##### Returns

`object`

An object containing:
         - client: The configured GraphQL client instance
         - graphql: The initialized gql.tada function for type-safe queries

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `client` | `GraphQLClient` | [sdk/thegraph/src/thegraph.ts:123](https://github.com/settlemint/sdk/blob/v1.1.15/sdk/thegraph/src/thegraph.ts#L123) |
| `graphql` | `initGraphQLTada`\<`Setup`\> | [sdk/thegraph/src/thegraph.ts:124](https://github.com/settlemint/sdk/blob/v1.1.15/sdk/thegraph/src/thegraph.ts#L124) |

##### Throws

Will throw an error if the options fail validation against ClientOptionsSchema

##### Example

```ts
import { createTheGraphClient } from '@settlemint/sdk-thegraph';
import type { introspection } from '@schemas/the-graph-env-kits';

// Server-side usage
const { client, graphql } = createTheGraphClient<{
  introspection: introspection;
  disableMasking: true;
  scalars: {
    Bytes: string;
    Int8: string;
    BigInt: string;
    BigDecimal: string;
    Timestamp: string;
  };
}>({
  instances: JSON.parse(process.env.SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS || '[]'),
  accessToken: process.env.SETTLEMINT_ACCESS_TOKEN!,
  subgraphName: 'kits'
});

// Browser-side usage
const { client, graphql } = createTheGraphClient<{
  introspection: introspection;
  disableMasking: true;
  scalars: {
    Bytes: string;
    Int8: string;
    BigInt: string;
    BigDecimal: string;
    Timestamp: string;
  };
}>({
  subgraphName: 'kits'
});

// Making GraphQL queries
const query = graphql(`
  query SearchAssets {
    assets {
      id
      name
      symbol
    }
  }
`);

const result = await client.request(query);
```

### Type Aliases

#### ClientOptions

> **ClientOptions**: \{ `accessToken`: `string`; `cache`: `"default"` \| `"force-cache"` \| `"no-cache"` \| `"no-store"` \| `"only-if-cached"` \| `"reload"`; `instances`: `string`[]; `runtime`: `"server"`; `subgraphName`: `string`; \} \| \{ `cache`: `"default"` \| `"force-cache"` \| `"no-cache"` \| `"no-store"` \| `"only-if-cached"` \| `"reload"`; `runtime`: `"browser"`; `subgraphName`: `string`; \}

Defined in: [sdk/thegraph/src/thegraph.ts:36](https://github.com/settlemint/sdk/blob/v1.1.15/sdk/thegraph/src/thegraph.ts#L36)

Type definition for client options derived from the ClientOptionsSchema

***

#### RequestConfig

> **RequestConfig**: `ConstructorParameters`\<*typeof* `GraphQLClient`\>\[`1`\]

Defined in: [sdk/thegraph/src/thegraph.ts:10](https://github.com/settlemint/sdk/blob/v1.1.15/sdk/thegraph/src/thegraph.ts#L10)

Type definition for GraphQL client configuration options

### Variables

#### ClientOptionsSchema

> `const` **ClientOptionsSchema**: `ZodDiscriminatedUnion`\<[`ClientOptions`](README.md#clientoptions)\>

Defined in: [sdk/thegraph/src/thegraph.ts:18](https://github.com/settlemint/sdk/blob/v1.1.15/sdk/thegraph/src/thegraph.ts#L18)

Schema for validating client options for the TheGraph client.
Defines two possible runtime configurations:
1. Server-side with instance URLs, access token and subgraph name
2. Browser-side with just subgraph name

## Contributing

We welcome contributions from the community! Please check out our [Contributing](https://github.com/settlemint/sdk/blob/main/.github/CONTRIBUTING.md) guide to learn how you can help improve the SettleMint SDK through bug reports, feature requests, documentation updates, or code contributions.

## License

The SettleMint SDK is released under the [FSL Software License](https://fsl.software). See the [LICENSE](https://github.com/settlemint/sdk/blob/main/LICENSE) file for more details.
