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
<a href="https://fsl.software" rel="nofollow"><img src="https://img.shields.io/npm/l/@settlemint/sdk-ipfs" alt="License"></a>
<a href="https://www.npmjs.com/package/@settlemint/sdk-ipfs" rel="nofollow"><img src="https://img.shields.io/npm/dw/@settlemint/sdk-ipfs" alt="npm"></a>
<a href="https://github.com/settlemint/sdk" rel="nofollow"><img src="https://img.shields.io/github/stars/settlemint/sdk" alt="stars"></a>
</p>

<div align="center">
  <a href="https://console.settlemint.com/documentation/docs/using-platform/dev-tools/SDK/">Documentation</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://www.npmjs.com/package/@settlemint/sdk-ipfs">NPM</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://github.com/settlemint/sdk/issues">Issues</a>
  <br />
</div>

## Table of Contents

- [About](#about)
- [API Reference](#api-reference)
  - [Functions](#functions)
    - [createIpfsClient()](#createipfsclient)
    - [createServerIpfsClient()](#createserveripfsclient)
- [Contributing](#contributing)
- [License](#license)

## About

The SettleMint IPFS SDK provides a simple way to interact with IPFS (InterPlanetary File System) through the SettleMint platform. It enables you to easily store and retrieve files using IPFS in a decentralized manner.

For detailed information about using IPFS with the SettleMint platform, check out our [official documentation](https://console.settlemint.com/documentation/docs/using-platform/storage/).

## API Reference

### Functions

#### createIpfsClient()

> **createIpfsClient**(`options`): `object`

Defined in: [sdk/ipfs/src/ipfs.ts:31](https://github.com/settlemint/sdk/blob/v1.1.1/sdk/ipfs/src/ipfs.ts#L31)

Creates an IPFS client for client-side use

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | \{ `instance`: `string`; \} | Configuration options for the client |
| `options.instance` | `string` | The URL of the IPFS instance to connect to |

##### Returns

`object`

An object containing the configured IPFS client instance

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `client` | `KuboRPCClient` | [sdk/ipfs/src/ipfs.ts:31](https://github.com/settlemint/sdk/blob/v1.1.1/sdk/ipfs/src/ipfs.ts#L31) |

##### Throws

Will throw an error if the options fail validation

##### Example

```ts
import { createIpfsClient } from '@settlemint/sdk-ipfs';

const { client } = createIpfsClient({
  instance: 'https://ipfs.settlemint.com'
});

// Upload a file using Blob
const blob = new Blob(['Hello, world!'], { type: 'text/plain' });
const result = await client.add(blob);
console.log(result.cid.toString());
```

***

#### createServerIpfsClient()

> **createServerIpfsClient**(`options`): `object`

Defined in: [sdk/ipfs/src/ipfs.ts:60](https://github.com/settlemint/sdk/blob/v1.1.1/sdk/ipfs/src/ipfs.ts#L60)

Creates an IPFS client for server-side use with authentication

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | \{ `accessToken`: `string`; `instance`: `string`; \} | Configuration options for the client including authentication |
| `options.accessToken` | `string` | The access token used to authenticate with the SettleMint platform |
| `options.instance` | `string` | The URL of the IPFS instance to connect to |

##### Returns

`object`

An object containing the authenticated IPFS client instance

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `client` | `KuboRPCClient` | [sdk/ipfs/src/ipfs.ts:60](https://github.com/settlemint/sdk/blob/v1.1.1/sdk/ipfs/src/ipfs.ts#L60) |

##### Throws

Will throw an error if called on the client side or if options validation fails

##### Example

```ts
import { createServerIpfsClient } from '@settlemint/sdk-ipfs';

const { client } = createServerIpfsClient({
  instance: process.env.SETTLEMINT_IPFS_ENDPOINT,
  accessToken: process.env.SETTLEMINT_ACCESS_TOKEN
});

// Upload a file using Blob
const blob = new Blob(['Hello, world!'], { type: 'text/plain' });
const result = await client.add(blob);
console.log(result.cid.toString());
```

## Contributing

We welcome contributions from the community! Please check out our [Contributing](https://github.com/settlemint/sdk/blob/main/.github/CONTRIBUTING.md) guide to learn how you can help improve the SettleMint SDK through bug reports, feature requests, documentation updates, or code contributions.

## License

The SettleMint SDK is released under the [FSL Software License](https://fsl.software). See the [LICENSE](https://github.com/settlemint/sdk/blob/main/LICENSE) file for more details.
