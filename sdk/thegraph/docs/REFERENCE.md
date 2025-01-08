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
