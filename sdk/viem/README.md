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
<a href="https://fsl.software" rel="nofollow"><img src="https://img.shields.io/npm/l/@settlemint/sdk-viem" alt="License"></a>
<a href="https://www.npmjs.com/package/@settlemint/sdk-viem" rel="nofollow"><img src="https://img.shields.io/npm/dw/@settlemint/sdk-viem" alt="npm"></a>
<a href="https://github.com/settlemint/sdk" rel="nofollow"><img src="https://img.shields.io/github/stars/settlemint/sdk" alt="stars"></a>
</p>

<div align="center">
  <a href="https://console.settlemint.com/documentation">Documentation</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://www.npmjs.com/package/@settlemint/sdk-viem">NPM</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://github.com/settlemint/sdk/issues">Issues</a>
  <br />
</div>

## Table of Contents

- [About](#about)
- [API Reference](#api-reference)
  - [Functions](#functions)
    - [getPublicClient()](#getpublicclient)
    - [getWalletClient()](#getwalletclient)
  - [Interfaces](#interfaces)
    - [ClientOptions](#clientoptions)
    - [WalletVerificationOptions](#walletverificationoptions)
- [Contributing](#contributing)
- [License](#license)

## About

The SettleMint Viem SDK provides a lightweight wrapper that automatically configures and sets up a Viem client based on your connected SettleMint application. It simplifies the process of establishing connections to SettleMint-managed blockchain networks by handling authentication, endpoint configuration, and chain selection. This allows developers to quickly start using Viem's powerful Ethereum interaction capabilities without manual setup, while ensuring proper integration with the SettleMint platform.

## API Reference

### Functions

#### getPublicClient()

> **getPublicClient**(`options`): `object`

Defined in: [sdk/viem/src/viem.ts:39](https://github.com/settlemint/sdk/blob/v2.1.4/sdk/viem/src/viem.ts#L39)

Get a public client. Use this if you need to read from the blockchain.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`ClientOptions`](#clientoptions) | The options for the public client. |

##### Returns

`object`

The public client.

***

#### getWalletClient()

> **getWalletClient**(`options`): (`verificationOptions?`) => `object`

Defined in: [sdk/viem/src/viem.ts:68](https://github.com/settlemint/sdk/blob/v2.1.4/sdk/viem/src/viem.ts#L68)

Get a wallet client. Use this if you need to write to the blockchain.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`ClientOptions`](#clientoptions) | The options for the wallet client. |

##### Returns

A function that returns a wallet client. The function can be called with verification options.

> (`verificationOptions?`): `object`

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `verificationOptions?` | [`WalletVerificationOptions`](#walletverificationoptions) |

###### Returns

`object`

### Interfaces

#### ClientOptions

Defined in: [sdk/viem/src/viem.ts:15](https://github.com/settlemint/sdk/blob/v2.1.4/sdk/viem/src/viem.ts#L15)

The options for the viem client.

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="chainid"></a> `chainId` | `string` | The chain id to use for the viem client. | [sdk/viem/src/viem.ts:19](https://github.com/settlemint/sdk/blob/v2.1.4/sdk/viem/src/viem.ts#L19) |
| <a id="chainname"></a> `chainName` | `string` | The chain name to use for the viem client. | [sdk/viem/src/viem.ts:23](https://github.com/settlemint/sdk/blob/v2.1.4/sdk/viem/src/viem.ts#L23) |
| <a id="httptransportconfig"></a> `httpTransportConfig?` | `HttpTransportConfig` | The http transport config to use for the wallet client. | [sdk/viem/src/viem.ts:31](https://github.com/settlemint/sdk/blob/v2.1.4/sdk/viem/src/viem.ts#L31) |
| <a id="rpcurl"></a> `rpcUrl` | `string` | The rpc url to use for the viem client. | [sdk/viem/src/viem.ts:27](https://github.com/settlemint/sdk/blob/v2.1.4/sdk/viem/src/viem.ts#L27) |

***

#### WalletVerificationOptions

Defined in: [sdk/viem/src/viem.ts:52](https://github.com/settlemint/sdk/blob/v2.1.4/sdk/viem/src/viem.ts#L52)

The options for the wallet client.

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="challengeresponse"></a> `challengeResponse` | `string` | The challenge response (used for HD wallets) | [sdk/viem/src/viem.ts:60](https://github.com/settlemint/sdk/blob/v2.1.4/sdk/viem/src/viem.ts#L60) |
| <a id="verificationid"></a> `verificationId?` | `string` | The verification id (used for HD wallets), if not provided, the challenge response will be validated against all active verifications. | [sdk/viem/src/viem.ts:56](https://github.com/settlemint/sdk/blob/v2.1.4/sdk/viem/src/viem.ts#L56) |

## Contributing

We welcome contributions from the community! Please check out our [Contributing](https://github.com/settlemint/sdk/blob/main/.github/CONTRIBUTING.md) guide to learn how you can help improve the SettleMint SDK through bug reports, feature requests, documentation updates, or code contributions.

## License

The SettleMint SDK is released under the [FSL Software License](https://fsl.software). See the [LICENSE](https://github.com/settlemint/sdk/blob/main/LICENSE) file for more details.
