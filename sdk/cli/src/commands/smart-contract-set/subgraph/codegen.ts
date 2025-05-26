import { createExamples } from "@/utils/commands/create-examples";
import { SETTLEMINT_NETWORK, subgraphSetup } from "@/utils/subgraph/setup";
import { getSubgraphYamlFile } from "@/utils/subgraph/subgraph-config";
import { validateIfRequiredPackagesAreInstalled } from "@/utils/validate-required-packages";
import { Command } from "@commander-js/extra-typings";
import { getPackageManagerExecutable } from "@settlemint/sdk-utils/package-manager";
import { executeCommand, intro, outro } from "@settlemint/sdk-utils/terminal";

export function subgraphCodegenCommand() {
  return new Command("codegen")
    .description("Codegen the subgraph types")
    .usage(
      createExamples([
        {
          description: "Generate subgraph types",
          command: "scs subgraph codegen",
        },
      ]),
    )
    .action(async () => {
      intro("Generating subgraph types");
      await validateIfRequiredPackagesAreInstalled(["@graphprotocol/graph-cli"]);
      await subgraphSetup({
        network: SETTLEMINT_NETWORK,
      });

      const { command, args } = await getPackageManagerExecutable();
      const subgraphYamlFile = await getSubgraphYamlFile();
      await executeCommand(command, [...args, "graph", "codegen", subgraphYamlFile]);
      outro("Subgraph types generated successfully");
    });
}
