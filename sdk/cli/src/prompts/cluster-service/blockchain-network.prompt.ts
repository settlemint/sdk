import { type BaseServicePromptArgs, servicePrompt } from "@/prompts/cluster-service/service.prompt";
import select from "@inquirer/select";
import type { BlockchainNetwork } from "@settlemint/sdk-js";

export interface BlockchainNetworkPromptArgs extends BaseServicePromptArgs {
  networks: BlockchainNetwork[];
}

/**
 * Prompts the user to select a blockchain network to connect to.
 *
 * @param options - The options for the blockchain network prompt
 * @param options.env - The environment variables containing the current configuration
 * @param options.networks - The available blockchain networks to choose from
 * @param options.accept - Whether to automatically accept default values without prompting
 * @param options.isRequired - Whether a network selection is required
 * @returns The selected blockchain network, or undefined if no networks are available or none is selected
 */
export async function blockchainNetworkPrompt({
  env,
  networks,
  accept,
  isRequired = false,
}: BlockchainNetworkPromptArgs): Promise<BlockchainNetwork | undefined> {
  return servicePrompt({
    env,
    services: networks,
    accept,
    envKey: "SETTLEMINT_BLOCKCHAIN_NETWORK",
    isRequired,
    defaultHandler: async ({ defaultService: defaultNetwork, choices }) => {
      return select({
        message: "Which blockchain network do you want to connect to?",
        choices,
        default: defaultNetwork,
      });
    },
  });
}
