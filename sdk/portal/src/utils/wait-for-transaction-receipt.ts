import type { FormattedExecutionResult } from "graphql-ws";
import type { Transaction } from "./transaction.types.js";
import { type WebsocketClientOptions, getWebsocketClient } from "./websocket-client.js";

interface GetTransactionResponse {
  getTransaction: Transaction;
}

/**
 * Options for waiting for a transaction receipt
 *
 * @typedef {Object} WaitForTransactionReceiptOptions
 * @property {number} [timeout] - Optional timeout in milliseconds before the operation fails
 */
export interface WaitForTransactionReceiptOptions extends WebsocketClientOptions {
  timeout?: number;
}

/**
 * Waits for a blockchain transaction receipt by subscribing to transaction updates via GraphQL.
 * This function polls until the transaction is confirmed or the timeout is reached.
 *
 * @param transactionHash - The hash of the transaction to wait for
 * @param options - Configuration options for the waiting process
 * @returns The transaction details including receipt information when the transaction is confirmed
 * @throws Error if the transaction receipt cannot be retrieved within the specified timeout
 *
 * @example
 * import { waitForTransactionReceipt } from "@settlemint/sdk-portal";
 *
 * const transaction = await waitForTransactionReceipt("0x123...", {
 *   portalGraphqlEndpoint: "https://example.settlemint.com/graphql",
 *   accessToken: "your-access-token",
 *   timeout: 30000 // 30 seconds timeout
 * });
 */
export async function waitForTransactionReceipt(transactionHash: string, options: WaitForTransactionReceiptOptions) {
  const wsClient = getWebsocketClient(options);
  const subscription = wsClient.iterate<GetTransactionResponse>({
    query: `subscription getTransaction($transactionHash: String!) {
        getTransaction(transactionHash: $transactionHash) {
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
      }`,
    variables: { transactionHash },
  });
  const promises = [getTransactionFromSubscription(subscription)];
  if (options.timeout) {
    promises.push(createTimeoutPromise(options.timeout));
  }

  return Promise.race(promises);
}

function createTimeoutPromise(timeout: number): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error("Transaction receipt not found")), timeout);
  });
}

async function getTransactionFromSubscription(
  subscription: AsyncIterableIterator<FormattedExecutionResult<GetTransactionResponse, unknown>>,
): Promise<Transaction> {
  for await (const result of subscription) {
    if (result?.data?.getTransaction?.receipt) {
      return result.data.getTransaction;
    }
  }
  throw new Error("No transaction found");
}
