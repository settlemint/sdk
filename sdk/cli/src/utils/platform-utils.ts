import type { PlatformConfig } from "@settlemint/sdk-js";

export function getUseCases(platformConfig: PlatformConfig) {
  return platformConfig.smartContractSets.sets.filter((useCase) => !useCase.featureflagged);
}

export function getKits(platformConfig: PlatformConfig) {
  return platformConfig.kits as Array<{ id: string; name: string }>;
}
