import { createExamples } from "@/utils/commands/create-examples";
import { subgraphSetup } from "@/utils/subgraph/setup";
import { SETTLEMINT_NETWORK } from "@/utils/subgraph/setup";
import { getSubgraphYamlFile } from "@/utils/subgraph/subgraph-config";
import { validateIfRequiredPackagesAreInstalled } from "@/utils/validate-required-packages";
import { Command } from "@commander-js/extra-typings";
import { getPackageManagerExecutable } from "@settlemint/sdk-utils/package-manager";
import { executeCommand, intro, outro } from "@settlemint/sdk-utils/terminal";

export function subgraphBuildCommand() {
  return new Command("build")
    .description("Build the subgraph")
    .usage(
      createExamples([
        {
          description: "Build the subgraph",
          command: "subgraph build",
        },
      ]),
    )
    .action(async () => {
      intro("Building subgraph");
      await validateIfRequiredPackagesAreInstalled(["@graphprotocol/graph-cli"]);
      await subgraphSetup({
        network: SETTLEMINT_NETWORK,
      });

      const { command, args } = await getPackageManagerExecutable();
      const subgraphYamlFile = await getSubgraphYamlFile();
      await executeCommand(command, [...args, "graph", "codegen", subgraphYamlFile]);
      await executeCommand(command, [...args, "graph", "build", subgraphYamlFile]);
      outro("Subgraph built successfully");
    });
}
