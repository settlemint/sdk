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
  <a href="https://console.settlemint.com/documentation/">Documentation</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://discord.com/invite/Mt5yqFrey9">Discord</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://www.npmjs.com/package/@settlemint/sdk-portal">NPM</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://github.com/settlemint/sdk/issues">Issues</a>
  <br />
</div>

## Table of Contents

- [About](#about)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)

## About

The SettleMint Smart Contract Portal SDK provides a seamless way to interact with the Smart Contract Portal Middleware API. It enables you to easily interact with your smart contracts using a REST or GraphQL API.

The SDK offers a type-safe interface for all Portal API operations, with comprehensive error handling and validation. It integrates smoothly with modern TypeScript applications while providing a simple and intuitive developer experience.

For detailed information about using the Smart Contract Portal Middleware, check out our [official documentation](https://console.settlemint.com/documentation/docs/using-platform/middleware/#the-smart-contract-portal-middleware).

## API Reference

### Functions

#### createPortalClient()

> **createPortalClient**\<`Setup`\>(`options`, `clientOptions`?): `object`

Defined in: [sdk/portal/src/portal.ts:52](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/portal/src/portal.ts#L52)

Creates a Portal client using URQL

##### Type Parameters

| Type Parameter |
| ------ |
| `Setup` *extends* `AbstractSetupSchema` |

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | `Omit`\<\{ `accessToken`: `string`; `instance`: `string`; `runtime`: `"server"`; \} \| \{ `runtime`: `"browser"`; \}, `"runtime"`\> & `Record`\<`string`, `unknown`\> | The client options for configuring the Portal client. |
| `clientOptions`? | `RequestConfig` | Optional configuration for the URQL client. |

##### Returns

`object`

An object containing the URQL client and the initialized graphql function.

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `client` | `GraphQLClient` | [sdk/portal/src/portal.ts:56](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/portal/src/portal.ts#L56) |
| `graphql` | `initGraphQLTada`\<`Setup`\> | [sdk/portal/src/portal.ts:57](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/portal/src/portal.ts#L57) |

##### Throws

Will throw an error if the options fail validation.

### Type Aliases

#### ClientOptions

> **ClientOptions**: `z.infer`\<*typeof* [`ClientOptionsSchema`](README.md#clientoptionsschema)\>

Defined in: [sdk/portal/src/portal.ts:29](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/portal/src/portal.ts#L29)

Type definition for client options derived from the ClientOptionsSchema.

***

#### RequestConfig

> **RequestConfig**: `ConstructorParameters`\<*typeof* `GraphQLClient`\>\[`1`\]

Defined in: [sdk/portal/src/portal.ts:10](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/portal/src/portal.ts#L10)

Options for configuring the URQL client, excluding 'url' and 'exchanges'.

### Variables

#### ClientOptionsSchema

> `const` **ClientOptionsSchema**: `ZodDiscriminatedUnion`\<`"runtime"`, \[`ZodObject`\<\{ `accessToken`: `ZodString`; `instance`: `ZodUnion`\<\[`ZodString`, `ZodString`\]\>; `runtime`: `ZodLiteral`\<`"server"`\>; \}, `"strip"`, \{ `accessToken`: `string`; `instance`: `string`; `runtime`: `"server"`; \}, \{ `accessToken`: `string`; `instance`: `string`; `runtime`: `"server"`; \}\>, `ZodObject`\<\{ `runtime`: `ZodLiteral`\<`"browser"`\>; \}, `"strip"`, \{ `runtime`: `"browser"`; \}, \{ `runtime`: `"browser"`; \}\>\]\>

Defined in: [sdk/portal/src/portal.ts:15](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/portal/src/portal.ts#L15)

Schema for validating client options for the Portal client.

## Contributing

We welcome contributions from the community! Please check out our [Contributing](../../.github/CONTRIBUTING.md) guide to learn how you can help improve the SettleMint SDK through bug reports, feature requests, documentation updates, or code contributions.

## License

The SettleMint SDK is released under the [FSL Software License](https://fsl.software). See the [LICENSE](LICENSE) file for more details.
