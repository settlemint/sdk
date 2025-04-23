import { note } from "@settlemint/sdk-utils/terminal";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import isInCi from "is-in-ci";

const ALL = "All";

/**
 * Represents a base service.
 */
type BaseService = { uniqueName: string; name: string };

/**
 * Represents a choice in the prompt.
 */
export interface Choice<Service> {
  name: string;
  value: Service | undefined;
}

/**
 * Base arguments for the service prompt.
 */
export interface BaseServicePromptArgs<AllowAll = boolean> {
  env: Partial<DotEnv>;
  accept: boolean | undefined;
  isRequired?: boolean;
  isCi?: boolean;
  singleOptionMessage?: (selectedService: string) => string;
  promptMessage?: string;
  filterRunningOnly?: boolean;
  allowAll?: AllowAll;
}

/**
 * Arguments for the service prompt.
 */
export interface ServicePromptArgs<Service> extends BaseServicePromptArgs {
  services: BaseService[];
  defaultHandler: (config: {
    defaultService: Service | undefined;
    choices: Choice<Service>[];
  }) => Promise<Service | undefined>;
  envKey: keyof DotEnv;
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
export async function servicePrompt<Service extends BaseService | BaseService[]>({
  env,
  services,
  accept,
  envKey,
  defaultHandler,
  isRequired = false,
  isCi = isInCi,
  singleOptionMessage,
  allowAll = false,
}: ServicePromptArgs<Service>) {
  // Return early if no services available
  if (services.length === 0) {
    return undefined;
  }

  // Find service matching environment variable if set
  const selectedService = services.find((service) =>
    Array.isArray(service) ? false : service.uniqueName === env[envKey],
  );

  // Auto-accept if in CI or accept flag set and service found
  const autoAccept = isCi || accept;
  if (autoAccept && allowAll) {
    return services as Service;
  }
  if (autoAccept && selectedService) {
    return selectedService as Service;
  }

  // Return undefined if in CI environment
  if (isCi) {
    return undefined;
  }

  // Auto-select if only one service available and a service is required
  if (isRequired && services.length === 1) {
    if (singleOptionMessage && !Array.isArray(services[0])) {
      note(singleOptionMessage(services[0].uniqueName));
    }
    return services[0] as Service;
  }

  const choices = services.map(
    (service): Choice<Service> => ({
      name: `${service.name} (${service.uniqueName})`,
      value: service as Service,
    }),
  );

  if (allowAll) {
    choices.unshift({
      name: ALL,
      value: services as Service,
    });
  }
  if (!isRequired) {
    choices.push({
      name: "None",
      value: undefined,
    });
  }

  // Prompt user to select service
  return defaultHandler({
    defaultService: selectedService as Service | undefined,
    choices,
  });
}
