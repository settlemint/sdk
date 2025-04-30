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
<a href="https://fsl.software" rel="nofollow"><img src="https://img.shields.io/npm/l/@settlemint/sdk-portal" alt="License"></a>
<a href="https://www.npmjs.com/package/@settlemint/sdk-portal" rel="nofollow"><img src="https://img.shields.io/npm/dw/@settlemint/sdk-portal" alt="npm"></a>
<a href="https://github.com/settlemint/sdk" rel="nofollow"><img src="https://img.shields.io/github/stars/settlemint/sdk" alt="stars"></a>
</p>

<div align="center">
  <a href="https://console.settlemint.com/documentation">Documentation</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://www.npmjs.com/package/@settlemint/sdk-portal">NPM</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://github.com/settlemint/sdk/issues">Issues</a>
  <br />
</div>

## Table of Contents

- [About](#about)
- [Examples](#examples)
  - [Get pending transactions](#get-pending-transactions)
  - [Deploy contract](#deploy-contract)
  - [Send transaction using hd wallet](#send-transaction-using-hd-wallet)
- [API Reference](#api-reference)
  - [Functions](#functions)
    - [createPortalClient()](#createportalclient)
    - [handleWalletVerificationChallenge()](#handlewalletverificationchallenge)
    - [waitForTransactionReceipt()](#waitfortransactionreceipt)
  - [Interfaces](#interfaces)
    - [HandleWalletVerificationChallengeOptions\<Setup\>](#handlewalletverificationchallengeoptionssetup)
    - [Transaction](#transaction)
  - [Type Aliases](#type-aliases)
    - [ClientOptions](#clientoptions)
    - [RequestConfig](#requestconfig)
  - [Variables](#variables)
    - [ClientOptionsSchema](#clientoptionsschema)
- [Contributing](#contributing)
- [License](#license)

## About

The SettleMint Smart Contract Portal SDK provides a seamless way to interact with the Smart Contract Portal Middleware API. It enables you to easily interact with your smart contracts using a REST or GraphQL API.

The SDK offers a type-safe interface for all Portal API operations, with comprehensive error handling and validation. It integrates smoothly with modern TypeScript applications while providing a simple and intuitive developer experience.
## Examples

### Get pending transactions

```ts
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { createLogger, requestLogger } from "@settlemint/sdk-utils/logging";
import { createPortalClient } from "../portal.js"; // Replace this path with "@settlemint/sdk-portal"
import type { introspection } from "./schemas/portal-env.d.ts"; // Replace this path with the generated introspection type

const env = await loadEnv(false, false);
const logger = createLogger();

const { client: portalClient, graphql: portalGraphql } = createPortalClient<{
  introspection: introspection;
  disableMasking: true;
  scalars: {
    // Change unknown to the type you are using to store metadata
    JSON: unknown;
  };
}>(
  {
    instance: env.SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT!,
    accessToken: env.SETTLEMINT_ACCESS_TOKEN!,
  },
  {
    fetch: requestLogger(logger, "portal", fetch) as typeof fetch,
  },
);

// Making GraphQL queries
const query = portalGraphql(`
  query GetPendingTransactions {
    getPendingTransactions {
      count
    }
  }
`);

const result = await portalClient.request(query);
console.log(`There are ${result.getPendingTransactions?.count} pending transactions`);

```
### Deploy contract

```ts
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { createLogger, requestLogger } from "@settlemint/sdk-utils/logging";
import { getAddress } from "viem";
import { createPortalClient } from "../portal.js"; // Replace this path with "@settlemint/sdk-portal"
import { waitForTransactionReceipt } from "../utils/wait-for-transaction-receipt.js";
import type { introspection } from "./schemas/portal-env.d.ts"; // Replace this path with the generated introspection type

const env = await loadEnv(false, false);
const logger = createLogger();

const { client: portalClient, graphql: portalGraphql } = createPortalClient<{
  introspection: introspection;
  disableMasking: true;
  scalars: {
    // Change unknown to the type you are using to store metadata
    JSON: unknown;
  };
}>(
  {
    instance: env.SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT!,
    accessToken: env.SETTLEMINT_ACCESS_TOKEN!,
  },
  {
    fetch: requestLogger(logger, "portal", fetch) as typeof fetch,
  },
);

// Replace with the address of your private key which you use to deploy smart contracts
const FROM = getAddress("0x4B03331cF2db1497ec58CAa4AFD8b93611906960");

/**
 * Deploy a forwarder contract
 */
const deployForwarder = await portalClient.request(
  portalGraphql(`
    mutation DeployContractForwarder($from: String!) {
      DeployContractForwarder(from: $from, gasLimit: "0x3d0900") {
        transactionHash
      }
    }
  `),
  {
    from: FROM,
  },
);

/**
 * Wait for the forwared contract deployment to be finalized
 */
const transaction = await waitForTransactionReceipt(deployForwarder.DeployContractForwarder?.transactionHash!, {
  portalGraphqlEndpoint: env.SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT!,
  accessToken: env.SETTLEMINT_ACCESS_TOKEN!,
});

/**
 * Deploy a stablecoin factory contract
 */
const deployStableCoinFactory = await portalClient.request(
  portalGraphql(`
    mutation DeployContractStableCoinFactory($from: String!, $constructorArguments: DeployContractStableCoinFactoryInput!) {
      DeployContractStableCoinFactory(from: $from, constructorArguments: $constructorArguments, gasLimit: "0x3d0900") {
        transactionHash
      }
    }
  `),
  {
    from: FROM,
    constructorArguments: {
      forwarder: getAddress(transaction?.receipt.contractAddress!),
    },
  },
);

console.log(deployStableCoinFactory?.DeployContractStableCoinFactory?.transactionHash);

```
### Send transaction using hd wallet

```ts
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { createLogger, requestLogger } from "@settlemint/sdk-utils/logging";
import type { Address } from "viem";
import { createPortalClient } from "../portal.js"; // Replace this path with "@settlemint/sdk-portal"
import { handleWalletVerificationChallenge } from "../utils/wallet-verification-challenge.js"; // Replace this path with "@settlemint/sdk-portal"
import type { introspection } from "./schemas/portal-env.js"; // Replace this path with the generated introspection type

const env = await loadEnv(false, false);
const logger = createLogger();

const { client: portalClient, graphql: portalGraphql } = createPortalClient<{
  introspection: introspection;
  disableMasking: true;
  scalars: {
    // Change unknown to the type you are using to store metadata
    JSON: unknown;
  };
}>(
  {
    instance: env.SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT!,
    accessToken: env.SETTLEMINT_ACCESS_TOKEN!,
  },
  {
    fetch: requestLogger(logger, "portal", fetch) as typeof fetch,
  },
);

/**
 * First create a wallet using the HD private key, this needs to be done for every user that is using your app
 */
const wallet = await portalClient.request(
  portalGraphql(`
    mutation createUserWallet($keyVaultId: String!, $name: String!) {
      createWallet(keyVaultId: $keyVaultId, walletInfo: { name: $name }) {
        address
      }
    }
  `),
  {
    keyVaultId: env.SETTLEMINT_HD_PRIVATE_KEY!,
    name: "My Wallet",
  },
);

/**
 * Set a pincode for the wallet, this is used to verify the wallet when the user is sending a transaction to the chain
 */
const pincodeVerification = await portalClient.request(
  portalGraphql(`
    mutation setPinCode($address: String!, $pincode: String!) {
      createWalletVerification(
        userWalletAddress: $address
        verificationInfo: {pincode: {name: "PINCODE", pincode: $pincode}}
      ) {
        id
        name
        parameters
        verificationType
      }
    }
    `),
  {
    address: wallet.createWallet?.address!,
    pincode: "123456",
  },
);

/**
 * Generate a challenge response for the pincode verification
 */
const challengeResponse = await handleWalletVerificationChallenge({
  portalClient,
  portalGraphql,
  verificationId: pincodeVerification.createWalletVerification?.id!,
  userWalletAddress: wallet.createWallet?.address! as Address,
  code: "123456",
  verificationType: "pincode",
});

/**
 * Send a transaction to the chain
 * This is a sample of how to send a transaction to the chain using the portal client and the asset tokenization kit
 * The challenge response is generated using the handleWalletVerificationChallenge function, this is used to verifiy wallet access
 * @see https://github.com/settlemint/asset-tokenization-kit
 */
const result = await portalClient.request(
  portalGraphql(`
    mutation StableCoinFactoryCreate(
      $challengeResponse: String!
      $verificationId: String
      $address: String!
      $from: String!
      $input: StableCoinFactoryCreateInput!
    ) {
      StableCoinFactoryCreate(
        challengeResponse: $challengeResponse
        verificationId: $verificationId
        address: $address
        from: $from
        input: $input
      ) {
        transactionHash
      }
    }
  `),
  {
    challengeResponse: challengeResponse.challengeResponse,
    verificationId: pincodeVerification.createWalletVerification?.id!,
    address: "0x5e771e1417100000000000000000000000000004",
    from: wallet.createWallet?.address!,
    input: {
      name: "Test Coin",
      symbol: "TEST",
      decimals: 18,
      collateralLivenessSeconds: 3_600,
    },
  },
);

// Log the transaction hash
console.log("Transaction hash:", result.StableCoinFactoryCreate?.transactionHash);

```

## API Reference

### Functions

#### createPortalClient()

> **createPortalClient**\<`Setup`\>(`options`, `clientOptions?`): `object`

Defined in: [sdk/portal/src/portal.ts:71](https://github.com/settlemint/sdk/blob/v2.2.0/sdk/portal/src/portal.ts#L71)

Creates a Portal GraphQL client with the provided configuration.

##### Type Parameters

| Type Parameter |
| ------ |
| `Setup` *extends* `AbstractSetupSchema` |

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | \{ `accessToken`: `string`; `cache?`: `"default"` \| `"force-cache"` \| `"no-cache"` \| `"no-store"` \| `"only-if-cached"` \| `"reload"`; `instance`: `string`; \} | Configuration options for the Portal client |
| `options.accessToken` | `string` | - |
| `options.cache?` | `"default"` \| `"force-cache"` \| `"no-cache"` \| `"no-store"` \| `"only-if-cached"` \| `"reload"` | - |
| `options.instance?` | `string` | - |
| `clientOptions?` | `RequestConfig` | Additional GraphQL client configuration options |

##### Returns

`object`

An object containing the configured GraphQL client and graphql helper function

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `client` | `GraphQLClient` | [sdk/portal/src/portal.ts:75](https://github.com/settlemint/sdk/blob/v2.2.0/sdk/portal/src/portal.ts#L75) |
| `graphql` | `initGraphQLTada`\<`Setup`\> | [sdk/portal/src/portal.ts:76](https://github.com/settlemint/sdk/blob/v2.2.0/sdk/portal/src/portal.ts#L76) |

##### Throws

If the provided options fail validation

##### Example

```ts
import { createPortalClient } from "@settlemint/sdk-portal";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { createLogger, requestLogger } from "@settlemint/sdk-utils/logging";
import type { introspection } from "@schemas/portal-env";

const env = await loadEnv(false, false);
const logger = createLogger();

const { client: portalClient, graphql: portalGraphql } = createPortalClient<{
  introspection: introspection;
  disableMasking: true;
  scalars: {
    // Change unknown to the type you are using to store metadata
    JSON: unknown;
  };
}>(
  {
    instance: env.SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT!,
    accessToken: env.SETTLEMINT_ACCESS_TOKEN!,
  },
  {
    fetch: requestLogger(logger, "portal", fetch) as typeof fetch,
  },
);

// Making GraphQL queries
const query = portalGraphql(`
  query GetPendingTransactions {
    getPendingTransactions {
      count
    }
  }
`);

const result = await portalClient.request(query);
```

***

#### handleWalletVerificationChallenge()

> **handleWalletVerificationChallenge**\<`Setup`\>(`options`): `Promise`\<\{ `challengeResponse`: `string`; `verificationId?`: `string`; \}\>

Defined in: [sdk/portal/src/utils/wallet-verification-challenge.ts:106](https://github.com/settlemint/sdk/blob/v2.2.0/sdk/portal/src/utils/wallet-verification-challenge.ts#L106)

Handles a wallet verification challenge by generating an appropriate response

##### Type Parameters

| Type Parameter |
| ------ |
| `Setup` *extends* `AbstractSetupSchema` |

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`HandleWalletVerificationChallengeOptions`](#handlewalletverificationchallengeoptions)\<`Setup`\> | The options for handling the wallet verification challenge |

##### Returns

`Promise`\<\{ `challengeResponse`: `string`; `verificationId?`: `string`; \}\>

Promise resolving to an object containing the challenge response and optionally the verification ID

##### Throws

If the challenge cannot be created or is invalid

##### Example

```ts
import { createPortalClient } from "@settlemint/sdk-portal";
import { handleWalletVerificationChallenge } from "@settlemint/sdk-portal";

const { client, graphql } = createPortalClient({
  instance: "https://portal.example.com/graphql",
  accessToken: "your-access-token"
});

const result = await handleWalletVerificationChallenge({
  portalClient: client,
  portalGraphql: graphql,
  verificationId: "verification-123",
  userWalletAddress: "0x123...",
  code: "123456",
  verificationType: "otp"
});
```

***

#### waitForTransactionReceipt()

> **waitForTransactionReceipt**(`transactionHash`, `options`): `Promise`\<`undefined` \| [`Transaction`](#transaction)\>

Defined in: [sdk/portal/src/utils/wait-for-transaction-receipt.ts:70](https://github.com/settlemint/sdk/blob/v2.2.0/sdk/portal/src/utils/wait-for-transaction-receipt.ts#L70)

Wait for the transaction receipt

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `transactionHash` | `string` | transaction hash |
| `options` | `WaitForTransactionReceiptOptions` | options |

##### Returns

`Promise`\<`undefined` \| [`Transaction`](#transaction)\>

receipt

### Interfaces

#### HandleWalletVerificationChallengeOptions\<Setup\>

Defined in: [sdk/portal/src/utils/wallet-verification-challenge.ts:73](https://github.com/settlemint/sdk/blob/v2.2.0/sdk/portal/src/utils/wallet-verification-challenge.ts#L73)

Options for handling a wallet verification challenge

##### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `Setup` *extends* `AbstractSetupSchema` | The GraphQL schema setup type |

***

#### Transaction

Defined in: [sdk/portal/src/utils/wait-for-transaction-receipt.ts:25](https://github.com/settlemint/sdk/blob/v2.2.0/sdk/portal/src/utils/wait-for-transaction-receipt.ts#L25)

Represents the structure of a blockchain transaction with its receipt

### Type Aliases

#### ClientOptions

> **ClientOptions** = `object`

Defined in: [sdk/portal/src/portal.ts:24](https://github.com/settlemint/sdk/blob/v2.2.0/sdk/portal/src/portal.ts#L24)

Type representing the validated client options.

##### Type declaration

| Name | Type | Default value | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="accesstoken"></a> `accessToken` | `string` | `ApplicationAccessTokenSchema` | [sdk/portal/src/portal.ts:17](https://github.com/settlemint/sdk/blob/v2.2.0/sdk/portal/src/portal.ts#L17) |
| <a id="cache"></a> `cache?` | `"default"` \| `"force-cache"` \| `"no-cache"` \| `"no-store"` \| `"only-if-cached"` \| `"reload"` | - | [sdk/portal/src/portal.ts:18](https://github.com/settlemint/sdk/blob/v2.2.0/sdk/portal/src/portal.ts#L18) |
| <a id="instance"></a> `instance` | `string` | `UrlOrPathSchema` | [sdk/portal/src/portal.ts:16](https://github.com/settlemint/sdk/blob/v2.2.0/sdk/portal/src/portal.ts#L16) |

***

#### RequestConfig

> **RequestConfig** = `ConstructorParameters`\<*typeof* `GraphQLClient`\>\[`1`\]

Defined in: [sdk/portal/src/portal.ts:10](https://github.com/settlemint/sdk/blob/v2.2.0/sdk/portal/src/portal.ts#L10)

Configuration options for the GraphQL client, excluding 'url' and 'exchanges'.

### Variables

#### ClientOptionsSchema

> `const` **ClientOptionsSchema**: `ZodObject`\<[`ClientOptions`](#clientoptions)\>

Defined in: [sdk/portal/src/portal.ts:15](https://github.com/settlemint/sdk/blob/v2.2.0/sdk/portal/src/portal.ts#L15)

Schema for validating Portal client configuration options.

## Contributing

We welcome contributions from the community! Please check out our [Contributing](https://github.com/settlemint/sdk/blob/main/.github/CONTRIBUTING.md) guide to learn how you can help improve the SettleMint SDK through bug reports, feature requests, documentation updates, or code contributions.

## License

The SettleMint SDK is released under the [FSL Software License](https://fsl.software). See the [LICENSE](https://github.com/settlemint/sdk/blob/main/LICENSE) file for more details.
