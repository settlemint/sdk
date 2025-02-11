import { dirname } from "node:path";
import { subgraphSetup } from "@/utils/subgraph/setup";
import { SETTLEMINT_NETWORK } from "@/utils/subgraph/setup";
import { getSubgraphYamlFile } from "@/utils/subgraph/subgraph-config";
import { validateIfRequiredPackagesAreInstalled } from "@/utils/validate-required-packages";
import { Command } from "@commander-js/extra-typings";
import { getPackageManagerExecutable } from "@settlemint/sdk-utils/package-manager";
import { executeCommand, intro, outro } from "@settlemint/sdk-utils/terminal";

export function subgraphBuildCommand() {
  return new Command("build").description("Build the subgraph").action(async () => {
    intro("Building subgraph");
    await validateIfRequiredPackagesAreInstalled(["@graphprotocol/graph-cli"]);
    await subgraphSetup({
      network: SETTLEMINT_NETWORK,
    });

    const { command, args } = await getPackageManagerExecutable();
    const subgraphYamlFile = await getSubgraphYamlFile();
    const cwd = dirname(subgraphYamlFile);
    await executeCommand(command, [...args, "graph", "codegen", subgraphYamlFile], { cwd });
    await executeCommand(command, [...args, "graph", "build", subgraphYamlFile], { cwd });
    outro("Subgraph built successfully");
  });
}
