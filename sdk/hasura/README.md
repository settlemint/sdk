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
    - [createHasuraMetadataClient()](#createhasurametadataclient)
    - [createPostgresPool()](#createpostgrespool)
    - [trackAllTables()](#trackalltables)
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

Defined in: [sdk/hasura/src/hasura.ts:83](https://github.com/settlemint/sdk/blob/v2.5.13/sdk/hasura/src/hasura.ts#L83)

Creates a Hasura GraphQL client with proper type safety using gql.tada

##### Type Parameters

| Type Parameter |
| ------ |
| `Setup` *extends* `AbstractSetupSchema` |

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | \{ `accessToken?`: `string`; `adminSecret`: `string`; `cache?`: `"default"` \| `"force-cache"` \| `"no-cache"` \| `"no-store"` \| `"only-if-cached"` \| `"reload"`; `instance`: `string`; \} | Configuration options for the client |
| `options.accessToken?` | `string` | - |
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
| `client` | `GraphQLClient` | [sdk/hasura/src/hasura.ts:88](https://github.com/settlemint/sdk/blob/v2.5.13/sdk/hasura/src/hasura.ts#L88) |
| `graphql` | `initGraphQLTada`\<`Setup`\> | [sdk/hasura/src/hasura.ts:89](https://github.com/settlemint/sdk/blob/v2.5.13/sdk/hasura/src/hasura.ts#L89) |

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

#### createHasuraMetadataClient()

> **createHasuraMetadataClient**(`options`, `logger?`): \<`T`\>(`query`) => `Promise`\<\{ `data`: `T`; `ok`: `boolean`; \}\>

Defined in: [sdk/hasura/src/hasura.ts:132](https://github.com/settlemint/sdk/blob/v2.5.13/sdk/hasura/src/hasura.ts#L132)

Creates a Hasura Metadata client

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | \{ `accessToken?`: `string`; `adminSecret`: `string`; `cache?`: `"default"` \| `"force-cache"` \| `"no-cache"` \| `"no-store"` \| `"only-if-cached"` \| `"reload"`; `instance`: `string`; \} | Configuration options for the client |
| `options.accessToken?` | `string` | - |
| `options.adminSecret?` | `string` | - |
| `options.cache?` | `"default"` \| `"force-cache"` \| `"no-cache"` \| `"no-store"` \| `"only-if-cached"` \| `"reload"` | - |
| `options.instance?` | `string` | - |
| `logger?` | `Logger` | Optional logger to use for logging the requests |

##### Returns

A function that can be used to make requests to the Hasura Metadata API

> \<`T`\>(`query`): `Promise`\<\{ `data`: `T`; `ok`: `boolean`; \}\>

###### Type Parameters

| Type Parameter |
| ------ |
| `T` |

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `query` | `object` |

###### Returns

`Promise`\<\{ `data`: `T`; `ok`: `boolean`; \}\>

##### Throws

Will throw an error if the options fail validation against ClientOptionsSchema

##### Example

```ts
import { createHasuraMetadataClient } from '@settlemint/sdk-hasura';

const client = createHasuraMetadataClient({
  instance: process.env.SETTLEMINT_HASURA_ENDPOINT,
  accessToken: process.env.SETTLEMINT_ACCESS_TOKEN,
  adminSecret: process.env.SETTLEMINT_HASURA_ADMIN_SECRET,
});

const result = await client({
  type: "pg_get_source_tables",
  args: {
    source: "default",
  },
});
```

***

#### createPostgresPool()

> **createPostgresPool**(`databaseUrl`): `Pool`

Defined in: [sdk/hasura/src/postgres.ts:107](https://github.com/settlemint/sdk/blob/v2.5.13/sdk/hasura/src/postgres.ts#L107)

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

***

#### trackAllTables()

> **trackAllTables**(`databaseName`, `client`, `tableOptions`): `Promise`\<\{ `messages`: `string`[]; `result`: `"success"` \| `"no-tables"`; \}\>

Defined in: [sdk/hasura/src/utils/track-all-tables.ts:30](https://github.com/settlemint/sdk/blob/v2.5.13/sdk/hasura/src/utils/track-all-tables.ts#L30)

Track all tables in a database

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `databaseName` | `string` | The name of the database to track tables for |
| `client` | \<`T`\>(`query`) => `Promise`\<\{ `data`: `T`; `ok`: `boolean`; \}\> | The client options to use for the Hasura client |
| `tableOptions` | \{ `excludeSchemas?`: `string`[]; `includeSchemas?`: `string`[]; \} | The options to use for the table tracking |
| `tableOptions.excludeSchemas?` | `string`[] | The schemas to exclude from the tracking |
| `tableOptions.includeSchemas?` | `string`[] | The schemas to include in the tracking |

##### Returns

`Promise`\<\{ `messages`: `string`[]; `result`: `"success"` \| `"no-tables"`; \}\>

A promise that resolves to an object with a result property indicating success or failure

##### Example

```ts
import { trackAllTables } from "@settlemint/sdk-hasura/utils/track-all-tables";

const client = createHasuraMetadataClient({
  instance: "http://localhost:8080",
  accessToken: "test",
  adminSecret: "test",
});

const result = await trackAllTables("default", client, {
  excludeSchemas: ["drizzle"],
});
if (result.result === "success") {
  console.log("Tables tracked successfully");
} else {
  console.error("Failed to track tables");
}
```

### Type Aliases

#### ClientOptions

> **ClientOptions** = `object`

Defined in: [sdk/hasura/src/hasura.ts:28](https://github.com/settlemint/sdk/blob/v2.5.13/sdk/hasura/src/hasura.ts#L28)

Type definition for client options derived from the ClientOptionsSchema.

##### Type declaration

| Name | Type | Default value | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="accesstoken"></a> `accessToken?` | `string` | - | [sdk/hasura/src/hasura.ts:20](https://github.com/settlemint/sdk/blob/v2.5.13/sdk/hasura/src/hasura.ts#L20) |
| <a id="adminsecret"></a> `adminSecret` | `string` | - | [sdk/hasura/src/hasura.ts:21](https://github.com/settlemint/sdk/blob/v2.5.13/sdk/hasura/src/hasura.ts#L21) |
| <a id="cache"></a> `cache?` | `"default"` \| `"force-cache"` \| `"no-cache"` \| `"no-store"` \| `"only-if-cached"` \| `"reload"` | - | [sdk/hasura/src/hasura.ts:22](https://github.com/settlemint/sdk/blob/v2.5.13/sdk/hasura/src/hasura.ts#L22) |
| <a id="instance"></a> `instance` | `string` | `UrlOrPathSchema` | [sdk/hasura/src/hasura.ts:19](https://github.com/settlemint/sdk/blob/v2.5.13/sdk/hasura/src/hasura.ts#L19) |

***

#### RequestConfig

> **RequestConfig** = `ConstructorParameters`\<*typeof* `GraphQLClient`\>\[`1`\]

Defined in: [sdk/hasura/src/hasura.ts:13](https://github.com/settlemint/sdk/blob/v2.5.13/sdk/hasura/src/hasura.ts#L13)

Type definition for GraphQL client configuration options

### Variables

#### ClientOptionsSchema

> `const` **ClientOptionsSchema**: `ZodObject`\<[`ClientOptions`](#clientoptions)\>

Defined in: [sdk/hasura/src/hasura.ts:18](https://github.com/settlemint/sdk/blob/v2.5.13/sdk/hasura/src/hasura.ts#L18)

Schema for validating client options for the Hasura client.

## Contributing

We welcome contributions from the community! Please check out our [Contributing](https://github.com/settlemint/sdk/blob/main/.github/CONTRIBUTING.md) guide to learn how you can help improve the SettleMint SDK through bug reports, feature requests, documentation updates, or code contributions.

## License

The SettleMint SDK is released under the [FSL Software License](https://fsl.software). See the [LICENSE](https://github.com/settlemint/sdk/blob/main/LICENSE) file for more details.
