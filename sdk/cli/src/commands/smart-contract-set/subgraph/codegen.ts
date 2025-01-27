import { dirname } from "node:path";
import { SETTLEMINT_NETWORK, subgraphSetup } from "@/utils/subgraph/setup";
import { getSubgraphYamlFile } from "@/utils/subgraph/subgraph-config";
import { validateIfRequiredPackagesAreInstalled } from "@/utils/validate-required-packages";
import { Command } from "@commander-js/extra-typings";
import { getPackageManagerExecutable } from "@settlemint/sdk-utils/package-manager";
import { executeCommand } from "@settlemint/sdk-utils/terminal";

export function subgraphCodegenCommand() {
  return new Command("codegen").description("Codegen the subgraph types").action(async () => {
    await validateIfRequiredPackagesAreInstalled(["@graphprotocol/graph-cli"]);
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
