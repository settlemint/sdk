import { blockchainNetworkPrompt } from "@/commands/connect/blockchain-network.prompt";
import { addClusterServiceArgs } from "@/commands/platform/common/cluster-service.args";
import { Option } from "@commander-js/extra-typings";
import type { DotEnv } from "@settlemint/sdk-utils";
import { cancel } from "@settlemint/sdk-utils/terminal";
import { getCreateCommand } from "../../common/create-command";

const prettyNodeTypeNames = {
  validator: "VALIDATOR",
  "non-validator": "NON_VALIDATOR",
  notary: "NOTARY",
  orderer: "ORDERER",
  peer: "PEER",
  unspecified: "UNSPECIFIED",
} as const;

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
          "-a, --application-id <applicationId>",
          "The application ID to create the node in (defaults to application from env)",
        )
        .option("--blockchain-network-id <blockchainNetworkId>", "Blockchain network to add this node to")
        .option("--node-identity <nodeIdentity>", "EC DSA P256 private key to use as the node identity")
        .addOption(
          new Option("--node-type <nodeType>", "Type of the node")
            .choices(Object.keys(prettyNodeTypeNames) as (keyof typeof prettyNodeTypeNames)[])
            .makeOptionMandatory(),
        )
        .action(
          async (
            name,
            {
              applicationId,
              provider,
              region,
              size,
              type,
              blockchainNetworkId,
              nodeType,
              nodeIdentity,
              acceptDefaults,
              ...defaultArgs
            },
          ) => {
            return baseAction(defaultArgs, async (settlemint, env) => {
              const application = applicationId ?? env.SETTLEMINT_APPLICATION!;
              if (!application) {
                cancel("No application found");
              }

              let networkId = blockchainNetworkId ?? env.SETTLEMINT_BLOCKCHAIN_NETWORK!;
              if (!networkId) {
                const networks = await settlemint.blockchainNetwork.list(application);
                const network = await blockchainNetworkPrompt(env, networks, acceptDefaults ?? false);
                if (!network) {
                  cancel("No network found");
                }
                networkId = network?.id;
              }

              const result = await settlemint.blockchainNode.create({
                applicationId: application,
                name,
                blockchainNetworkId: networkId,
                nodeType: prettyNodeTypeNames[nodeType],
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
                    SETTLEMINT_APPLICATION: application,
                    SETTLEMINT_BLOCKCHAIN_NODE: result.id,
                  };
                },
              };
            });
          },
        );
    },
    examples: [
      {
        description: "Create a Besu blockchain node and save as default",
        command: "platform create blockchain-node besu my-node --node-type validator --accept-defaults -d",
      },
      {
        description: "Create a Besu blockchain node in a different network",
        command:
          "platform create blockchain-node besu my-node --blockchain-network-id 12345 --node-type non-validator --accept-defaults",
      },
      {
        description: "Create a Besu blockchain node in a different application",
        command:
          "platform create blockchain-node besu my-node --application-id 123456789 --node-type non-validator --accept-defaults",
      },
    ],
  });
}
