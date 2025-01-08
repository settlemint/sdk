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
<a href="https://fsl.software" rel="nofollow"><img src="https://img.shields.io/npm/l/@settlemint/sdk-hasura" alt="License"></a>
<a href="https://www.npmjs.com/package/@settlemint/sdk-hasura" rel="nofollow"><img src="https://img.shields.io/npm/dw/@settlemint/sdk-hasura" alt="npm"></a>
<a href="https://github.com/settlemint/sdk" rel="nofollow"><img src="https://img.shields.io/github/stars/settlemint/sdk" alt="stars"></a>
</p>

<div align="center">
  <a href="https://console.settlemint.com/documentation/">Documentation</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://discord.com/invite/Mt5yqFrey9">Discord</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://www.npmjs.com/package/@settlemint/sdk-hasura">NPM</a>
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

The SettleMint Hasura SDK provides a seamless way to interact with Hasura GraphQL APIs for managing application data. It enables you to easily query and mutate data stored in your SettleMint-powered PostgreSQL databases through a type-safe GraphQL interface.

For detailed information about using Hasura with the SettleMint platform, check out our [official documentation](https://console.settlemint.com/documentation/docs/using-platform/backend-as-a-service/).

## Usage

TODO: define default

## API Reference

## Variables

### ClientOptionsSchema

> `const` **ClientOptionsSchema**: `ZodDiscriminatedUnion`\<`"runtime"`, \[`ZodObject`\<\{ `accessToken`: `ZodString`; `adminSecret`: `ZodString`; `instance`: `ZodUnion`\<\[`ZodString`, `ZodString`\]\>; `runtime`: `ZodLiteral`\<`"server"`\>; \}, `"strip"`, \{ `accessToken`: `string`; `adminSecret`: `string`; `instance`: `string`; `runtime`: `"server"`; \}, \{ `accessToken`: `string`; `adminSecret`: `string`; `instance`: `string`; `runtime`: `"server"`; \}\>, `ZodObject`\<\{ `runtime`: `ZodLiteral`\<`"browser"`\>; \}, `"strip"`, \{ `runtime`: `"browser"`; \}, \{ `runtime`: `"browser"`; \}\>\]\>

Defined in: [sdk/hasura/src/hasura.ts:15](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/hasura/src/hasura.ts#L15)

Schema for validating client options for the Portal client.

## Functions

### createHasuraClient()

> **createHasuraClient**\<`Setup`\>(`options`, `clientOptions`?): `object`

Defined in: [sdk/hasura/src/hasura.ts:53](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/hasura/src/hasura.ts#L53)

Creates a Portal client using URQL

#### Type Parameters

| Type Parameter |
| ------ |
| `Setup` *extends* `AbstractSetupSchema` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | `Omit`\<\{ `accessToken`: `string`; `adminSecret`: `string`; `instance`: `string`; `runtime`: `"server"`; \} \| \{ `runtime`: `"browser"`; \}, `"runtime"`\> & `Record`\<`string`, `unknown`\> | The client options for configuring the Portal client. |
| `clientOptions`? | `RequestConfig` | Optional configuration for the URQL client. |

#### Returns

`object`

An object containing the URQL client and the initialized graphql function.

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `client` | `GraphQLClient` | [sdk/hasura/src/hasura.ts:57](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/hasura/src/hasura.ts#L57) |
| `graphql` | `initGraphQLTada`\<`Setup`\> | [sdk/hasura/src/hasura.ts:58](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/hasura/src/hasura.ts#L58) |

#### Throws

Will throw an error if the options fail validation.

***

### createPostgresPool()

> **createPostgresPool**(`databaseUrl`): `Pool`

Defined in: [sdk/hasura/src/postgres.ts:63](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/hasura/src/postgres.ts#L63)

Creates a Drizzle client for database operations with schema typings

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `databaseUrl` | `string` | The PostgreSQL connection URL |

#### Returns

`Pool`

The initialized Drizzle client with proper schema typings

#### Throws

If called from browser runtime or if validation fails

## Type Aliases

### ClientOptions

> **ClientOptions**: `z.infer`\<*typeof* [`ClientOptionsSchema`](README.md#clientoptionsschema)\>

Defined in: [sdk/hasura/src/hasura.ts:30](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/hasura/src/hasura.ts#L30)

Type definition for client options derived from the ClientOptionsSchema.

***

### RequestConfig

> **RequestConfig**: `ConstructorParameters`\<*typeof* `GraphQLClient`\>\[`1`\]

Defined in: [sdk/hasura/src/hasura.ts:10](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/hasura/src/hasura.ts#L10)

Options for configuring the URQL client, excluding 'url' and 'exchanges'.

## Contributing

We welcome contributions from the community! Please check out our [Contributing](../../.github/CONTRIBUTING.md) guide to learn how you can help improve the SettleMint SDK through bug reports, feature requests, documentation updates, or code contributions.

## License

The SettleMint SDK is released under the [FSL Software License](https://fsl.software). See the [LICENSE](LICENSE) file for more details.
