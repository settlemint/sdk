import input from "@inquirer/input";
import { UrlSchema, validate } from "@settlemint/sdk-utils/validation";
import isInCi from "is-in-ci";

/**
 * Prompts the user for a service URL in standalone mode.
 *
 * @param options - Configuration options for the prompt
 * @param options.defaultUrl - The default URL to use if available
 * @param options.message - Custom prompt message to display
 * @param options.accept - Whether to automatically accept the default value
 * @param options.isCi - Whether the code is running in a CI environment
 * @returns A promise that resolves to the user-input or default service URL
 */
export async function serviceUrlPrompt({
  defaultUrl,
  example = "https://example.com/api",
  message = "Enter service URL:",
  accept = false,
  isCi = isInCi,
}: {
  defaultUrl?: string;
  example?: string;
  message?: string;
  accept?: boolean;
  isCi?: boolean;
}): Promise<string | undefined> {
  const autoAccept = !!accept || isCi;

  if (autoAccept && defaultUrl) {
    return new URL(defaultUrl).toString();
  }

  if (isCi) {
    return defaultUrl ? new URL(defaultUrl).toString() : undefined;
  }

  const serviceUrl = await input({
    message: example ? `${message} (eg ${example})` : message,
    default: defaultUrl,
    required: true,
    validate(value) {
      try {
        validate(UrlSchema, value);
        return true;
      } catch (error) {
        return "Invalid URL";
      }
    },
    transformer: (value) => value.trim(),
  });

  return serviceUrl || undefined;
}
