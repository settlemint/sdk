## Variables

### ClientOptionsSchema

> `const` **ClientOptionsSchema**: `ZodDiscriminatedUnion`\<`"runtime"`, \[`ZodObject`\<\{ `accessToken`: `ZodString`; `adminSecret`: `ZodString`; `instance`: `ZodUnion`\<\[`ZodString`, `ZodString`\]\>; `runtime`: `ZodLiteral`\<`"server"`\>; \}, `"strip"`, \{ `accessToken`: `string`; `adminSecret`: `string`; `instance`: `string`; `runtime`: `"server"`; \}, \{ `accessToken`: `string`; `adminSecret`: `string`; `instance`: `string`; `runtime`: `"server"`; \}\>, `ZodObject`\<\{ `runtime`: `ZodLiteral`\<`"browser"`\>; \}, `"strip"`, \{ `runtime`: `"browser"`; \}, \{ `runtime`: `"browser"`; \}\>\]\>

Defined in: [sdk/hasura/src/hasura.ts:15](https://github.com/settlemint/sdk/blob/f376778a94312b023c8be79105ccd5c9be24df15/sdk/hasura/src/hasura.ts#L15)

Schema for validating client options for the Portal client.

## Functions

### createHasuraClient()

> **createHasuraClient**\<`Setup`\>(`options`, `clientOptions`?): `object`

Defined in: [sdk/hasura/src/hasura.ts:53](https://github.com/settlemint/sdk/blob/f376778a94312b023c8be79105ccd5c9be24df15/sdk/hasura/src/hasura.ts#L53)

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

##### client

> **client**: `GraphQLClient`

##### graphql

> **graphql**: `initGraphQLTada`\<`Setup`\>

#### Throws

Will throw an error if the options fail validation.

## Type Aliases

### ClientOptions

> **ClientOptions**: `z.infer`\<*typeof* [`ClientOptionsSchema`](hasura.md#clientoptionsschema)\>

Defined in: [sdk/hasura/src/hasura.ts:30](https://github.com/settlemint/sdk/blob/f376778a94312b023c8be79105ccd5c9be24df15/sdk/hasura/src/hasura.ts#L30)

Type definition for client options derived from the ClientOptionsSchema.

***

### RequestConfig

> **RequestConfig**: `ConstructorParameters`\<*typeof* `GraphQLClient`\>\[`1`\]

Defined in: [sdk/hasura/src/hasura.ts:10](https://github.com/settlemint/sdk/blob/f376778a94312b023c8be79105ccd5c9be24df15/sdk/hasura/src/hasura.ts#L10)

Options for configuring the URQL client, excluding 'url' and 'exchanges'.
