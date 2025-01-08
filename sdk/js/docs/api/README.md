**@settlemint/sdk-js**

***

## :toolbox: Functions

- [applicationAccessTokenCreate](#gear-applicationaccesstokencreate)
- [workspaceList](#gear-workspacelist)
- [workspaceRead](#gear-workspaceread)
- [workspaceCreate](#gear-workspacecreate)
- [workspaceDelete](#gear-workspacedelete)
- [workspaceAddCredits](#gear-workspaceaddcredits)
- [applicationList](#gear-applicationlist)
- [applicationRead](#gear-applicationread)
- [applicationCreate](#gear-applicationcreate)
- [applicationDelete](#gear-applicationdelete)
- [blockchainNetworkList](#gear-blockchainnetworklist)
- [blockchainNetworkRead](#gear-blockchainnetworkread)
- [blockchainNetworkCreate](#gear-blockchainnetworkcreate)
- [blockchainNetworkDelete](#gear-blockchainnetworkdelete)
- [blockchainNetworkRestart](#gear-blockchainnetworkrestart)
- [blockchainNodeList](#gear-blockchainnodelist)
- [blockchainNodeRead](#gear-blockchainnoderead)
- [blockchainNodeCreate](#gear-blockchainnodecreate)
- [blockchainNodeRestart](#gear-blockchainnoderestart)
- [customdeploymentList](#gear-customdeploymentlist)
- [customdeploymentRead](#gear-customdeploymentread)
- [customdeploymentUpdate](#gear-customdeploymentupdate)
- [customdeploymentCreate](#gear-customdeploymentcreate)
- [customDeploymentRestart](#gear-customdeploymentrestart)
- [getEnv](#gear-getenv)
- [insightsList](#gear-insightslist)
- [insightsRead](#gear-insightsread)
- [insightsCreate](#gear-insightscreate)
- [insightsRestart](#gear-insightsrestart)
- [integrationToolList](#gear-integrationtoollist)
- [integrationToolRead](#gear-integrationtoolread)
- [integrationToolCreate](#gear-integrationtoolcreate)
- [integrationToolRestart](#gear-integrationtoolrestart)
- [loadBalancerRead](#gear-loadbalancerread)
- [storageList](#gear-storagelist)
- [storageRead](#gear-storageread)
- [storageCreate](#gear-storagecreate)
- [storageRestart](#gear-storagerestart)
- [middlewareList](#gear-middlewarelist)
- [middlewareRead](#gear-middlewareread)
- [middlewareCreate](#gear-middlewarecreate)
- [middlewareRestart](#gear-middlewarerestart)
- [privateKeyList](#gear-privatekeylist)
- [privatekeyRead](#gear-privatekeyread)
- [privateKeyCreate](#gear-privatekeycreate)
- [privateKeyRestart](#gear-privatekeyrestart)
- [createSettleMintClient](#gear-createsettlemintclient)

### :gear: applicationAccessTokenCreate

Creates a new application.

| Function | Type |
| ---------- | ---------- |
| `applicationAccessTokenCreate` | `(gqlClient: GraphQLClient, options: ClientOptions) => (args: CreateApplicationAccessTokenArgs) => Promise<string>` |

Parameters:

* `gqlClient`: - The GraphQL client instance used to execute the mutation.
* `options`: - Configuration options for the client.

### :gear: workspaceList

Creates a function to list all workspaces and their applications.

| Function | Type |
| ---------- | ---------- |
| `workspaceList` | `(gqlClient: GraphQLClient, options: ClientOptions) => () => Promise<ResultOf<any>[]>` |

Parameters:

* `gqlClient`: - The GraphQL client instance
* `options`: - Client configuration options

### :gear: workspaceRead

Creates a function to read a specific workspace by unique name.

| Function | Type |
| ---------- | ---------- |
| `workspaceRead` | `(gqlClient: GraphQLClient, options: ClientOptions) => (workspaceUniqueName: string) => Promise<ResultOf<any>>` |

Parameters:

* `gqlClient`: - The GraphQL client instance
* `options`: - Client configuration options

### :gear: workspaceCreate

Creates a function to create a new workspace.

| Function | Type |
| ---------- | ---------- |
| `workspaceCreate` | `(gqlClient: GraphQLClient, options: ClientOptions) => (createWorkspaceArgs: VariablesOf<any>) => Promise<any>` |

Parameters:

* `gqlClient`: - The GraphQL client instance
* `options`: - Client configuration options

### :gear: workspaceDelete

Creates a function to delete a workspace.

| Function | Type |
| ---------- | ---------- |
| `workspaceDelete` | `(gqlClient: GraphQLClient, options: ClientOptions) => (workspaceUniqueName: string) => Promise<any>` |

Parameters:

* `gqlClient`: - The GraphQL client instance
* `options`: - Client configuration options

### :gear: workspaceAddCredits

Creates a function to add credits to a workspace.

| Function | Type |
| ---------- | ---------- |
| `workspaceAddCredits` | `(gqlClient: GraphQLClient, options: ClientOptions) => (workspaceId: Id, amount: number) => Promise<any>` |

Parameters:

* `gqlClient`: - The GraphQL client instance
* `options`: - Client configuration options

### :gear: applicationList

Creates a function to list applications in a workspace.

| Function | Type |
| ---------- | ---------- |
| `applicationList` | `(gqlClient: GraphQLClient, options: ClientOptions) => (workspaceUniqueName: string) => Promise<ResultOf<any>[]>` |

Parameters:

* `gqlClient`: - The GraphQL client instance
* `options`: - Client configuration options

### :gear: applicationRead

Creates a function to fetch a specific application.

| Function | Type |
| ---------- | ---------- |
| `applicationRead` | `(gqlClient: GraphQLClient, options: ClientOptions) => (applicationUniqueName: string) => Promise<ResultOf<any>>` |

Parameters:

* `gqlClient`: - The GraphQL client instance
* `options`: - Client configuration options

### :gear: applicationCreate

Creates a function to create a new application.

| Function | Type |
| ---------- | ---------- |
| `applicationCreate` | `(gqlClient: GraphQLClient, options: ClientOptions) => (args: CreateApplicationArgs) => Promise<ResultOf<any>>` |

Parameters:

* `gqlClient`: - The GraphQL client instance
* `options`: - Client configuration options

### :gear: applicationDelete

Creates a function to delete an application.

| Function | Type |
| ---------- | ---------- |
| `applicationDelete` | `(gqlClient: GraphQLClient, options: ClientOptions) => (applicationUniqueName: string) => Promise<ResultOf<any>>` |

Parameters:

* `gqlClient`: - The GraphQL client instance
* `options`: - Client configuration options

### :gear: blockchainNetworkList

Creates a function to list blockchain networks for a given application.

| Function | Type |
| ---------- | ---------- |
| `blockchainNetworkList` | `(gqlClient: GraphQLClient, options: ClientOptions) => (applicationUniqueName: string) => Promise<any>` |

Parameters:

* `gqlClient`: - The GraphQL client instance
* `options`: - Client configuration options

### :gear: blockchainNetworkRead

Creates a function to fetch a specific blockchain network.

| Function | Type |
| ---------- | ---------- |
| `blockchainNetworkRead` | `(gqlClient: GraphQLClient, options: ClientOptions) => (blockchainNetworkUniqueName: string) => Promise<any>` |

Parameters:

* `gqlClient`: - The GraphQL client instance
* `options`: - Client configuration options

### :gear: blockchainNetworkCreate

Creates a function to create a new blockchain network.

| Function | Type |
| ---------- | ---------- |
| `blockchainNetworkCreate` | `(gqlClient: GraphQLClient, options: ClientOptions) => (args: CreateBlockchainNetworkArgs) => Promise<ResultOf<any>>` |

Parameters:

* `gqlClient`: - The GraphQL client instance
* `options`: - Client configuration options

### :gear: blockchainNetworkDelete

Creates a function to delete a blockchain network.

| Function | Type |
| ---------- | ---------- |
| `blockchainNetworkDelete` | `(gqlClient: GraphQLClient, options: ClientOptions) => (blockchainNetworkUniqueName: string) => Promise<any>` |

Parameters:

* `gqlClient`: - The GraphQL client instance
* `options`: - Client configuration options

### :gear: blockchainNetworkRestart

Creates a function to restart a blockchain network.

| Function | Type |
| ---------- | ---------- |
| `blockchainNetworkRestart` | `(gqlClient: GraphQLClient, _options: ClientOptions) => (blockchainNetworkUniqueName: string) => Promise<ResultOf<any>>` |

Parameters:

* `gqlClient`: - The GraphQL client instance
* `_options`: - Client configuration options

### :gear: blockchainNodeList

Creates a function to list blockchain nodes for an application.

| Function | Type |
| ---------- | ---------- |
| `blockchainNodeList` | `(gqlClient: GraphQLClient, options: ClientOptions) => (applicationUniqueName: string) => Promise<any>` |

Parameters:

* `gqlClient`: - The GraphQL client instance
* `options`: - Client configuration options

### :gear: blockchainNodeRead

Creates a function to fetch a specific blockchain node.

| Function | Type |
| ---------- | ---------- |
| `blockchainNodeRead` | `(gqlClient: GraphQLClient, options: ClientOptions) => (blockchainNodeUniqueName: string) => Promise<any>` |

Parameters:

* `gqlClient`: - The GraphQL client instance
* `options`: - Client configuration options

### :gear: blockchainNodeCreate

Creates a function to create a new blockchain node.

| Function | Type |
| ---------- | ---------- |
| `blockchainNodeCreate` | `(gqlClient: GraphQLClient, options: ClientOptions) => (args: CreateBlockchainNodeArgs) => Promise<any>` |

Parameters:

* `gqlClient`: - The GraphQL client instance
* `options`: - Client configuration options

### :gear: blockchainNodeRestart

Creates a function to restart a blockchain node.

| Function | Type |
| ---------- | ---------- |
| `blockchainNodeRestart` | `(gqlClient: GraphQLClient, _options: ClientOptions) => (blockchainNodeUniqueName: string) => Promise<ResultOf<any>>` |

Parameters:

* `gqlClient`: - The GraphQL client instance
* `options`: - Client configuration options

### :gear: customdeploymentList

Creates a function to list custom deployments for an application.

| Function | Type |
| ---------- | ---------- |
| `customdeploymentList` | `(gqlClient: GraphQLClient, options: ClientOptions) => (applicationUniqueName: string) => Promise<ResultOf<any>[]>` |

Parameters:

* `gqlClient`: - The GraphQL client instance
* `options`: - Client configuration options

### :gear: customdeploymentRead

Creates a function to fetch a specific custom deployment.

| Function | Type |
| ---------- | ---------- |
| `customdeploymentRead` | `(gqlClient: GraphQLClient, options: ClientOptions) => (customDeploymentUniqueName: string) => Promise<ResultOf<any>>` |

Parameters:

* `gqlClient`: - The GraphQL client instance
* `options`: - Client configuration options

### :gear: customdeploymentUpdate

Creates a function to update a custom deployment.

| Function | Type |
| ---------- | ---------- |
| `customdeploymentUpdate` | `(gqlClient: GraphQLClient, options: ClientOptions) => (customDeploymentUniqueName: string, imageTag: string) => Promise<ResultOf<any>>` |

Parameters:

* `gqlClient`: - The GraphQL client instance
* `options`: - Client configuration options

### :gear: customdeploymentCreate

Creates a function to create a new custom deployment.

| Function | Type |
| ---------- | ---------- |
| `customdeploymentCreate` | `(gqlClient: GraphQLClient, options: ClientOptions) => (args: CreateCustomDeploymentArgs) => Promise<ResultOf<any>>` |

Parameters:

* `gqlClient`: - The GraphQL client instance
* `options`: - Client configuration options

### :gear: customDeploymentRestart

Creates a function to restart a custom deployment.

| Function | Type |
| ---------- | ---------- |
| `customDeploymentRestart` | `(gqlClient: GraphQLClient, _options: ClientOptions) => (customDeploymentUniqueName: string) => Promise<ResultOf<any>>` |

Parameters:

* `gqlClient`: - The GraphQL client instance
* `options`: - Client configuration options

### :gear: getEnv

Creates a function to fetch Foundry environment configuration.

| Function | Type |
| ---------- | ---------- |
| `getEnv` | `(gqlClient: GraphQLClient, _options: { [x: string]: any; accessToken?: unknown; instance?: unknown; }) => (blockchainNodeUniqueName: string) => Promise<Record<string, string>>` |

Parameters:

* `gqlClient`: - The GraphQL client instance
* `options`: - Client configuration options

### :gear: insightsList

Creates a function to list insights for an application.

| Function | Type |
| ---------- | ---------- |
| `insightsList` | `(gqlClient: GraphQLClient, options: ClientOptions) => (applicationUniqueName: string) => Promise<ResultOf<any>[]>` |

Parameters:

* `gqlClient`: - The GraphQL client instance
* `options`: - Client configuration options

### :gear: insightsRead

Creates a function to fetch a specific insight.

| Function | Type |
| ---------- | ---------- |
| `insightsRead` | `(gqlClient: GraphQLClient, options: ClientOptions) => (insightsUniqueName: string) => Promise<ResultOf<any>>` |

Parameters:

* `gqlClient`: - The GraphQL client instance
* `options`: - Client configuration options

### :gear: insightsCreate

Creates a function to create new insights.

| Function | Type |
| ---------- | ---------- |
| `insightsCreate` | `(gqlClient: GraphQLClient, options: ClientOptions) => (args: CreateInsightsArgs) => Promise<ResultOf<any>>` |

Parameters:

* `gqlClient`: - The GraphQL client instance
* `options`: - Client configuration options

### :gear: insightsRestart

Creates a function to restart insights.

| Function | Type |
| ---------- | ---------- |
| `insightsRestart` | `(gqlClient: GraphQLClient, _options: ClientOptions) => (insightsUniqueName: string) => Promise<ResultOf<any>>` |

Parameters:

* `gqlClient`: - The GraphQL client instance
* `options`: - Client configuration options

### :gear: integrationToolList

Creates a function to list integration tools for an application.

| Function | Type |
| ---------- | ---------- |
| `integrationToolList` | `(gqlClient: GraphQLClient, options: ClientOptions) => (applicationUniqueName: string) => Promise<ResultOf<any>[]>` |

Parameters:

* `gqlClient`: - The GraphQL client instance
* `options`: - Client configuration options

### :gear: integrationToolRead

Creates a function to fetch a specific integration tool.

| Function | Type |
| ---------- | ---------- |
| `integrationToolRead` | `(gqlClient: GraphQLClient, options: ClientOptions) => (integrationUniqueName: string) => Promise<ResultOf<any>>` |

Parameters:

* `gqlClient`: - The GraphQL client instance
* `options`: - Client configuration options

### :gear: integrationToolCreate

Creates a function to create a new integration tool.

| Function | Type |
| ---------- | ---------- |
| `integrationToolCreate` | `(gqlClient: GraphQLClient, options: ClientOptions) => (args: CreateIntegrationToolArgs) => Promise<ResultOf<any>>` |

Parameters:

* `gqlClient`: - The GraphQL client instance
* `options`: - Client configuration options

### :gear: integrationToolRestart

Creates a function to restart an integration tool.

| Function | Type |
| ---------- | ---------- |
| `integrationToolRestart` | `(gqlClient: GraphQLClient, _options: ClientOptions) => (integrationUniqueName: string) => Promise<ResultOf<any>>` |

Parameters:

* `gqlClient`: - The GraphQL client instance
* `options`: - Client configuration options

### :gear: loadBalancerRead

Creates a function to fetch a specific load balancer.

| Function | Type |
| ---------- | ---------- |
| `loadBalancerRead` | `(gqlClient: GraphQLClient, options: ClientOptions) => (loadBalancerUniqueName: string) => Promise<ResultOf<any>>` |

Parameters:

* `gqlClient`: - The GraphQL client instance
* `options`: - Client configuration options

### :gear: storageList

Creates a function to list storages for an application.

| Function | Type |
| ---------- | ---------- |
| `storageList` | `(gqlClient: GraphQLClient, options: ClientOptions) => (applicationUniqueName: string) => Promise<ResultOf<any>[]>` |

Parameters:

* `gqlClient`: - The GraphQL client instance
* `options`: - Client configuration options

### :gear: storageRead

Creates a function to fetch a specific storage.

| Function | Type |
| ---------- | ---------- |
| `storageRead` | `(gqlClient: GraphQLClient, options: ClientOptions) => (storageUniqueName: string) => Promise<ResultOf<any>>` |

Parameters:

* `gqlClient`: - The GraphQL client instance
* `options`: - Client configuration options

### :gear: storageCreate

Creates a function to create a new storage.

| Function | Type |
| ---------- | ---------- |
| `storageCreate` | `(gqlClient: GraphQLClient, options: ClientOptions) => (args: CreateStorageArgs) => Promise<ResultOf<any>>` |

Parameters:

* `gqlClient`: - The GraphQL client instance
* `options`: - Client configuration options

### :gear: storageRestart

Creates a function to restart a storage.

| Function | Type |
| ---------- | ---------- |
| `storageRestart` | `(gqlClient: GraphQLClient, _options: ClientOptions) => (storageUniqueName: string) => Promise<ResultOf<any>>` |

Parameters:

* `gqlClient`: - The GraphQL client instance
* `options`: - Client configuration options

### :gear: middlewareList

Creates a function to list middlewares for an application.

| Function | Type |
| ---------- | ---------- |
| `middlewareList` | `(gqlClient: GraphQLClient, options: ClientOptions) => (applicationUniqueName: string) => Promise<ResultOf<any>[]>` |

Parameters:

* `gqlClient`: - The GraphQL client instance
* `options`: - Client configuration options

### :gear: middlewareRead

Creates a function to fetch a specific middleware.

| Function | Type |
| ---------- | ---------- |
| `middlewareRead` | `(gqlClient: GraphQLClient, options: ClientOptions) => (middlewareUniqueName: string) => Promise<ResultOf<any>>` |

Parameters:

* `gqlClient`: - The GraphQL client instance
* `options`: - Client configuration options

### :gear: middlewareCreate

Creates a function to create a new middleware.

| Function | Type |
| ---------- | ---------- |
| `middlewareCreate` | `(gqlClient: GraphQLClient, options: ClientOptions) => (args: CreateMiddlewareArgs) => Promise<ResultOf<any>>` |

Parameters:

* `gqlClient`: - The GraphQL client instance
* `options`: - Client configuration options

### :gear: middlewareRestart

Creates a function to restart a middleware.

| Function | Type |
| ---------- | ---------- |
| `middlewareRestart` | `(gqlClient: GraphQLClient, _options: ClientOptions) => (middlewareUniqueName: string) => Promise<ResultOf<any>>` |

Parameters:

* `gqlClient`: - The GraphQL client instance
* `options`: - Client configuration options

### :gear: privateKeyList

Creates a function to list private keys for an application.

| Function | Type |
| ---------- | ---------- |
| `privateKeyList` | `(gqlClient: GraphQLClient, options: ClientOptions) => (applicationUniqueName: string) => Promise<ResultOf<any>[]>` |

Parameters:

* `gqlClient`: - The GraphQL client instance
* `options`: - Client configuration options

### :gear: privatekeyRead

Creates a function to fetch a specific private key.

| Function | Type |
| ---------- | ---------- |
| `privatekeyRead` | `(gqlClient: GraphQLClient, options: ClientOptions) => (privateKeyUniqueName: string) => Promise<ResultOf<any>>` |

Parameters:

* `gqlClient`: - The GraphQL client instance
* `options`: - Client configuration options

### :gear: privateKeyCreate

Creates a function to create a new private key.

| Function | Type |
| ---------- | ---------- |
| `privateKeyCreate` | `(gqlClient: GraphQLClient, options: ClientOptions) => (args: CreatePrivateKeyArgs) => Promise<ResultOf<any>>` |

Parameters:

* `gqlClient`: - The GraphQL client instance
* `options`: - Client configuration options

### :gear: privateKeyRestart

Creates a function to restart a private key.

| Function | Type |
| ---------- | ---------- |
| `privateKeyRestart` | `(gqlClient: GraphQLClient, _options: ClientOptions) => (privateKeyUniqueName: string) => Promise<ResultOf<any>>` |

Parameters:

* `gqlClient`: - The GraphQL client instance
* `options`: - Client configuration options

### :gear: createSettleMintClient

Creates a SettleMint client with the provided options.

| Function | Type |
| ---------- | ---------- |
| `createSettleMintClient` | `(options: { [x: string]: any; accessToken?: unknown; instance?: unknown; }) => SettlemintClient` |

Parameters:

* `options`: - The options for creating the SettleMint client.

Examples:

const client = createSettleMintClient({
  accessToken: 'btp_aat_xxxxxxxxxxxxxxxxxxxxxxxx',
  instance: 'https://console.settlemint.com'
});

## :wrench: Constants

- [ClientOptionsSchema](#gear-clientoptionsschema)
- [graphql](#gear-graphql)

### :gear: ClientOptionsSchema

Schema for validating SettleMint client options.

| Constant | Type |
| ---------- | ---------- |
| `ClientOptionsSchema` | `ZodObject<{ accessToken: any; instance: any; }, "strip", ZodTypeAny, { [x: string]: any; accessToken?: unknown; instance?: unknown; }, { [x: string]: any; accessToken?: unknown; instance?: unknown; }>` |

### :gear: graphql

Initializes the GraphQL client with specific configurations.

| Constant | Type |
| ---------- | ---------- |
| `graphql` | `initGraphQLTada<{ introspection: introspection; disableMasking: true; scalars: { DateTime: Date; JSON: Record<string, unknown>; Bytes: string; Int8: string; BigInt: string; BigDecimal: string; Timestamp: string; }; }>` |
