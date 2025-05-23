import input from "@inquirer/input";
import isInCi from "is-in-ci";

/**
 * Prompts the user for a service value in standalone mode.
 *
 * @param options - Configuration options for the prompt
 * @param options.defaultValue - The default value to use if available
 * @param options.example - Example value to display in the prompt
 * @param options.message - Custom prompt message to display
 * @param options.accept - Whether to automatically accept the default value
 * @param options.isCi - Whether the code is running in a CI environment
 * @returns A promise that resolves to the user-input or default service value
 */
export async function serviceValuePrompt({
  defaultValue,
  example,
  message = "Enter service value:",
  accept = false,
  isCi = isInCi,
}: {
  defaultValue?: string;
  example?: string;
  message?: string;
  accept?: boolean;
  isCi?: boolean;
}): Promise<string | undefined> {
  const autoAccept = !!accept || isCi;

  if (autoAccept && defaultValue) {
    return defaultValue;
  }

  if (isCi) {
    return defaultValue;
  }

  const serviceSecret = await input({
    message: example ? `${message} (eg ${example})` : message,
    default: defaultValue,
  });

  return serviceSecret.trim();
}
