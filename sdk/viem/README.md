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
    - [CreateWalletParameters](#createwalletparameters)
    - [CreateWalletResponse](#createwalletresponse)
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
    - [WalletVerificationChallenge](#walletverificationchallenge)
    - [WalletVerificationOptions](#walletverificationoptions)
  - [Type Aliases](#type-aliases)
    - [AddressOrObject](#addressorobject)
    - [CreateWalletVerificationChallengesResponse](#createwalletverificationchallengesresponse)
    - [GetWalletVerificationsResponse](#getwalletverificationsresponse)
    - [VerifyWalletVerificationChallengeResponse](#verifywalletverificationchallengeresponse)
    - [WalletVerificationInfo](#walletverificationinfo)
- [Contributing](#contributing)
- [License](#license)

## About

The SettleMint Viem SDK provides a lightweight wrapper that automatically configures and sets up a Viem client based on your connected SettleMint application. It simplifies the process of establishing connections to SettleMint-managed blockchain networks by handling authentication, endpoint configuration, and chain selection. This allows developers to quickly start using Viem's powerful Ethereum interaction capabilities without manual setup, while ensuring proper integration with the SettleMint platform.

## API Reference

### Functions

#### getPublicClient()

> **getPublicClient**(`options`): `object`

Defined in: [sdk/viem/src/viem.ts:66](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/viem.ts#L66)

Get a public client. Use this if you need to read from the blockchain.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`ClientOptions`](#clientoptions) | The options for the public client. |

##### Returns

The public client.

| Name | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `account` | `undefined` | The Account of the Client. | node\_modules/viem/\_types/clients/createClient.d.ts:63 |
| `batch?` | `object` | Flags for batch settings. | node\_modules/viem/\_types/clients/createClient.d.ts:65 |
| `batch.multicall?` | `boolean` \| \{ `batchSize?`: `number`; `wait?`: `number`; \} | Toggle to enable `eth_call` multicall aggregation. | node\_modules/viem/\_types/clients/createClient.d.ts:19 |
| `cacheTime` | `number` | Time (in ms) that cached data will remain in memory. | node\_modules/viem/\_types/clients/createClient.d.ts:67 |
| `call()` | (`parameters`) => `Promise`\<`CallReturnType`\> | Executes a new message call immediately without submitting a transaction to the network. - Docs: https://viem.sh/docs/actions/public/call - JSON-RPC Methods: [`eth_call`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_call) **Example** `import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const data = await client.call({ account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', })` | node\_modules/viem/\_types/clients/decorators/public.d.ts:86 |
| `ccipRead?` | `false` \| \{ `request?`: (`parameters`) => `Promise`\<`` `0x${string}` ``\>; \} | [CCIP Read](https://eips.ethereum.org/EIPS/eip-3668) configuration. | node\_modules/viem/\_types/clients/createClient.d.ts:69 |
| `chain` | `Chain` | Chain for the client. | node\_modules/viem/\_types/clients/createClient.d.ts:71 |
| `createAccessList()` | (`parameters`) => `Promise`\<\{ `accessList`: `AccessList`; `gasUsed`: `bigint`; \}\> | Creates an EIP-2930 access list that you can include in a transaction. - Docs: https://viem.sh/docs/actions/public/createAccessList - JSON-RPC Methods: `eth_createAccessList` **Example** `import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const data = await client.createAccessList({ data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', })` | node\_modules/viem/\_types/clients/decorators/public.d.ts:110 |
| `createBlockFilter()` | () => `Promise`\<\{ `id`: `` `0x${string}` ``; `request`: `EIP1193RequestFn`\<readonly \[\{ `Method`: `"eth_getFilterChanges"`; `Parameters`: \[`` `0x${string}` ``\]; `ReturnType`: `` `0x${string}` ``[] \| `RpcLog`[]; \}, \{ `Method`: `"eth_getFilterLogs"`; `Parameters`: \[`` `0x${string}` ``\]; `ReturnType`: `RpcLog`[]; \}, \{ `Method`: `"eth_uninstallFilter"`; `Parameters`: \[`` `0x${string}` ``\]; `ReturnType`: `boolean`; \}\]\>; `type`: `"block"`; \}\> | Creates a Filter to listen for new block hashes that can be used with [`getFilterChanges`](https://viem.sh/docs/actions/public/getFilterChanges). - Docs: https://viem.sh/docs/actions/public/createBlockFilter - JSON-RPC Methods: [`eth_newBlockFilter`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_newBlockFilter) **Example** `import { createPublicClient, createBlockFilter, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const filter = await createBlockFilter(client) // { id: "0x345a6572337856574a76364e457a4366", type: 'block' }` | node\_modules/viem/\_types/clients/decorators/public.d.ts:130 |
| `createContractEventFilter()` | \<`abi`, `eventName`, `args`, `strict`, `fromBlock`, `toBlock`\>(`args`) => `Promise`\<`CreateContractEventFilterReturnType`\<`abi`, `eventName`, `args`, `strict`, `fromBlock`, `toBlock`\>\> | Creates a Filter to retrieve event logs that can be used with [`getFilterChanges`](https://viem.sh/docs/actions/public/getFilterChanges) or [`getFilterLogs`](https://viem.sh/docs/actions/public/getFilterLogs). - Docs: https://viem.sh/docs/contract/createContractEventFilter **Example** `import { createPublicClient, http, parseAbi } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const filter = await client.createContractEventFilter({ abi: parseAbi(['event Transfer(address indexed, address indexed, uint256)']), })` | node\_modules/viem/\_types/clients/decorators/public.d.ts:151 |
| `createEventFilter()` | \<`abiEvent`, `abiEvents`, `strict`, `fromBlock`, `toBlock`, `_EventName`, `_Args`\>(`args?`) => `Promise`\<\{ \[K in string \| number \| symbol\]: Filter\<"event", abiEvents, \_EventName, \_Args, strict, fromBlock, toBlock\>\[K\] \}\> | Creates a [`Filter`](https://viem.sh/docs/glossary/types#filter) to listen for new events that can be used with [`getFilterChanges`](https://viem.sh/docs/actions/public/getFilterChanges). - Docs: https://viem.sh/docs/actions/public/createEventFilter - JSON-RPC Methods: [`eth_newFilter`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_newfilter) **Example** `import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const filter = await client.createEventFilter({ address: '0xfba3912ca04dd458c843e2ee08967fc04f3579c2', })` | node\_modules/viem/\_types/clients/decorators/public.d.ts:173 |
| `createPendingTransactionFilter()` | () => `Promise`\<\{ `id`: `` `0x${string}` ``; `request`: `EIP1193RequestFn`\<readonly \[\{ `Method`: `"eth_getFilterChanges"`; `Parameters`: \[`` `0x${string}` ``\]; `ReturnType`: `` `0x${string}` ``[] \| `RpcLog`[]; \}, \{ `Method`: `"eth_getFilterLogs"`; `Parameters`: \[`` `0x${string}` ``\]; `ReturnType`: `RpcLog`[]; \}, \{ `Method`: `"eth_uninstallFilter"`; `Parameters`: \[`` `0x${string}` ``\]; `ReturnType`: `boolean`; \}\]\>; `type`: `"transaction"`; \}\> | Creates a Filter to listen for new pending transaction hashes that can be used with [`getFilterChanges`](https://viem.sh/docs/actions/public/getFilterChanges). - Docs: https://viem.sh/docs/actions/public/createPendingTransactionFilter - JSON-RPC Methods: [`eth_newPendingTransactionFilter`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_newpendingtransactionfilter) **Example** `import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const filter = await client.createPendingTransactionFilter() // { id: "0x345a6572337856574a76364e457a4366", type: 'transaction' }` | node\_modules/viem/\_types/clients/decorators/public.d.ts:193 |
| `estimateContractGas()` | \<`chain`, `abi`, `functionName`, `args`\>(`args`) => `Promise`\<`bigint`\> | Estimates the gas required to successfully execute a contract write function call. - Docs: https://viem.sh/docs/contract/estimateContractGas **Remarks** Internally, uses a [Public Client](https://viem.sh/docs/clients/public) to call the [`estimateGas` action](https://viem.sh/docs/actions/public/estimateGas) with [ABI-encoded `data`](https://viem.sh/docs/contract/encodeFunctionData). **Example** `import { createPublicClient, http, parseAbi } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const gas = await client.estimateContractGas({ address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', abi: parseAbi(['function mint() public']), functionName: 'mint', account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', })` | node\_modules/viem/\_types/clients/decorators/public.d.ts:220 |
| `estimateFeesPerGas()` | \<`chainOverride`, `type`\>(`args?`) => `Promise`\<`EstimateFeesPerGasReturnType`\<`type`\>\> | Returns an estimate for the fees per gas for a transaction to be included in the next block. - Docs: https://viem.sh/docs/actions/public/estimateFeesPerGas **Example** `import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const maxPriorityFeePerGas = await client.estimateFeesPerGas() // { maxFeePerGas: ..., maxPriorityFeePerGas: ... }` | node\_modules/viem/\_types/clients/decorators/public.d.ts:658 |
| `estimateGas()` | (`args`) => `Promise`\<`bigint`\> | Estimates the gas necessary to complete a transaction without submitting it to the network. - Docs: https://viem.sh/docs/actions/public/estimateGas - JSON-RPC Methods: [`eth_estimateGas`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_estimategas) **Example** `import { createPublicClient, http, parseEther } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const gasEstimate = await client.estimateGas({ account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', value: parseEther('1'), })` | node\_modules/viem/\_types/clients/decorators/public.d.ts:244 |
| `estimateMaxPriorityFeePerGas()` | \<`chainOverride`\>(`args?`) => `Promise`\<`bigint`\> | Returns an estimate for the max priority fee per gas (in wei) for a transaction to be included in the next block. - Docs: https://viem.sh/docs/actions/public/estimateMaxPriorityFeePerGas **Example** `import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const maxPriorityFeePerGas = await client.estimateMaxPriorityFeePerGas() // 10000000n` | node\_modules/viem/\_types/clients/decorators/public.d.ts:850 |
| `extend()` | \<`client`\>(`fn`) => `Client`\<`HttpTransport`\<`undefined` \| `RpcSchema`, `boolean`\>, `Chain`, `undefined`, `PublicRpcSchema`, \{ \[K in string \| number \| symbol\]: client\[K\] \} & `PublicActions`\<`HttpTransport`\<`undefined` \| `RpcSchema`, `boolean`\>, `Chain`\>\> | - | node\_modules/viem/\_types/clients/createClient.d.ts:59 |
| `getBalance()` | (`args`) => `Promise`\<`bigint`\> | Returns the balance of an address in wei. - Docs: https://viem.sh/docs/actions/public/getBalance - JSON-RPC Methods: [`eth_getBalance`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getbalance) **Remarks** You can convert the balance to ether units with [`formatEther`](https://viem.sh/docs/utilities/formatEther). `const balance = await getBalance(client, { address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', blockTag: 'safe' }) const balanceAsEther = formatEther(balance) // "6.942"` **Example** `import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const balance = await client.getBalance({ address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', }) // 10000000000000000000000n (wei)` | node\_modules/viem/\_types/clients/decorators/public.d.ts:279 |
| `getBlobBaseFee()` | () => `Promise`\<`bigint`\> | Returns the base fee per blob gas in wei. - Docs: https://viem.sh/docs/actions/public/getBlobBaseFee - JSON-RPC Methods: [`eth_blobBaseFee`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_blobBaseFee) **Example** `import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' import { getBlobBaseFee } from 'viem/public' const client = createPublicClient({ chain: mainnet, transport: http(), }) const blobBaseFee = await client.getBlobBaseFee()` | node\_modules/viem/\_types/clients/decorators/public.d.ts:300 |
| `getBlock()` | \<`includeTransactions`, `blockTag`\>(`args?`) => `Promise`\<\{ `baseFeePerGas`: `null` \| `bigint`; `blobGasUsed`: `bigint`; `difficulty`: `bigint`; `excessBlobGas`: `bigint`; `extraData`: `` `0x${string}` ``; `gasLimit`: `bigint`; `gasUsed`: `bigint`; `hash`: `blockTag` *extends* `"pending"` ? `null` : `` `0x${string}` ``; `logsBloom`: `blockTag` *extends* `"pending"` ? `null` : `` `0x${string}` ``; `miner`: `` `0x${string}` ``; `mixHash`: `` `0x${string}` ``; `nonce`: `blockTag` *extends* `"pending"` ? `null` : `` `0x${string}` ``; `number`: `blockTag` *extends* `"pending"` ? `null` : `bigint`; `parentBeaconBlockRoot?`: `` `0x${string}` ``; `parentHash`: `` `0x${string}` ``; `receiptsRoot`: `` `0x${string}` ``; `sealFields`: `` `0x${string}` ``[]; `sha3Uncles`: `` `0x${string}` ``; `size`: `bigint`; `stateRoot`: `` `0x${string}` ``; `timestamp`: `bigint`; `totalDifficulty`: `null` \| `bigint`; `transactions`: `includeTransactions` *extends* `true` ? (\{ `accessList?`: `undefined`; `authorizationList?`: `undefined`; `blobVersionedHashes?`: `undefined`; `blockHash`: `blockTag` *extends* `"pending"` ? `true` : `false` *extends* `true` ? `null` : `` `0x${string}` ``; `blockNumber`: `blockTag` *extends* `"pending"` ? `true` : `false` *extends* `true` ? `null` : `bigint`; `chainId?`: `number`; `from`: `` `0x${string}` ``; `gas`: `bigint`; `gasPrice`: `bigint`; `hash`: `` `0x${string}` ``; `input`: `` `0x${string}` ``; `maxFeePerBlobGas?`: `undefined`; `maxFeePerGas?`: `undefined`; `maxPriorityFeePerGas?`: `undefined`; `nonce`: `number`; `r`: `` `0x${string}` ``; `s`: `` `0x${string}` ``; `to`: `null` \| `` `0x${string}` ``; `transactionIndex`: `blockTag` *extends* `"pending"` ? `true` : `false` *extends* `true` ? `null` : `number`; `type`: `"legacy"`; `typeHex`: `null` \| `` `0x${string}` ``; `v`: `bigint`; `value`: `bigint`; `yParity?`: `undefined`; \} \| \{ `accessList`: `AccessList`; `authorizationList?`: `undefined`; `blobVersionedHashes?`: `undefined`; `blockHash`: `blockTag` *extends* `"pending"` ? `true` : `false` *extends* `true` ? `null` : `` `0x${string}` ``; `blockNumber`: `blockTag` *extends* `"pending"` ? `true` : `false` *extends* `true` ? `null` : `bigint`; `chainId`: `number`; `from`: `` `0x${string}` ``; `gas`: `bigint`; `gasPrice`: `bigint`; `hash`: `` `0x${string}` ``; `input`: `` `0x${string}` ``; `maxFeePerBlobGas?`: `undefined`; `maxFeePerGas?`: `undefined`; `maxPriorityFeePerGas?`: `undefined`; `nonce`: `number`; `r`: `` `0x${string}` ``; `s`: `` `0x${string}` ``; `to`: `null` \| `` `0x${string}` ``; `transactionIndex`: `blockTag` *extends* `"pending"` ? `true` : `false` *extends* `true` ? `null` : `number`; `type`: `"eip2930"`; `typeHex`: `null` \| `` `0x${string}` ``; `v`: `bigint`; `value`: `bigint`; `yParity`: `number`; \} \| \{ `accessList`: `AccessList`; `authorizationList?`: `undefined`; `blobVersionedHashes?`: `undefined`; `blockHash`: `blockTag` *extends* `"pending"` ? `true` : `false` *extends* `true` ? `null` : `` `0x${string}` ``; `blockNumber`: `blockTag` *extends* `"pending"` ? `true` : `false` *extends* `true` ? `null` : `bigint`; `chainId`: `number`; `from`: `` `0x${string}` ``; `gas`: `bigint`; `gasPrice?`: `undefined`; `hash`: `` `0x${string}` ``; `input`: `` `0x${string}` ``; `maxFeePerBlobGas?`: `undefined`; `maxFeePerGas`: `bigint`; `maxPriorityFeePerGas`: `bigint`; `nonce`: `number`; `r`: `` `0x${string}` ``; `s`: `` `0x${string}` ``; `to`: `null` \| `` `0x${string}` ``; `transactionIndex`: `blockTag` *extends* `"pending"` ? `true` : `false` *extends* `true` ? `null` : `number`; `type`: `"eip1559"`; `typeHex`: `null` \| `` `0x${string}` ``; `v`: `bigint`; `value`: `bigint`; `yParity`: `number`; \} \| \{ `accessList`: `AccessList`; `authorizationList?`: `undefined`; `blobVersionedHashes`: readonly `` `0x${string}` ``[]; `blockHash`: `blockTag` *extends* `"pending"` ? `true` : `false` *extends* `true` ? `null` : `` `0x${string}` ``; `blockNumber`: `blockTag` *extends* `"pending"` ? `true` : `false` *extends* `true` ? `null` : `bigint`; `chainId`: `number`; `from`: `` `0x${string}` ``; `gas`: `bigint`; `gasPrice?`: `undefined`; `hash`: `` `0x${string}` ``; `input`: `` `0x${string}` ``; `maxFeePerBlobGas`: `bigint`; `maxFeePerGas`: `bigint`; `maxPriorityFeePerGas`: `bigint`; `nonce`: `number`; `r`: `` `0x${string}` ``; `s`: `` `0x${string}` ``; `to`: `null` \| `` `0x${string}` ``; `transactionIndex`: `blockTag` *extends* `"pending"` ? `true` : `false` *extends* `true` ? `null` : `number`; `type`: `"eip4844"`; `typeHex`: `null` \| `` `0x${string}` ``; `v`: `bigint`; `value`: `bigint`; `yParity`: `number`; \} \| \{ `accessList`: `AccessList`; `authorizationList`: `SignedAuthorizationList`; `blobVersionedHashes?`: `undefined`; `blockHash`: `blockTag` *extends* `"pending"` ? `true` : `false` *extends* `true` ? `null` : `` `0x${string}` ``; `blockNumber`: `blockTag` *extends* `"pending"` ? `true` : `false` *extends* `true` ? `null` : `bigint`; `chainId`: `number`; `from`: `` `0x${string}` ``; `gas`: `bigint`; `gasPrice?`: `undefined`; `hash`: `` `0x${string}` ``; `input`: `` `0x${string}` ``; `maxFeePerBlobGas?`: `undefined`; `maxFeePerGas`: `bigint`; `maxPriorityFeePerGas`: `bigint`; `nonce`: `number`; `r`: `` `0x${string}` ``; `s`: `` `0x${string}` ``; `to`: `null` \| `` `0x${string}` ``; `transactionIndex`: `blockTag` *extends* `"pending"` ? `true` : `false` *extends* `true` ? `null` : `number`; `type`: `"eip7702"`; `typeHex`: `null` \| `` `0x${string}` ``; `v`: `bigint`; `value`: `bigint`; `yParity`: `number`; \})[] : `` `0x${string}` ``[]; `transactionsRoot`: `` `0x${string}` ``; `uncles`: `` `0x${string}` ``[]; `withdrawals?`: `Withdrawal`[]; `withdrawalsRoot?`: `` `0x${string}` ``; \}\> | Returns information about a block at a block number, hash, or tag. - Docs: https://viem.sh/docs/actions/public/getBlock - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/blocks_fetching-blocks - JSON-RPC Methods: - Calls [`eth_getBlockByNumber`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getblockbynumber) for `blockNumber` & `blockTag`. - Calls [`eth_getBlockByHash`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getblockbyhash) for `blockHash`. **Example** `import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const block = await client.getBlock()` | node\_modules/viem/\_types/clients/decorators/public.d.ts:323 |
| `getBlockNumber()` | (`args?`) => `Promise`\<`bigint`\> | Returns the number of the most recent block seen. - Docs: https://viem.sh/docs/actions/public/getBlockNumber - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/blocks_fetching-blocks - JSON-RPC Methods: [`eth_blockNumber`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_blocknumber) **Example** `import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const blockNumber = await client.getBlockNumber() // 69420n` | node\_modules/viem/\_types/clients/decorators/public.d.ts:345 |
| `getBlockTransactionCount()` | (`args?`) => `Promise`\<`number`\> | Returns the number of Transactions at a block number, hash, or tag. - Docs: https://viem.sh/docs/actions/public/getBlockTransactionCount - JSON-RPC Methods: - Calls [`eth_getBlockTransactionCountByNumber`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getblocktransactioncountbynumber) for `blockNumber` & `blockTag`. - Calls [`eth_getBlockTransactionCountByHash`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getblocktransactioncountbyhash) for `blockHash`. **Example** `import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const count = await client.getBlockTransactionCount()` | node\_modules/viem/\_types/clients/decorators/public.d.ts:367 |
| `getBytecode()` | (`args`) => `Promise`\<`GetCodeReturnType`\> | **Deprecated** Use `getCode` instead. | node\_modules/viem/\_types/clients/decorators/public.d.ts:369 |
| `getChainId()` | () => `Promise`\<`number`\> | Returns the chain ID associated with the current network. - Docs: https://viem.sh/docs/actions/public/getChainId - JSON-RPC Methods: [`eth_chainId`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_chainid) **Example** `import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const chainId = await client.getChainId() // 1` | node\_modules/viem/\_types/clients/decorators/public.d.ts:389 |
| `getCode()` | (`args`) => `Promise`\<`GetCodeReturnType`\> | Retrieves the bytecode at an address. - Docs: https://viem.sh/docs/contract/getCode - JSON-RPC Methods: [`eth_getCode`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getcode) **Example** `import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const code = await client.getCode({ address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', })` | node\_modules/viem/\_types/clients/decorators/public.d.ts:411 |
| `getContractEvents()` | \<`abi`, `eventName`, `strict`, `fromBlock`, `toBlock`\>(`args`) => `Promise`\<`GetContractEventsReturnType`\<`abi`, `eventName`, `strict`, `fromBlock`, `toBlock`\>\> | Returns a list of event logs emitted by a contract. - Docs: https://viem.sh/docs/actions/public/getContractEvents - JSON-RPC Methods: [`eth_getLogs`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getlogs) **Example** `import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' import { wagmiAbi } from './abi' const client = createPublicClient({ chain: mainnet, transport: http(), }) const logs = await client.getContractEvents(client, { address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', abi: wagmiAbi, eventName: 'Transfer' })` | node\_modules/viem/\_types/clients/decorators/public.d.ts:437 |
| `getEip712Domain()` | (`args`) => `Promise`\<`GetEip712DomainReturnType`\> | Reads the EIP-712 domain from a contract, based on the ERC-5267 specification. **Example** `import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const domain = await client.getEip712Domain({ address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', }) // { // domain: { // name: 'ExampleContract', // version: '1', // chainId: 1, // verifyingContract: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // }, // fields: '0x0f', // extensions: [], // }` | node\_modules/viem/\_types/clients/decorators/public.d.ts:470 |
| `getEnsAddress()` | (`args`) => `Promise`\<`GetEnsAddressReturnType`\> | Gets address for ENS name. - Docs: https://viem.sh/docs/ens/actions/getEnsAddress - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/ens **Remarks** Calls `resolve(bytes, bytes)` on ENS Universal Resolver Contract. Since ENS names prohibit certain forbidden characters (e.g. underscore) and have other validation rules, you likely want to [normalize ENS names](https://docs.ens.domains/contract-api-reference/name-processing#normalising-names) with [UTS-46 normalization](https://unicode.org/reports/tr46) before passing them to `getEnsAddress`. You can use the built-in [`normalize`](https://viem.sh/docs/ens/utilities/normalize) function for this. **Example** `import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' import { normalize } from 'viem/ens' const client = createPublicClient({ chain: mainnet, transport: http(), }) const ensAddress = await client.getEnsAddress({ name: normalize('wevm.eth'), }) // '0xd2135CfB216b74109775236E36d4b433F1DF507B'` | node\_modules/viem/\_types/clients/decorators/public.d.ts:499 |
| `getEnsAvatar()` | (`args`) => `Promise`\<`GetEnsAvatarReturnType`\> | Gets the avatar of an ENS name. - Docs: https://viem.sh/docs/ens/actions/getEnsAvatar - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/ens **Remarks** Calls [`getEnsText`](https://viem.sh/docs/ens/actions/getEnsText) with `key` set to `'avatar'`. Since ENS names prohibit certain forbidden characters (e.g. underscore) and have other validation rules, you likely want to [normalize ENS names](https://docs.ens.domains/contract-api-reference/name-processing#normalising-names) with [UTS-46 normalization](https://unicode.org/reports/tr46) before passing them to `getEnsAddress`. You can use the built-in [`normalize`](https://viem.sh/docs/ens/utilities/normalize) function for this. **Example** `import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' import { normalize } from 'viem/ens' const client = createPublicClient({ chain: mainnet, transport: http(), }) const ensAvatar = await client.getEnsAvatar({ name: normalize('wevm.eth'), }) // 'https://ipfs.io/ipfs/Qma8mnp6xV3J2cRNf3mTth5C8nV11CAnceVinc3y8jSbio'` | node\_modules/viem/\_types/clients/decorators/public.d.ts:528 |
| `getEnsName()` | (`args`) => `Promise`\<`GetEnsNameReturnType`\> | Gets primary name for specified address. - Docs: https://viem.sh/docs/ens/actions/getEnsName - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/ens **Remarks** Calls `reverse(bytes)` on ENS Universal Resolver Contract to "reverse resolve" the address to the primary ENS name. **Example** `import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const ensName = await client.getEnsName({ address: '0xd2135CfB216b74109775236E36d4b433F1DF507B', }) // 'wevm.eth'` | node\_modules/viem/\_types/clients/decorators/public.d.ts:554 |
| `getEnsResolver()` | (`args`) => `Promise`\<`` `0x${string}` ``\> | Gets resolver for ENS name. - Docs: https://viem.sh/docs/ens/actions/getEnsResolver - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/ens **Remarks** Calls `findResolver(bytes)` on ENS Universal Resolver Contract to retrieve the resolver of an ENS name. Since ENS names prohibit certain forbidden characters (e.g. underscore) and have other validation rules, you likely want to [normalize ENS names](https://docs.ens.domains/contract-api-reference/name-processing#normalising-names) with [UTS-46 normalization](https://unicode.org/reports/tr46) before passing them to `getEnsAddress`. You can use the built-in [`normalize`](https://viem.sh/docs/ens/utilities/normalize) function for this. **Example** `import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' import { normalize } from 'viem/ens' const client = createPublicClient({ chain: mainnet, transport: http(), }) const resolverAddress = await client.getEnsResolver({ name: normalize('wevm.eth'), }) // '0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41'` | node\_modules/viem/\_types/clients/decorators/public.d.ts:583 |
| `getEnsText()` | (`args`) => `Promise`\<`GetEnsTextReturnType`\> | Gets a text record for specified ENS name. - Docs: https://viem.sh/docs/ens/actions/getEnsResolver - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/ens **Remarks** Calls `resolve(bytes, bytes)` on ENS Universal Resolver Contract. Since ENS names prohibit certain forbidden characters (e.g. underscore) and have other validation rules, you likely want to [normalize ENS names](https://docs.ens.domains/contract-api-reference/name-processing#normalising-names) with [UTS-46 normalization](https://unicode.org/reports/tr46) before passing them to `getEnsAddress`. You can use the built-in [`normalize`](https://viem.sh/docs/ens/utilities/normalize) function for this. **Example** `import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' import { normalize } from 'viem/ens' const client = createPublicClient({ chain: mainnet, transport: http(), }) const twitterRecord = await client.getEnsText({ name: normalize('wevm.eth'), key: 'com.twitter', }) // 'wevm_dev'` | node\_modules/viem/\_types/clients/decorators/public.d.ts:613 |
| `getFeeHistory()` | (`args`) => `Promise`\<`GetFeeHistoryReturnType`\> | Returns a collection of historical gas information. - Docs: https://viem.sh/docs/actions/public/getFeeHistory - JSON-RPC Methods: [`eth_feeHistory`](https://docs.alchemy.com/reference/eth-feehistory) **Example** `import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const feeHistory = await client.getFeeHistory({ blockCount: 4, rewardPercentiles: [25, 75], })` | node\_modules/viem/\_types/clients/decorators/public.d.ts:636 |
| `getFilterChanges()` | \<`filterType`, `abi`, `eventName`, `strict`, `fromBlock`, `toBlock`\>(`args`) => `Promise`\<`GetFilterChangesReturnType`\<`filterType`, `abi`, `eventName`, `strict`, `fromBlock`, `toBlock`\>\> | Returns a list of logs or hashes based on a [Filter](/docs/glossary/terms#filter) since the last time it was called. - Docs: https://viem.sh/docs/actions/public/getFilterChanges - JSON-RPC Methods: [`eth_getFilterChanges`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getfilterchanges) **Remarks** A Filter can be created from the following actions: - [`createBlockFilter`](https://viem.sh/docs/actions/public/createBlockFilter) - [`createContractEventFilter`](https://viem.sh/docs/contract/createContractEventFilter) - [`createEventFilter`](https://viem.sh/docs/actions/public/createEventFilter) - [`createPendingTransactionFilter`](https://viem.sh/docs/actions/public/createPendingTransactionFilter) Depending on the type of filter, the return value will be different: - If the filter was created with `createContractEventFilter` or `createEventFilter`, it returns a list of logs. - If the filter was created with `createPendingTransactionFilter`, it returns a list of transaction hashes. - If the filter was created with `createBlockFilter`, it returns a list of block hashes. **Examples** `// Blocks import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const filter = await client.createBlockFilter() const hashes = await client.getFilterChanges({ filter })` `// Contract Events import { createPublicClient, http, parseAbi } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const filter = await client.createContractEventFilter({ address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', abi: parseAbi(['event Transfer(address indexed, address indexed, uint256)']), eventName: 'Transfer', }) const logs = await client.getFilterChanges({ filter })` `// Raw Events import { createPublicClient, http, parseAbiItem } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const filter = await client.createEventFilter({ address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', event: parseAbiItem('event Transfer(address indexed, address indexed, uint256)'), }) const logs = await client.getFilterChanges({ filter })` `// Transactions import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const filter = await client.createPendingTransactionFilter() const hashes = await client.getFilterChanges({ filter })` | node\_modules/viem/\_types/clients/decorators/public.d.ts:737 |
| `getFilterLogs()` | \<`abi`, `eventName`, `strict`, `fromBlock`, `toBlock`\>(`args`) => `Promise`\<`GetFilterLogsReturnType`\<`abi`, `eventName`, `strict`, `fromBlock`, `toBlock`\>\> | Returns a list of event logs since the filter was created. - Docs: https://viem.sh/docs/actions/public/getFilterLogs - JSON-RPC Methods: [`eth_getFilterLogs`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getfilterlogs) **Remarks** `getFilterLogs` is only compatible with **event filters**. **Example** `import { createPublicClient, http, parseAbiItem } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const filter = await client.createEventFilter({ address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', event: parseAbiItem('event Transfer(address indexed, address indexed, uint256)'), }) const logs = await client.getFilterLogs({ filter })` | node\_modules/viem/\_types/clients/decorators/public.d.ts:764 |
| `getGasPrice()` | () => `Promise`\<`bigint`\> | Returns the current price of gas (in wei). - Docs: https://viem.sh/docs/actions/public/getGasPrice - JSON-RPC Methods: [`eth_gasPrice`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_gasprice) **Example** `import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const gasPrice = await client.getGasPrice()` | node\_modules/viem/\_types/clients/decorators/public.d.ts:783 |
| `getLogs()` | \<`abiEvent`, `abiEvents`, `strict`, `fromBlock`, `toBlock`\>(`args?`) => `Promise`\<`GetLogsReturnType`\<`abiEvent`, `abiEvents`, `strict`, `fromBlock`, `toBlock`\>\> | Returns a list of event logs matching the provided parameters. - Docs: https://viem.sh/docs/actions/public/getLogs - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/logs_event-logs - JSON-RPC Methods: [`eth_getLogs`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getlogs) **Example** `import { createPublicClient, http, parseAbiItem } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const logs = await client.getLogs()` | node\_modules/viem/\_types/clients/decorators/public.d.ts:804 |
| `getProof()` | (`args`) => `Promise`\<`GetProofReturnType`\> | Returns the account and storage values of the specified account including the Merkle-proof. - Docs: https://viem.sh/docs/actions/public/getProof - JSON-RPC Methods: - Calls [`eth_getProof`](https://eips.ethereum.org/EIPS/eip-1186) **Example** `import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const block = await client.getProof({ address: '0x...', storageKeys: ['0x...'], })` | node\_modules/viem/\_types/clients/decorators/public.d.ts:829 |
| `getStorageAt()` | (`args`) => `Promise`\<`GetStorageAtReturnType`\> | Returns the value from a storage slot at a given address. - Docs: https://viem.sh/docs/contract/getStorageAt - JSON-RPC Methods: [`eth_getStorageAt`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getstorageat) **Example** `import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' import { getStorageAt } from 'viem/contract' const client = createPublicClient({ chain: mainnet, transport: http(), }) const code = await client.getStorageAt({ address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', slot: toHex(0), })` | node\_modules/viem/\_types/clients/decorators/public.d.ts:874 |
| `getTransaction()` | \<`blockTag`\>(`args`) => `Promise`\<\{ `accessList?`: `undefined`; `authorizationList?`: `undefined`; `blobVersionedHashes?`: `undefined`; `blockHash`: `blockTag` *extends* `"pending"` ? `true` : `false` *extends* `true` ? `null` : `` `0x${string}` ``; `blockNumber`: `blockTag` *extends* `"pending"` ? `true` : `false` *extends* `true` ? `null` : `bigint`; `chainId?`: `number`; `from`: `` `0x${string}` ``; `gas`: `bigint`; `gasPrice`: `bigint`; `hash`: `` `0x${string}` ``; `input`: `` `0x${string}` ``; `maxFeePerBlobGas?`: `undefined`; `maxFeePerGas?`: `undefined`; `maxPriorityFeePerGas?`: `undefined`; `nonce`: `number`; `r`: `` `0x${string}` ``; `s`: `` `0x${string}` ``; `to`: `null` \| `` `0x${string}` ``; `transactionIndex`: `blockTag` *extends* `"pending"` ? `true` : `false` *extends* `true` ? `null` : `number`; `type`: `"legacy"`; `typeHex`: `null` \| `` `0x${string}` ``; `v`: `bigint`; `value`: `bigint`; `yParity?`: `undefined`; \} \| \{ `accessList`: `AccessList`; `authorizationList?`: `undefined`; `blobVersionedHashes?`: `undefined`; `blockHash`: `blockTag` *extends* `"pending"` ? `true` : `false` *extends* `true` ? `null` : `` `0x${string}` ``; `blockNumber`: `blockTag` *extends* `"pending"` ? `true` : `false` *extends* `true` ? `null` : `bigint`; `chainId`: `number`; `from`: `` `0x${string}` ``; `gas`: `bigint`; `gasPrice`: `bigint`; `hash`: `` `0x${string}` ``; `input`: `` `0x${string}` ``; `maxFeePerBlobGas?`: `undefined`; `maxFeePerGas?`: `undefined`; `maxPriorityFeePerGas?`: `undefined`; `nonce`: `number`; `r`: `` `0x${string}` ``; `s`: `` `0x${string}` ``; `to`: `null` \| `` `0x${string}` ``; `transactionIndex`: `blockTag` *extends* `"pending"` ? `true` : `false` *extends* `true` ? `null` : `number`; `type`: `"eip2930"`; `typeHex`: `null` \| `` `0x${string}` ``; `v`: `bigint`; `value`: `bigint`; `yParity`: `number`; \} \| \{ `accessList`: `AccessList`; `authorizationList?`: `undefined`; `blobVersionedHashes?`: `undefined`; `blockHash`: `blockTag` *extends* `"pending"` ? `true` : `false` *extends* `true` ? `null` : `` `0x${string}` ``; `blockNumber`: `blockTag` *extends* `"pending"` ? `true` : `false` *extends* `true` ? `null` : `bigint`; `chainId`: `number`; `from`: `` `0x${string}` ``; `gas`: `bigint`; `gasPrice?`: `undefined`; `hash`: `` `0x${string}` ``; `input`: `` `0x${string}` ``; `maxFeePerBlobGas?`: `undefined`; `maxFeePerGas`: `bigint`; `maxPriorityFeePerGas`: `bigint`; `nonce`: `number`; `r`: `` `0x${string}` ``; `s`: `` `0x${string}` ``; `to`: `null` \| `` `0x${string}` ``; `transactionIndex`: `blockTag` *extends* `"pending"` ? `true` : `false` *extends* `true` ? `null` : `number`; `type`: `"eip1559"`; `typeHex`: `null` \| `` `0x${string}` ``; `v`: `bigint`; `value`: `bigint`; `yParity`: `number`; \} \| \{ `accessList`: `AccessList`; `authorizationList?`: `undefined`; `blobVersionedHashes`: readonly `` `0x${string}` ``[]; `blockHash`: `blockTag` *extends* `"pending"` ? `true` : `false` *extends* `true` ? `null` : `` `0x${string}` ``; `blockNumber`: `blockTag` *extends* `"pending"` ? `true` : `false` *extends* `true` ? `null` : `bigint`; `chainId`: `number`; `from`: `` `0x${string}` ``; `gas`: `bigint`; `gasPrice?`: `undefined`; `hash`: `` `0x${string}` ``; `input`: `` `0x${string}` ``; `maxFeePerBlobGas`: `bigint`; `maxFeePerGas`: `bigint`; `maxPriorityFeePerGas`: `bigint`; `nonce`: `number`; `r`: `` `0x${string}` ``; `s`: `` `0x${string}` ``; `to`: `null` \| `` `0x${string}` ``; `transactionIndex`: `blockTag` *extends* `"pending"` ? `true` : `false` *extends* `true` ? `null` : `number`; `type`: `"eip4844"`; `typeHex`: `null` \| `` `0x${string}` ``; `v`: `bigint`; `value`: `bigint`; `yParity`: `number`; \} \| \{ `accessList`: `AccessList`; `authorizationList`: `SignedAuthorizationList`; `blobVersionedHashes?`: `undefined`; `blockHash`: `blockTag` *extends* `"pending"` ? `true` : `false` *extends* `true` ? `null` : `` `0x${string}` ``; `blockNumber`: `blockTag` *extends* `"pending"` ? `true` : `false` *extends* `true` ? `null` : `bigint`; `chainId`: `number`; `from`: `` `0x${string}` ``; `gas`: `bigint`; `gasPrice?`: `undefined`; `hash`: `` `0x${string}` ``; `input`: `` `0x${string}` ``; `maxFeePerBlobGas?`: `undefined`; `maxFeePerGas`: `bigint`; `maxPriorityFeePerGas`: `bigint`; `nonce`: `number`; `r`: `` `0x${string}` ``; `s`: `` `0x${string}` ``; `to`: `null` \| `` `0x${string}` ``; `transactionIndex`: `blockTag` *extends* `"pending"` ? `true` : `false` *extends* `true` ? `null` : `number`; `type`: `"eip7702"`; `typeHex`: `null` \| `` `0x${string}` ``; `v`: `bigint`; `value`: `bigint`; `yParity`: `number`; \}\> | Returns information about a [Transaction](https://viem.sh/docs/glossary/terms#transaction) given a hash or block identifier. - Docs: https://viem.sh/docs/actions/public/getTransaction - Example: https://stackblitz.com/github/wevm/viem/tree/main/examples/transactions_fetching-transactions - JSON-RPC Methods: [`eth_getTransactionByHash`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getTransactionByHash) **Example** `import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const transaction = await client.getTransaction({ hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d', })` | node\_modules/viem/\_types/clients/decorators/public.d.ts:897 |
| `getTransactionConfirmations()` | (`args`) => `Promise`\<`bigint`\> | Returns the number of blocks passed (confirmations) since the transaction was processed on a block. - Docs: https://viem.sh/docs/actions/public/getTransactionConfirmations - Example: https://stackblitz.com/github/wevm/viem/tree/main/examples/transactions_fetching-transactions - JSON-RPC Methods: [`eth_getTransactionConfirmations`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getTransactionConfirmations) **Example** `import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const confirmations = await client.getTransactionConfirmations({ hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d', })` | node\_modules/viem/\_types/clients/decorators/public.d.ts:920 |
| `getTransactionCount()` | (`args`) => `Promise`\<`number`\> | Returns the number of [Transactions](https://viem.sh/docs/glossary/terms#transaction) an Account has broadcast / sent. - Docs: https://viem.sh/docs/actions/public/getTransactionCount - JSON-RPC Methods: [`eth_getTransactionCount`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_gettransactioncount) **Example** `import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const transactionCount = await client.getTransactionCount({ address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', })` | node\_modules/viem/\_types/clients/decorators/public.d.ts:942 |
| `getTransactionReceipt()` | (`args`) => `Promise`\<`TransactionReceipt`\> | Returns the [Transaction Receipt](https://viem.sh/docs/glossary/terms#transaction-receipt) given a [Transaction](https://viem.sh/docs/glossary/terms#transaction) hash. - Docs: https://viem.sh/docs/actions/public/getTransactionReceipt - Example: https://stackblitz.com/github/wevm/viem/tree/main/examples/transactions_fetching-transactions - JSON-RPC Methods: [`eth_getTransactionReceipt`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getTransactionReceipt) **Example** `import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const transactionReceipt = await client.getTransactionReceipt({ hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d', })` | node\_modules/viem/\_types/clients/decorators/public.d.ts:965 |
| `key` | `string` | A key for the client. | node\_modules/viem/\_types/clients/createClient.d.ts:73 |
| `multicall()` | \<`contracts`, `allowFailure`\>(`args`) => `Promise`\<`MulticallReturnType`\<`contracts`, `allowFailure`\>\> | Similar to [`readContract`](https://viem.sh/docs/contract/readContract), but batches up multiple functions on a contract in a single RPC call via the [`multicall3` contract](https://github.com/mds1/multicall). - Docs: https://viem.sh/docs/contract/multicall **Example** `import { createPublicClient, http, parseAbi } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const abi = parseAbi([ 'function balanceOf(address) view returns (uint256)', 'function totalSupply() view returns (uint256)', ]) const result = await client.multicall({ contracts: [ { address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', abi, functionName: 'balanceOf', args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e'], }, { address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', abi, functionName: 'totalSupply', }, ], }) // [{ result: 424122n, status: 'success' }, { result: 1000000n, status: 'success' }]` | node\_modules/viem/\_types/clients/decorators/public.d.ts:1003 |
| `name` | `string` | A name for the client. | node\_modules/viem/\_types/clients/createClient.d.ts:75 |
| `pollingInterval` | `number` | Frequency (in ms) for polling enabled actions & events. Defaults to 4_000 milliseconds. | node\_modules/viem/\_types/clients/createClient.d.ts:77 |
| `prepareTransactionRequest()` | \<`request`, `chainOverride`, `accountOverride`\>(`args`) => `Promise`\<\{ \[K in string \| number \| symbol\]: (UnionRequiredBy\<Extract\<UnionOmit\<(...), (...)\> & ((...) extends (...) ? (...) : (...)) & ((...) extends (...) ? (...) : (...)), IsNever\<(...)\> extends true ? unknown : ExactPartial\<(...)\>\> & \{ chainId?: number \}, ParameterTypeToParameters\<request\["parameters"\] extends readonly PrepareTransactionRequestParameterType\[\] ? any\[any\]\[number\] : "type" \| "chainId" \| "gas" \| "nonce" \| "blobVersionedHashes" \| "fees"\>\> & (unknown extends request\["kzg"\] ? \{\} : Pick\<request, "kzg"\>))\[K\] \}\> | Prepares a transaction request for signing. - Docs: https://viem.sh/docs/actions/wallet/prepareTransactionRequest **Examples** `import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const request = await client.prepareTransactionRequest({ account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', to: '0x0000000000000000000000000000000000000000', value: 1n, })` `// Account Hoisting import { createWalletClient, http } from 'viem' import { privateKeyToAccount } from 'viem/accounts' import { mainnet } from 'viem/chains' const client = createWalletClient({ account: privateKeyToAccount('0x…'), chain: mainnet, transport: custom(window.ethereum), }) const request = await client.prepareTransactionRequest({ to: '0x0000000000000000000000000000000000000000', value: 1n, })` | node\_modules/viem/\_types/clients/decorators/public.d.ts:1042 |
| `readContract()` | \<`abi`, `functionName`, `args`\>(`args`) => `Promise`\<`ReadContractReturnType`\<`abi`, `functionName`, `args`\>\> | Calls a read-only function on a contract, and returns the response. - Docs: https://viem.sh/docs/contract/readContract - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/contracts_reading-contracts **Remarks** A "read-only" function (constant function) on a Solidity contract is denoted by a `view` or `pure` keyword. They can only read the state of the contract, and cannot make any changes to it. Since read-only methods do not change the state of the contract, they do not require any gas to be executed, and can be called by any user without the need to pay for gas. Internally, uses a [Public Client](https://viem.sh/docs/clients/public) to call the [`call` action](https://viem.sh/docs/actions/public/call) with [ABI-encoded `data`](https://viem.sh/docs/contract/encodeFunctionData). **Example** `import { createPublicClient, http, parseAbi } from 'viem' import { mainnet } from 'viem/chains' import { readContract } from 'viem/contract' const client = createPublicClient({ chain: mainnet, transport: http(), }) const result = await client.readContract({ address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', abi: parseAbi(['function balanceOf(address) view returns (uint256)']), functionName: 'balanceOf', args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e'], }) // 424122n` | node\_modules/viem/\_types/clients/decorators/public.d.ts:1074 |
| `request` | `EIP1193RequestFn`\<`PublicRpcSchema`\> | Request function wrapped with friendly error handling | node\_modules/viem/\_types/clients/createClient.d.ts:79 |
| `sendRawTransaction()` | (`args`) => `Promise`\<`` `0x${string}` ``\> | Sends a **signed** transaction to the network - Docs: https://viem.sh/docs/actions/wallet/sendRawTransaction - JSON-RPC Method: [`eth_sendRawTransaction`](https://ethereum.github.io/execution-apis/api-documentation/) **Example** `import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' import { sendRawTransaction } from 'viem/wallet' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const hash = await client.sendRawTransaction({ serializedTransaction: '0x02f850018203118080825208808080c080a04012522854168b27e5dc3d5839bab5e6b39e1a0ffd343901ce1622e3d64b48f1a04e00902ae0502c4728cbf12156290df99c3ed7de85b1dbfe20b5c36931733a33' })` | node\_modules/viem/\_types/clients/decorators/public.d.ts:1099 |
| `simulate()` | \<`calls`\>(`args`) => `Promise`\<`SimulateBlocksReturnType`\<`calls`\>\> | **Deprecated** Use `simulateBlocks` instead. | node\_modules/viem/\_types/clients/decorators/public.d.ts:1103 |
| `simulateBlocks()` | \<`calls`\>(`args`) => `Promise`\<`SimulateBlocksReturnType`\<`calls`\>\> | Simulates a set of calls on block(s) with optional block and state overrides. **Example** `import { createPublicClient, http, parseEther } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const result = await client.simulateBlocks({ blocks: [{ blockOverrides: { number: 69420n, }, calls: [{ { account: '0x5a0b54d5dc17e482fe8b0bdca5320161b95fb929', data: '0xdeadbeef', to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', }, { account: '0x5a0b54d5dc17e482fe8b0bdca5320161b95fb929', to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', value: parseEther('1'), }, }], stateOverrides: [{ address: '0x5a0b54d5dc17e482fe8b0bdca5320161b95fb929', balance: parseEther('10'), }], }] })` | node\_modules/viem/\_types/clients/decorators/public.d.ts:1146 |
| `simulateCalls()` | \<`calls`\>(`args`) => `Promise`\<`SimulateCallsReturnType`\<`calls`\>\> | Simulates a set of calls. **Example** `import { createPublicClient, http, parseEther } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const result = await client.simulateCalls({ account: '0x5a0b54d5dc17e482fe8b0bdca5320161b95fb929', calls: [{ { data: '0xdeadbeef', to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', }, { to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', value: parseEther('1'), }, ] })` | node\_modules/viem/\_types/clients/decorators/public.d.ts:1179 |
| `simulateContract()` | \<`abi`, `functionName`, `args`, `chainOverride`, `accountOverride`\>(`args`) => `Promise`\<`SimulateContractReturnType`\<`abi`, `functionName`, `args`, `Chain`, `undefined` \| `Account`, `chainOverride`, `accountOverride`\>\> | Simulates/validates a contract interaction. This is useful for retrieving **return data** and **revert reasons** of contract write functions. - Docs: https://viem.sh/docs/contract/simulateContract - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/contracts_writing-to-contracts **Remarks** This function does not require gas to execute and _**does not**_ change the state of the blockchain. It is almost identical to [`readContract`](https://viem.sh/docs/contract/readContract), but also supports contract write functions. Internally, uses a [Public Client](https://viem.sh/docs/clients/public) to call the [`call` action](https://viem.sh/docs/actions/public/call) with [ABI-encoded `data`](https://viem.sh/docs/contract/encodeFunctionData). **Example** `import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const result = await client.simulateContract({ address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', abi: parseAbi(['function mint(uint32) view returns (uint32)']), functionName: 'mint', args: ['69420'], account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', })` | node\_modules/viem/\_types/clients/decorators/public.d.ts:1210 |
| `transport` | `TransportConfig`\<`"http"`, `EIP1193RequestFn`\> & `object` | The RPC transport | node\_modules/viem/\_types/clients/createClient.d.ts:81 |
| `type` | `string` | The type of client. | node\_modules/viem/\_types/clients/createClient.d.ts:83 |
| `uid` | `string` | A unique ID for the client. | node\_modules/viem/\_types/clients/createClient.d.ts:85 |
| `uninstallFilter()` | (`args`) => `Promise`\<`boolean`\> | Destroys a Filter that was created from one of the following Actions: - [`createBlockFilter`](https://viem.sh/docs/actions/public/createBlockFilter) - [`createEventFilter`](https://viem.sh/docs/actions/public/createEventFilter) - [`createPendingTransactionFilter`](https://viem.sh/docs/actions/public/createPendingTransactionFilter) - Docs: https://viem.sh/docs/actions/public/uninstallFilter - JSON-RPC Methods: [`eth_uninstallFilter`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_uninstallFilter) **Example** `import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' import { createPendingTransactionFilter, uninstallFilter } from 'viem/public' const filter = await client.createPendingTransactionFilter() const uninstalled = await client.uninstallFilter({ filter }) // true` | node\_modules/viem/\_types/clients/decorators/public.d.ts:1264 |
| `verifyMessage()` | (`args`) => `Promise`\<`boolean`\> | Verify that a message was signed by the provided address. Compatible with Smart Contract Accounts & Externally Owned Accounts via [ERC-6492](https://eips.ethereum.org/EIPS/eip-6492). - Docs [https://viem.sh/docs/actions/public/verifyMessage](https://viem.sh/docs/actions/public/verifyMessage) | node\_modules/viem/\_types/clients/decorators/public.d.ts:1221 |
| `verifySiweMessage()` | (`args`) => `Promise`\<`boolean`\> | Verifies [EIP-4361](https://eips.ethereum.org/EIPS/eip-4361) formatted message was signed. Compatible with Smart Contract Accounts & Externally Owned Accounts via [ERC-6492](https://eips.ethereum.org/EIPS/eip-6492). - Docs [https://viem.sh/docs/siwe/actions/verifySiweMessage](https://viem.sh/docs/siwe/actions/verifySiweMessage) | node\_modules/viem/\_types/clients/decorators/public.d.ts:1232 |
| `verifyTypedData()` | (`args`) => `Promise`\<`boolean`\> | Verify that typed data was signed by the provided address. - Docs [https://viem.sh/docs/actions/public/verifyTypedData](https://viem.sh/docs/actions/public/verifyTypedData) | node\_modules/viem/\_types/clients/decorators/public.d.ts:1241 |
| `waitForTransactionReceipt()` | (`args`) => `Promise`\<`TransactionReceipt`\> | Waits for the [Transaction](https://viem.sh/docs/glossary/terms#transaction) to be included on a [Block](https://viem.sh/docs/glossary/terms#block) (one confirmation), and then returns the [Transaction Receipt](https://viem.sh/docs/glossary/terms#transaction-receipt). If the Transaction reverts, then the action will throw an error. - Docs: https://viem.sh/docs/actions/public/waitForTransactionReceipt - Example: https://stackblitz.com/github/wevm/viem/tree/main/examples/transactions_sending-transactions - JSON-RPC Methods: - Polls [`eth_getTransactionReceipt`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getTransactionReceipt) on each block until it has been processed. - If a Transaction has been replaced: - Calls [`eth_getBlockByNumber`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getblockbynumber) and extracts the transactions - Checks if one of the Transactions is a replacement - If so, calls [`eth_getTransactionReceipt`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getTransactionReceipt). **Remarks** The `waitForTransactionReceipt` action additionally supports Replacement detection (e.g. sped up Transactions). Transactions can be replaced when a user modifies their transaction in their wallet (to speed up or cancel). Transactions are replaced when they are sent from the same nonce. There are 3 types of Transaction Replacement reasons: - `repriced`: The gas price has been modified (e.g. different `maxFeePerGas`) - `cancelled`: The Transaction has been cancelled (e.g. `value === 0n`) - `replaced`: The Transaction has been replaced (e.g. different `value` or `data`) **Example** `import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const transactionReceipt = await client.waitForTransactionReceipt({ hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d', })` | node\_modules/viem/\_types/clients/decorators/public.d.ts:1303 |
| `watchBlockNumber()` | (`args`) => `WatchBlockNumberReturnType` | Watches and returns incoming block numbers. - Docs: https://viem.sh/docs/actions/public/watchBlockNumber - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/blocks_watching-blocks - JSON-RPC Methods: - When `poll: true`, calls [`eth_blockNumber`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_blocknumber) on a polling interval. - When `poll: false` & WebSocket Transport, uses a WebSocket subscription via [`eth_subscribe`](https://docs.alchemy.com/reference/eth-subscribe-polygon) and the `"newHeads"` event. **Example** `import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const unwatch = await client.watchBlockNumber({ onBlockNumber: (blockNumber) => console.log(blockNumber), })` | node\_modules/viem/\_types/clients/decorators/public.d.ts:1328 |
| `watchBlocks()` | \<`includeTransactions`, `blockTag`\>(`args`) => `WatchBlocksReturnType` | Watches and returns information for incoming blocks. - Docs: https://viem.sh/docs/actions/public/watchBlocks - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/blocks_watching-blocks - JSON-RPC Methods: - When `poll: true`, calls [`eth_getBlockByNumber`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getBlockByNumber) on a polling interval. - When `poll: false` & WebSocket Transport, uses a WebSocket subscription via [`eth_subscribe`](https://docs.alchemy.com/reference/eth-subscribe-polygon) and the `"newHeads"` event. **Example** `import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const unwatch = await client.watchBlocks({ onBlock: (block) => console.log(block), })` | node\_modules/viem/\_types/clients/decorators/public.d.ts:1353 |
| `watchContractEvent()` | \<`abi`, `eventName`, `strict`\>(`args`) => `WatchContractEventReturnType` | Watches and returns emitted contract event logs. - Docs: https://viem.sh/docs/contract/watchContractEvent **Remarks** This Action will batch up all the event logs found within the [`pollingInterval`](https://viem.sh/docs/contract/watchContractEvent#pollinginterval-optional), and invoke them via [`onLogs`](https://viem.sh/docs/contract/watchContractEvent#onLogs). `watchContractEvent` will attempt to create an [Event Filter](https://viem.sh/docs/contract/createContractEventFilter) and listen to changes to the Filter per polling interval, however, if the RPC Provider does not support Filters (e.g. `eth_newFilter`), then `watchContractEvent` will fall back to using [`getLogs`](https://viem.sh/docs/actions/public/getLogs) instead. **Example** `import { createPublicClient, http, parseAbi } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const unwatch = client.watchContractEvent({ address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', abi: parseAbi(['event Transfer(address indexed from, address indexed to, uint256 value)']), eventName: 'Transfer', args: { from: '0xc961145a54C96E3aE9bAA048c4F4D6b04C13916b' }, onLogs: (logs) => console.log(logs), })` | node\_modules/viem/\_types/clients/decorators/public.d.ts:1383 |
| `watchEvent()` | \<`abiEvent`, `abiEvents`, `strict`\>(`args`) => `WatchEventReturnType` | Watches and returns emitted [Event Logs](https://viem.sh/docs/glossary/terms#event-log). - Docs: https://viem.sh/docs/actions/public/watchEvent - JSON-RPC Methods: - **RPC Provider supports `eth_newFilter`:** - Calls [`eth_newFilter`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_newfilter) to create a filter (called on initialize). - On a polling interval, it will call [`eth_getFilterChanges`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getfilterchanges). - **RPC Provider does not support `eth_newFilter`:** - Calls [`eth_getLogs`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getlogs) for each block between the polling interval. **Remarks** This Action will batch up all the Event Logs found within the [`pollingInterval`](https://viem.sh/docs/actions/public/watchEvent#pollinginterval-optional), and invoke them via [`onLogs`](https://viem.sh/docs/actions/public/watchEvent#onLogs). `watchEvent` will attempt to create an [Event Filter](https://viem.sh/docs/actions/public/createEventFilter) and listen to changes to the Filter per polling interval, however, if the RPC Provider does not support Filters (e.g. `eth_newFilter`), then `watchEvent` will fall back to using [`getLogs`](https://viem.sh/docs/actions/public/getLogs) instead. **Example** `import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const unwatch = client.watchEvent({ onLogs: (logs) => console.log(logs), })` | node\_modules/viem/\_types/clients/decorators/public.d.ts:1415 |
| `watchPendingTransactions()` | (`args`) => `WatchPendingTransactionsReturnType` | Watches and returns pending transaction hashes. - Docs: https://viem.sh/docs/actions/public/watchPendingTransactions - JSON-RPC Methods: - When `poll: true` - Calls [`eth_newPendingTransactionFilter`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_newpendingtransactionfilter) to initialize the filter. - Calls [`eth_getFilterChanges`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getFilterChanges) on a polling interval. - When `poll: false` & WebSocket Transport, uses a WebSocket subscription via [`eth_subscribe`](https://docs.alchemy.com/reference/eth-subscribe-polygon) and the `"newPendingTransactions"` event. **Remarks** This Action will batch up all the pending transactions found within the [`pollingInterval`](https://viem.sh/docs/actions/public/watchPendingTransactions#pollinginterval-optional), and invoke them via [`onTransactions`](https://viem.sh/docs/actions/public/watchPendingTransactions#ontransactions). **Example** `import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const unwatch = await client.watchPendingTransactions({ onTransactions: (hashes) => console.log(hashes), })` | node\_modules/viem/\_types/clients/decorators/public.d.ts:1444 |

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

Defined in: [sdk/viem/src/viem.ts:128](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/viem.ts#L128)

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

Defined in: [sdk/viem/src/custom-actions/types/wallet-verification.enum.ts:18](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/types/wallet-verification.enum.ts#L18)

Supported hash algorithms for One-Time Password (OTP) verification.
These algorithms determine the cryptographic function used to generate OTP codes.

##### Enumeration Members

| Enumeration Member | Value | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="sha1"></a> `SHA1` | `"SHA1"` | SHA-1 hash algorithm | [sdk/viem/src/custom-actions/types/wallet-verification.enum.ts:20](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/types/wallet-verification.enum.ts#L20) |
| <a id="sha224"></a> `SHA224` | `"SHA224"` | SHA-224 hash algorithm | [sdk/viem/src/custom-actions/types/wallet-verification.enum.ts:22](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/types/wallet-verification.enum.ts#L22) |
| <a id="sha256"></a> `SHA256` | `"SHA256"` | SHA-256 hash algorithm | [sdk/viem/src/custom-actions/types/wallet-verification.enum.ts:24](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/types/wallet-verification.enum.ts#L24) |
| <a id="sha3_224"></a> `SHA3_224` | `"SHA3-224"` | SHA3-224 hash algorithm | [sdk/viem/src/custom-actions/types/wallet-verification.enum.ts:30](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/types/wallet-verification.enum.ts#L30) |
| <a id="sha3_256"></a> `SHA3_256` | `"SHA3-256"` | SHA3-256 hash algorithm | [sdk/viem/src/custom-actions/types/wallet-verification.enum.ts:32](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/types/wallet-verification.enum.ts#L32) |
| <a id="sha3_384"></a> `SHA3_384` | `"SHA3-384"` | SHA3-384 hash algorithm | [sdk/viem/src/custom-actions/types/wallet-verification.enum.ts:34](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/types/wallet-verification.enum.ts#L34) |
| <a id="sha3_512"></a> `SHA3_512` | `"SHA3-512"` | SHA3-512 hash algorithm | [sdk/viem/src/custom-actions/types/wallet-verification.enum.ts:36](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/types/wallet-verification.enum.ts#L36) |
| <a id="sha384"></a> `SHA384` | `"SHA384"` | SHA-384 hash algorithm | [sdk/viem/src/custom-actions/types/wallet-verification.enum.ts:26](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/types/wallet-verification.enum.ts#L26) |
| <a id="sha512"></a> `SHA512` | `"SHA512"` | SHA-512 hash algorithm | [sdk/viem/src/custom-actions/types/wallet-verification.enum.ts:28](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/types/wallet-verification.enum.ts#L28) |

***

#### WalletVerificationType

Defined in: [sdk/viem/src/custom-actions/types/wallet-verification.enum.ts:5](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/types/wallet-verification.enum.ts#L5)

Types of wallet verification methods supported by the system.
Used to identify different verification mechanisms when creating or managing wallet verifications.

##### Enumeration Members

| Enumeration Member | Value | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="otp"></a> `OTP` | `"OTP"` | One-Time Password verification method | [sdk/viem/src/custom-actions/types/wallet-verification.enum.ts:9](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/types/wallet-verification.enum.ts#L9) |
| <a id="pincode"></a> `PINCODE` | `"PINCODE"` | PIN code verification method | [sdk/viem/src/custom-actions/types/wallet-verification.enum.ts:7](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/types/wallet-verification.enum.ts#L7) |
| <a id="secret_codes"></a> `SECRET_CODES` | `"SECRET_CODES"` | Secret recovery codes verification method | [sdk/viem/src/custom-actions/types/wallet-verification.enum.ts:11](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/types/wallet-verification.enum.ts#L11) |

### Interfaces

#### ClientOptions

Defined in: [sdk/viem/src/viem.ts:23](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/viem.ts#L23)

The options for the viem client.

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="accesstoken"></a> `accessToken` | `string` | The access token | [sdk/viem/src/viem.ts:27](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/viem.ts#L27) |
| <a id="chainid"></a> `chainId` | `string` | The chain id | [sdk/viem/src/viem.ts:31](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/viem.ts#L31) |
| <a id="chainname"></a> `chainName` | `string` | The chain name | [sdk/viem/src/viem.ts:35](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/viem.ts#L35) |
| <a id="httptransportconfig"></a> `httpTransportConfig?` | `HttpTransportConfig` | The http transport config | [sdk/viem/src/viem.ts:43](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/viem.ts#L43) |
| <a id="rpcurl"></a> `rpcUrl` | `string` | The json rpc url | [sdk/viem/src/viem.ts:39](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/viem.ts#L39) |

***

#### CreateWalletParameters

Defined in: [sdk/viem/src/custom-actions/create-wallet.action.ts:14](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/create-wallet.action.ts#L14)

Parameters for creating a wallet.

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="keyvaultid"></a> `keyVaultId` | `string` | The unique name of the key vault where the wallet will be created. | [sdk/viem/src/custom-actions/create-wallet.action.ts:16](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/create-wallet.action.ts#L16) |
| <a id="walletinfo"></a> `walletInfo` | [`WalletInfo`](#walletinfo-1) | Information about the wallet to be created. | [sdk/viem/src/custom-actions/create-wallet.action.ts:18](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/create-wallet.action.ts#L18) |

***

#### CreateWalletResponse

Defined in: [sdk/viem/src/custom-actions/create-wallet.action.ts:24](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/create-wallet.action.ts#L24)

Response from creating a wallet.

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="address"></a> `address` | `string` | The blockchain address of the wallet. | [sdk/viem/src/custom-actions/create-wallet.action.ts:30](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/create-wallet.action.ts#L30) |
| <a id="derivationpath"></a> `derivationPath` | `string` | The HD derivation path used to create the wallet. | [sdk/viem/src/custom-actions/create-wallet.action.ts:32](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/create-wallet.action.ts#L32) |
| <a id="id"></a> `id` | `string` | The unique identifier of the wallet. | [sdk/viem/src/custom-actions/create-wallet.action.ts:26](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/create-wallet.action.ts#L26) |
| <a id="name"></a> `name` | `string` | The name of the wallet. | [sdk/viem/src/custom-actions/create-wallet.action.ts:28](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/create-wallet.action.ts#L28) |

***

#### CreateWalletVerificationChallengesParameters

Defined in: [sdk/viem/src/custom-actions/create-wallet-verification-challenges.action.ts:8](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/create-wallet-verification-challenges.action.ts#L8)

Parameters for creating wallet verification challenges.

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="addressorobject"></a> `addressOrObject` | [`AddressOrObject`](#addressorobject-2) | The wallet address or object containing wallet address and optional verification ID. | [sdk/viem/src/custom-actions/create-wallet-verification-challenges.action.ts:10](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/create-wallet-verification-challenges.action.ts#L10) |

***

#### CreateWalletVerificationParameters

Defined in: [sdk/viem/src/custom-actions/create-wallet-verification.action.ts:59](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/create-wallet-verification.action.ts#L59)

Parameters for creating a wallet verification.

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="userwalletaddress"></a> `userWalletAddress` | `string` | The wallet address for which to create the verification. | [sdk/viem/src/custom-actions/create-wallet-verification.action.ts:61](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/create-wallet-verification.action.ts#L61) |
| <a id="walletverificationinfo"></a> `walletVerificationInfo` | [`WalletVerificationInfo`](#walletverificationinfo-1) | The verification information to create. | [sdk/viem/src/custom-actions/create-wallet-verification.action.ts:63](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/create-wallet-verification.action.ts#L63) |

***

#### CreateWalletVerificationResponse

Defined in: [sdk/viem/src/custom-actions/create-wallet-verification.action.ts:69](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/create-wallet-verification.action.ts#L69)

Response from creating a wallet verification.

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id-1"></a> `id` | `string` | The unique identifier of the verification. | [sdk/viem/src/custom-actions/create-wallet-verification.action.ts:71](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/create-wallet-verification.action.ts#L71) |
| <a id="name-1"></a> `name` | `string` | The name of the verification method. | [sdk/viem/src/custom-actions/create-wallet-verification.action.ts:73](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/create-wallet-verification.action.ts#L73) |
| <a id="parameters"></a> `parameters` | `Record`\<`string`, `string`\> | Additional parameters specific to the verification type. | [sdk/viem/src/custom-actions/create-wallet-verification.action.ts:77](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/create-wallet-verification.action.ts#L77) |
| <a id="verificationtype"></a> `verificationType` | [`WalletVerificationType`](#walletverificationtype) | The type of verification method. | [sdk/viem/src/custom-actions/create-wallet-verification.action.ts:75](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/create-wallet-verification.action.ts#L75) |

***

#### DeleteWalletVerificationParameters

Defined in: [sdk/viem/src/custom-actions/delete-wallet-verification.action.ts:6](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/delete-wallet-verification.action.ts#L6)

Parameters for deleting a wallet verification.

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="userwalletaddress-1"></a> `userWalletAddress` | `string` | The wallet address for which to delete the verification. | [sdk/viem/src/custom-actions/delete-wallet-verification.action.ts:8](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/delete-wallet-verification.action.ts#L8) |
| <a id="verificationid"></a> `verificationId` | `string` | The unique identifier of the verification to delete. | [sdk/viem/src/custom-actions/delete-wallet-verification.action.ts:10](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/delete-wallet-verification.action.ts#L10) |

***

#### DeleteWalletVerificationResponse

Defined in: [sdk/viem/src/custom-actions/delete-wallet-verification.action.ts:16](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/delete-wallet-verification.action.ts#L16)

Response from deleting a wallet verification.

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="success"></a> `success` | `boolean` | Whether the deletion was successful. | [sdk/viem/src/custom-actions/delete-wallet-verification.action.ts:18](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/delete-wallet-verification.action.ts#L18) |

***

#### GetWalletVerificationsParameters

Defined in: [sdk/viem/src/custom-actions/get-wallet-verifications.action.ts:7](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/get-wallet-verifications.action.ts#L7)

Parameters for getting wallet verifications.

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="userwalletaddress-2"></a> `userWalletAddress` | `string` | The wallet address for which to fetch verifications. | [sdk/viem/src/custom-actions/get-wallet-verifications.action.ts:9](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/get-wallet-verifications.action.ts#L9) |

***

#### VerificationResult

Defined in: [sdk/viem/src/custom-actions/verify-wallet-verification-challenge.action.ts:26](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/verify-wallet-verification-challenge.action.ts#L26)

Result of a wallet verification challenge.

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="verified"></a> `verified` | `boolean` | Whether the verification was successful. | [sdk/viem/src/custom-actions/verify-wallet-verification-challenge.action.ts:28](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/verify-wallet-verification-challenge.action.ts#L28) |

***

#### VerifyWalletVerificationChallengeParameters

Defined in: [sdk/viem/src/custom-actions/verify-wallet-verification-challenge.action.ts:16](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/verify-wallet-verification-challenge.action.ts#L16)

Parameters for verifying a wallet verification challenge.

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="addressorobject-1"></a> `addressOrObject` | [`AddressOrObject`](#addressorobject-2) | The wallet address or object containing wallet address and optional verification ID. | [sdk/viem/src/custom-actions/verify-wallet-verification-challenge.action.ts:18](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/verify-wallet-verification-challenge.action.ts#L18) |
| <a id="challengeresponse"></a> `challengeResponse` | `string` | The response to the verification challenge. | [sdk/viem/src/custom-actions/verify-wallet-verification-challenge.action.ts:20](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/verify-wallet-verification-challenge.action.ts#L20) |

***

#### WalletInfo

Defined in: [sdk/viem/src/custom-actions/create-wallet.action.ts:6](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/create-wallet.action.ts#L6)

Information about the wallet to be created.

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="name-2"></a> `name` | `string` | The name of the wallet. | [sdk/viem/src/custom-actions/create-wallet.action.ts:8](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/create-wallet.action.ts#L8) |

***

#### WalletOTPVerificationInfo

Defined in: [sdk/viem/src/custom-actions/create-wallet-verification.action.ts:27](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/create-wallet-verification.action.ts#L27)

Information for One-Time Password (OTP) verification.

##### Extends

- `BaseWalletVerificationInfo`

##### Properties

| Property | Type | Description | Overrides | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="algorithm"></a> `algorithm?` | [`OTPAlgorithm`](#otpalgorithm) | The hash algorithm to use for OTP generation. | - | - | [sdk/viem/src/custom-actions/create-wallet-verification.action.ts:31](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/create-wallet-verification.action.ts#L31) |
| <a id="digits"></a> `digits?` | `number` | The number of digits in the OTP code. | - | - | [sdk/viem/src/custom-actions/create-wallet-verification.action.ts:33](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/create-wallet-verification.action.ts#L33) |
| <a id="issuer"></a> `issuer?` | `string` | The issuer of the OTP. | - | - | [sdk/viem/src/custom-actions/create-wallet-verification.action.ts:37](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/create-wallet-verification.action.ts#L37) |
| <a id="name-3"></a> `name` | `string` | The name of the verification method. | - | `BaseWalletVerificationInfo.name` | [sdk/viem/src/custom-actions/create-wallet-verification.action.ts:9](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/create-wallet-verification.action.ts#L9) |
| <a id="period"></a> `period?` | `number` | The time period in seconds for OTP validity. | - | - | [sdk/viem/src/custom-actions/create-wallet-verification.action.ts:35](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/create-wallet-verification.action.ts#L35) |
| <a id="verificationtype-1"></a> `verificationType` | [`OTP`](#otp) | The type of verification method. | `BaseWalletVerificationInfo.verificationType` | - | [sdk/viem/src/custom-actions/create-wallet-verification.action.ts:29](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/create-wallet-verification.action.ts#L29) |

***

#### WalletPincodeVerificationInfo

Defined in: [sdk/viem/src/custom-actions/create-wallet-verification.action.ts:17](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/create-wallet-verification.action.ts#L17)

Information for PIN code verification.

##### Extends

- `BaseWalletVerificationInfo`

##### Properties

| Property | Type | Description | Overrides | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="name-4"></a> `name` | `string` | The name of the verification method. | - | `BaseWalletVerificationInfo.name` | [sdk/viem/src/custom-actions/create-wallet-verification.action.ts:9](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/create-wallet-verification.action.ts#L9) |
| <a id="pincode-1"></a> `pincode` | `string` | The PIN code to use for verification. | - | - | [sdk/viem/src/custom-actions/create-wallet-verification.action.ts:21](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/create-wallet-verification.action.ts#L21) |
| <a id="verificationtype-2"></a> `verificationType` | [`PINCODE`](#pincode) | The type of verification method. | `BaseWalletVerificationInfo.verificationType` | - | [sdk/viem/src/custom-actions/create-wallet-verification.action.ts:19](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/create-wallet-verification.action.ts#L19) |

***

#### WalletSecretCodesVerificationInfo

Defined in: [sdk/viem/src/custom-actions/create-wallet-verification.action.ts:43](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/create-wallet-verification.action.ts#L43)

Information for secret recovery codes verification.

##### Extends

- `BaseWalletVerificationInfo`

##### Properties

| Property | Type | Description | Overrides | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="name-5"></a> `name` | `string` | The name of the verification method. | - | `BaseWalletVerificationInfo.name` | [sdk/viem/src/custom-actions/create-wallet-verification.action.ts:9](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/create-wallet-verification.action.ts#L9) |
| <a id="verificationtype-3"></a> `verificationType` | [`SECRET_CODES`](#secret_codes) | The type of verification method. | `BaseWalletVerificationInfo.verificationType` | - | [sdk/viem/src/custom-actions/create-wallet-verification.action.ts:45](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/create-wallet-verification.action.ts#L45) |

***

#### WalletVerification

Defined in: [sdk/viem/src/custom-actions/get-wallet-verifications.action.ts:15](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/get-wallet-verifications.action.ts#L15)

Represents a wallet verification.

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id-2"></a> `id` | `string` | The unique identifier of the verification. | [sdk/viem/src/custom-actions/get-wallet-verifications.action.ts:17](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/get-wallet-verifications.action.ts#L17) |
| <a id="name-6"></a> `name` | `string` | The name of the verification method. | [sdk/viem/src/custom-actions/get-wallet-verifications.action.ts:19](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/get-wallet-verifications.action.ts#L19) |
| <a id="verificationtype-4"></a> `verificationType` | [`WalletVerificationType`](#walletverificationtype) | The type of verification method. | [sdk/viem/src/custom-actions/get-wallet-verifications.action.ts:21](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/get-wallet-verifications.action.ts#L21) |

***

#### WalletVerificationChallenge

Defined in: [sdk/viem/src/custom-actions/create-wallet-verification-challenges.action.ts:16](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/create-wallet-verification-challenges.action.ts#L16)

Represents a wallet verification challenge.

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="challenge"></a> `challenge` | `Record`\<`string`, `string`\> | The challenge parameters specific to the verification type. | [sdk/viem/src/custom-actions/create-wallet-verification-challenges.action.ts:24](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/create-wallet-verification-challenges.action.ts#L24) |
| <a id="id-3"></a> `id` | `string` | The unique identifier of the challenge. | [sdk/viem/src/custom-actions/create-wallet-verification-challenges.action.ts:18](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/create-wallet-verification-challenges.action.ts#L18) |
| <a id="name-7"></a> `name` | `string` | The name of the challenge. | [sdk/viem/src/custom-actions/create-wallet-verification-challenges.action.ts:20](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/create-wallet-verification-challenges.action.ts#L20) |
| <a id="verificationtype-5"></a> `verificationType` | [`WalletVerificationType`](#walletverificationtype) | The type of verification required. | [sdk/viem/src/custom-actions/create-wallet-verification-challenges.action.ts:22](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/create-wallet-verification-challenges.action.ts#L22) |

***

#### WalletVerificationOptions

Defined in: [sdk/viem/src/viem.ts:86](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/viem.ts#L86)

The options for the wallet client.

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="challengeresponse-1"></a> `challengeResponse` | `string` | The challenge response (used for HD wallets) | [sdk/viem/src/viem.ts:94](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/viem.ts#L94) |
| <a id="verificationid-1"></a> `verificationId?` | `string` | The verification id (used for HD wallets), if not provided, the challenge response will be validated against all active verifications. | [sdk/viem/src/viem.ts:90](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/viem.ts#L90) |

### Type Aliases

#### AddressOrObject

> **AddressOrObject** = `string` \| \{ `userWalletAddress`: `string`; `verificationId?`: `string`; \}

Defined in: [sdk/viem/src/custom-actions/verify-wallet-verification-challenge.action.ts:6](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/verify-wallet-verification-challenge.action.ts#L6)

Represents either a wallet address string or an object containing wallet address and optional verification ID.

***

#### CreateWalletVerificationChallengesResponse

> **CreateWalletVerificationChallengesResponse** = [`WalletVerificationChallenge`](#walletverificationchallenge)[]

Defined in: [sdk/viem/src/custom-actions/create-wallet-verification-challenges.action.ts:30](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/create-wallet-verification-challenges.action.ts#L30)

Response from creating wallet verification challenges.

***

#### GetWalletVerificationsResponse

> **GetWalletVerificationsResponse** = [`WalletVerification`](#walletverification)[]

Defined in: [sdk/viem/src/custom-actions/get-wallet-verifications.action.ts:27](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/get-wallet-verifications.action.ts#L27)

Response from getting wallet verifications.

***

#### VerifyWalletVerificationChallengeResponse

> **VerifyWalletVerificationChallengeResponse** = [`VerificationResult`](#verificationresult)[]

Defined in: [sdk/viem/src/custom-actions/verify-wallet-verification-challenge.action.ts:34](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/verify-wallet-verification-challenge.action.ts#L34)

Response from verifying a wallet verification challenge.

***

#### WalletVerificationInfo

> **WalletVerificationInfo** = [`WalletPincodeVerificationInfo`](#walletpincodeverificationinfo) \| [`WalletOTPVerificationInfo`](#walletotpverificationinfo) \| [`WalletSecretCodesVerificationInfo`](#walletsecretcodesverificationinfo)

Defined in: [sdk/viem/src/custom-actions/create-wallet-verification.action.ts:51](https://github.com/settlemint/sdk/blob/v2.1.5/sdk/viem/src/custom-actions/create-wallet-verification.action.ts#L51)

Union type of all possible wallet verification information types.

## Contributing

We welcome contributions from the community! Please check out our [Contributing](https://github.com/settlemint/sdk/blob/main/.github/CONTRIBUTING.md) guide to learn how you can help improve the SettleMint SDK through bug reports, feature requests, documentation updates, or code contributions.

## License

The SettleMint SDK is released under the [FSL Software License](https://fsl.software). See the [LICENSE](https://github.com/settlemint/sdk/blob/main/LICENSE) file for more details.
