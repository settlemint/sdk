import { dirname } from "node:path";
import { instancePrompt } from "@/commands/connect/instance.prompt";
import { writeEnvSpinner } from "@/commands/connect/write-env.spinner";
import { createExamples } from "@/commands/platform/utils/create-examples";
import {
  getSubgraphConfig,
  getSubgraphYamlConfig,
  updateSubgraphYamlConfig,
} from "@/commands/smart-contract-set/subgraph/utils/subgraph-config";
import { nothingSelectedError } from "@/error/nothing-selected-error";
import { getApplicationOrPersonalAccessToken } from "@/utils/get-app-or-personal-token";
import { getGraphEndpoint } from "@/utils/get-cluster-service-endpoint";
import { Command } from "@commander-js/extra-typings";
import { createSettleMintClient } from "@settlemint/sdk-js";
import { executeCommand, getPackageManagerExecutable, loadEnv } from "@settlemint/sdk-utils";
import { cancel } from "@settlemint/sdk-utils/terminal";
import isInCi from "is-in-ci";
import { subgraphNamePrompt } from "../prompts/subgraph-name.prompt";
import { getTheGraphMiddleware, getTheGraphNetwork, subgraphSetup } from "./utils/setup";
import { getSubgraphYamlFile, isGenerated } from "./utils/subgraph-config";

export function subgraphDeployCommand() {
  return new Command("deploy")
    .description("Deploy the subgraph")
    .usage(
      createExamples([
        {
          description: "Deploy the subgraph",
          command: "scs subgraph deploy",
        },
        {
          description: "Deploy the subgraph with a specific name",
          command: "scs subgraph deploy my-subgraph",
        },
      ]),
    )
    .option("-a, --accept-defaults", "Accept the default and previously set values")
    .option("--prod", "Connect to your production environment")
    .argument("[subgraph-name]", "The name of the subgraph to deploy (defaults to value in .env if not provided)")
    .action(async (subgraphName, { prod, acceptDefaults }) => {
      const autoAccept = !!acceptDefaults || isInCi;
      const env = await loadEnv(false, !!prod);

      const instance = await instancePrompt(env, true);
      const accessToken = await getApplicationOrPersonalAccessToken({
        env,
        instance,
        prefer: "application",
      });

      const theGraphMiddleware = await getTheGraphMiddleware({ env, instance, accessToken, autoAccept });
      if (!theGraphMiddleware) {
        return nothingSelectedError("graph middleware");
      }

      const network = await getTheGraphNetwork({ theGraphMiddleware, env, instance, accessToken });
      await subgraphSetup({
        network,
      });

      const subgraphYamlFile = await getSubgraphYamlFile();
      await updateSpecVersion(theGraphMiddleware.specVersion as string);

      const { command, args } = await getPackageManagerExecutable();
      await executeCommand(command, [...args, "graph", "codegen", subgraphYamlFile], {
        cwd: dirname(subgraphYamlFile),
      });

      const generated = await isGenerated();
      if (generated) {
        const currentConfig = await getSubgraphConfig();
        if (
          !currentConfig ||
          currentConfig?.datasources.some((ds) => ds.address === "0x0000000000000000000000000000000000000000")
        ) {
          cancel(
            'The "subgraph/subgraph.config.json" config has not been set, ensure all the contracts listed have an address added',
          );
        }
      }

      const graphName = await subgraphNamePrompt(subgraphName, env, autoAccept, !!prod);
      if (!graphName) {
        cancel("No graph name provided. Please provide a graph name to continue.");
      }

      const middlewareAdminUrl = new URL(
        `/${encodeURIComponent(accessToken)}/admin`,
        theGraphMiddleware.serviceUrl,
      ).toString();

      await executeCommand(command, [...args, "graph", "create", "--node", middlewareAdminUrl, graphName]);
      await executeCommand(command, [
        ...args,
        "graph",
        "deploy",
        "--version-label",
        `v1.0.${Date.now()}`,
        "--node",
        middlewareAdminUrl,
        "--ipfs",
        "https://ipfs.network.thegraph.com",
        graphName,
        subgraphYamlFile,
      ]);

      const settlemintClient = createSettleMintClient({
        accessToken,
        instance,
      });
      const middleware = await settlemintClient.middleware.read(theGraphMiddleware.uniqueName);
      const graphEndpoints = await getGraphEndpoint(middleware, env);
      await writeEnvSpinner(!!prod, {
        ...env,
        SETTLEMINT_THEGRAPH: theGraphMiddleware.uniqueName,
        ...graphEndpoints,
      });
    });
}

async function updateSpecVersion(specVersion: string) {
  const yamlConfig = await getSubgraphYamlConfig();
  yamlConfig.specVersion = specVersion;
  await updateSubgraphYamlConfig(yamlConfig);
}
