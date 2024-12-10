import { getHardhatConfigData, updateHardhatConfigData } from "@/utils/hardhat-config";
import select from "@inquirer/select";
import type { BlockchainNode } from "@settlemint/sdk-js";

/**
 * Prompts the user to select a blockchain address to deploy the smart contract set to.
 *
 * @param accept - Whether to accept the default address from env
 * @param node - The blockchain node containing available addresses
 * @returns The selected address or null if none available
 * @throws {Error} If no addresses are available to select from
 */
export async function addressPrompt(accept: boolean, node: BlockchainNode): Promise<string | null> {
  const config = await getHardhatConfigData();

  const possiblePrivateKeys =
    node.privateKeys?.filter((privateKey) => privateKey.privateKeyType !== "HD_ECDSA_P256") ?? [];
  const defaultAddress = config.networks?.btp?.from ?? possiblePrivateKeys[0]?.address;
  const defaultPossible = accept && defaultAddress;

  if (defaultPossible) {
    return defaultAddress;
  }

  if (possiblePrivateKeys.length === 0) {
    throw new Error("No private key is activated on the node to sign the transaction.");
  }

  const address = await select({
    message: "Which private key do you want to deploy from?",
    choices: possiblePrivateKeys.map(({ address, name }) => ({
      name: name,
      value: address,
    })),
    default: defaultAddress ?? possiblePrivateKeys[0]?.address,
  });

  if (address) {
    await updateHardhatConfigData({
      ...config,
      networks: {
        ...config.networks,
        btp: { ...config.networks?.btp, from: address },
      },
    });
  }

  return address;
}
