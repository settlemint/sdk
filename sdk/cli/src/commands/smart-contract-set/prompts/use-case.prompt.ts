import select from "@inquirer/select";
import type { PlatformConfig } from "@settlemint/sdk-js";
import { cancel } from "@settlemint/sdk-utils";

/**
 * Prompts the user to select a smart contract set use case or validates a provided one
 *
 * @param argument - Optional pre-selected use case
 * @returns The selected use case identifier
 * @throws {Error} If no use cases are available or if provided argument is invalid
 */
export async function useCasePrompt(
  platformConfig: PlatformConfig,
  argument?: string,
): Promise<PlatformConfig["smartContractSets"]["sets"][number] | undefined> {
  if (platformConfig.smartContractSets.sets.length === 0) {
    cancel("No use cases found");
  }

  const possibleUseCases = platformConfig.smartContractSets.sets.filter((set) => !set.featureflagged);

  if (argument) {
    const selectedUseCase = platformConfig.smartContractSets.sets.find((set) => set.id === argument);
    if (!selectedUseCase) {
      cancel(
        `No use case found with name '${argument}' (possible use cases: ${possibleUseCases.map((set) => set.id).join(", ")})`,
      );
    }
    return selectedUseCase;
  }

  const useCase = await select({
    message: "Which use case do you want to use?",
    choices: platformConfig.smartContractSets.sets.map((useCase) => ({
      name: useCase.name,
      value: useCase.id,
    })),
  });

  const selectedUseCase = platformConfig.smartContractSets.sets.find((set) => set.id === useCase);
  return selectedUseCase;
}
