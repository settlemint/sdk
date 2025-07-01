import { Command } from "@commander-js/extra-typings";
import { getPackageManagerExecutable } from "@settlemint/sdk-utils/package-manager";
import { executeCommand, intro, outro } from "@settlemint/sdk-utils/terminal";
import { createExamples } from "@/utils/commands/create-examples";
import { SETTLEMINT_NETWORK, subgraphSetup } from "@/utils/subgraph/setup";
import { getSubgraphYamlFile } from "@/utils/subgraph/subgraph-config";
import { validateIfRequiredPackagesAreInstalled } from "@/utils/validate-required-packages";

export function subgraphBuildCommand() {
  return new Command("build")
    .description("Build the subgraph")
    .option("--ipfs <ipfs-url>", "The IPFS URL to use for the subgraph deployment")
    .usage(
      createExamples([
        {
          description: "Build the subgraph",
          command: "scs subgraph build",
        },
      ]),
    )
    .action(async ({ ipfs }) => {
      intro("Building subgraph");
      await validateIfRequiredPackagesAreInstalled(["@graphprotocol/graph-cli"]);
      await subgraphSetup({
        network: SETTLEMINT_NETWORK,
      });

      const { command, args } = await getPackageManagerExecutable();
      const subgraphYamlFile = await getSubgraphYamlFile();
      await executeCommand(command, [...args, "graph", "codegen", subgraphYamlFile]);
      await executeCommand(command, [...args, "graph", "build", ...(ipfs ? ["--ipfs", ipfs] : []), subgraphYamlFile]);
      outro("Subgraph built successfully");
    });
}
