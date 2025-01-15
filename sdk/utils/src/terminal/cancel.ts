import { maskTokens } from "@/terminal/mask-tokens.js";
import { inverse, redBright } from "yoctocolors";

/**
 * Displays an error message in red inverse text and exits the process.
 * Used to terminate execution with a visible error message.
 * Any sensitive tokens in the message are masked before display.
 *
 * @param msg - The error message to display
 * @returns never - Function does not return as it exits the process
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
  process.exit(1);
};
