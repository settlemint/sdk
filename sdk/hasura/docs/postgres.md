## Functions

### createPostgresPool()

> **createPostgresPool**(`databaseUrl`): `Pool`

Defined in: [sdk/hasura/src/postgres.ts:63](https://github.com/settlemint/sdk/blob/f376778a94312b023c8be79105ccd5c9be24df15/sdk/hasura/src/postgres.ts#L63)

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
