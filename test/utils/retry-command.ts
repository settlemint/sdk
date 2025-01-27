import { retryWhenFailed } from "@settlemint/sdk-utils";

/**
 * Retry a command until it succeeds or the maximum number of retries is reached.
 * Used to retry commands that may fail due to network issues or rate limiting.
 *
 * @param command - The command to retry.
 * @param maxRetries - The maximum number of retries.
 * @param retryDelay - The delay between retries in milliseconds.
 * @returns The result of the command.
 */
export function retryCommand<T>(command: () => Promise<T>, maxRetries = 3, retryDelay = 15_000) {
  return retryWhenFailed(command, maxRetries, retryDelay, (error) => {
    return error.message.includes("Access token found in output");
  });
}
