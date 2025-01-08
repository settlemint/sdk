## Functions

### createSettleMintClient()

> **createSettleMintClient**(`options`): `SettlemintClient`

Defined in: [sdk/js/src/settlemint.ts:188](https://github.com/settlemint/sdk/blob/b706ce6837337ccab38d338e9a3545ff7aa7abb6/sdk/js/src/settlemint.ts#L188)

Creates a SettleMint client with the provided options. The client provides methods to interact with
various SettleMint resources like workspaces, applications, blockchain networks, blockchain nodes, middleware,
integration tools, storage, private keys, insights and custom deployments.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | \{ `accessToken`: `string`; `instance`: `string`; \} | Configuration options for the client including access token and instance URL |
| `options.accessToken` | `string` | - |
| `options.instance` | `string` | - |

#### Returns

`SettlemintClient`

A SettleMint client object with resource-specific methods

#### Throws

If options are invalid or if called in browser environment

#### Throws

If provided options fail schema validation

#### Example

```ts
const client = createSettleMintClient({
  accessToken: 'btp_aat_xxxxxxxxxxxxxxxxxxxxxxxx',
  instance: 'https://console.settlemint.com'
});

// List all workspaces
const workspaces = await client.workspace.list();

// Read a specific blockchain network
const network = await client.blockchainNetwork.read('network-unique-name');
```

## Type Aliases

### Application

> **Application**: `ResultOf`\<*typeof* `ApplicationFragment`\>

Defined in: [sdk/js/src/graphql/application.ts:23](https://github.com/settlemint/sdk/blob/b706ce6837337ccab38d338e9a3545ff7aa7abb6/sdk/js/src/graphql/application.ts#L23)

Type representing an application entity.

***

### BlockchainNetwork

> **BlockchainNetwork**: `ResultOf`\<*typeof* `BlockchainNetworkFragment`\>

Defined in: [sdk/js/src/graphql/blockchain-network.ts:29](https://github.com/settlemint/sdk/blob/b706ce6837337ccab38d338e9a3545ff7aa7abb6/sdk/js/src/graphql/blockchain-network.ts#L29)

Type representing a blockchain network entity.

***

### BlockchainNode

> **BlockchainNode**: `ResultOf`\<*typeof* `BlockchainNodeFragment`\>

Defined in: [sdk/js/src/graphql/blockchain-node.ts:48](https://github.com/settlemint/sdk/blob/b706ce6837337ccab38d338e9a3545ff7aa7abb6/sdk/js/src/graphql/blockchain-node.ts#L48)

Type representing a blockchain node entity.

***

### CustomDeployment

> **CustomDeployment**: `ResultOf`\<*typeof* `CustomDeploymentFragment`\>

Defined in: [sdk/js/src/graphql/custom-deployment.ts:30](https://github.com/settlemint/sdk/blob/b706ce6837337ccab38d338e9a3545ff7aa7abb6/sdk/js/src/graphql/custom-deployment.ts#L30)

Type representing a custom deployment entity.

***

### Insights

> **Insights**: `ResultOf`\<*typeof* `InsightsFragment`\>

Defined in: [sdk/js/src/graphql/insights.ts:34](https://github.com/settlemint/sdk/blob/b706ce6837337ccab38d338e9a3545ff7aa7abb6/sdk/js/src/graphql/insights.ts#L34)

Type representing an insights entity.

***

### IntegrationTool

> **IntegrationTool**: `ResultOf`\<*typeof* `IntegrationFragment`\>

Defined in: [sdk/js/src/graphql/integration-tool.ts:32](https://github.com/settlemint/sdk/blob/b706ce6837337ccab38d338e9a3545ff7aa7abb6/sdk/js/src/graphql/integration-tool.ts#L32)

Type representing an integration tool entity.

***

### Middleware

> **Middleware**: `ResultOf`\<*typeof* `MiddlewareFragment`\>

Defined in: [sdk/js/src/graphql/middleware.ts:47](https://github.com/settlemint/sdk/blob/b706ce6837337ccab38d338e9a3545ff7aa7abb6/sdk/js/src/graphql/middleware.ts#L47)

Type representing a middleware entity.

***

### PrivateKey

> **PrivateKey**: `ResultOf`\<*typeof* `PrivateKeyFragment`\>

Defined in: [sdk/js/src/graphql/private-key.ts:23](https://github.com/settlemint/sdk/blob/b706ce6837337ccab38d338e9a3545ff7aa7abb6/sdk/js/src/graphql/private-key.ts#L23)

Type representing a private key entity.

***

### Storage

> **Storage**: `ResultOf`\<*typeof* `StorageFragment`\>

Defined in: [sdk/js/src/graphql/storage.ts:32](https://github.com/settlemint/sdk/blob/b706ce6837337ccab38d338e9a3545ff7aa7abb6/sdk/js/src/graphql/storage.ts#L32)

Type representing a storage entity.

***

### Workspace

> **Workspace**: `ResultOf`\<*typeof* `WorkspaceFragment`\>

Defined in: [sdk/js/src/graphql/workspace.ts:26](https://github.com/settlemint/sdk/blob/b706ce6837337ccab38d338e9a3545ff7aa7abb6/sdk/js/src/graphql/workspace.ts#L26)

Type representing a workspace entity.
