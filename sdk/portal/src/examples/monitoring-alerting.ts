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
  const status = transaction.receipt?.status?.toLowerCase();

  if (status === "reverted") {
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
