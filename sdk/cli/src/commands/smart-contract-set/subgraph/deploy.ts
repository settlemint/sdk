import { Command } from "@commander-js/extra-typings";
import { createSettleMintClient, type Middleware } from "@settlemint/sdk-js";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { getPackageManagerExecutable } from "@settlemint/sdk-utils/package-manager";
import { cancel, executeCommand, intro, outro } from "@settlemint/sdk-utils/terminal";
import { LOCAL_INSTANCE, STANDALONE_INSTANCE } from "@settlemint/sdk-utils/validation";
import isInCi from "is-in-ci";
import { nothingSelectedError } from "@/error/nothing-selected-error";
import { serviceNotRunningError } from "@/error/service-not-running-error";
import { instancePrompt } from "@/prompts/instance.prompt";
import { subgraphPrompt } from "@/prompts/smart-contract-set/subgraph.prompt";
import { subgraphNamePrompt } from "@/prompts/smart-contract-set/subgraph-name.prompt";
import { serviceUrlPrompt } from "@/prompts/standalone/service-url.prompt";
import { writeEnvSpinner } from "@/spinners/write-env.spinner";
import { isRunning } from "@/utils/cluster-service";
import { createExamples } from "@/utils/commands/create-examples";
import { getApplicationOrPersonalAccessToken } from "@/utils/get-app-or-personal-token";
import { getGraphEnv } from "@/utils/get-cluster-service-env";
import { getTheGraphMiddleware, getTheGraphNetwork, subgraphSetup } from "@/utils/subgraph/setup";
import {
  getSubgraphConfig,
  getSubgraphYamlConfig,
  getSubgraphYamlFile,
  isGenerated,
  updateSubgraphYamlConfig,
} from "@/utils/subgraph/subgraph-config";
import { getTheGraphUrl, getUpdatedSubgraphEndpoints } from "@/utils/subgraph/thegraph-url";
import { validateIfRequiredPackagesAreInstalled } from "@/utils/validate-required-packages";

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
    .option(
      "--ipfs <ipfs-url>",
      "The IPFS URL to use for the subgraph deployment (defaults to https://ipfs.console.settlemint.com)",
    )
    .option("-a, --accept-defaults", "Accept the default and previously set values")
    .option("--prod", "Connect to your production environment")
    .argument("[subgraph-name]", "The name of the subgraph to deploy (defaults to value in .env if not provided)")
    .action(async (subgraphName, { prod, acceptDefaults, ipfs }) => {
      intro("Deploying subgraph");
      await validateIfRequiredPackagesAreInstalled(["@graphprotocol/graph-cli"]);

      const autoAccept = !!acceptDefaults || isInCi;
      const env = await loadEnv(false, !!prod);

      const instance = await instancePrompt({
        env,
        accept: true,
      });

      let theGraphMiddleware: Middleware | undefined;
      let accessToken: string | undefined;
      if (instance !== STANDALONE_INSTANCE && instance !== LOCAL_INSTANCE) {
        accessToken = await getApplicationOrPersonalAccessToken({
          env,
          instance,
          prefer: "application",
        });

        theGraphMiddleware = await getTheGraphMiddleware({ env, instance, accessToken, autoAccept });
        if (!theGraphMiddleware) {
          return nothingSelectedError("graph middleware");
        }
        if (!isRunning(theGraphMiddleware)) {
          serviceNotRunningError("graph middleware", theGraphMiddleware.status);
        }

        await updateSpecVersion(theGraphMiddleware.specVersion as string);
      }

      const network = await getTheGraphNetwork({ theGraphMiddleware, env, instance, accessToken });
      await subgraphSetup({
        network,
      });

      const subgraphYamlFile = await getSubgraphYamlFile();

      const { command, args } = await getPackageManagerExecutable();
      await executeCommand(command, [...args, "graph", "codegen", subgraphYamlFile]);

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

      let graphName: string | undefined;
      if (!subgraphName) {
        const selectedSubgraphs = await subgraphPrompt({
          env,
          accept: autoAccept,
          message: "Which subgraph do you want to deploy to?",
          allowNew: true,
        });
        graphName = selectedSubgraphs[0];
      } else {
        graphName = await subgraphNamePrompt({
          defaultName: subgraphName,
          env,
          accept: autoAccept,
        });
      }

      if (!graphName) {
        cancel("No subgraph name provided. Please provide a subgraph name to continue.");
      }

      let middlewareAdminUrl: string;
      if (accessToken && theGraphMiddleware) {
        middlewareAdminUrl = new URL(
          `/${encodeURIComponent(accessToken)}/admin`,
          theGraphMiddleware.serviceUrl,
        ).toString();
      } else {
        const serviceUrl = await serviceUrlPrompt({
          defaultUrl: `${getTheGraphUrl(env.SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS)}/admin`,
          accept: autoAccept,
          message: "What is the admin endpoint for the The Graph instance you want to connect to?",
          example: "https://thegraph.mydomain.com/admin",
        });
        if (!serviceUrl) {
          cancel("No The Graph admin URL provided. Please provide a The Graph admin URL to continue.");
        }
        middlewareAdminUrl = serviceUrl.includes("/admin") ? serviceUrl : new URL(`${serviceUrl}/admin`).toString();
      }

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
        ipfs ?? "https://ipfs.console.settlemint.com",
        graphName,
        subgraphYamlFile,
      ]);

      if (accessToken && theGraphMiddleware) {
        const settlemintClient = createSettleMintClient({
          accessToken,
          instance,
        });
        const middleware = await settlemintClient.middleware.read(theGraphMiddleware.uniqueName);
        const graphEnv = await getGraphEnv(settlemintClient, middleware, graphName);
        await writeEnvSpinner(!!prod, {
          ...env,
          SETTLEMINT_THEGRAPH: theGraphMiddleware.uniqueName,
          ...graphEnv,
          SETTLEMINT_THEGRAPH_DEFAULT_SUBGRAPH: env.SETTLEMINT_THEGRAPH_DEFAULT_SUBGRAPH ?? graphName,
        });
      } else {
        await writeEnvSpinner(!!prod, {
          ...env,
          SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS: getUpdatedSubgraphEndpoints({
            existingEndpoints: env.SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS ?? [],
            middlewareAdminUrl,
            newSubgraphName: graphName,
          }),
          SETTLEMINT_THEGRAPH_DEFAULT_SUBGRAPH: env.SETTLEMINT_THEGRAPH_DEFAULT_SUBGRAPH ?? graphName,
        });
      }
      outro(`Subgraph ${graphName} deployed successfully`);
    });
}

async function updateSpecVersion(specVersion: string) {
  const yamlConfig = await getSubgraphYamlConfig();
  yamlConfig.specVersion = specVersion;
  await updateSubgraphYamlConfig(yamlConfig);
}
