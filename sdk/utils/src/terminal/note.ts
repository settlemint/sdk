import { maskTokens } from "@/logging/mask-tokens.js";
import { redBright, yellowBright } from "yoctocolors";
import { shouldPrint } from "./should-print.js";

/**
 * Displays a note message with optional warning or error level formatting.
 * Regular notes are displayed in normal text, warnings are shown in yellow, and errors in red.
 * Any sensitive tokens in the message are masked before display.
 * Warnings and errors are always displayed, even in quiet mode (when CLAUDECODE, REPL_ID, or AGENT env vars are set).
 * When an Error object is provided with level "error", the stack trace is automatically included.
 *
 * @param message - The message to display as a note, or an Error object
 * @param level - The note level: "info" (default), "warn" for warning styling, or "error" for error styling
 * @example
 * import { note } from "@settlemint/sdk-utils/terminal";
 *
 * // Display info note
 * note("Operation completed successfully");
 *
 * // Display warning note
 * note("Low disk space remaining", "warn");
 *
 * // Display error note
 * note("Operation failed", "error");
 *
 * // Display error with stack trace automatically
 * try {
 *   // some operation
 * } catch (error) {
 *   note(error, "error");
 * }
 */
export const note = (message: string | Error, level: "info" | "warn" | "error" = "info"): void => {
  let messageText: string;
  let _error: Error | undefined;

  if (message instanceof Error) {
    _error = message;
    messageText = message.message;
    // For errors, automatically include stack trace
    if (level === "error" && message.stack) {
      messageText = `${messageText}\n\n${message.stack}`;
    }
  } else {
    messageText = message;
  }

  const maskedMessage = maskTokens(messageText);
  const _isQuietMode = process.env.CLAUDECODE || process.env.REPL_ID || process.env.AGENT;

  // Always print warnings and errors, even in quiet mode
  if (level === "warn" || level === "error") {
    console.log("");
    if (level === "warn") {
      // Apply yellow color if not already colored (check if message contains ANSI codes)
      const coloredMessage = maskedMessage.includes("\u001b[") ? maskedMessage : yellowBright(maskedMessage);
      console.warn(coloredMessage);
    } else {
      // Apply red color if not already colored (check if message contains ANSI codes)
      const coloredMessage = maskedMessage.includes("\u001b[") ? maskedMessage : redBright(maskedMessage);
      console.error(coloredMessage);
    }
    return;
  }

  // For info messages, check if we should print
  if (!shouldPrint()) {
    return;
  }

  console.log("");
  console.log(maskedMessage);
};
