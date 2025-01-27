import type { PlatformConfig } from "@settlemint/sdk-js";

export function getUseCases(platformConfig: PlatformConfig) {
  return platformConfig.smartContractSets.sets.filter(
    (useCase) => !useCase.featureflagged && !useCase.id.startsWith("starterkit-"),
  );
}

export function getStarterkits(platformConfig: PlatformConfig) {
  return platformConfig.smartContractSets.sets.filter(
    (useCase) => !useCase.featureflagged && useCase.id.startsWith("starterkit-"),
  );
}
