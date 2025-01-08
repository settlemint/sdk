## Functions

### createIpfsClient()

> **createIpfsClient**(`options`): `object`

Defined in: [sdk/ipfs/src/ipfs.ts:23](https://github.com/settlemint/sdk/blob/f376778a94312b023c8be79105ccd5c9be24df15/sdk/ipfs/src/ipfs.ts#L23)

Creates an IPFS client for client-side use.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | \{ `instance`: `string`; \} | The client options for configuring the IPFS client. |
| `options.instance` | `string` | - |

#### Returns

`object`

An object containing the IPFS client.

##### client

> **client**: `KuboRPCClient`

#### Throws

Will throw an error if the options fail validation.

#### Example

```ts
const { client } = createIpfsClient({
  instance: 'https://your-ipfs-instance.com',
});
```

***

### createServerIpfsClient()

> **createServerIpfsClient**(`options`): `object`

Defined in: [sdk/ipfs/src/ipfs.ts:46](https://github.com/settlemint/sdk/blob/f376778a94312b023c8be79105ccd5c9be24df15/sdk/ipfs/src/ipfs.ts#L46)

Creates an IPFS client for server-side use with additional authentication.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | \{ `accessToken`: `string`; `instance`: `string`; \} | The server client options for configuring the IPFS client. |
| `options.accessToken` | `string` | - |
| `options.instance` | `string` | - |

#### Returns

`object`

An object containing the authenticated IPFS client.

##### client

> **client**: `KuboRPCClient`

#### Throws

Will throw an error if not called on the server or if the options fail validation.

#### Example

```ts
const { client } = createServerIpfsClient({
  instance: 'https://your-ipfs-instance.com',
  accessToken: 'your-access-token',
});
```
