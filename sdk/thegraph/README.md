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
  <a href="https://console.settlemint.com/documentation/">Documentation</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://discord.com/invite/Mt5yqFrey9">Discord</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://www.npmjs.com/package/@settlemint/sdk-thegraph">NPM</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://github.com/settlemint/sdk/issues">Issues</a>
  <br />
</div>

## Table of Contents

- [About](#about)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)

## About

The SettleMint TheGraph SDK provides a seamless way to interact with TheGraph APIs for blockchain data indexing and querying. It enables you to easily create and manage subgraphs, define schemas, and query indexed blockchain data using GraphQL from your SettleMint-powered blockchain networks.

The SDK offers a type-safe interface for all TheGraph operations, with comprehensive error handling and validation. It integrates smoothly with modern TypeScript applications while providing a simple and intuitive developer experience.

For detailed information about using TheGraph with the SettleMint platform, check out our  [official documentation](https://console.settlemint.com/documentation/docs/using-platform/middleware/#the-graph-middleware).

## Usage

TODO: define default

## API Reference

## Variables

### ClientOptionsSchema

> `const` **ClientOptionsSchema**: `ZodDiscriminatedUnion`\<`"runtime"`, \[`ZodObject`\<\{ `accessToken`: `ZodString`; `instances`: `ZodArray`\<`ZodUnion`\<\[`ZodString`, `ZodString`\]\>\>; `runtime`: `ZodLiteral`\<`"server"`\>; `subgraphName`: `ZodString`; \}, `"strip"`, \{ `accessToken`: `string`; `instances`: `string`[]; `runtime`: `"server"`; `subgraphName`: `string`; \}, \{ `accessToken`: `string`; `instances`: `string`[]; `runtime`: `"server"`; `subgraphName`: `string`; \}\>, `ZodObject`\<\{ `runtime`: `ZodLiteral`\<`"browser"`\>; `subgraphName`: `ZodString`; \}, `"strip"`, \{ `runtime`: `"browser"`; `subgraphName`: `string`; \}, \{ `runtime`: `"browser"`; `subgraphName`: `string`; \}\>\]\>

Defined in: [sdk/thegraph/src/thegraph.ts:15](https://github.com/settlemint/sdk/blob/f376778a94312b023c8be79105ccd5c9be24df15/sdk/thegraph/src/thegraph.ts#L15)

Schema for validating client options for the Portal client.

## Functions

### createTheGraphClient()

> **createTheGraphClient**\<`Setup`\>(`options`, `clientOptions`?): `object`

Defined in: [sdk/thegraph/src/thegraph.ts:62](https://github.com/settlemint/sdk/blob/f376778a94312b023c8be79105ccd5c9be24df15/sdk/thegraph/src/thegraph.ts#L62)

Creates a Portal client using URQL

#### Type Parameters

| Type Parameter |
| ------ |
| `Setup` *extends* `AbstractSetupSchema` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | `Omit`\<\{ `accessToken`: `string`; `instances`: `string`[]; `runtime`: `"server"`; `subgraphName`: `string`; \} \| \{ `runtime`: `"browser"`; `subgraphName`: `string`; \}, `"runtime"`\> & `Record`\<`string`, `unknown`\> | The client options for configuring the Portal client. |
| `clientOptions`? | `RequestConfig` | Optional configuration for the URQL client. |

#### Returns

`object`

An object containing the URQL client and the initialized graphql function.

##### client

> **client**: `GraphQLClient`

##### graphql

> **graphql**: `initGraphQLTada`\<`Setup`\>

#### Throws

Will throw an error if the options fail validation.

## Type Aliases

### ClientOptions

> **ClientOptions**: `z.infer`\<*typeof* [`ClientOptionsSchema`](REFERENCE.md#clientoptionsschema)\>

Defined in: [sdk/thegraph/src/thegraph.ts:31](https://github.com/settlemint/sdk/blob/f376778a94312b023c8be79105ccd5c9be24df15/sdk/thegraph/src/thegraph.ts#L31)

Type definition for client options derived from the ClientOptionsSchema.

***

### RequestConfig

> **RequestConfig**: `ConstructorParameters`\<*typeof* `GraphQLClient`\>\[`1`\]

Defined in: [sdk/thegraph/src/thegraph.ts:10](https://github.com/settlemint/sdk/blob/f376778a94312b023c8be79105ccd5c9be24df15/sdk/thegraph/src/thegraph.ts#L10)

Options for configuring the URQL client, excluding 'url' and 'exchanges'.

## Contributing

We welcome contributions from the community! Please check out our [Contributing](../../.github/CONTRIBUTING.md) guide to learn how you can help improve the SettleMint SDK through bug reports, feature requests, documentation updates, or code contributions.

## License

The SettleMint SDK is released under the [FSL Software License](https://fsl.software). See the [LICENSE](LICENSE) file for more details.
