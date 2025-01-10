import type { DotEnv } from "@settlemint/sdk-utils/validation";
import isInCi from "is-in-ci";

/**
 * Prompts the user to select a service from a list of available services.
 *
 * @param env - The environment variables containing the current configuration
 * @param services - The available services to choose from
 * @param accept - Whether to automatically accept default values without prompting
 * @param envKey - The environment variable key to store the selected service
 * @param defaultHandler - Handler function to prompt user for service selection
 * @param isCi - Whether running in CI environment (added so we can easily simulate CI in tests)
 * @returns The selected service, or undefined if none selected
 */
export async function servicePrompt<Service extends { uniqueName: string }>({
  env,
  services,
  accept,
  envKey,
  defaultHandler,
  isCi = isInCi,
}: {
  env: Partial<DotEnv>;
  services: Service[];
  accept: boolean | undefined;
  envKey: keyof DotEnv;
  defaultHandler: (config: { defaultService: Service | undefined }) => Promise<Service | undefined>;
  isCi?: boolean;
}): Promise<Service | undefined> {
  // Return early if no services available
  if (services.length === 0) {
    return undefined;
  }

  // Find service matching environment variable if set
  const selectedService = services.find((service) => service.uniqueName === env[envKey]);

  // Auto-accept if in CI or accept flag set and service found
  const autoAccept = isCi || accept;
  if (autoAccept && selectedService) {
    return selectedService;
  }

  // Return undefined if in CI environment
  if (isCi) {
    return undefined;
  }

  // Auto-select if only one service available
  if (services.length === 1) {
    return services[0];
  }

  // Prompt user to select service
  return defaultHandler({ defaultService: selectedService });
}
