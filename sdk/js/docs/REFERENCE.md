The SettleMint JavaScript SDK  provides access to various resources. Here's an overview of the available methods:

### Workspace

- `workspace.list()`: List all workspaces and their applications
- `workspace.read(workspaceId)`: Read a specific workspace and its applications

### Blockchain Network

- `blockchainNetwork.list(applicationId)`: List blockchain networks for a given application
- `blockchainNetwork.read(blockchainNetworkId)`: Read a specific blockchain network

### Blockchain Node

- `blockchainNode.list(applicationId)`: List blockchain nodes for a given application
- `blockchainNode.read(blockchainNodeId)`: Read a specific blockchain node

### Middleware

- `middleware.list(applicationId)`: List middlewares for a given application
- `middleware.read(middlewareId)`: Read a specific middleware

### Integration Tool

- `integrationTool.list(applicationId)`: List integration tools for a given application
- `integrationTool.read(integrationId)`: Read a specific integration tool

### Storage

- `storage.list(applicationId)`: List storage items for a given application
- `storage.read(storageId)`: Read a specific storage item

### Private Key

- `privateKey.list(applicationId)`: List private keys for a given application
- `privateKey.read(privateKeyId)`: Read a specific private key

### Insights

- `insights.list(applicationId)`: List insights for a given application
- `insights.read(insightsId)`: Read a specific insight

### Examples

Here are some examples of how to use the SettleMint SDK:

#### List Workspaces

```javascript
const client = createSettleMintClient({
  accessToken: 'your_access_token',
  instance: 'https://console.settlemint.com'
});

const workspaces = await client.workspace.list();
console.log(workspaces);
```

#### Read a Specific Blockchain Network

```javascript
const client = createSettleMintClient({
  accessToken: 'your_access_token',
  instance: 'https://console.settlemint.com'
});

const networkId = 'your_network_id';
const network = await client.blockchainNetwork.read(networkId);
console.log(network);
```

