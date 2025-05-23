import confirm from "@inquirer/confirm";
import password from "@inquirer/password";
import isInCi from "is-in-ci";

/**
 * Prompts the user for a service secret in standalone mode.
 *
 * @param options - Configuration options for the prompt
 * @param options.name - The name of the secret
 * @param options.defaultSecret - The default secret to use if available
 * @param options.message - Custom prompt message to display
 * @param options.accept - Whether to automatically accept the default value
 * @param options.isCi - Whether the code is running in a CI environment
 * @returns A promise that resolves to the user-input or default service secret
 */
export async function serviceSecretPrompt({
  name,
  defaultSecret,
  message = "Enter service secret:",
  accept = false,
  isCi = isInCi,
}: {
  name: string;
  defaultSecret?: string;
  message?: string;
  accept?: boolean;
  isCi?: boolean;
}): Promise<string | undefined> {
  const autoAccept = !!accept || isCi;

  if (autoAccept && defaultSecret) {
    return defaultSecret;
  }

  if (isCi) {
    return defaultSecret;
  }

  if (defaultSecret) {
    const keep = await confirm({
      message: `Do you want to use the existing ${name} secret?`,
      default: true,
    });
    if (keep) {
      return defaultSecret;
    }
  }

  const serviceSecret = await password({
    message,
  });

  return serviceSecret || undefined;
}
