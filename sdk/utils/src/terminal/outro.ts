import { maskTokens } from "@/terminal/mask-tokens.js";
import { greenBright, inverse } from "yoctocolors";

/**
 * Displays a closing message in green inverted text with padding.
 * Any sensitive tokens in the message are masked before display.
 *
 * @param msg - The message to display as conclusion
 * @example
 * import { outro } from "@settlemint/sdk-utils";
 *
 * // Display outro message
 * outro("Deployment completed successfully!");
 */
export const outro = (msg: string): void => {
  console.log("");
  console.log(inverse(greenBright(maskTokens(msg))));
  console.log("");
};
