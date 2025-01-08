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
  <a href="https://console.settlemint.com/documentation/">Documentation</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://discord.com/invite/Mt5yqFrey9">Discord</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://www.npmjs.com/package/@settlemint/sdk-ipfs">NPM</a>
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

The SettleMint IPFS SDK provides a simple way to interact with IPFS (InterPlanetary File System) through the SettleMint platform. It enables you to easily store and retrieve files using IPFS in a decentralized manner.

For detailed information about using IPFS with the SettleMint platform, check out our [official documentation](https://console.settlemint.com/documentation/docs/using-platform/storage/).

## Usage

TODO: define default

## API Reference

## Functions

### createIpfsClient()

> **createIpfsClient**(`options`): `object`

Defined in: [sdk/ipfs/src/ipfs.ts:23](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/ipfs/src/ipfs.ts#L23)

Creates an IPFS client for client-side use.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | \{ `instance`: `string`; \} | The client options for configuring the IPFS client. |
| `options.instance` | `string` | - |

#### Returns

`object`

An object containing the IPFS client.

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `client` | `KuboRPCClient` | [sdk/ipfs/src/ipfs.ts:23](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/ipfs/src/ipfs.ts#L23) |

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

Defined in: [sdk/ipfs/src/ipfs.ts:46](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/ipfs/src/ipfs.ts#L46)

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

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `client` | `KuboRPCClient` | [sdk/ipfs/src/ipfs.ts:46](https://github.com/settlemint/sdk/blob/v0.8.6/sdk/ipfs/src/ipfs.ts#L46) |

#### Throws

Will throw an error if not called on the server or if the options fail validation.

#### Example

```ts
const { client } = createServerIpfsClient({
  instance: 'https://your-ipfs-instance.com',
  accessToken: 'your-access-token',
});
```

## Contributing

We welcome contributions from the community! Please check out our [Contributing](../../.github/CONTRIBUTING.md) guide to learn how you can help improve the SettleMint SDK through bug reports, feature requests, documentation updates, or code contributions.

## License

The SettleMint SDK is released under the [FSL Software License](https://fsl.software). See the [LICENSE](LICENSE) file for more details.
