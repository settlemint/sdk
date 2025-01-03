import { dirname } from "node:path";
import { Command } from "@commander-js/extra-typings";
import { executeCommand, getPackageManagerExecutable } from "@settlemint/sdk-utils";
import { SETTLEMINT_NETWORK } from "./utils/setup";
import { subgraphSetup } from "./utils/setup";
import { getSubgraphYamlFile } from "./utils/subgraph-config";

export function subgraphCodegenCommand() {
  return new Command("codegen").description("Codegen the subgraph types").action(async () => {
    await subgraphSetup({
      network: SETTLEMINT_NETWORK,
    });

    const { command, args } = await getPackageManagerExecutable();
    const subgraphYamlFile = await getSubgraphYamlFile();
    await executeCommand(command, [...args, "graph", "codegen", subgraphYamlFile], {
      cwd: dirname(subgraphYamlFile),
    });
  });
}
