import { type Transaction, type WebsocketClientOptions, getWebsocketClient } from "@settlemint/sdk-portal";

/**
 * Monitors all blockchain transactions by subscribing to transaction updates via GraphQL.
 * This function continuously logs all transaction receipts as they are received and runs indefinitely.
 *
 * @param options - Configuration options for connecting to the Portal API
 * @throws Error if the subscription fails
 *
 * @example
 * import { monitorAllTransactions } from "@settlemint/sdk-portal";
 *
 * monitorAllTransactions({
 *   portalGraphqlEndpoint: "https://example.settlemint.com/graphql",
 *   accessToken: "your-access-token"
 * });
 */
export function monitorAllTransactions(options: WebsocketClientOptions) {
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

  (async () => {
    for await (const result of subscription) {
      if (result?.data?.getProcessedTransactions?.records) {
        const records = result.data.getProcessedTransactions.records;
        const lastTransaction = records.at(-1);

        if (lastTransaction) {
          monitorSpecificAddresses(lastTransaction, {
            addresses: ["0x742d35Cc6634C0532925a3b844Bc454e4438f44e"],
          });

          monitorContractEvents(lastTransaction, {
            eventNames: ["Transfer", "Approval"],
          });

          monitorFailedTransactions(lastTransaction);
        }
      }
    }
  })();

  console.log("Started monitoring transactions");
}

/**
 * Monitors transactions from or to specific addresses.
 *
 * @param transaction - The transaction to check
 * @param options - Configuration options
 * @returns void
 *
 * @example
 * import { monitorSpecificAddresses } from "@settlemint/sdk-portal";
 *
 * monitorSpecificAddresses(transaction, {
 *   addresses: ["0x742d35Cc6634C0532925a3b844Bc454e4438f44e"],
 *   notificationCallback: (message) => console.log(message),
 * });
 */
export function monitorSpecificAddresses(
  transaction: Transaction,
  options: {
    addresses: string[];
  },
) {
  const { from, address } = transaction;
  const { to } = transaction.receipt;

  if (options.addresses.includes(from)) {
    notification(`Monitored address ${from} sent transaction ${transaction.transactionHash}`);
  }

  if (options.addresses.includes(to)) {
    notification(`Monitored address ${to} received transaction ${transaction.transactionHash}`);
  }
}

/**
 * Monitors transactions for specific contract events.
 *
 * @param transaction - The transaction to check
 * @param options - Configuration options
 * @returns void
 *
 * @example
 * import { monitorContractEvents } from "@settlemint/sdk-portal";
 *
 * monitorContractEvents(transaction, {
 *   eventNames: ["Transfer", "Approval"],
 *   notificationCallback: (message) => console.log(message),
 * });
 */
export function monitorContractEvents(
  transaction: Transaction,
  options: {
    eventNames: string[];
  },
) {
  const events = transaction.receipt.events;
  const eventDetected = events.find((event) => options.eventNames.includes(event.eventName));
  if (eventDetected) {
    notification(`Event ${eventDetected.eventName} detected in transaction ${transaction.transactionHash}`);
  }
}

/**
 * Monitors for failed transactions that require attention.
 *
 * @param transaction - The transaction to check
 * @param options - Configuration options
 * @returns void
 *
 * @example
 * import { monitorFailedTransactions } from "@settlemint/sdk-portal";
 *
 * monitorFailedTransactions(transaction, {
 *   notificationCallback: (message) => console.log(message),
 * });
 */
export function monitorFailedTransactions(transaction: Transaction) {
  const status = transaction.receipt?.status;

  if (status === "Reverted") {
    let errorMessage = `Failed transaction detected: ${transaction.transactionHash}`;

    // Error reason
    if (transaction.receipt.revertReason) {
      errorMessage += `\nRevert reason: ${transaction.receipt.revertReason}`;
    }

    if (transaction.receipt.revertReasonDecoded) {
      errorMessage += `\nDecoded revert reason: ${transaction.receipt.revertReasonDecoded}`;
    }

    notification(errorMessage);
  }
}

/**
 * Example notification function that logs messages to the console.
 * In a real application, this could send emails, webhooks, etc.
 *
 * @param message - The notification message
 * @returns void
 */
function notification(message: string) {
  console.log(`[LOG] ${message}`);
}

monitorAllTransactions({
  portalGraphqlEndpoint: "https://example.settlemint.com/graphql",
  accessToken: process.env.SETTLEMINT_ACCESS_TOKEN!,
});
