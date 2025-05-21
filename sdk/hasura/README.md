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
  <a href="https://console.settlemint.com/documentation">Documentation</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://www.npmjs.com/package/@settlemint/sdk-hasura">NPM</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://github.com/settlemint/sdk/issues">Issues</a>
  <br />
</div>

## Table of Contents

- [About](#about)
- [API Reference](#api-reference)
  - [Functions](#functions)
    - [createHasuraClient()](#createhasuraclient)
    - [createPostgresPool()](#createpostgrespool)
  - [Type Aliases](#type-aliases)
    - [ClientOptions](#clientoptions)
    - [RequestConfig](#requestconfig)
  - [Variables](#variables)
    - [ClientOptionsSchema](#clientoptionsschema)
- [Contributing](#contributing)
- [License](#license)

## About

The SettleMint Hasura SDK provides a seamless way to interact with Hasura GraphQL APIs for managing application data. It enables you to easily query and mutate data stored in your SettleMint-powered PostgreSQL databases through a type-safe GraphQL interface.

## API Reference

### Functions

#### createHasuraClient()

> **createHasuraClient**\<`Setup`\>(`options`, `clientOptions?`, `logger?`): `object`

Defined in: [sdk/hasura/src/hasura.ts:81](https://github.com/settlemint/sdk/blob/v2.3.1/sdk/hasura/src/hasura.ts#L81)

Creates a Hasura GraphQL client with proper type safety using gql.tada

##### Type Parameters

| Type Parameter |
| ------ |
| `Setup` *extends* `AbstractSetupSchema` |

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | \{ `accessToken`: `string`; `adminSecret`: `string`; `cache?`: `"default"` \| `"force-cache"` \| `"no-cache"` \| `"no-store"` \| `"only-if-cached"` \| `"reload"`; `instance`: `string`; \} | Configuration options for the client |
| `options.accessToken` | `string` | - |
| `options.adminSecret?` | `string` | - |
| `options.cache?` | `"default"` \| `"force-cache"` \| `"no-cache"` \| `"no-store"` \| `"only-if-cached"` \| `"reload"` | - |
| `options.instance?` | `string` | - |
| `clientOptions?` | `RequestConfig` | Optional GraphQL client configuration options |
| `logger?` | `Logger` | Optional logger to use for logging the requests |

##### Returns

`object`

An object containing:
         - client: The configured GraphQL client instance
         - graphql: The initialized gql.tada function for type-safe queries

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `client` | `GraphQLClient` | [sdk/hasura/src/hasura.ts:86](https://github.com/settlemint/sdk/blob/v2.3.1/sdk/hasura/src/hasura.ts#L86) |
| `graphql` | `initGraphQLTada`\<`Setup`\> | [sdk/hasura/src/hasura.ts:87](https://github.com/settlemint/sdk/blob/v2.3.1/sdk/hasura/src/hasura.ts#L87) |

##### Throws

Will throw an error if the options fail validation against ClientOptionsSchema

##### Example

```ts
import { createHasuraClient } from '@settlemint/sdk-hasura';
import type { introspection } from "@schemas/hasura-env";
import { createLogger, requestLogger } from "@settlemint/sdk-utils/logging";

const logger = createLogger();

const { client, graphql } = createHasuraClient<{
  introspection: introspection;
  disableMasking: true;
  scalars: {
    timestamp: string;
    timestampz: string;
    uuid: string;
    date: string;
    time: string;
    jsonb: string;
    numeric: string;
    interval: string;
    geometry: string;
    geography: string;
  };
}>({
  instance: process.env.SETTLEMINT_HASURA_ENDPOINT,
  accessToken: process.env.SETTLEMINT_ACCESS_TOKEN,
  adminSecret: process.env.SETTLEMINT_HASURA_ADMIN_SECRET,
}, {
  fetch: requestLogger(logger, "hasura", fetch) as typeof fetch,
});

// Making GraphQL queries
const query = graphql(`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`);

const result = await client.request(query);
```

***

#### createPostgresPool()

> **createPostgresPool**(`databaseUrl`): `Pool`

Defined in: [sdk/hasura/src/postgres.ts:83](https://github.com/settlemint/sdk/blob/v2.3.1/sdk/hasura/src/postgres.ts#L83)

Creates a PostgreSQL connection pool with error handling and retry mechanisms

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `databaseUrl` | `string` | The PostgreSQL connection URL |

##### Returns

`Pool`

A configured PostgreSQL connection pool

##### Throws

Will throw an error if called from browser runtime

##### Example

```ts
import { createPostgresPool } from '@settlemint/sdk-hasura';

const pool = createPostgresPool(process.env.SETTLEMINT_HASURA_DATABASE_URL);

// The pool will automatically handle connection errors and retries
const client = await pool.connect();
try {
  const result = await client.query('SELECT NOW()');
  console.log(result.rows[0]);
} finally {
  client.release();
}
```

### Type Aliases

#### ClientOptions

> **ClientOptions** = `z.infer`\<*typeof* [`ClientOptionsSchema`](#clientoptionsschema)\>

Defined in: [sdk/hasura/src/hasura.ts:26](https://github.com/settlemint/sdk/blob/v2.3.1/sdk/hasura/src/hasura.ts#L26)

Type definition for client options derived from the ClientOptionsSchema.

***

#### RequestConfig

> **RequestConfig** = `ConstructorParameters`\<*typeof* `GraphQLClient`\>\[`1`\]

Defined in: [sdk/hasura/src/hasura.ts:11](https://github.com/settlemint/sdk/blob/v2.3.1/sdk/hasura/src/hasura.ts#L11)

Type definition for GraphQL client configuration options

### Variables

#### ClientOptionsSchema

> `const` **ClientOptionsSchema**: `ZodObject`\<\{ `accessToken`: `ZodString`; `adminSecret`: `ZodString`; `cache`: `ZodOptional`\<`ZodEnum`\<\{ `default`: `"default"`; `force-cache`: `"force-cache"`; `no-cache`: `"no-cache"`; `no-store`: `"no-store"`; `only-if-cached`: `"only-if-cached"`; `reload`: `"reload"`; \}\>\>; `instance`: `ZodUnion`\<readonly \[`ZodString`, `ZodString`\]\>; \}, `$strip`\>

Defined in: [sdk/hasura/src/hasura.ts:16](https://github.com/settlemint/sdk/blob/v2.3.1/sdk/hasura/src/hasura.ts#L16)

Schema for validating client options for the Hasura client.

## Contributing

We welcome contributions from the community! Please check out our [Contributing](https://github.com/settlemint/sdk/blob/main/.github/CONTRIBUTING.md) guide to learn how you can help improve the SettleMint SDK through bug reports, feature requests, documentation updates, or code contributions.

## License

The SettleMint SDK is released under the [FSL Software License](https://fsl.software). See the [LICENSE](https://github.com/settlemint/sdk/blob/main/LICENSE) file for more details.
