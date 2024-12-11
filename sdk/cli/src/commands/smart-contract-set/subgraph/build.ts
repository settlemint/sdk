import { accessTokenPrompt } from "@/commands/connect/accesstoken.prompt";
import { instancePrompt } from "@/commands/connect/instance.prompt";
import { ServiceNotConfiguredError } from "@/error/serviceNotConfiguredError";
import { Command } from "@commander-js/extra-typings";
import { createSettleMintClient } from "@settlemint/sdk-js";
import { executeCommand, getPackageManagerExecutable, loadEnv } from "@settlemint/sdk-utils";
import { subgraphSetup } from "./lib/common";
import { isGenerated } from "./lib/is-generated";
import { getSubgraphYamlFile } from "./lib/utils";

export function subgraphBuildCommand() {
  const test = new Command("build");
  test.description("Build the subgraph");
  test.action(async () => {
    const env = await loadEnv(false, true);

    if (!env.SETTLEMINT_BLOCKCHAIN_NODE) {
      throw new ServiceNotConfiguredError("Blockchain node");
    }

    const accessToken = await accessTokenPrompt(env, true);
    const instance = await instancePrompt(env, true);

    const generated = await isGenerated();
    await subgraphSetup({
      isGenerated: generated,
      env,
      settlemintClient: createSettleMintClient({
        accessToken,
        instance,
      }),
    });

    const cwd = generated ? process.cwd() : "./subgraph";
    const { command, args } = await getPackageManagerExecutable();
    const subgraphYamlFile = await getSubgraphYamlFile();
    await executeCommand(command, [...args, "graph", "codegen", subgraphYamlFile], { cwd });
    await executeCommand(command, [...args, "graph", "build", subgraphYamlFile], { cwd });
  });

  return test;
}
