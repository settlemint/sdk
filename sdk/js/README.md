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
  <a href="https://console.settlemint.com/documentation">Documentation</a>
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
    - [SettlemintClientOptions](#settlemintclientoptions)
  - [Type Aliases](#type-aliases)
    - [Application](#application)
    - [BlockchainNetwork](#blockchainnetwork)
    - [BlockchainNode](#blockchainnode)
    - [CustomDeployment](#customdeployment)
    - [Insights](#insights)
    - [IntegrationTool](#integrationtool)
    - [LoadBalancer](#loadbalancer)
    - [Middleware](#middleware)
    - [MiddlewareWithSubgraphs](#middlewarewithsubgraphs)
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

> **createSettleMintClient**(`options`): [`SettlemintClient`](#settlemintclient)

Defined in: [sdk/js/src/settlemint.ts:275](https://github.com/settlemint/sdk/blob/v2.5.2/sdk/js/src/settlemint.ts#L275)

Creates a SettleMint client with the provided options. The client provides methods to interact with
various SettleMint resources like workspaces, applications, blockchain networks, blockchain nodes, middleware,
integration tools, storage, private keys, insights and custom deployments.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`SettlemintClientOptions`](#settlemintclientoptions) | Configuration options for the client including access token and instance URL |

##### Returns

[`SettlemintClient`](#settlemintclient)

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

Defined in: [sdk/js/src/settlemint.ts:145](https://github.com/settlemint/sdk/blob/v2.5.2/sdk/js/src/settlemint.ts#L145)

Client interface for interacting with the SettleMint platform.

***

#### SettlemintClientOptions

Defined in: [sdk/js/src/settlemint.ts:135](https://github.com/settlemint/sdk/blob/v2.5.2/sdk/js/src/settlemint.ts#L135)

Options for the Settlemint client.

##### Extends

- `Omit`\<`ClientOptions`, `"accessToken"`\>

##### Properties

| Property | Type | Default value | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="accesstoken"></a> `accessToken?` | `string` | `undefined` | The access token used to authenticate with the SettleMint platform | - | [sdk/js/src/settlemint.ts:137](https://github.com/settlemint/sdk/blob/v2.5.2/sdk/js/src/settlemint.ts#L137) |
| <a id="anonymous"></a> `anonymous?` | `boolean` | `undefined` | Whether to allow anonymous access (no access token required) | - | [sdk/js/src/settlemint.ts:139](https://github.com/settlemint/sdk/blob/v2.5.2/sdk/js/src/settlemint.ts#L139) |
| <a id="instance"></a> `instance` | `string` | `UrlSchema` | The URL of the SettleMint instance to connect to | `Omit.instance` | [sdk/js/src/helpers/client-options.schema.ts:11](https://github.com/settlemint/sdk/blob/v2.5.2/sdk/js/src/helpers/client-options.schema.ts#L11) |

### Type Aliases

#### Application

> **Application** = `ResultOf`\<*typeof* `ApplicationFragment`\>

Defined in: [sdk/js/src/graphql/application.ts:24](https://github.com/settlemint/sdk/blob/v2.5.2/sdk/js/src/graphql/application.ts#L24)

Type representing an application entity.

***

#### BlockchainNetwork

> **BlockchainNetwork** = `ResultOf`\<*typeof* `BlockchainNetworkFragment`\>

Defined in: [sdk/js/src/graphql/blockchain-network.ts:82](https://github.com/settlemint/sdk/blob/v2.5.2/sdk/js/src/graphql/blockchain-network.ts#L82)

Type representing a blockchain network entity.

***

#### BlockchainNode

> **BlockchainNode** = `ResultOf`\<*typeof* `BlockchainNodeFragment`\>

Defined in: [sdk/js/src/graphql/blockchain-node.ts:96](https://github.com/settlemint/sdk/blob/v2.5.2/sdk/js/src/graphql/blockchain-node.ts#L96)

Type representing a blockchain node entity.

***

#### CustomDeployment

> **CustomDeployment** = `ResultOf`\<*typeof* `CustomDeploymentFragment`\>

Defined in: [sdk/js/src/graphql/custom-deployment.ts:33](https://github.com/settlemint/sdk/blob/v2.5.2/sdk/js/src/graphql/custom-deployment.ts#L33)

Type representing a custom deployment entity.

***

#### Insights

> **Insights** = `ResultOf`\<*typeof* `InsightsFragment`\>

Defined in: [sdk/js/src/graphql/insights.ts:37](https://github.com/settlemint/sdk/blob/v2.5.2/sdk/js/src/graphql/insights.ts#L37)

Type representing an insights entity.

***

#### IntegrationTool

> **IntegrationTool** = `ResultOf`\<*typeof* `IntegrationFragment`\>

Defined in: [sdk/js/src/graphql/integration-tool.ts:35](https://github.com/settlemint/sdk/blob/v2.5.2/sdk/js/src/graphql/integration-tool.ts#L35)

Type representing an integration tool entity.

***

#### LoadBalancer

> **LoadBalancer** = `ResultOf`\<*typeof* `LoadBalancerFragment`\>

Defined in: [sdk/js/src/graphql/load-balancer.ts:31](https://github.com/settlemint/sdk/blob/v2.5.2/sdk/js/src/graphql/load-balancer.ts#L31)

Type representing a load balancer entity.

***

#### Middleware

> **Middleware** = `ResultOf`\<*typeof* `MiddlewareFragment`\>

Defined in: [sdk/js/src/graphql/middleware.ts:56](https://github.com/settlemint/sdk/blob/v2.5.2/sdk/js/src/graphql/middleware.ts#L56)

Type representing a middleware entity.

***

#### MiddlewareWithSubgraphs

> **MiddlewareWithSubgraphs** = `ResultOf`\<*typeof* `getGraphMiddlewareSubgraphs`\>\[`"middlewareByUniqueName"`\]

Defined in: [sdk/js/src/graphql/middleware.ts:115](https://github.com/settlemint/sdk/blob/v2.5.2/sdk/js/src/graphql/middleware.ts#L115)

Type representing a middleware entity with subgraphs.

***

#### PlatformConfig

> **PlatformConfig** = `ResultOf`\<*typeof* `getPlatformConfigQuery`\>\[`"config"`\]

Defined in: [sdk/js/src/graphql/platform.ts:56](https://github.com/settlemint/sdk/blob/v2.5.2/sdk/js/src/graphql/platform.ts#L56)

Type representing the platform configuration.

***

#### PrivateKey

> **PrivateKey** = `ResultOf`\<*typeof* `PrivateKeyFragment`\>

Defined in: [sdk/js/src/graphql/private-key.ts:44](https://github.com/settlemint/sdk/blob/v2.5.2/sdk/js/src/graphql/private-key.ts#L44)

Type representing a private key entity.

***

#### Storage

> **Storage** = `ResultOf`\<*typeof* `StorageFragment`\>

Defined in: [sdk/js/src/graphql/storage.ts:35](https://github.com/settlemint/sdk/blob/v2.5.2/sdk/js/src/graphql/storage.ts#L35)

Type representing a storage entity.

***

#### Workspace

> **Workspace** = `ResultOf`\<*typeof* `WorkspaceFragment`\>

Defined in: [sdk/js/src/graphql/workspace.ts:26](https://github.com/settlemint/sdk/blob/v2.5.2/sdk/js/src/graphql/workspace.ts#L26)

Type representing a workspace entity.

## Contributing

We welcome contributions from the community! Please check out our [Contributing](https://github.com/settlemint/sdk/blob/main/.github/CONTRIBUTING.md) guide to learn how you can help improve the SettleMint SDK through bug reports, feature requests, documentation updates, or code contributions.

## License

The SettleMint SDK is released under the [FSL Software License](https://fsl.software). See the [LICENSE](https://github.com/settlemint/sdk/blob/main/LICENSE) file for more details.
