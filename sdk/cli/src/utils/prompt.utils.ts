import type { DotEnv } from "@settlemint/sdk-utils/validation";
import isInCi from "is-in-ci";

export async function servicePrompt<Service extends { uniqueName: string }>(
  env: Partial<DotEnv>,
  services: Service[],
  accept: boolean | undefined,
  envKey: keyof DotEnv,
  defaultHandler: (config: { defaultService: Service | undefined }) => Promise<Service | undefined>,
): Promise<Service | undefined> {
  const autoAccept = isInCi || accept;

  if (services.length === 0) {
    return undefined;
  }

  const selectedService = services.find((service) => service.uniqueName === env[envKey]);
  if (autoAccept && selectedService) {
    return selectedService;
  }

  if (isInCi) {
    return undefined;
  }

  if (services.length === 1) {
    return services[0];
  }

  const selection = await defaultHandler({ defaultService: selectedService });

  return selection;
}
