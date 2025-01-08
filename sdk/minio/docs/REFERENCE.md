## Functions

### createServerMinioClient()

> **createServerMinioClient**(`options`): `object`

Defined in: [sdk/minio/src/minio.ts:28](https://github.com/settlemint/sdk/blob/f376778a94312b023c8be79105ccd5c9be24df15/sdk/minio/src/minio.ts#L28)

Creates a Portal client for server-side use with additional authentication.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | \{ `accessKey`: `string`; `accessToken`: `string`; `instance`: `string`; `secretKey`: `string`; \} | The server client options for configuring the Portal client. |
| `options.accessKey` | `string` | - |
| `options.accessToken` | `string` | - |
| `options.instance` | `string` | - |
| `options.secretKey` | `string` | - |

#### Returns

`object`

An object containing the GraphQL client and the initialized graphql function.

##### client

> **client**: `Client`

#### Throws

Will throw an error if not called on the server or if the options fail validation.

#### Example

```ts
const { client, graphql } = createServerPortalClient<{
  introspection: introspection;
  disableMasking: true;
  scalars: {
    DateTime: Date;
    JSON: Record<string, unknown>;
  };
}>({
  instance: 'https://your-portal-instance.com',
  accessToken: 'your-access-token',
  adminSecret: 'your-admin-secret',
});
```
