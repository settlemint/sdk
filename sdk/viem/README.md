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
  - [Enumerations](#enumerations)
    - [OTPAlgorithm](#otpalgorithm)
    - [WalletVerificationType](#walletverificationtype)
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

Defined in: [sdk/viem/src/viem.ts:66](https://github.com/settlemint/sdk/blob/v2.1.4/sdk/viem/src/viem.ts#L66)

Get a public client. Use this if you need to read from the blockchain.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`ClientOptions`](#clientoptions) | The options for the public client. |

##### Returns

`object`

The public client.

##### Example

```ts
import { getPublicClient } from '@settlemint/sdk-viem';

const publicClient = getPublicClient({
  accessToken: process.env.SETTLEMINT_ACCESS_TOKEN!,
  chainId: process.env.SETTLEMINT_BLOCKCHAIN_NETWORK_CHAIN_ID!,
  chainName: process.env.SETTLEMINT_BLOCKCHAIN_NETWORK!,
  rpcUrl: process.env.SETTLEMINT_BLOCKCHAIN_NODE_OR_LOAD_BALANCER_JSON_RPC_ENDPOINT!,
});

// Get the block number
const block = await publicClient.getBlockNumber();
console.log(block);
```

***

#### getWalletClient()

> **getWalletClient**\<`C`\>(`options`): (`verificationOptions?`) => `Client`\<`Transport`, `C`, `undefined` \| `Account`, `WalletRpcSchema`, `object` & `object` & `object` & `object` & `object` & `object` & `object` & `WalletActions`\<`C`, `undefined` \| `Account`\>\>

Defined in: [sdk/viem/src/viem.ts:128](https://github.com/settlemint/sdk/blob/v2.1.4/sdk/viem/src/viem.ts#L128)

Get a wallet client. Use this if you need to write to the blockchain.

##### Type Parameters

| Type Parameter |
| ------ |
| `C` *extends* `Chain` |

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`ClientOptions`](#clientoptions) | The options for the wallet client. |

##### Returns

A function that returns a wallet client. The function can be called with verification options.

> (`verificationOptions?`): `Client`\<`Transport`, `C`, `undefined` \| `Account`, `WalletRpcSchema`, `object` & `object` & `object` & `object` & `object` & `object` & `object` & `WalletActions`\<`C`, `undefined` \| `Account`\>\>

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `verificationOptions?` | [`WalletVerificationOptions`](#walletverificationoptions) |

###### Returns

`Client`\<`Transport`, `C`, `undefined` \| `Account`, `WalletRpcSchema`, `object` & `object` & `object` & `object` & `object` & `object` & `object` & `WalletActions`\<`C`, `undefined` \| `Account`\>\>

##### Example

```ts
import { getWalletClient } from '@settlemint/sdk-viem';
import { parseAbi } from "viem";

const walletClient = getWalletClient({
  accessToken: process.env.SETTLEMINT_ACCESS_TOKEN!,
  chainId: process.env.SETTLEMINT_BLOCKCHAIN_NETWORK_CHAIN_ID!,
  chainName: process.env.SETTLEMINT_BLOCKCHAIN_NETWORK!,
  rpcUrl: process.env.SETTLEMINT_BLOCKCHAIN_NODE_OR_LOAD_BALANCER_JSON_RPC_ENDPOINT!,
});

// Get the chain id
const chainId = await walletClient().getChainId();
console.log(chainId);

// write to the blockchain
const transactionHash = await walletClient().writeContract({
  account: "0x0000000000000000000000000000000000000000",
  address: "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
  abi: parseAbi(["function mint(uint32 tokenId) nonpayable"]),
  functionName: "mint",
  args: [69420],
});
console.log(transactionHash);
```

### Enumerations

#### OTPAlgorithm

Defined in: [sdk/viem/src/custom-actions/types/wallet-verification.enum.ts:18](https://github.com/settlemint/sdk/blob/v2.1.4/sdk/viem/src/custom-actions/types/wallet-verification.enum.ts#L18)

Supported hash algorithms for One-Time Password (OTP) verification.
These algorithms determine the cryptographic function used to generate OTP codes.

##### Enumeration Members

| Enumeration Member | Value | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="sha1"></a> `SHA1` | `"SHA1"` | SHA-1 hash algorithm | [sdk/viem/src/custom-actions/types/wallet-verification.enum.ts:20](https://github.com/settlemint/sdk/blob/v2.1.4/sdk/viem/src/custom-actions/types/wallet-verification.enum.ts#L20) |
| <a id="sha224"></a> `SHA224` | `"SHA224"` | SHA-224 hash algorithm | [sdk/viem/src/custom-actions/types/wallet-verification.enum.ts:22](https://github.com/settlemint/sdk/blob/v2.1.4/sdk/viem/src/custom-actions/types/wallet-verification.enum.ts#L22) |
| <a id="sha256"></a> `SHA256` | `"SHA256"` | SHA-256 hash algorithm | [sdk/viem/src/custom-actions/types/wallet-verification.enum.ts:24](https://github.com/settlemint/sdk/blob/v2.1.4/sdk/viem/src/custom-actions/types/wallet-verification.enum.ts#L24) |
| <a id="sha3_224"></a> `SHA3_224` | `"SHA3-224"` | SHA3-224 hash algorithm | [sdk/viem/src/custom-actions/types/wallet-verification.enum.ts:30](https://github.com/settlemint/sdk/blob/v2.1.4/sdk/viem/src/custom-actions/types/wallet-verification.enum.ts#L30) |
| <a id="sha3_256"></a> `SHA3_256` | `"SHA3-256"` | SHA3-256 hash algorithm | [sdk/viem/src/custom-actions/types/wallet-verification.enum.ts:32](https://github.com/settlemint/sdk/blob/v2.1.4/sdk/viem/src/custom-actions/types/wallet-verification.enum.ts#L32) |
| <a id="sha3_384"></a> `SHA3_384` | `"SHA3-384"` | SHA3-384 hash algorithm | [sdk/viem/src/custom-actions/types/wallet-verification.enum.ts:34](https://github.com/settlemint/sdk/blob/v2.1.4/sdk/viem/src/custom-actions/types/wallet-verification.enum.ts#L34) |
| <a id="sha3_512"></a> `SHA3_512` | `"SHA3-512"` | SHA3-512 hash algorithm | [sdk/viem/src/custom-actions/types/wallet-verification.enum.ts:36](https://github.com/settlemint/sdk/blob/v2.1.4/sdk/viem/src/custom-actions/types/wallet-verification.enum.ts#L36) |
| <a id="sha384"></a> `SHA384` | `"SHA384"` | SHA-384 hash algorithm | [sdk/viem/src/custom-actions/types/wallet-verification.enum.ts:26](https://github.com/settlemint/sdk/blob/v2.1.4/sdk/viem/src/custom-actions/types/wallet-verification.enum.ts#L26) |
| <a id="sha512"></a> `SHA512` | `"SHA512"` | SHA-512 hash algorithm | [sdk/viem/src/custom-actions/types/wallet-verification.enum.ts:28](https://github.com/settlemint/sdk/blob/v2.1.4/sdk/viem/src/custom-actions/types/wallet-verification.enum.ts#L28) |

***

#### WalletVerificationType

Defined in: [sdk/viem/src/custom-actions/types/wallet-verification.enum.ts:5](https://github.com/settlemint/sdk/blob/v2.1.4/sdk/viem/src/custom-actions/types/wallet-verification.enum.ts#L5)

Types of wallet verification methods supported by the system.
Used to identify different verification mechanisms when creating or managing wallet verifications.

##### Enumeration Members

| Enumeration Member | Value | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="otp"></a> `OTP` | `"OTP"` | One-Time Password verification method | [sdk/viem/src/custom-actions/types/wallet-verification.enum.ts:9](https://github.com/settlemint/sdk/blob/v2.1.4/sdk/viem/src/custom-actions/types/wallet-verification.enum.ts#L9) |
| <a id="pincode"></a> `PINCODE` | `"PINCODE"` | PIN code verification method | [sdk/viem/src/custom-actions/types/wallet-verification.enum.ts:7](https://github.com/settlemint/sdk/blob/v2.1.4/sdk/viem/src/custom-actions/types/wallet-verification.enum.ts#L7) |
| <a id="secret_codes"></a> `SECRET_CODES` | `"SECRET_CODES"` | Secret recovery codes verification method | [sdk/viem/src/custom-actions/types/wallet-verification.enum.ts:11](https://github.com/settlemint/sdk/blob/v2.1.4/sdk/viem/src/custom-actions/types/wallet-verification.enum.ts#L11) |

### Interfaces

#### ClientOptions

Defined in: [sdk/viem/src/viem.ts:23](https://github.com/settlemint/sdk/blob/v2.1.4/sdk/viem/src/viem.ts#L23)

The options for the viem client.

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="accesstoken"></a> `accessToken` | `string` | The access token | [sdk/viem/src/viem.ts:27](https://github.com/settlemint/sdk/blob/v2.1.4/sdk/viem/src/viem.ts#L27) |
| <a id="chainid"></a> `chainId` | `string` | The chain id | [sdk/viem/src/viem.ts:31](https://github.com/settlemint/sdk/blob/v2.1.4/sdk/viem/src/viem.ts#L31) |
| <a id="chainname"></a> `chainName` | `string` | The chain name | [sdk/viem/src/viem.ts:35](https://github.com/settlemint/sdk/blob/v2.1.4/sdk/viem/src/viem.ts#L35) |
| <a id="httptransportconfig"></a> `httpTransportConfig?` | `HttpTransportConfig` | The http transport config | [sdk/viem/src/viem.ts:43](https://github.com/settlemint/sdk/blob/v2.1.4/sdk/viem/src/viem.ts#L43) |
| <a id="rpcurl"></a> `rpcUrl` | `string` | The json rpc url | [sdk/viem/src/viem.ts:39](https://github.com/settlemint/sdk/blob/v2.1.4/sdk/viem/src/viem.ts#L39) |

***

#### WalletVerificationOptions

Defined in: [sdk/viem/src/viem.ts:86](https://github.com/settlemint/sdk/blob/v2.1.4/sdk/viem/src/viem.ts#L86)

The options for the wallet client.

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="challengeresponse"></a> `challengeResponse` | `string` | The challenge response (used for HD wallets) | [sdk/viem/src/viem.ts:94](https://github.com/settlemint/sdk/blob/v2.1.4/sdk/viem/src/viem.ts#L94) |
| <a id="verificationid"></a> `verificationId?` | `string` | The verification id (used for HD wallets), if not provided, the challenge response will be validated against all active verifications. | [sdk/viem/src/viem.ts:90](https://github.com/settlemint/sdk/blob/v2.1.4/sdk/viem/src/viem.ts#L90) |

## Contributing

We welcome contributions from the community! Please check out our [Contributing](https://github.com/settlemint/sdk/blob/main/.github/CONTRIBUTING.md) guide to learn how you can help improve the SettleMint SDK through bug reports, feature requests, documentation updates, or code contributions.

## License

The SettleMint SDK is released under the [FSL Software License](https://fsl.software). See the [LICENSE](https://github.com/settlemint/sdk/blob/main/LICENSE) file for more details.
