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

- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install the SettleMint SDK, you can use one of the following package managers:

```bash
# Using npm
npm install @settlemint/sdk

# Using yarn
yarn add @settlemint/sdk

# Using pnpm
pnpm add @settlemint/sdk

# Using Bun
bun add @settlemint/sdk
```

We recommend using Bun for faster installation and better performance.

## Usage

To use the SettleMint SDK in your Node.js application, follow these steps:

1. Import the SDK:

```javascript
import { createSettleMintClient } from '@settlemint/sdk';
```

2. Create a client instance:

```javascript
const client = createSettleMintClient({
  accessToken: 'your_access_token',
  instance: 'https://console.settlemint.com'
});
```

3. Use the client to interact with SettleMint resources:

```javascript
// Example: List workspaces
const workspaces = await client.workspace.list();
console.log(workspaces);
```

## API Reference

The SettleMint SDK provides access to various resources. Here's an overview of the available methods:

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

## Examples

Here are some examples of how to use the SettleMint SDK:

### List Workspaces

```javascript
const client = createSettleMintClient({
  accessToken: 'your_access_token',
  instance: 'https://console.settlemint.com'
});

const workspaces = await client.workspace.list();
console.log(workspaces);
```

### Read a Specific Blockchain Network

```javascript
const client = createSettleMintClient({
  accessToken: 'your_access_token',
  instance: 'https://console.settlemint.com'
});

const networkId = 'your_network_id';
const network = await client.blockchainNetwork.read(networkId);
console.log(network);
```

## Contributing

We welcome contributions to the SettleMint SDK! If you'd like to contribute, please follow these steps:

1. Fork the repository
2. Create a new branch for your feature or bug fix
3. Make your changes and commit them with a clear commit message
4. Push your changes to your fork
5. Create a pull request to the main repository

Please ensure that your code follows the existing style and includes appropriate tests and documentation.

## License

The SettleMint SDK is released under the [FSL Software License](https://fsl.software). See the [LICENSE](LICENSE) file for more details.