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
- [API Reference](#api-reference)
  - [Functions](#functions)
    - [createSettleMintClient()](#createsettlemintclient)
  - [Interfaces](#interfaces)
    - [SettlemintClient](#settlemintclient)
  - [Type Aliases](#type-aliases)
    - [Application](#application)
    - [BlockchainNetwork](#blockchainnetwork)
    - [BlockchainNode](#blockchainnode)
    - [CustomDeployment](#customdeployment)
    - [Insights](#insights)
    - [IntegrationTool](#integrationtool)
    - [Middleware](#middleware)
    - [PlatformConfig](#platformconfig)
    - [PrivateKey](#privatekey)
    - [Storage](#storage)
    - [Workspace](#workspace)
- [Contributing](#contributing)
- [License](#license)

## About

The SettleMint JavaScript SDK provides a type-safe wrapper around the SettleMint platform's GraphQL API. It enables you to interact with the platform's services in a fully typed manner, providing compile-time safety and autocompletion support.

## API Reference

### Functions

#### createSettleMintClient()

> **createSettleMintClient**(`options`): [`SettlemintClient`](README.md#settlemintclient)

Defined in: [sdk/js/src/settlemint.ts:197](https://github.com/settlemint/sdk/blob/v0.9.7/sdk/js/src/settlemint.ts#L197)

Creates a SettleMint client with the provided options. The client provides methods to interact with
various SettleMint resources like workspaces, applications, blockchain networks, blockchain nodes, middleware,
integration tools, storage, private keys, insights and custom deployments.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | \{ `accessToken`: `string`; `instance`: `string`; \} | Configuration options for the client including access token and instance URL |
| `options.accessToken` | `string` | The access token used to authenticate with the SettleMint platform |
| `options.instance` | `string` | The URL of the SettleMint instance to connect to |

##### Returns

[`SettlemintClient`](README.md#settlemintclient)

A SettleMint client object with resource-specific methods

##### Throws

If options are invalid or if called in browser environment

##### Throws

If provided options fail schema validation

##### Example

```ts
import { createSettleMintClient } from '@settlemint/sdk-js';

const client = createSettleMintClient({
  accessToken: process.env.SETTLEMINT_ACCESS_TOKEN,
  instance: process.env.SETTLEMINT_INSTANCE,
});

// List workspaces
const workspaces = await client.workspace.list();

// Read a specific workspace
const workspace = await client.workspace.read('workspace-unique-name');
```

### Interfaces

#### SettlemintClient

Defined in: [sdk/js/src/settlemint.ts:98](https://github.com/settlemint/sdk/blob/v0.9.7/sdk/js/src/settlemint.ts#L98)

Client interface for interacting with the SettleMint platform.

### Type Aliases

#### Application

> **Application**: `ResultOf`\<*typeof* `ApplicationFragment`\>

Defined in: [sdk/js/src/graphql/application.ts:23](https://github.com/settlemint/sdk/blob/v0.9.7/sdk/js/src/graphql/application.ts#L23)

Type representing an application entity.

***

#### BlockchainNetwork

> **BlockchainNetwork**: `ResultOf`\<*typeof* `BlockchainNetworkFragment`\>

Defined in: [sdk/js/src/graphql/blockchain-network.ts:29](https://github.com/settlemint/sdk/blob/v0.9.7/sdk/js/src/graphql/blockchain-network.ts#L29)

Type representing a blockchain network entity.

***

#### BlockchainNode

> **BlockchainNode**: `ResultOf`\<*typeof* `BlockchainNodeFragment`\>

Defined in: [sdk/js/src/graphql/blockchain-node.ts:48](https://github.com/settlemint/sdk/blob/v0.9.7/sdk/js/src/graphql/blockchain-node.ts#L48)

Type representing a blockchain node entity.

***

#### CustomDeployment

> **CustomDeployment**: `ResultOf`\<*typeof* `CustomDeploymentFragment`\>

Defined in: [sdk/js/src/graphql/custom-deployment.ts:30](https://github.com/settlemint/sdk/blob/v0.9.7/sdk/js/src/graphql/custom-deployment.ts#L30)

Type representing a custom deployment entity.

***

#### Insights

> **Insights**: `ResultOf`\<*typeof* `InsightsFragment`\>

Defined in: [sdk/js/src/graphql/insights.ts:34](https://github.com/settlemint/sdk/blob/v0.9.7/sdk/js/src/graphql/insights.ts#L34)

Type representing an insights entity.

***

#### IntegrationTool

> **IntegrationTool**: `ResultOf`\<*typeof* `IntegrationFragment`\>

Defined in: [sdk/js/src/graphql/integration-tool.ts:32](https://github.com/settlemint/sdk/blob/v0.9.7/sdk/js/src/graphql/integration-tool.ts#L32)

Type representing an integration tool entity.

***

#### Middleware

> **Middleware**: `ResultOf`\<*typeof* `MiddlewareFragment`\>

Defined in: [sdk/js/src/graphql/middleware.ts:47](https://github.com/settlemint/sdk/blob/v0.9.7/sdk/js/src/graphql/middleware.ts#L47)

Type representing a middleware entity.

***

#### PlatformConfig

> **PlatformConfig**: `ResultOf`\<*typeof* `getPlatformConfigQuery`\>\[`"config"`\]

Defined in: [sdk/js/src/graphql/platform.ts:44](https://github.com/settlemint/sdk/blob/v0.9.7/sdk/js/src/graphql/platform.ts#L44)

Type representing the platform configuration.

***

#### PrivateKey

> **PrivateKey**: `ResultOf`\<*typeof* `PrivateKeyFragment`\>

Defined in: [sdk/js/src/graphql/private-key.ts:23](https://github.com/settlemint/sdk/blob/v0.9.7/sdk/js/src/graphql/private-key.ts#L23)

Type representing a private key entity.

***

#### Storage

> **Storage**: `ResultOf`\<*typeof* `StorageFragment`\>

Defined in: [sdk/js/src/graphql/storage.ts:32](https://github.com/settlemint/sdk/blob/v0.9.7/sdk/js/src/graphql/storage.ts#L32)

Type representing a storage entity.

***

#### Workspace

> **Workspace**: `ResultOf`\<*typeof* `WorkspaceFragment`\>

Defined in: [sdk/js/src/graphql/workspace.ts:26](https://github.com/settlemint/sdk/blob/v0.9.7/sdk/js/src/graphql/workspace.ts#L26)

Type representing a workspace entity.

## Contributing

We welcome contributions from the community! Please check out our [Contributing](../../.github/CONTRIBUTING.md) guide to learn how you can help improve the SettleMint SDK through bug reports, feature requests, documentation updates, or code contributions.

## License

The SettleMint SDK is released under the [FSL Software License](https://fsl.software). See the [LICENSE](https://github.com/settlemint/sdk/blob/main/LICENSE) file for more details.
