## Functions

### createPostgresPool()

> **createPostgresPool**(`databaseUrl`): `Pool`

Defined in: [sdk/hasura/src/postgres.ts:63](https://github.com/settlemint/sdk/blob/b706ce6837337ccab38d338e9a3545ff7aa7abb6/sdk/hasura/src/postgres.ts#L63)

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
