import { maskTokens } from "@/terminal/mask-tokens.js";
import { inverse, redBright } from "yoctocolors";

/**
 * Error class used to indicate that the operation was cancelled.
 * This error is used to signal that the operation should be aborted.
 */
export class CancelError extends Error {}

/**
 * Displays an error message in red inverse text and exits the process.
 * Used to terminate execution with a visible error message.
 * Any sensitive tokens in the message are masked before display.
 *
 * @param msg - The error message to display
 * @returns never - Function does not return as it throws an error
 * @example
 * import { cancel } from "@settlemint/sdk-utils/terminal";
 *
 * // Exits process with error message
 * cancel("An error occurred");
 */
export const cancel = (msg: string): never => {
  console.log("");
  console.log(inverse(redBright(maskTokens(msg))));
  console.log("");
  throw new CancelError(msg);
};
