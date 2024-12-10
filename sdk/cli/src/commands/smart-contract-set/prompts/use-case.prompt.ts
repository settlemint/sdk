import { SMART_CONTRACT_SETS } from "@/constants/smart-contract-sets";
import select from "@inquirer/select";

/**
 * Prompts the user to select a smart contract set use case or validates a provided one
 *
 * @param argument - Optional pre-selected use case
 * @returns The selected use case identifier
 * @throws {Error} If no use cases are available or if provided argument is invalid
 */
export async function useCasePrompt(argument?: string): Promise<string> {
  if (SMART_CONTRACT_SETS.length === 0) {
    throw new Error("No use cases found");
  }

  if (argument) {
    if (!SMART_CONTRACT_SETS.includes(argument)) {
      throw new Error(`No use case found with name '${argument}'`);
    }
    return argument;
  }

  const useCase = await select({
    message: "Which use case do you want to use?",
    choices: SMART_CONTRACT_SETS.map((useCase) => ({
      name: useCase,
      value: useCase,
    })),
  });

  return useCase;
}
