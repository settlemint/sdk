import { servicePrompt } from "@/utils/prompt.utils";
import select from "@inquirer/select";
import type { BlockchainNetwork } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

/**
 * Prompts the user to select a blockchain network to connect to.
 *
 * @param env - The environment variables containing the current configuration
 * @param networks - The available blockchain networks to choose from
 * @param accept - Whether to automatically accept default values without prompting
 * @returns The selected blockchain network, or undefined if no networks are available or none is selected
 */
export async function blockchainNetworkPrompt(
  env: Partial<DotEnv>,
  networks: BlockchainNetwork[],
  accept: boolean | undefined,
): Promise<BlockchainNetwork | undefined> {
  return servicePrompt<BlockchainNetwork>(
    env,
    networks,
    accept,
    "SETTLEMINT_BLOCKCHAIN_NETWORK",
    async ({ defaultService: defaultNetwork }) => {
      return select({
        message: "Which blockchain network do you want to connect to?",
        choices: [
          ...networks.map((network) => ({
            name: network.name,
            value: network,
          })),
          {
            name: "None",
            value: undefined,
          },
        ],
        default: defaultNetwork,
      });
    },
  );
}
