import { isValidPrivateKey } from "@/utils/cluster-service";
import type { HardhatConfig } from "@/utils/smart-contract-set/hardhat-config";
import input from "@inquirer/input";
import select from "@inquirer/select";
import type { BlockchainNode } from "@settlemint/sdk-js";
import { note } from "@settlemint/sdk-utils/terminal";
import { isAddress } from "viem";

/**
 * Prompts the user to select a private key address.
 *
 * @param options - The options for the address prompt
 * @param options.accept - Whether to accept the default address from the hardhat config
 * @param options.node - The blockchain node the private key is connected to (if not provided, the user will be prompted to enter an address)
 * @param options.hardhatConfig - The hardhat config data
 * @returns The selected address or null if none available
 * @throws {Error} If no addresses are available to select from
 */
export async function addressPrompt({
  accept,
  node,
  hardhatConfig,
}: {
  accept: boolean;
  node?: BlockchainNode;
  hardhatConfig: HardhatConfig;
}): Promise<string | null> {
  if (!node) {
    return input({
      message: "Which private key address do you want to deploy from?",
      validate: (value) => {
        if (!isAddress(value)) {
          return "Invalid address";
        }
        return true;
      },
    });
  }

  const possiblePrivateKeys = node.privateKeys?.filter(isValidPrivateKey) ?? [];
  const defaultAddress = hardhatConfig.networks?.btp?.from ?? possiblePrivateKeys[0]?.address;
  const defaultPossible = accept && defaultAddress;

  if (defaultPossible) {
    if (possiblePrivateKeys.some((privateKey) => privateKey.address?.toLowerCase() === defaultAddress?.toLowerCase())) {
      return defaultAddress;
    }

    note(
      `Private key with address '${defaultAddress}' is not activated on the node '${node.uniqueName}'.\nPlease select another key or activate this key on the node and try again.`,
      "warn",
    );
  }

  const address = await select({
    message: "Which private key do you want to deploy from?",
    choices: possiblePrivateKeys.map(({ address, name }) => ({
      name: name,
      value: address,
    })),
    default: defaultAddress,
  });

  return address;
}
