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
    - [getChainId()](#getchainid)
    - [getPublicClient()](#getpublicclient)
    - [getWalletClient()](#getwalletclient)
  - [Enumerations](#enumerations)
    - [OTPAlgorithm](#otpalgorithm)
    - [WalletVerificationType](#walletverificationtype)
  - [Interfaces](#interfaces)
    - [CreateWalletParameters](#createwalletparameters)
    - [CreateWalletResponse](#createwalletresponse)
    - [CreateWalletVerificationChallengeParameters](#createwalletverificationchallengeparameters)
    - [CreateWalletVerificationChallengesParameters](#createwalletverificationchallengesparameters)
    - [CreateWalletVerificationParameters](#createwalletverificationparameters)
    - [CreateWalletVerificationResponse](#createwalletverificationresponse)
    - [DeleteWalletVerificationParameters](#deletewalletverificationparameters)
    - [DeleteWalletVerificationResponse](#deletewalletverificationresponse)
    - [GetWalletVerificationsParameters](#getwalletverificationsparameters)
    - [VerificationResult](#verificationresult)
    - [VerifyWalletVerificationChallengeParameters](#verifywalletverificationchallengeparameters)
    - [WalletInfo](#walletinfo)
    - [WalletOTPVerificationInfo](#walletotpverificationinfo)
    - [WalletPincodeVerificationInfo](#walletpincodeverificationinfo)
    - [WalletSecretCodesVerificationInfo](#walletsecretcodesverificationinfo)
    - [WalletVerification](#walletverification)
    - [WalletVerificationChallenge\<ChallengeData\>](#walletverificationchallengechallengedata)
    - [WalletVerificationChallengeData](#walletverificationchallengedata)
    - [WalletVerificationOptions](#walletverificationoptions)
  - [Type Aliases](#type-aliases)
    - [AddressOrObject\<Extra\>](#addressorobjectextra)
    - [AddressOrObjectWithChallengeId](#addressorobjectwithchallengeid)
    - [ClientOptions](#clientoptions)
    - [CreateWalletVerificationChallengeResponse](#createwalletverificationchallengeresponse)
    - [CreateWalletVerificationChallengesResponse](#createwalletverificationchallengesresponse)
    - [GetChainIdOptions](#getchainidoptions)
    - [GetWalletVerificationsResponse](#getwalletverificationsresponse)
    - [VerifyWalletVerificationChallengeResponse](#verifywalletverificationchallengeresponse)
    - [WalletVerificationInfo](#walletverificationinfo)
  - [Variables](#variables)
    - [ClientOptionsSchema](#clientoptionsschema)
    - [GetChainIdOptionsSchema](#getchainidoptionsschema)
- [Contributing](#contributing)
- [License](#license)

## About

The SettleMint Viem SDK provides a lightweight wrapper that automatically configures and sets up a Viem client based on your connected SettleMint application. It simplifies the process of establishing connections to SettleMint-managed blockchain networks by handling authentication, endpoint configuration, and chain selection. This allows developers to quickly start using Viem's powerful Ethereum interaction capabilities without manual setup, while ensuring proper integration with the SettleMint platform.

## API Reference

### Functions

#### getChainId()

> **getChainId**(`options`): `Promise`\<`number`\>

Defined in: [sdk/viem/src/viem.ts:454](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/viem.ts#L454)

Discovers the chain ID from an RPC endpoint without requiring prior knowledge.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`GetChainIdOptions`](#getchainidoptions) | Minimal options with RPC URL and optional authentication |

##### Returns

`Promise`\<`number`\>

Promise resolving to the network's chain ID as a number

##### Remarks

UTILITY: Enables chain discovery for dynamic network configuration scenarios.
Unlike other client functions, this creates a minimal, non-cached client for one-time queries.

USE CASE: Chain ID discovery during initial network setup or validation.
Alternative to requiring users to know chain IDs in advance.

PERFORMANCE: No caching because chain IDs are typically discovered once
during setup rather than repeatedly during runtime operations.

##### Throws

NetworkError when RPC endpoint is unreachable

##### Throws

AuthenticationError when access token is invalid

##### Example

```ts
import { getChainId } from '@settlemint/sdk-viem';

const chainId = await getChainId({
  accessToken: process.env.SETTLEMINT_ACCESS_TOKEN,
  rpcUrl: process.env.SETTLEMINT_BLOCKCHAIN_NODE_OR_LOAD_BALANCER_JSON_RPC_ENDPOINT!,
});
console.log(chainId);
```

***

#### getPublicClient()

> **getPublicClient**(`options`): `Client`\<`HttpTransport`\<`undefined` \| `RpcSchema`, `boolean`\>, `Chain`, `undefined`, `PublicRpcSchema`, `object` & `PublicActions`\<`HttpTransport`\<`undefined` \| `RpcSchema`, `boolean`\>, `Chain`\>\>

Defined in: [sdk/viem/src/viem.ts:200](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/viem.ts#L200)

Creates an optimized public client for blockchain read operations.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`ClientOptions`](#clientoptions) | Client configuration including chain details and authentication |

##### Returns

`Client`\<`HttpTransport`\<`undefined` \| `RpcSchema`, `boolean`\>, `Chain`, `undefined`, `PublicRpcSchema`, `object` & `PublicActions`\<`HttpTransport`\<`undefined` \| `RpcSchema`, `boolean`\>, `Chain`\>\>

Cached or newly created public client with read-only blockchain access

##### Remarks

PERFORMANCE: Implements intelligent caching to minimize client creation overhead.
Cache hit rates of 80%+ typical in production workloads with repeated chain access.

SECURITY: Each access token gets isolated cache entries to prevent cross-tenant data exposure.
Client instances are immutable once cached to prevent credential pollution.

RESOURCE MANAGEMENT: 500ms polling interval balances responsiveness with server load.
60-second timeout prevents hanging connections in unstable network conditions.

##### Throws

ValidationError when options don't match required schema

##### Throws

NetworkError when RPC endpoint is unreachable during client creation

##### Example

```ts
import { getPublicClient } from '@settlemint/sdk-viem';

const publicClient = getPublicClient({
  accessToken: process.env.SETTLEMINT_ACCESS_TOKEN,
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

> **getWalletClient**(`options`): (`verificationOptions?`) => `Client`\<`HttpTransport`\<`undefined` \| `RpcSchema`, `boolean`\>\>

Defined in: [sdk/viem/src/viem.ts:322](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/viem.ts#L322)

Creates a factory function for wallet clients with runtime verification support.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`ClientOptions`](#clientoptions) | Base client configuration (chain, RPC, auth) |

##### Returns

Factory function that accepts runtime verification options

> (`verificationOptions?`): `Client`\<`HttpTransport`\<`undefined` \| `RpcSchema`, `boolean`\>\>

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `verificationOptions?` | [`WalletVerificationOptions`](#walletverificationoptions) |

###### Returns

`Client`\<`HttpTransport`\<`undefined` \| `RpcSchema`, `boolean`\>\>

##### Remarks

DESIGN PATTERN: Returns a factory function rather than a client instance because
wallet operations require runtime verification parameters (challenge responses, etc.)
that cannot be known at factory creation time.

SECURITY: Verification headers are injected per-operation to support:
- HD wallet challenge/response flows
- Multi-signature verification workflows
- Time-sensitive authentication tokens

PERFORMANCE: Factory caching amortizes expensive setup (chain resolution, transport config)
while allowing runtime parameter injection for each wallet operation.

FEATURE EXTENSIONS: Automatically extends client with SettleMint-specific wallet actions:
- Wallet creation and management
- Verification challenge handling
- Multi-factor authentication flows

##### Throws

ValidationError when options don't match required schema

##### Example

```ts
import { getWalletClient } from '@settlemint/sdk-viem';
import { parseAbi } from "viem";

const walletClient = getWalletClient({
  accessToken: process.env.SETTLEMINT_ACCESS_TOKEN,
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

Defined in: [sdk/viem/src/custom-actions/types/wallet-verification.enum.ts:18](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/types/wallet-verification.enum.ts#L18)

Supported hash algorithms for One-Time Password (OTP) verification.
These algorithms determine the cryptographic function used to generate OTP codes.

##### Enumeration Members

| Enumeration Member | Value | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="sha1"></a> `SHA1` | `"SHA1"` | SHA-1 hash algorithm | [sdk/viem/src/custom-actions/types/wallet-verification.enum.ts:20](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/types/wallet-verification.enum.ts#L20) |
| <a id="sha224"></a> `SHA224` | `"SHA224"` | SHA-224 hash algorithm | [sdk/viem/src/custom-actions/types/wallet-verification.enum.ts:22](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/types/wallet-verification.enum.ts#L22) |
| <a id="sha256"></a> `SHA256` | `"SHA256"` | SHA-256 hash algorithm | [sdk/viem/src/custom-actions/types/wallet-verification.enum.ts:24](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/types/wallet-verification.enum.ts#L24) |
| <a id="sha3_224"></a> `SHA3_224` | `"SHA3-224"` | SHA3-224 hash algorithm | [sdk/viem/src/custom-actions/types/wallet-verification.enum.ts:30](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/types/wallet-verification.enum.ts#L30) |
| <a id="sha3_256"></a> `SHA3_256` | `"SHA3-256"` | SHA3-256 hash algorithm | [sdk/viem/src/custom-actions/types/wallet-verification.enum.ts:32](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/types/wallet-verification.enum.ts#L32) |
| <a id="sha3_384"></a> `SHA3_384` | `"SHA3-384"` | SHA3-384 hash algorithm | [sdk/viem/src/custom-actions/types/wallet-verification.enum.ts:34](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/types/wallet-verification.enum.ts#L34) |
| <a id="sha3_512"></a> `SHA3_512` | `"SHA3-512"` | SHA3-512 hash algorithm | [sdk/viem/src/custom-actions/types/wallet-verification.enum.ts:36](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/types/wallet-verification.enum.ts#L36) |
| <a id="sha384"></a> `SHA384` | `"SHA384"` | SHA-384 hash algorithm | [sdk/viem/src/custom-actions/types/wallet-verification.enum.ts:26](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/types/wallet-verification.enum.ts#L26) |
| <a id="sha512"></a> `SHA512` | `"SHA512"` | SHA-512 hash algorithm | [sdk/viem/src/custom-actions/types/wallet-verification.enum.ts:28](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/types/wallet-verification.enum.ts#L28) |

***

#### WalletVerificationType

Defined in: [sdk/viem/src/custom-actions/types/wallet-verification.enum.ts:5](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/types/wallet-verification.enum.ts#L5)

Types of wallet verification methods supported by the system.
Used to identify different verification mechanisms when creating or managing wallet verifications.

##### Enumeration Members

| Enumeration Member | Value | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="otp"></a> `OTP` | `"OTP"` | One-Time Password verification method | [sdk/viem/src/custom-actions/types/wallet-verification.enum.ts:9](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/types/wallet-verification.enum.ts#L9) |
| <a id="pincode"></a> `PINCODE` | `"PINCODE"` | PIN code verification method | [sdk/viem/src/custom-actions/types/wallet-verification.enum.ts:7](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/types/wallet-verification.enum.ts#L7) |
| <a id="secret_codes"></a> `SECRET_CODES` | `"SECRET_CODES"` | Secret recovery codes verification method | [sdk/viem/src/custom-actions/types/wallet-verification.enum.ts:11](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/types/wallet-verification.enum.ts#L11) |

### Interfaces

#### CreateWalletParameters

Defined in: [sdk/viem/src/custom-actions/create-wallet.action.ts:16](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/create-wallet.action.ts#L16)

Parameters for creating a wallet.

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="keyvaultid"></a> `keyVaultId` | `string` | The unique name of the key vault where the wallet will be created. | [sdk/viem/src/custom-actions/create-wallet.action.ts:18](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/create-wallet.action.ts#L18) |
| <a id="walletinfo"></a> `walletInfo` | [`WalletInfo`](#walletinfo-1) | Information about the wallet to be created. | [sdk/viem/src/custom-actions/create-wallet.action.ts:20](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/create-wallet.action.ts#L20) |

***

#### CreateWalletResponse

Defined in: [sdk/viem/src/custom-actions/create-wallet.action.ts:26](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/create-wallet.action.ts#L26)

Response from creating a wallet.

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="address"></a> `address` | `string` | The blockchain address of the wallet. | [sdk/viem/src/custom-actions/create-wallet.action.ts:32](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/create-wallet.action.ts#L32) |
| <a id="derivationpath"></a> `derivationPath` | `string` | The HD derivation path used to create the wallet. | [sdk/viem/src/custom-actions/create-wallet.action.ts:34](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/create-wallet.action.ts#L34) |
| <a id="id"></a> `id` | `string` | The unique identifier of the wallet. | [sdk/viem/src/custom-actions/create-wallet.action.ts:28](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/create-wallet.action.ts#L28) |
| <a id="name"></a> `name` | `string` | The name of the wallet. | [sdk/viem/src/custom-actions/create-wallet.action.ts:30](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/create-wallet.action.ts#L30) |

***

#### CreateWalletVerificationChallengeParameters

Defined in: [sdk/viem/src/custom-actions/create-wallet-verification-challenge.action.ts:7](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/create-wallet-verification-challenge.action.ts#L7)

Parameters for creating wallet verification challenges.

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="userwalletaddress"></a> `userWalletAddress` | `string` | The wallet address. | [sdk/viem/src/custom-actions/create-wallet-verification-challenge.action.ts:9](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/create-wallet-verification-challenge.action.ts#L9) |
| <a id="verificationid"></a> `verificationId` | `string` | The verification ID. | [sdk/viem/src/custom-actions/create-wallet-verification-challenge.action.ts:11](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/create-wallet-verification-challenge.action.ts#L11) |

***

#### CreateWalletVerificationChallengesParameters

Defined in: [sdk/viem/src/custom-actions/create-wallet-verification-challenges.action.ts:8](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/create-wallet-verification-challenges.action.ts#L8)

Parameters for creating wallet verification challenges.

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="addressorobject"></a> `addressOrObject` | [`AddressOrObject`](#addressorobject-2)\<\{ `amount?`: `number`; \}\> | The wallet address or object containing wallet address and optional verification ID. | [sdk/viem/src/custom-actions/create-wallet-verification-challenges.action.ts:10](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/create-wallet-verification-challenges.action.ts#L10) |

***

#### CreateWalletVerificationParameters

Defined in: [sdk/viem/src/custom-actions/create-wallet-verification.action.ts:59](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/create-wallet-verification.action.ts#L59)

Parameters for creating a wallet verification.

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="userwalletaddress-1"></a> `userWalletAddress` | `string` | The wallet address for which to create the verification. | [sdk/viem/src/custom-actions/create-wallet-verification.action.ts:61](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/create-wallet-verification.action.ts#L61) |
| <a id="walletverificationinfo"></a> `walletVerificationInfo` | [`WalletVerificationInfo`](#walletverificationinfo-1) | The verification information to create. | [sdk/viem/src/custom-actions/create-wallet-verification.action.ts:63](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/create-wallet-verification.action.ts#L63) |

***

#### CreateWalletVerificationResponse

Defined in: [sdk/viem/src/custom-actions/create-wallet-verification.action.ts:69](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/create-wallet-verification.action.ts#L69)

Response from creating a wallet verification.

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id-1"></a> `id` | `string` | The unique identifier of the verification. | [sdk/viem/src/custom-actions/create-wallet-verification.action.ts:71](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/create-wallet-verification.action.ts#L71) |
| <a id="name-1"></a> `name` | `string` | The name of the verification method. | [sdk/viem/src/custom-actions/create-wallet-verification.action.ts:73](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/create-wallet-verification.action.ts#L73) |
| <a id="parameters"></a> `parameters` | `Record`\<`string`, `string`\> | Additional parameters specific to the verification type. | [sdk/viem/src/custom-actions/create-wallet-verification.action.ts:77](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/create-wallet-verification.action.ts#L77) |
| <a id="verificationtype"></a> `verificationType` | [`WalletVerificationType`](#walletverificationtype) | The type of verification method. | [sdk/viem/src/custom-actions/create-wallet-verification.action.ts:75](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/create-wallet-verification.action.ts#L75) |

***

#### DeleteWalletVerificationParameters

Defined in: [sdk/viem/src/custom-actions/delete-wallet-verification.action.ts:6](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/delete-wallet-verification.action.ts#L6)

Parameters for deleting a wallet verification.

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="userwalletaddress-2"></a> `userWalletAddress` | `string` | The wallet address for which to delete the verification. | [sdk/viem/src/custom-actions/delete-wallet-verification.action.ts:8](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/delete-wallet-verification.action.ts#L8) |
| <a id="verificationid-1"></a> `verificationId` | `string` | The unique identifier of the verification to delete. | [sdk/viem/src/custom-actions/delete-wallet-verification.action.ts:10](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/delete-wallet-verification.action.ts#L10) |

***

#### DeleteWalletVerificationResponse

Defined in: [sdk/viem/src/custom-actions/delete-wallet-verification.action.ts:16](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/delete-wallet-verification.action.ts#L16)

Response from deleting a wallet verification.

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="success"></a> `success` | `boolean` | Whether the deletion was successful. | [sdk/viem/src/custom-actions/delete-wallet-verification.action.ts:18](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/delete-wallet-verification.action.ts#L18) |

***

#### GetWalletVerificationsParameters

Defined in: [sdk/viem/src/custom-actions/get-wallet-verifications.action.ts:7](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/get-wallet-verifications.action.ts#L7)

Parameters for getting wallet verifications.

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="userwalletaddress-3"></a> `userWalletAddress` | `string` | The wallet address for which to fetch verifications. | [sdk/viem/src/custom-actions/get-wallet-verifications.action.ts:9](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/get-wallet-verifications.action.ts#L9) |

***

#### VerificationResult

Defined in: [sdk/viem/src/custom-actions/verify-wallet-verification-challenge.action.ts:38](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/verify-wallet-verification-challenge.action.ts#L38)

Result of a wallet verification challenge.

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="verified"></a> `verified` | `boolean` | Whether the verification was successful. | [sdk/viem/src/custom-actions/verify-wallet-verification-challenge.action.ts:40](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/verify-wallet-verification-challenge.action.ts#L40) |

***

#### VerifyWalletVerificationChallengeParameters

Defined in: [sdk/viem/src/custom-actions/verify-wallet-verification-challenge.action.ts:28](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/verify-wallet-verification-challenge.action.ts#L28)

Parameters for verifying a wallet verification challenge.

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="addressorobject-1"></a> `addressOrObject` | [`AddressOrObjectWithChallengeId`](#addressorobjectwithchallengeid) | The wallet address or object containing wallet address and optional verification ID. | [sdk/viem/src/custom-actions/verify-wallet-verification-challenge.action.ts:30](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/verify-wallet-verification-challenge.action.ts#L30) |
| <a id="challengeresponse"></a> `challengeResponse` | `string` | The response to the verification challenge. | [sdk/viem/src/custom-actions/verify-wallet-verification-challenge.action.ts:32](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/verify-wallet-verification-challenge.action.ts#L32) |

***

#### WalletInfo

Defined in: [sdk/viem/src/custom-actions/create-wallet.action.ts:6](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/create-wallet.action.ts#L6)

Information about the wallet to be created.

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="name-2"></a> `name` | `string` | The name of the wallet. | [sdk/viem/src/custom-actions/create-wallet.action.ts:8](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/create-wallet.action.ts#L8) |
| <a id="walletindex"></a> `walletIndex?` | `number` | Optional index for the wallet, walletIndex enables HD derivation paths | [sdk/viem/src/custom-actions/create-wallet.action.ts:10](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/create-wallet.action.ts#L10) |

***

#### WalletOTPVerificationInfo

Defined in: [sdk/viem/src/custom-actions/create-wallet-verification.action.ts:27](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/create-wallet-verification.action.ts#L27)

Information for One-Time Password (OTP) verification.

##### Extends

- `BaseWalletVerificationInfo`

##### Properties

| Property | Type | Description | Overrides | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="algorithm"></a> `algorithm?` | [`OTPAlgorithm`](#otpalgorithm) | The hash algorithm to use for OTP generation. | - | - | [sdk/viem/src/custom-actions/create-wallet-verification.action.ts:31](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/create-wallet-verification.action.ts#L31) |
| <a id="digits"></a> `digits?` | `number` | The number of digits in the OTP code. | - | - | [sdk/viem/src/custom-actions/create-wallet-verification.action.ts:33](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/create-wallet-verification.action.ts#L33) |
| <a id="issuer"></a> `issuer?` | `string` | The issuer of the OTP. | - | - | [sdk/viem/src/custom-actions/create-wallet-verification.action.ts:37](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/create-wallet-verification.action.ts#L37) |
| <a id="name-3"></a> `name` | `string` | The name of the verification method. | - | `BaseWalletVerificationInfo.name` | [sdk/viem/src/custom-actions/create-wallet-verification.action.ts:9](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/create-wallet-verification.action.ts#L9) |
| <a id="period"></a> `period?` | `number` | The time period in seconds for OTP validity. | - | - | [sdk/viem/src/custom-actions/create-wallet-verification.action.ts:35](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/create-wallet-verification.action.ts#L35) |
| <a id="verificationtype-1"></a> `verificationType` | [`OTP`](#otp) | The type of verification method. | `BaseWalletVerificationInfo.verificationType` | - | [sdk/viem/src/custom-actions/create-wallet-verification.action.ts:29](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/create-wallet-verification.action.ts#L29) |

***

#### WalletPincodeVerificationInfo

Defined in: [sdk/viem/src/custom-actions/create-wallet-verification.action.ts:17](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/create-wallet-verification.action.ts#L17)

Information for PIN code verification.

##### Extends

- `BaseWalletVerificationInfo`

##### Properties

| Property | Type | Description | Overrides | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="name-4"></a> `name` | `string` | The name of the verification method. | - | `BaseWalletVerificationInfo.name` | [sdk/viem/src/custom-actions/create-wallet-verification.action.ts:9](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/create-wallet-verification.action.ts#L9) |
| <a id="pincode-1"></a> `pincode` | `string` | The PIN code to use for verification. | - | - | [sdk/viem/src/custom-actions/create-wallet-verification.action.ts:21](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/create-wallet-verification.action.ts#L21) |
| <a id="verificationtype-2"></a> `verificationType` | [`PINCODE`](#pincode) | The type of verification method. | `BaseWalletVerificationInfo.verificationType` | - | [sdk/viem/src/custom-actions/create-wallet-verification.action.ts:19](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/create-wallet-verification.action.ts#L19) |

***

#### WalletSecretCodesVerificationInfo

Defined in: [sdk/viem/src/custom-actions/create-wallet-verification.action.ts:43](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/create-wallet-verification.action.ts#L43)

Information for secret recovery codes verification.

##### Extends

- `BaseWalletVerificationInfo`

##### Properties

| Property | Type | Description | Overrides | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="name-5"></a> `name` | `string` | The name of the verification method. | - | `BaseWalletVerificationInfo.name` | [sdk/viem/src/custom-actions/create-wallet-verification.action.ts:9](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/create-wallet-verification.action.ts#L9) |
| <a id="verificationtype-3"></a> `verificationType` | [`SECRET_CODES`](#secret_codes) | The type of verification method. | `BaseWalletVerificationInfo.verificationType` | - | [sdk/viem/src/custom-actions/create-wallet-verification.action.ts:45](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/create-wallet-verification.action.ts#L45) |

***

#### WalletVerification

Defined in: [sdk/viem/src/custom-actions/get-wallet-verifications.action.ts:15](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/get-wallet-verifications.action.ts#L15)

Represents a wallet verification.

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id-2"></a> `id` | `string` | The unique identifier of the verification. | [sdk/viem/src/custom-actions/get-wallet-verifications.action.ts:17](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/get-wallet-verifications.action.ts#L17) |
| <a id="name-6"></a> `name` | `string` | The name of the verification method. | [sdk/viem/src/custom-actions/get-wallet-verifications.action.ts:19](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/get-wallet-verifications.action.ts#L19) |
| <a id="verificationtype-4"></a> `verificationType` | [`WalletVerificationType`](#walletverificationtype) | The type of verification method. | [sdk/viem/src/custom-actions/get-wallet-verifications.action.ts:21](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/get-wallet-verifications.action.ts#L21) |

***

#### WalletVerificationChallenge\<ChallengeData\>

Defined in: [sdk/viem/src/custom-actions/types/wallet-verification-challenge.ts:6](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/types/wallet-verification-challenge.ts#L6)

Represents a wallet verification challenge.

##### Type Parameters

| Type Parameter |
| ------ |
| `ChallengeData` |

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="challenge"></a> `challenge` | `ChallengeData` | The challenge parameters specific to the verification type. | [sdk/viem/src/custom-actions/types/wallet-verification-challenge.ts:16](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/types/wallet-verification-challenge.ts#L16) |
| <a id="id-3"></a> `id` | `string` | The unique identifier of the challenge. | [sdk/viem/src/custom-actions/types/wallet-verification-challenge.ts:8](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/types/wallet-verification-challenge.ts#L8) |
| <a id="name-7"></a> `name` | `string` | The name of the challenge. | [sdk/viem/src/custom-actions/types/wallet-verification-challenge.ts:10](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/types/wallet-verification-challenge.ts#L10) |
| <a id="verificationid-2"></a> `verificationId` | `string` | The verification ID. | [sdk/viem/src/custom-actions/types/wallet-verification-challenge.ts:12](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/types/wallet-verification-challenge.ts#L12) |
| <a id="verificationtype-5"></a> `verificationType` | [`WalletVerificationType`](#walletverificationtype) | The type of verification required. | [sdk/viem/src/custom-actions/types/wallet-verification-challenge.ts:14](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/types/wallet-verification-challenge.ts#L14) |

***

#### WalletVerificationChallengeData

Defined in: [sdk/viem/src/custom-actions/create-wallet-verification-challenge.action.ts:17](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/create-wallet-verification-challenge.action.ts#L17)

Data specific to a wallet verification challenge.

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="salt"></a> `salt?` | `string` | Optional salt for PINCODE verification type. | [sdk/viem/src/custom-actions/create-wallet-verification-challenge.action.ts:19](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/create-wallet-verification-challenge.action.ts#L19) |
| <a id="secret"></a> `secret?` | `string` | Optional secret for PINCODE verification type. | [sdk/viem/src/custom-actions/create-wallet-verification-challenge.action.ts:21](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/create-wallet-verification-challenge.action.ts#L21) |

***

#### WalletVerificationOptions

Defined in: [sdk/viem/src/viem.ts:255](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/viem.ts#L255)

The options for the wallet client.

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="challengeid"></a> `challengeId?` | `string` | The challenge id (used for HD wallets) | [sdk/viem/src/viem.ts:263](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/viem.ts#L263) |
| <a id="challengeresponse-1"></a> `challengeResponse` | `string` | The challenge response (used for HD wallets) | [sdk/viem/src/viem.ts:267](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/viem.ts#L267) |
| <a id="verificationid-3"></a> `verificationId?` | `string` | The verification id (used for HD wallets), if not provided, the challenge response will be validated against all active verifications. | [sdk/viem/src/viem.ts:259](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/viem.ts#L259) |

### Type Aliases

#### AddressOrObject\<Extra\>

> **AddressOrObject**\<`Extra`\> = `string` \| `object` & `Extra`

Defined in: [sdk/viem/src/custom-actions/verify-wallet-verification-challenge.action.ts:8](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/verify-wallet-verification-challenge.action.ts#L8)

Represents either a wallet address string or an object containing wallet address and optional verification ID.

##### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `Extra` | `object` |

***

#### AddressOrObjectWithChallengeId

> **AddressOrObjectWithChallengeId** = [`AddressOrObject`](#addressorobject-2) \| \{ `challengeId`: `string`; \}

Defined in: [sdk/viem/src/custom-actions/verify-wallet-verification-challenge.action.ts:18](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/verify-wallet-verification-challenge.action.ts#L18)

Represents either a wallet address string, an object containing wallet address and optional verification ID or a challenge ID.

##### Type Declaration

[`AddressOrObject`](#addressorobject-2)

\{ `challengeId`: `string`; \}

| Name | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `challengeId` | `string` | ID of the challenge to verify against | [sdk/viem/src/custom-actions/verify-wallet-verification-challenge.action.ts:22](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/verify-wallet-verification-challenge.action.ts#L22) |

***

#### ClientOptions

> **ClientOptions** = `Omit`\<`z.infer`\<*typeof* [`ClientOptionsSchema`](#clientoptionsschema)\>, `"httpTransportConfig"`\> & `object`

Defined in: [sdk/viem/src/viem.ts:162](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/viem.ts#L162)

Type representing the validated client options.

##### Type Declaration

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `httpTransportConfig?` | `HttpTransportConfig` | [sdk/viem/src/viem.ts:163](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/viem.ts#L163) |

***

#### CreateWalletVerificationChallengeResponse

> **CreateWalletVerificationChallengeResponse** = [`WalletVerificationChallenge`](#walletverificationchallenge)\<[`WalletVerificationChallengeData`](#walletverificationchallengedata)\>

Defined in: [sdk/viem/src/custom-actions/create-wallet-verification-challenge.action.ts:27](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/create-wallet-verification-challenge.action.ts#L27)

Response from creating wallet verification challenge.

***

#### CreateWalletVerificationChallengesResponse

> **CreateWalletVerificationChallengesResponse** = `Omit`\<[`WalletVerificationChallenge`](#walletverificationchallenge)\<`Record`\<`string`, `string`\>\>, `"verificationId"`\>[]

Defined in: [sdk/viem/src/custom-actions/create-wallet-verification-challenges.action.ts:16](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/create-wallet-verification-challenges.action.ts#L16)

Response from creating wallet verification challenges.

***

#### GetChainIdOptions

> **GetChainIdOptions** = `Omit`\<`z.infer`\<*typeof* [`GetChainIdOptionsSchema`](#getchainidoptionsschema)\>, `"httpTransportConfig"`\> & `object`

Defined in: [sdk/viem/src/viem.ts:421](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/viem.ts#L421)

Type representing the validated get chain id options.

##### Type Declaration

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `httpTransportConfig?` | `HttpTransportConfig` | [sdk/viem/src/viem.ts:422](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/viem.ts#L422) |

***

#### GetWalletVerificationsResponse

> **GetWalletVerificationsResponse** = [`WalletVerification`](#walletverification)[]

Defined in: [sdk/viem/src/custom-actions/get-wallet-verifications.action.ts:27](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/get-wallet-verifications.action.ts#L27)

Response from getting wallet verifications.

***

#### VerifyWalletVerificationChallengeResponse

> **VerifyWalletVerificationChallengeResponse** = [`VerificationResult`](#verificationresult)[]

Defined in: [sdk/viem/src/custom-actions/verify-wallet-verification-challenge.action.ts:46](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/verify-wallet-verification-challenge.action.ts#L46)

Response from verifying a wallet verification challenge.

***

#### WalletVerificationInfo

> **WalletVerificationInfo** = [`WalletPincodeVerificationInfo`](#walletpincodeverificationinfo) \| [`WalletOTPVerificationInfo`](#walletotpverificationinfo) \| [`WalletSecretCodesVerificationInfo`](#walletsecretcodesverificationinfo)

Defined in: [sdk/viem/src/custom-actions/create-wallet-verification.action.ts:51](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/custom-actions/create-wallet-verification.action.ts#L51)

Union type of all possible wallet verification information types.

### Variables

#### ClientOptionsSchema

> `const` **ClientOptionsSchema**: `ZodObject`\<\{ `accessToken`: `ZodOptional`\<`ZodString`\>; `chainId`: `ZodString`; `chainName`: `ZodString`; `httpTransportConfig`: `ZodOptional`\<`ZodAny`\>; `rpcUrl`: `ZodUnion`\<readonly \[`ZodString`, `ZodString`\]\>; \}, `$strip`\>

Defined in: [sdk/viem/src/viem.ts:136](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/viem.ts#L136)

Schema for the viem client options.

***

#### GetChainIdOptionsSchema

> `const` **GetChainIdOptionsSchema**: `ZodObject`\<\{ `accessToken`: `ZodOptional`\<`ZodString`\>; `httpTransportConfig`: `ZodOptional`\<`ZodAny`\>; `rpcUrl`: `ZodUnion`\<readonly \[`ZodString`, `ZodString`\]\>; \}, `$strip`\>

Defined in: [sdk/viem/src/viem.ts:403](https://github.com/settlemint/sdk/blob/v2.6.1/sdk/viem/src/viem.ts#L403)

Schema for the viem client options.

## Contributing

We welcome contributions from the community! Please check out our [Contributing](https://github.com/settlemint/sdk/blob/main/.github/CONTRIBUTING.md) guide to learn how you can help improve the SettleMint SDK through bug reports, feature requests, documentation updates, or code contributions.

## License

The SettleMint SDK is released under the [FSL Software License](https://fsl.software). See the [LICENSE](https://github.com/settlemint/sdk/blob/main/LICENSE) file for more details.
