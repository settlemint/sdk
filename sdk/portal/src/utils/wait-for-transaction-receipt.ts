import type { FormattedExecutionResult } from "graphql-ws";
import type { Address, Hex, TransactionReceipt as TransactionReceiptViem } from "viem";
import { type WebsocketClientOptions, getWebsocketClient } from "./websocket-client.js";

/**
 * Represents an event emitted during a transaction execution
 */
export interface TransactionEvent {
  /** The name of the event that was emitted */
  eventName: string;
  /** The arguments emitted by the event */
  args: Record<string, unknown>;
  /** Indexed event parameters used for filtering and searching */
  topics: Hex[];
}

/**
 * Represents the structure of a blockchain transaction receipt
 */
export interface TransactionReceipt extends TransactionReceiptViem<string, number, "Success" | "Reverted"> {
  /** The raw reason for transaction reversion, if applicable */
  revertReason: string;
  /** Human-readable version of the revert reason */
  revertReasonDecoded: string;
  /** Array of events emitted during the transaction */
  events: TransactionEvent[];
  /** The address of the contract deployed in the transaction */
  contractAddress: Address;
}

/**
 * Represents the structure of a blockchain transaction with its receipt
 */
export interface Transaction {
  receipt: TransactionReceipt;
  /** The hash of the transaction (duplicate of receipt.transactionHash) */
  transactionHash: string;
  /** The sender address (duplicate of receipt.from) */
  from: string;
  /** Timestamp when the transaction was created */
  createdAt: string;
  /** The contract address involved in the transaction */
  address: string;
  /** The name of the function called in the transaction */
  functionName: string;
  /** Whether the transaction is a contract deployment */
  isContract: boolean;
}

interface GetTransactionResponse {
  getTransaction: Transaction;
}

/**
 * Options for waiting for a transaction receipt
 */
export interface WaitForTransactionReceiptOptions extends WebsocketClientOptions {
  /** Optional timeout in milliseconds before the operation fails */
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
