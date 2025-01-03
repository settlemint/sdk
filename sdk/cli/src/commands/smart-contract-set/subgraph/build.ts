import { dirname } from "node:path";
import { Command } from "@commander-js/extra-typings";
import { executeCommand, getPackageManagerExecutable } from "@settlemint/sdk-utils";
import { SETTLEMINT_NETWORK } from "./utils/setup";
import { subgraphSetup } from "./utils/setup";
import { getSubgraphYamlFile } from "./utils/subgraph-config";

export function subgraphBuildCommand() {
  return new Command("build").description("Build the subgraph").action(async () => {
    await subgraphSetup({
      network: SETTLEMINT_NETWORK,
    });

    const { command, args } = await getPackageManagerExecutable();
    const subgraphYamlFile = await getSubgraphYamlFile();
    const cwd = dirname(subgraphYamlFile);
    await executeCommand(command, [...args, "graph", "codegen", subgraphYamlFile], { cwd });
    await executeCommand(command, [...args, "graph", "build", subgraphYamlFile], { cwd });
  });
}
