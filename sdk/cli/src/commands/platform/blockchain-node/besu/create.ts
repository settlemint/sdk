import { addClusterServiceArgs } from "@/commands/platform/common/cluster-service.args";
import { Option } from "@commander-js/extra-typings";
import type { DotEnv } from "@settlemint/sdk-utils";
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
          "-a, --application-id <applicationId>",
          "The application ID to create the node in (defaults to application from env)",
        )
        .requiredOption("--blockchain-network-id <blockchainNetworkId>", "Blockchain network to add this node to")
        .requiredOption("--name <name>", "Name of the node")
        .option("--node-identity <nodeIdentity>", "EC DSA P256 private key to use as the node identity")
        .addOption(
          new Option("--node-type <nodeType>", "Type of the node")
            .choices(["VALIDATOR", "NON_VALIDATOR", "NOTARY", "ORDERER", "PEER", "UNSPECIFIED"] as const)
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
              ...defaultArgs
            },
          ) => {
            return baseAction(defaultArgs, async (settlemint, env) => {
              const application = applicationId ?? env.SETTLEMINT_APPLICATION!;
              const result = await settlemint.blockchainNode.create({
                applicationId: application,
                name,
                blockchainNetworkId,
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
        command: "platform create blockchain-node besu my-node --node-name validator-1 --accept-defaults -d",
      },
      {
        description: "Create a Besu blockchain node in a different application",
        command:
          "platform create blockchain-node besu my-node --application-id 123456789 --node-name validator-1 --chain-id 12345 --gas-limit 10000000 --seconds-per-block 5",
      },
    ],
  });
}
