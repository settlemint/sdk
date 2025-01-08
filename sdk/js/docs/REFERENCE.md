## :toolbox: Functions

- [createSettleMintClient](#gear-createsettlemintclient)

### :gear: createSettleMintClient

Creates a SettleMint client with the provided options. The client provides methods to interact with
various SettleMint resources like workspaces, applications, blockchain networks, blockchain nodes, middleware,
integration tools, storage, private keys, insights and custom deployments.

| Function | Type |
| ---------- | ---------- |
| `createSettleMintClient` | `(options: { [x: string]: any; accessToken?: unknown; instance?: unknown; }) => SettlemintClient` |

Parameters:

* `options`: - Configuration options for the client including access token and instance URL


Examples:

const client = createSettleMintClient({
  accessToken: 'btp_aat_xxxxxxxxxxxxxxxxxxxxxxxx',
  instance: 'https://console.settlemint.com'
});

// List all workspaces
const workspaces = await client.workspace.list();

// Read a specific blockchain network
const network = await client.blockchainNetwork.read('network-unique-name');




## :tropical_drink: Interfaces

- [SettlemintClient](#gear-settlemintclient)

### :gear: SettlemintClient



| Property | Type | Description |
| ---------- | ---------- | ---------- |
| `workspace` | `{ list: () => Promise<ResultOf<any>[]>; read: (workspaceUniqueName: string) => Promise<ResultOf<any>>; create: (args: VariablesOf<any>) => Promise<ResultOf<any>>; delete: (workspaceUniqueName: string) => Promise<...>; addCredits: (workspaceId: Id, amount: number) => Promise<...>; }` |  |
| `application` | `{ list: (workspaceUniqueName: string) => Promise<ResultOf<any>[]>; read: (applicationUniqueName: string) => Promise<ResultOf<any>>; create: (args: CreateApplicationArgs) => Promise<...>; delete: (applicationId: Id) => Promise<...>; }` |  |
| `blockchainNetwork` | `{ list: (applicationUniqueName: string) => Promise<ResultOf<any>[]>; read: (blockchainNetworkUniqueName: string) => Promise<ResultOf<any>>; create: (args: CreateBlockchainNetworkArgs) => Promise<...>; delete: (networkUniqueName: string) => Promise<...>; restart: (networkUniqueName: string) => Promise<...>; }` |  |
| `blockchainNode` | `{ list: (applicationUniqueName: string) => Promise<ResultOf<any>[]>; read: (blockchainNodeUniqueName: string) => Promise<ResultOf<any>>; create: (args: CreateBlockchainNodeArgs) => Promise<...>; restart: (nodeUniqueName: string) => Promise<...>; }` |  |
| `middleware` | `{ list: (applicationUniqueName: string) => Promise<ResultOf<any>[]>; read: (middlewareUniqueName: string) => Promise<ResultOf<any>>; create: (args: CreateMiddlewareArgs) => Promise<...>; restart: (middlewareUniqueName: string) => Promise<...>; }` |  |
| `integrationTool` | `{ list: (applicationUniqueName: string) => Promise<ResultOf<any>[]>; read: (integrationToolUniqueName: string) => Promise<ResultOf<any>>; create: (args: CreateIntegrationToolArgs) => Promise<...>; restart: (integrationToolUniqueName: string) => Promise<...>; }` |  |
| `storage` | `{ list: (applicationUniqueName: string) => Promise<ResultOf<any>[]>; read: (storageUniqueName: string) => Promise<ResultOf<any>>; create: (args: CreateStorageArgs) => Promise<...>; restart: (storageUniqueName: string) => Promise<...>; }` |  |
| `privateKey` | `{ list: (applicationUniqueName: string) => Promise<ResultOf<any>[]>; read: (privateKeyUniqueName: string) => Promise<ResultOf<any>>; create: (args: CreatePrivateKeyArgs) => Promise<...>; restart: (privateKeyUniqueName: string) => Promise<...>; }` |  |
| `insights` | `{ list: (applicationUniqueName: string) => Promise<ResultOf<any>[]>; read: (insightsUniqueName: string) => Promise<ResultOf<any>>; create: (args: CreateInsightsArgs) => Promise<...>; restart: (insightsUniqueName: string) => Promise<...>; }` |  |
| `customDeployment` | `{ list: (applicationUniqueName: string) => Promise<ResultOf<any>[]>; read: (customDeploymentUniqueName: string) => Promise<ResultOf<any>>; create: (args: CreateCustomDeploymentArgs) => Promise<...>; update: (customDeploymentUniqueName: string, imageTag: string) => Promise<...>; restart: (customDeploymentUniqueName: ...` |  |
| `foundry` | `{ env: (blockchainNodeUniqueName: string) => Promise<Record<string, string>>; }` |  |
| `applicationAccessToken` | `{ create: (args: CreateApplicationAccessTokenArgs) => Promise<string>; }` |  |

