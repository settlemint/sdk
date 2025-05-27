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
  - [Deploy contract](#deploy-contract)
  - [Get pending transactions](#get-pending-transactions)
  - [Monitoring alerting](#monitoring-alerting)
  - [Send transaction using hd wallet](#send-transaction-using-hd-wallet)
- [API Reference](#api-reference)
  - [Functions](#functions)
    - [createPortalClient()](#createportalclient)
    - [getWebsocketClient()](#getwebsocketclient)
    - [handleWalletVerificationChallenge()](#handlewalletverificationchallenge)
    - [waitForTransactionReceipt()](#waitfortransactionreceipt)
  - [Interfaces](#interfaces)
    - [HandleWalletVerificationChallengeOptions\<Setup\>](#handlewalletverificationchallengeoptionssetup)
    - [Transaction](#transaction)
    - [TransactionEvent](#transactionevent)
    - [TransactionReceipt](#transactionreceipt)
    - [WaitForTransactionReceiptOptions](#waitfortransactionreceiptoptions)
    - [WebsocketClientOptions](#websocketclientoptions)
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

### Deploy contract

```ts
/**
 * This example demonstrates how to deploy a contract.
 *
 * The process involves:
 * 1. Creating a portal client
 * 2. Deploying a forwarder contract
 * 3. Waiting for the forwarder contract deployment to be finalized
 * 4. Deploying a stablecoin factory contract
 * 5. Getting all contracts and filtering by ABI name
 *
 * This pattern is useful for applications that need to deploy smart contracts
 * in the SettleMint Portal, providing a way to track the progress of blockchain operations.
 */
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { createLogger, requestLogger } from "@settlemint/sdk-utils/logging";
import { getAddress } from "viem";
import { createPortalClient } from "../portal.js"; // Replace this path with "@settlemint/sdk-portal"
import { waitForTransactionReceipt } from "../utils/wait-for-transaction-receipt.js"; // Replace this path with "@settlemint/sdk-portal"
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
 * Wait for the forwarder contract deployment to be finalized
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

const contractAddresses = await portalClient.request(
  portalGraphql(`
    query GetContracts {
        getContracts {
            count
            records {
                address
                abiName
                createdAt
            }
        }
    }
  `),
);
// Print total count
console.log(`Total contracts: ${contractAddresses.getContracts?.count}`);

// Contracts for StableCoinFactory
console.log(contractAddresses.getContracts?.records.filter((record) => record.abiName === "StableCoinFactory"));

```
### Get pending transactions

```ts
/**
 * This example demonstrates how to get the number of pending transactions.
 *
 * The process involves:
 * 1. Creating a portal client
 * 2. Making a GraphQL query to get the number of pending transactions
 *
 * This pattern is useful for applications that need to monitor the status of pending transactions
 * in the SettleMint Portal, providing a way to track the progress of blockchain operations.
 */
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
### Monitoring alerting

```ts
/**
 * This example demonstrates how to implement real-time transaction monitoring and alerting.
 *
 * The process involves:
 * 1. Creating a WebSocket subscription to monitor all blockchain transactions
 * 2. Setting up custom handlers for different monitoring scenarios
 * 3. Processing transactions in real-time as they are confirmed
 * 4. Implementing specific monitoring functions for addresses, events, and failures
 * 5. Triggering alerts based on predefined conditions
 *
 * This pattern is useful for applications that need to:
 * - Detect suspicious activities for security purposes
 * - Track high-value transfers or specific contract interactions
 * - Monitor for failed transactions that require attention
 * - Implement compliance reporting and audit trails
 * - Build automated workflows that respond to on-chain events
 * - Provide real-time notifications to stakeholders
 */

import type { FormattedExecutionResult } from "graphql";
import { type Transaction, type WebsocketClientOptions, getWebsocketClient } from "../portal.js"; // Replace this path with "@settlemint/sdk-portal"

/**
 * Handlers for different monitoring scenarios
 * You can implement your own handlers
 */
export type AlertHandlers = {
  onAddressActivity: (transaction: Transaction, addresses: string[]) => void;
  onEvent: (transaction: Transaction, eventNames: string[]) => void;
  onFailure: (transaction: Transaction) => void;
};

/**
 * Monitors all blockchain transactions by subscribing to transaction updates via GraphQL.
 * This function continuously logs all transaction receipts as they are received.
 *
 * @param options - Configuration options for connecting to the Portal API
 * @param handlers - Optional handlers for different monitoring scenarios
 * @throws Error if the subscription fails
 *
 * @example
 * import { monitorAllTransactions } from "@settlemint/sdk-portal";
 *
 * monitorAllTransactions({
 *   portalGraphqlEndpoint: "https://example.settlemint.com/graphql",
 *   accessToken: "your-access-token"
 * }, {
 *   onAddressActivity: (tx, address) => {
 *     console.log(`Address ${address} was involved in transaction ${tx.transactionHash}`);
 *   },
 *   onEvent: (tx, eventName) => {
 *     console.log(`Event ${eventName} detected in transaction ${tx.transactionHash}`);
 *   },
 *   onFailure: (tx, reason) => {
 *     console.log(`Transaction ${tx.transactionHash} failed: ${reason}`);
 *   }
 * });
 */
export function monitorAllTransactions(options: WebsocketClientOptions, handlers: AlertHandlers) {
  const wsClient = getWebsocketClient(options);

  const subscription = wsClient.iterate<{
    getProcessedTransactions: {
      records: Transaction[];
    };
  }>({
    query: `subscription getProcessedTransactions {
      getProcessedTransactions(pageSize: 1) {
        records {
          receipt {
            transactionHash
            to
            status
            from
            type
            revertReason
            revertReasonDecoded
            logs
            events
            contractAddress
          }
          transactionHash
          from
          createdAt
          address
          functionName
          isContract
        }
      }
    }`,
  });

  // Start the monitoring process
  processSubscription(subscription, handlers);

  return subscription;
}

/**
 * Internal helper to process the subscription stream
 */
async function processSubscription(
  subscription: AsyncIterable<
    FormattedExecutionResult<
      {
        getProcessedTransactions: {
          records: Transaction[];
        };
      },
      unknown
    >
  >,
  handlers: AlertHandlers,
) {
  (async () => {
    for await (const result of subscription) {
      if (result?.data?.getProcessedTransactions?.records) {
        const records = result.data.getProcessedTransactions.records;
        const transaction = records.at(-1);

        if (transaction) {
          processTransaction(transaction, handlers);
        }
      }
    }
  })();
}

/**
 * Process a single transaction with the configured handlers
 */
function processTransaction(transaction: Transaction, handlers: AlertHandlers) {
  // Monitor specific addresses (example addresses)
  handlers.onAddressActivity(transaction, ["0x742d35Cc6634C0532925a3b844Bc454e4438f44e"]);

  // Monitor for specific events
  handlers.onEvent(transaction, ["Transfer", "Approval"]);

  // Monitor for failed transactions
  handlers.onFailure(transaction);
}

/**
 * Monitors transactions from or to specific addresses.
 *
 * @param transaction - The transaction to check
 * @param addresses - The addresses to monitor
 *
 * @example
 * import { monitorSpecificAddresses } from "@settlemint/sdk-portal";
 *
 * monitorSpecificAddresses(transaction, ["0x742d35Cc6634C0532925a3b844Bc454e4438f44e"]);
 */
export function monitorSpecificAddresses(transaction: Transaction, addresses: string[]) {
  const { from, address } = transaction;
  const { to } = transaction.receipt;
  const isInvolved = addresses.some((address) => [from, to].includes(address));

  if (isInvolved) {
    notify(`[ADDRESS] Address ${address} was involved in transaction ${transaction.transactionHash}`);
  }
}

/**
 * Monitors transactions for specific contract events.
 *
 * @param transaction - The transaction to check
 * @param eventNames - The event names to monitor
 *
 * @example
 * import { monitorContractEvents } from "@settlemint/sdk-portal";
 *
 * monitorContractEvents(transaction, ["Transfer", "Approval"]);
 */
export function monitorContractEvents(transaction: Transaction, eventNames: string[]) {
  const events = transaction.receipt.events;

  const eventDetected = events.find((event) => eventNames.includes(event.eventName));
  if (eventDetected) {
    notify(`[EVENT] Event ${eventDetected.eventName} detected in transaction ${transaction.transactionHash}`);
  }
}

/**
 * Monitors for failed transactions that require attention.
 *
 * @param transaction - The transaction to check
 *
 * @example
 * import { monitorFailedTransactions } from "@settlemint/sdk-portal";
 *
 * monitorFailedTransactions(transaction, "Unknown reason");
 */
export function monitorFailedTransactions(transaction: Transaction) {
  const status = transaction.receipt?.status;

  if (status === "Reverted") {
    const reason = transaction.receipt.revertReasonDecoded;
    notify(`[FAILED] Transaction ${transaction.transactionHash} failed: ${reason}`);
  }
}

const notify = (message: string) => {
  console.log(message);
};

/**
 * Example usage - monitoring specific on-chain activity
 */
export function runMonitoringExample() {
  // Basic usage
  monitorAllTransactions(
    {
      portalGraphqlEndpoint: "https://example.settlemint.com/graphql",
      accessToken: process.env.SETTLEMINT_ACCESS_TOKEN!,
    },
    {
      onAddressActivity: monitorSpecificAddresses,
      onEvent: monitorContractEvents,
      onFailure: monitorFailedTransactions,
    },
  );
}

runMonitoringExample();

```
### Send transaction using hd wallet

```ts
/**
 * This example demonstrates how to send a transaction using an HD wallet.
 *
 * The process involves:
 * 1. Creating a wallet for a user using the HD private key
 * 2. Setting up a pincode for wallet verification
 * 3. Handling the wallet verification challenge
 * 4. Sending a transaction to the blockchain
 *
 * This pattern is useful for applications that need to manage multiple user wallets
 * derived from a single HD wallet, providing a secure and scalable approach to
 * blockchain interactions in enterprise applications.
 */
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

Defined in: [sdk/portal/src/portal.ts:72](https://github.com/settlemint/sdk/blob/v2.3.5/sdk/portal/src/portal.ts#L72)

Creates a Portal GraphQL client with the provided configuration.

##### Type Parameters

| Type Parameter |
| ------ |
| `Setup` *extends* `AbstractSetupSchema` |

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | \{ `accessToken?`: `string`; `cache?`: `"default"` \| `"force-cache"` \| `"no-cache"` \| `"no-store"` \| `"only-if-cached"` \| `"reload"`; `instance`: `string`; \} | Configuration options for the Portal client |
| `options.accessToken?` | `string` | - |
| `options.cache?` | `"default"` \| `"force-cache"` \| `"no-cache"` \| `"no-store"` \| `"only-if-cached"` \| `"reload"` | - |
| `options.instance?` | `string` | - |
| `clientOptions?` | `RequestConfig` | Additional GraphQL client configuration options |

##### Returns

`object`

An object containing the configured GraphQL client and graphql helper function

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `client` | `GraphQLClient` | [sdk/portal/src/portal.ts:76](https://github.com/settlemint/sdk/blob/v2.3.5/sdk/portal/src/portal.ts#L76) |
| `graphql` | `initGraphQLTada`\<`Setup`\> | [sdk/portal/src/portal.ts:77](https://github.com/settlemint/sdk/blob/v2.3.5/sdk/portal/src/portal.ts#L77) |

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

#### getWebsocketClient()

> **getWebsocketClient**(`options`): `Client`

Defined in: [sdk/portal/src/utils/websocket-client.ts:30](https://github.com/settlemint/sdk/blob/v2.3.5/sdk/portal/src/utils/websocket-client.ts#L30)

Creates a GraphQL WebSocket client for the Portal API

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`WebsocketClientOptions`](#websocketclientoptions) | The options for the client |

##### Returns

`Client`

The GraphQL WebSocket client

##### Example

```ts
import { getWebsocketClient } from "@settlemint/sdk-portal";

const client = getWebsocketClient({
  portalGraphqlEndpoint: "https://portal.settlemint.com/graphql",
  accessToken: "your-access-token",
});
```

***

#### handleWalletVerificationChallenge()

> **handleWalletVerificationChallenge**\<`Setup`\>(`options`): `Promise`\<\{ `challengeResponse`: `string`; `verificationId?`: `string`; \}\>

Defined in: [sdk/portal/src/utils/wallet-verification-challenge.ts:103](https://github.com/settlemint/sdk/blob/v2.3.5/sdk/portal/src/utils/wallet-verification-challenge.ts#L103)

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

> **waitForTransactionReceipt**(`transactionHash`, `options`): `Promise`\<[`Transaction`](#transaction)\>

Defined in: [sdk/portal/src/utils/wait-for-transaction-receipt.ts:80](https://github.com/settlemint/sdk/blob/v2.3.5/sdk/portal/src/utils/wait-for-transaction-receipt.ts#L80)

Waits for a blockchain transaction receipt by subscribing to transaction updates via GraphQL.
This function polls until the transaction is confirmed or the timeout is reached.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `transactionHash` | `string` | The hash of the transaction to wait for |
| `options` | [`WaitForTransactionReceiptOptions`](#waitfortransactionreceiptoptions) | Configuration options for the waiting process |

##### Returns

`Promise`\<[`Transaction`](#transaction)\>

The transaction details including receipt information when the transaction is confirmed

##### Throws

Error if the transaction receipt cannot be retrieved within the specified timeout

##### Example

```ts
import { waitForTransactionReceipt } from "@settlemint/sdk-portal";

const transaction = await waitForTransactionReceipt("0x123...", {
  portalGraphqlEndpoint: "https://example.settlemint.com/graphql",
  accessToken: "your-access-token",
  timeout: 30000 // 30 seconds timeout
});
```

### Interfaces

#### HandleWalletVerificationChallengeOptions\<Setup\>

Defined in: [sdk/portal/src/utils/wallet-verification-challenge.ts:64](https://github.com/settlemint/sdk/blob/v2.3.5/sdk/portal/src/utils/wallet-verification-challenge.ts#L64)

Options for handling a wallet verification challenge

##### Type Parameters

| Type Parameter |
| ------ |
| `Setup` *extends* `AbstractSetupSchema` |

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="code"></a> `code` | `string` \| `number` | The verification code provided by the user | [sdk/portal/src/utils/wallet-verification-challenge.ts:74](https://github.com/settlemint/sdk/blob/v2.3.5/sdk/portal/src/utils/wallet-verification-challenge.ts#L74) |
| <a id="portalclient"></a> `portalClient` | `GraphQLClient` | The portal client instance | [sdk/portal/src/utils/wallet-verification-challenge.ts:66](https://github.com/settlemint/sdk/blob/v2.3.5/sdk/portal/src/utils/wallet-verification-challenge.ts#L66) |
| <a id="portalgraphql"></a> `portalGraphql` | `initGraphQLTada`\<`Setup`\> | The GraphQL query builder | [sdk/portal/src/utils/wallet-verification-challenge.ts:68](https://github.com/settlemint/sdk/blob/v2.3.5/sdk/portal/src/utils/wallet-verification-challenge.ts#L68) |
| <a id="userwalletaddress"></a> `userWalletAddress` | `` `0x${string}` `` | The wallet address to verify | [sdk/portal/src/utils/wallet-verification-challenge.ts:72](https://github.com/settlemint/sdk/blob/v2.3.5/sdk/portal/src/utils/wallet-verification-challenge.ts#L72) |
| <a id="verificationid"></a> `verificationId` | `string` | The ID of the verification challenge | [sdk/portal/src/utils/wallet-verification-challenge.ts:70](https://github.com/settlemint/sdk/blob/v2.3.5/sdk/portal/src/utils/wallet-verification-challenge.ts#L70) |
| <a id="verificationtype"></a> `verificationType` | `"otp"` \| `"secret-code"` \| `"pincode"` | The type of verification being performed | [sdk/portal/src/utils/wallet-verification-challenge.ts:76](https://github.com/settlemint/sdk/blob/v2.3.5/sdk/portal/src/utils/wallet-verification-challenge.ts#L76) |

***

#### Transaction

Defined in: [sdk/portal/src/utils/wait-for-transaction-receipt.ts:34](https://github.com/settlemint/sdk/blob/v2.3.5/sdk/portal/src/utils/wait-for-transaction-receipt.ts#L34)

Represents the structure of a blockchain transaction with its receipt

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="address"></a> `address` | `string` | The contract address involved in the transaction | [sdk/portal/src/utils/wait-for-transaction-receipt.ts:43](https://github.com/settlemint/sdk/blob/v2.3.5/sdk/portal/src/utils/wait-for-transaction-receipt.ts#L43) |
| <a id="createdat"></a> `createdAt` | `string` | Timestamp when the transaction was created | [sdk/portal/src/utils/wait-for-transaction-receipt.ts:41](https://github.com/settlemint/sdk/blob/v2.3.5/sdk/portal/src/utils/wait-for-transaction-receipt.ts#L41) |
| <a id="from"></a> `from` | `string` | The sender address (duplicate of receipt.from) | [sdk/portal/src/utils/wait-for-transaction-receipt.ts:39](https://github.com/settlemint/sdk/blob/v2.3.5/sdk/portal/src/utils/wait-for-transaction-receipt.ts#L39) |
| <a id="functionname"></a> `functionName` | `string` | The name of the function called in the transaction | [sdk/portal/src/utils/wait-for-transaction-receipt.ts:45](https://github.com/settlemint/sdk/blob/v2.3.5/sdk/portal/src/utils/wait-for-transaction-receipt.ts#L45) |
| <a id="iscontract"></a> `isContract` | `boolean` | Whether the transaction is a contract deployment | [sdk/portal/src/utils/wait-for-transaction-receipt.ts:47](https://github.com/settlemint/sdk/blob/v2.3.5/sdk/portal/src/utils/wait-for-transaction-receipt.ts#L47) |
| <a id="transactionhash"></a> `transactionHash` | `string` | The hash of the transaction (duplicate of receipt.transactionHash) | [sdk/portal/src/utils/wait-for-transaction-receipt.ts:37](https://github.com/settlemint/sdk/blob/v2.3.5/sdk/portal/src/utils/wait-for-transaction-receipt.ts#L37) |

***

#### TransactionEvent

Defined in: [sdk/portal/src/utils/wait-for-transaction-receipt.ts:8](https://github.com/settlemint/sdk/blob/v2.3.5/sdk/portal/src/utils/wait-for-transaction-receipt.ts#L8)

Represents an event emitted during a transaction execution

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="args"></a> `args` | `Record`\<`string`, `unknown`\> | The arguments emitted by the event | [sdk/portal/src/utils/wait-for-transaction-receipt.ts:12](https://github.com/settlemint/sdk/blob/v2.3.5/sdk/portal/src/utils/wait-for-transaction-receipt.ts#L12) |
| <a id="eventname"></a> `eventName` | `string` | The name of the event that was emitted | [sdk/portal/src/utils/wait-for-transaction-receipt.ts:10](https://github.com/settlemint/sdk/blob/v2.3.5/sdk/portal/src/utils/wait-for-transaction-receipt.ts#L10) |
| <a id="topics"></a> `topics` | `` `0x${string}` ``[] | Indexed event parameters used for filtering and searching | [sdk/portal/src/utils/wait-for-transaction-receipt.ts:14](https://github.com/settlemint/sdk/blob/v2.3.5/sdk/portal/src/utils/wait-for-transaction-receipt.ts#L14) |

***

#### TransactionReceipt

Defined in: [sdk/portal/src/utils/wait-for-transaction-receipt.ts:20](https://github.com/settlemint/sdk/blob/v2.3.5/sdk/portal/src/utils/wait-for-transaction-receipt.ts#L20)

Represents the structure of a blockchain transaction receipt

##### Extends

- `TransactionReceipt`\<`string`, `number`, `"Success"` \| `"Reverted"`\>

##### Properties

| Property | Type | Description | Overrides | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="contractaddress"></a> `contractAddress` | `` `0x${string}` `` | The address of the contract deployed in the transaction | `TransactionReceiptViem.contractAddress` | [sdk/portal/src/utils/wait-for-transaction-receipt.ts:28](https://github.com/settlemint/sdk/blob/v2.3.5/sdk/portal/src/utils/wait-for-transaction-receipt.ts#L28) |
| <a id="events"></a> `events` | [`TransactionEvent`](#transactionevent)[] | Array of events emitted during the transaction | - | [sdk/portal/src/utils/wait-for-transaction-receipt.ts:26](https://github.com/settlemint/sdk/blob/v2.3.5/sdk/portal/src/utils/wait-for-transaction-receipt.ts#L26) |
| <a id="revertreason"></a> `revertReason` | `string` | The raw reason for transaction reversion, if applicable | - | [sdk/portal/src/utils/wait-for-transaction-receipt.ts:22](https://github.com/settlemint/sdk/blob/v2.3.5/sdk/portal/src/utils/wait-for-transaction-receipt.ts#L22) |
| <a id="revertreasondecoded"></a> `revertReasonDecoded` | `string` | Human-readable version of the revert reason | - | [sdk/portal/src/utils/wait-for-transaction-receipt.ts:24](https://github.com/settlemint/sdk/blob/v2.3.5/sdk/portal/src/utils/wait-for-transaction-receipt.ts#L24) |

***

#### WaitForTransactionReceiptOptions

Defined in: [sdk/portal/src/utils/wait-for-transaction-receipt.ts:57](https://github.com/settlemint/sdk/blob/v2.3.5/sdk/portal/src/utils/wait-for-transaction-receipt.ts#L57)

Options for waiting for a transaction receipt

##### Extends

- [`WebsocketClientOptions`](#websocketclientoptions)

##### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="accesstoken"></a> `accessToken?` | `string` | The access token for authentication with the Portal API | [`WebsocketClientOptions`](#websocketclientoptions).[`accessToken`](#accesstoken-1) | [sdk/portal/src/utils/websocket-client.ts:14](https://github.com/settlemint/sdk/blob/v2.3.5/sdk/portal/src/utils/websocket-client.ts#L14) |
| <a id="portalgraphqlendpoint"></a> `portalGraphqlEndpoint` | `string` | The GraphQL endpoint URL for the Portal API | [`WebsocketClientOptions`](#websocketclientoptions).[`portalGraphqlEndpoint`](#portalgraphqlendpoint-1) | [sdk/portal/src/utils/websocket-client.ts:10](https://github.com/settlemint/sdk/blob/v2.3.5/sdk/portal/src/utils/websocket-client.ts#L10) |
| <a id="timeout"></a> `timeout?` | `number` | Optional timeout in milliseconds before the operation fails | - | [sdk/portal/src/utils/wait-for-transaction-receipt.ts:59](https://github.com/settlemint/sdk/blob/v2.3.5/sdk/portal/src/utils/wait-for-transaction-receipt.ts#L59) |

***

#### WebsocketClientOptions

Defined in: [sdk/portal/src/utils/websocket-client.ts:6](https://github.com/settlemint/sdk/blob/v2.3.5/sdk/portal/src/utils/websocket-client.ts#L6)

Options for the GraphQL WebSocket client

##### Extended by

- [`WaitForTransactionReceiptOptions`](#waitfortransactionreceiptoptions)

##### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="accesstoken-1"></a> `accessToken?` | `string` | The access token for authentication with the Portal API | [sdk/portal/src/utils/websocket-client.ts:14](https://github.com/settlemint/sdk/blob/v2.3.5/sdk/portal/src/utils/websocket-client.ts#L14) |
| <a id="portalgraphqlendpoint-1"></a> `portalGraphqlEndpoint` | `string` | The GraphQL endpoint URL for the Portal API | [sdk/portal/src/utils/websocket-client.ts:10](https://github.com/settlemint/sdk/blob/v2.3.5/sdk/portal/src/utils/websocket-client.ts#L10) |

### Type Aliases

#### ClientOptions

> **ClientOptions** = `z.infer`\<*typeof* [`ClientOptionsSchema`](#clientoptionsschema)\>

Defined in: [sdk/portal/src/portal.ts:25](https://github.com/settlemint/sdk/blob/v2.3.5/sdk/portal/src/portal.ts#L25)

Type representing the validated client options.

***

#### RequestConfig

> **RequestConfig** = `ConstructorParameters`\<*typeof* `GraphQLClient`\>\[`1`\]

Defined in: [sdk/portal/src/portal.ts:11](https://github.com/settlemint/sdk/blob/v2.3.5/sdk/portal/src/portal.ts#L11)

Configuration options for the GraphQL client, excluding 'url' and 'exchanges'.

### Variables

#### ClientOptionsSchema

> `const` **ClientOptionsSchema**: `ZodObject`\<\{ `accessToken`: `ZodOptional`\<`ZodString`\>; `cache`: `ZodOptional`\<`ZodEnum`\<\{ `default`: `"default"`; `force-cache`: `"force-cache"`; `no-cache`: `"no-cache"`; `no-store`: `"no-store"`; `only-if-cached`: `"only-if-cached"`; `reload`: `"reload"`; \}\>\>; `instance`: `ZodUnion`\<readonly \[`ZodString`, `ZodString`\]\>; \}, `$strip`\>

Defined in: [sdk/portal/src/portal.ts:16](https://github.com/settlemint/sdk/blob/v2.3.5/sdk/portal/src/portal.ts#L16)

Schema for validating Portal client configuration options.

## Contributing

We welcome contributions from the community! Please check out our [Contributing](https://github.com/settlemint/sdk/blob/main/.github/CONTRIBUTING.md) guide to learn how you can help improve the SettleMint SDK through bug reports, feature requests, documentation updates, or code contributions.

## License

The SettleMint SDK is released under the [FSL Software License](https://fsl.software). See the [LICENSE](https://github.com/settlemint/sdk/blob/main/LICENSE) file for more details.
