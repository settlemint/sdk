import confirm from "@inquirer/confirm";
import password from "@inquirer/password";
import isInCi from "is-in-ci";

/**
 * Prompts the user for a service secret in standalone mode.
 *
 * @param options - Configuration options for the prompt
 * @param options.defaultSecret - The default secret to use if available
 * @param options.message - Custom prompt message to display
 * @param options.accept - Whether to automatically accept the default value
 * @param options.isCi - Whether the code is running in a CI environment
 * @returns A promise that resolves to the user-input or default service secret
 *
 * @example
 * import { serviceSecretPrompt } from "@/prompts/standalone/service-secret.prompt";
 *
 * const serviceSecret = await serviceSecretPrompt({
 *   defaultSecret: "your-api-key",
 *   message: "Enter API key:"
 * });
 * console.log(serviceSecret); // Output: your-api-key or user input
 */
export async function serviceSecretPrompt({
  defaultSecret,
  message = "Enter service secret:",
  accept = false,
  isCi = isInCi,
}: {
  defaultSecret?: string;
  message?: string;
  accept?: boolean;
  isCi?: boolean;
}): Promise<string> {
  const autoAccept = !!accept || isCi;

  if (autoAccept && defaultSecret) {
    return defaultSecret;
  }

  if (isCi) {
    return defaultSecret || "";
  }

  if (defaultSecret) {
    const keep = await confirm({
      message: "Do you want to use the existing secret?",
      default: true,
    });
    if (keep) {
      return defaultSecret;
    }
  }

  const serviceSecret = await password({
    message,
  });

  return serviceSecret.trim();
}
