<p align="center">
  <img src="https://github.com/settlemint/sdk/blob/main/logo.svg" width="200px" align="center" alt="SettleMint logo" />
  <h1 align="center">SettleMint SDK</h1>
  <p align="center">
    ✨ <a href="https://settlemint.com">https://settlemint.com</a> ✨
    <br/>
    Integrate SettleMint into your application with ease.
  </p>
</p>

<p align="center">
<a href="https://github.com/settlemint/sdk/actions?query=branch%3Amain"><img src="https://github.com/settlemint/sdk/actions/workflows/build.yml/badge.svg?event=push&branch=main" alt="CI status" /></a>
<a href="https://fsl.software" rel="nofollow"><img src="https://img.shields.io/npm/l/@settlemint/sdk-js" alt="License"></a>
<a href="https://www.npmjs.com/package/@settlemint/sdk-js" rel="nofollow"><img src="https://img.shields.io/npm/dw/@settlemint/sdk-js" alt="npm"></a>
<a href="https://github.com/settlemint/sdk" rel="nofollow"><img src="https://img.shields.io/github/stars/settlemint/sdk" alt="stars"></a>
</p>

<div align="center">
  <a href="https://console.settlemint.com/documentation/">Documentation</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://discord.com/invite/Mt5yqFrey9">Discord</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://www.npmjs.com/package/@settlemint/sdk-js">NPM</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://github.com/settlemint/sdk/issues">Issues</a>
  <br />
</div>

## Table of Contents

- [About](#about)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)

## About

The SettleMint JavaScript SDK provides a type-safe wrapper around the SettleMint platform's GraphQL API. It enables you to interact with the platform's services in a fully typed manner, providing compile-time safety and autocompletion support.

## Usage

Here are some examples of how to use the SettleMint JavaScript SDK:

### List Workspaces

```typescript
const client = createSettleMintClient({
  accessToken: 'your_access_token',
  instance: 'https://console.settlemint.com'
});

const workspaces = await client.workspace.list();
console.log(workspaces);
```

### Read a Specific Blockchain Network

```typescript
const client = createSettleMintClient({
  accessToken: 'your_access_token',
  instance: 'https://console.settlemint.com'
});

const networkId = 'your_network_id';
const network = await client.blockchainNetwork.read(networkId);
console.log(network);
```

## API Reference

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

## Contributing

We welcome contributions from the community! Please check out our [Contributing](../../.github/CONTRIBUTING.md) guide to learn how you can help improve the SettleMint SDK through bug reports, feature requests, documentation updates, or code contributions.

## License

The SettleMint SDK is released under the [FSL Software License](https://fsl.software). See the [LICENSE](LICENSE) file for more details.
