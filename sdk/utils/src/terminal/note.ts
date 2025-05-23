import { maskTokens } from "@/logging/mask-tokens.js";
import { yellowBright } from "yoctocolors";
import { shouldPrint } from "./should-print.js";

/**
 * Displays a note message with optional warning level formatting.
 * Regular notes are displayed in normal text, while warnings are shown in yellow.
 * Any sensitive tokens in the message are masked before display.
 *
 * @param message - The message to display as a note
 * @param level - The note level: "info" (default) or "warn" for warning styling
 * @example
 * import { note } from "@settlemint/sdk-utils/terminal";
 *
 * // Display info note
 * note("Operation completed successfully");
 *
 * // Display warning note
 * note("Low disk space remaining", "warn");
 */
export const note = (message: string, level: "info" | "warn" = "info"): void => {
  if (!shouldPrint()) {
    return;
  }
  const maskedMessage = maskTokens(message);

  console.log("");
  if (level === "warn") {
    console.warn(yellowBright(maskedMessage));
    return;
  }

  console.log(maskedMessage);
};
