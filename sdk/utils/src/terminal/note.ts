import { maskTokens } from "@/logging/mask-tokens.js";
import { redBright, yellowBright } from "yoctocolors";
import { shouldPrint } from "./should-print.js";

/**
 * Applies color to a message if not already colored.
 * @param msg - The message to colorize
 * @param level - The severity level determining the color
 * @returns Colorized message (yellow for warnings, red for errors, unchanged for info)
 */
function colorize(msg: string, level: "info" | "warn" | "error"): string {
  // Don't re-colorize messages that already contain ANSI escape codes
  if (msg.includes("\u001b[")) {
    return msg;
  }
  if (level === "warn") {
    return yellowBright(msg);
  }
  if (level === "error") {
    return redBright(msg);
  }
  return msg;
}

/**
 * Determines whether a message should be printed based on its level and quiet mode.
 * @param level - The severity level of the message
 * @returns true if the message should be printed, false otherwise
 */
function canPrint(level: "info" | "warn" | "error"): boolean {
  // Warnings and errors always print, even in quiet mode
  if (level !== "info") {
    return true;
  }
  // Info messages respect shouldPrint() which checks for quiet mode
  return shouldPrint();
}

/**
 * Prepares a message for display by converting Error objects and masking tokens.
 * @param value - The message string or Error object
 * @param level - The severity level (stack traces are included for errors)
 * @returns Masked message text, optionally with stack trace
 */
function prepareMessage(value: string | Error, level: "info" | "warn" | "error"): string {
  let text: string;
  if (value instanceof Error) {
    text = value.message;
    // For errors, automatically include stack trace
    if (level === "error" && value.stack) {
      text = `${text}\n\n${value.stack}`;
    }
  } else {
    text = value;
  }
  return maskTokens(text);
}

/**
 * Displays a note message with optional warning or error level formatting.
 * Regular notes are displayed in normal text, warnings are shown in yellow, and errors in red.
 * Any sensitive tokens in the message are masked before display.
 * Warnings and errors are always displayed, even in quiet mode (when CLAUDECODE, REPL_ID, or AGENT env vars are set).
 * When an Error object is provided with level "error", the stack trace is automatically included.
 *
 * @param message - The message to display as a note. Can be either:
 *   - A string: Displayed directly with appropriate styling
 *   - An Error object: The error message is displayed, and for level "error", the stack trace is automatically included
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
 * // Display error note (string)
 * note("Operation failed", "error");
 *
 * // Display error with stack trace automatically (Error object)
 * try {
 *   // some operation
 * } catch (error) {
 *   // If error is an Error object and level is "error", stack trace is included automatically
 *   note(error, "error");
 * }
 */
export const note = (message: string | Error, level: "info" | "warn" | "error" = "info"): void => {
  if (!canPrint(level)) {
    return;
  }

  const msg = prepareMessage(message, level);
  console.log("");

  if (level === "warn") {
    console.warn(colorize(msg, level));
  } else if (level === "error") {
    console.error(colorize(msg, level));
  } else {
    console.log(msg);
  }
};
