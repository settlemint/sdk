import { blockchainNetworkPrompt } from "@/commands/connect/blockchain-network.prompt";
import { addClusterServiceArgs } from "@/commands/platform/common/cluster-service.args";
import { Option } from "@commander-js/extra-typings";
import type { DotEnv } from "@settlemint/sdk-utils";
import { cancel } from "@settlemint/sdk-utils/terminal";
import isInCi from "is-in-ci";
import { getCreateCommand } from "../../common/create-command";

/**
 * Creates and returns the 'blockchain-node besu' command for the SettleMint SDK.
 * This command creates a new Besu blockchain node in a specified application.
 *
 * @returns A configured Commander command for creating a Besu node
 */
export function blockchainNodeBesuCreateCommand() {
  return getCreateCommand({
    name: "besu",
    type: "blockchain node",
    alias: "b",
    execute: (cmd, baseAction) => {
      addClusterServiceArgs(cmd)
        .option(
          "-a, --application <application>",
          "The application unique name to create the node in (defaults to application from env)",
        )
        .option("--blockchain-network <blockchainNetwork>", "Blockchain network unique name to add this node to")
        .option("--node-identity <nodeIdentity>", "EC DSA P256 private key to use as the node identity")
        .addOption(
          new Option("--node-type <nodeType>", "Type of the node")
            .choices(["VALIDATOR", "NON_VALIDATOR"] as const)
            .makeOptionMandatory(),
        )
        .action(
          async (
            name,
            {
              application,
              provider,
              region,
              size,
              type,
              blockchainNetwork,
              nodeType,
              nodeIdentity,
              acceptDefaults,
              ...defaultArgs
            },
          ) => {
            return baseAction(
              {
                ...defaultArgs,
                acceptDefaults,
                provider,
                region,
              },
              async (settlemint, env) => {
                const autoAccept = !!acceptDefaults || isInCi;
                const applicationUniqueName = application ?? env.SETTLEMINT_APPLICATION!;
                if (!applicationUniqueName) {
                  cancel(
                    "No application found. Please specify an application or run `settlemint connect` to continue.",
                  );
                }

                let networkUniqueName =
                  blockchainNetwork ?? (autoAccept ? env.SETTLEMINT_BLOCKCHAIN_NETWORK : undefined);
                if (!networkUniqueName) {
                  const networks = await settlemint.blockchainNetwork.list(applicationUniqueName);
                  const network = await blockchainNetworkPrompt(env, networks, acceptDefaults ?? false);
                  if (!network) {
                    cancel("No network found. Please specify a network to continue.");
                  }
                  networkUniqueName = network?.id;
                }

                const result = await settlemint.blockchainNode.create({
                  applicationUniqueName,
                  name,
                  blockchainNetworkUniqueName: networkUniqueName,
                  nodeType,
                  keyMaterial: nodeIdentity,
                  provider,
                  region,
                  size,
                  type,
                });

                return {
                  result,
                  mapDefaultEnv: (): Partial<DotEnv> => {
                    return {
                      SETTLEMINT_APPLICATION: applicationUniqueName,
                      SETTLEMINT_BLOCKCHAIN_NODE: result.id,
                    };
                  },
                };
              },
            );
          },
        );
    },
    examples: [
      {
        description: "Create a Besu blockchain node and save as default",
        command: "platform create blockchain-node besu my-node --node-type VALIDATOR --accept-defaults -d",
      },
      {
        description: "Create a Besu blockchain node in a different network",
        command:
          "platform create blockchain-node besu my-node --blockchain-network-id 12345 --node-type NON_VALIDATOR --accept-defaults",
      },
      {
        description: "Create a Besu blockchain node in a different application",
        command:
          "platform create blockchain-node besu my-node --application-id 123456789 --node-type NON_VALIDATOR --accept-defaults",
      },
    ],
  });
}
