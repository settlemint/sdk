import type { DotEnv } from "@settlemint/sdk-utils/validation";
import isInCi from "is-in-ci";

/**
 * Represents a choice in the prompt.
 */
export interface Choice<Service> {
  name: string;
  value: Service | undefined;
}

/**
 * Prompts the user to select a service from a list of available services.
 *
 * @param config - Configuration object containing environment, services and options
 * @param config.env - The environment variables containing the current configuration
 * @param config.services - The available services to choose from
 * @param config.accept - Whether to automatically accept default values without prompting
 * @param config.envKey - The environment variable key to store the selected service
 * @param config.defaultHandler - Handler function to prompt user for service selection
 * @param config.isRequired - Whether the service is required
 * @param config.isCi - Whether running in CI environment (defaults to isInCi)
 * @returns The selected service, or undefined if none selected
 */
export async function servicePrompt<Service extends { uniqueName: string; name: string }>({
  env,
  services,
  accept,
  envKey,
  defaultHandler,
  isRequired = false,
  isCi = isInCi,
}: {
  env: Partial<DotEnv>;
  services: Service[];
  accept: boolean | undefined;
  envKey: keyof DotEnv;
  defaultHandler: (config: {
    defaultService: Service | undefined;
    choices: Choice<Service>[];
  }) => Promise<Service | undefined>;
  isRequired?: boolean;
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

  // Auto-select if only one service available and a service is required
  if (isRequired && services.length === 1) {
    return services[0];
  }

  const choices = services.map(
    (service): Choice<Service> => ({
      name: service.name,
      value: service,
    }),
  );

  if (!isRequired) {
    choices.push({
      name: "None",
      value: undefined,
    });
  }

  // Prompt user to select service
  return defaultHandler({ defaultService: selectedService, choices });
}
