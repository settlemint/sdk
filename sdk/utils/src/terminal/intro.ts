import { maskTokens } from "@/logging/mask-tokens.js";
import { magentaBright } from "yoctocolors";
import { shouldPrint } from "./should-print.js";

/**
 * Displays an introductory message in magenta text with padding.
 * Any sensitive tokens in the message are masked before display.
 *
 * @param msg - The message to display as introduction
 * @example
 * import { intro } from "@settlemint/sdk-utils/terminal";
 *
 * // Display intro message
 * intro("Starting deployment...");
 */
export const intro = (msg: string): void => {
  if (!shouldPrint()) {
    return;
  }
  console.log("");
  console.log(magentaBright(maskTokens(msg)));
  console.log("");
};
