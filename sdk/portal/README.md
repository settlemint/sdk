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
<a href="https://fsl.software" rel="nofollow"><img src="https://img.shields.io/npm/l/@settlemint/sdk-portal" alt="License"></a>
<a href="https://www.npmjs.com/package/@settlemint/sdk-portal" rel="nofollow"><img src="https://img.shields.io/npm/dw/@settlemint/sdk-portal" alt="npm"></a>
<a href="https://github.com/settlemint/sdk" rel="nofollow"><img src="https://img.shields.io/github/stars/settlemint/sdk" alt="stars"></a>
</p>

<div align="center">
  <a href="https://console.settlemint.com/documentation">Documentation</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://www.npmjs.com/package/@settlemint/sdk-portal">NPM</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://github.com/settlemint/sdk/issues">Issues</a>
  <br />
</div>

## Table of Contents

- [About](#about)
- [API Reference](#api-reference)
  - [Functions](#functions)
    - [createPortalClient()](#createportalclient)
  - [Type Aliases](#type-aliases)
    - [ClientOptions](#clientoptions)
    - [RequestConfig](#requestconfig)
  - [Variables](#variables)
    - [ClientOptionsSchema](#clientoptionsschema)
- [Contributing](#contributing)
- [License](#license)

## About

The SettleMint Smart Contract Portal SDK provides a seamless way to interact with the Smart Contract Portal Middleware API. It enables you to easily interact with your smart contracts using a REST or GraphQL API.

The SDK offers a type-safe interface for all Portal API operations, with comprehensive error handling and validation. It integrates smoothly with modern TypeScript applications while providing a simple and intuitive developer experience.

For detailed information about using the Smart Contract Portal Middleware, check out our [official documentation](https://console.settlemint.com/documentation).

## API Reference

### Functions

#### createPortalClient()

> **createPortalClient**\<`Setup`\>(`options`, `clientOptions`?): `object`

Defined in: [sdk/portal/src/portal.ts:61](https://github.com/settlemint/sdk/blob/v1.2.5/sdk/portal/src/portal.ts#L61)

Creates a Portal GraphQL client with the provided configuration.

##### Type Parameters

| Type Parameter |
| ------ |
| `Setup` *extends* `AbstractSetupSchema` |

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | \{ `accessToken`: `string`; `cache`: `"default"` \| `"force-cache"` \| `"no-cache"` \| `"no-store"` \| `"only-if-cached"` \| `"reload"`; `instance`: `string`; \} | Configuration options for the Portal client |
| `options.accessToken` | `string` | - |
| `options.cache`? | `"default"` \| `"force-cache"` \| `"no-cache"` \| `"no-store"` \| `"only-if-cached"` \| `"reload"` | - |
| `options.instance`? | `string` | - |
| `clientOptions`? | `RequestConfig` | Additional GraphQL client configuration options |

##### Returns

`object`

An object containing the configured GraphQL client and graphql helper function

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `client` | `GraphQLClient` | [sdk/portal/src/portal.ts:65](https://github.com/settlemint/sdk/blob/v1.2.5/sdk/portal/src/portal.ts#L65) |
| `graphql` | `initGraphQLTada`\<`Setup`\> | [sdk/portal/src/portal.ts:66](https://github.com/settlemint/sdk/blob/v1.2.5/sdk/portal/src/portal.ts#L66) |

##### Throws

If the provided options fail validation

##### Example

```ts
import { createPortalClient } from '@settlemint/sdk-portal';
import type { introspection } from "@schemas/portal-env";

export const { client: portalClient, graphql: portalGraphql } = createPortalClient<{
  introspection: introspection;
  disableMasking: true;
  scalars: {
    // Change unknown to the type you are using to store metadata
    JSON: unknown;
  };
}>({
  instance: process.env.SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT,
  accessToken: process.env.SETTLEMINT_ACCESS_TOKEN,
});

// Making GraphQL queries
const query = graphql(`
  query GetPendingTransactions {
    getPendingTransactions {
      count
    }
  }
`);

const result = await client.request(query);
```

### Type Aliases

#### ClientOptions

> **ClientOptions** = `z.infer`\<*typeof* [`ClientOptionsSchema`](#clientoptionsschema)\>

Defined in: [sdk/portal/src/portal.ts:24](https://github.com/settlemint/sdk/blob/v1.2.5/sdk/portal/src/portal.ts#L24)

Type representing the validated client options.

***

#### RequestConfig

> **RequestConfig** = `ConstructorParameters`\<*typeof* `GraphQLClient`\>\[`1`\]

Defined in: [sdk/portal/src/portal.ts:10](https://github.com/settlemint/sdk/blob/v1.2.5/sdk/portal/src/portal.ts#L10)

Configuration options for the GraphQL client, excluding 'url' and 'exchanges'.

### Variables

#### ClientOptionsSchema

> `const` **ClientOptionsSchema**: `ZodObject`\<\{ `accessToken`: `ZodString`; `cache`: `ZodOptional`\<`ZodEnum`\<\[`"default"`, `"force-cache"`, `"no-cache"`, `"no-store"`, `"only-if-cached"`, `"reload"`\]\>\>; `instance`: `ZodUnion`\<\[`ZodString`, `ZodString`\]\>; \}, `"strip"`, `ZodTypeAny`, \{ `accessToken`: `string`; `cache`: `"default"` \| `"force-cache"` \| `"no-cache"` \| `"no-store"` \| `"only-if-cached"` \| `"reload"`; `instance`: `string`; \}, \{ `accessToken`: `string`; `cache`: `"default"` \| `"force-cache"` \| `"no-cache"` \| `"no-store"` \| `"only-if-cached"` \| `"reload"`; `instance`: `string`; \}\>

Defined in: [sdk/portal/src/portal.ts:15](https://github.com/settlemint/sdk/blob/v1.2.5/sdk/portal/src/portal.ts#L15)

Schema for validating Portal client configuration options.

## Contributing

We welcome contributions from the community! Please check out our [Contributing](https://github.com/settlemint/sdk/blob/main/.github/CONTRIBUTING.md) guide to learn how you can help improve the SettleMint SDK through bug reports, feature requests, documentation updates, or code contributions.

## License

The SettleMint SDK is released under the [FSL Software License](https://fsl.software). See the [LICENSE](https://github.com/settlemint/sdk/blob/main/LICENSE) file for more details.
