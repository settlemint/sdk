import { writeEnvSpinner } from "@/spinners/write-env.spinner";
import type { HardhatConfig } from "@/utils/smart-contract-set/hardhat-config";
import select from "@inquirer/select";
import type { BlockchainNode } from "@settlemint/sdk-js";
import { cancel } from "@settlemint/sdk-utils/terminal";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

/**
 * Prompts the user to select a blockchain address to deploy the smart contract set to.
 *
 * @param options - The options for the address prompt
 * @param options.env - The environment variables
 * @param options.accept - Whether to accept the default address from env
 * @param options.prod - Whether this is a production deployment
 * @param options.node - The blockchain node containing available addresses
 * @returns The selected address or null if none available
 * @throws {Error} If no addresses are available to select from
 */
export async function addressPrompt({
  env,
  accept,
  prod,
  node,
  hardhatConfig,
}: {
  env: Partial<DotEnv>;
  accept: boolean;
  prod: boolean | undefined;
  node: BlockchainNode;
  hardhatConfig: HardhatConfig;
}): Promise<string | null> {
  const possiblePrivateKeys =
    node.privateKeys?.filter((privateKey) => privateKey.privateKeyType !== "HD_ECDSA_P256") ?? [];
  const defaultAddress =
    env.SETTLEMINT_SMART_CONTRACT_ADDRESS ?? hardhatConfig.networks?.btp?.from ?? possiblePrivateKeys[0]?.address;
  const defaultPossible = accept && defaultAddress;

  if (defaultPossible) {
    return defaultAddress;
  }

  if (possiblePrivateKeys.length === 0) {
    cancel("No ECDSA P256 or HSM ECDSA P256 private key is activated on the node to sign the transaction.");
  }

  const address = await select({
    message: "Which private key do you want to deploy from?",
    choices: possiblePrivateKeys.map(({ address, name }) => ({
      name: name,
      value: address,
    })),
    default: defaultAddress ?? possiblePrivateKeys[0]?.address,
  });

  if (address && address !== env.SETTLEMINT_SMART_CONTRACT_ADDRESS) {
    await writeEnvSpinner(!!prod, {
      ...env,
      SETTLEMINT_SMART_CONTRACT_ADDRESS: address,
    });
  }

  return address;
}
