import { accessTokenPrompt } from "@/commands/connect/accesstoken.prompt";
import { instancePrompt } from "@/commands/connect/instance.prompt";
import { ServiceNotConfiguredError } from "@/error/serviceNotConfiguredError";
import { Command } from "@commander-js/extra-typings";
import select from "@inquirer/select";
import { createSettleMintClient } from "@settlemint/sdk-js";
import { loadEnv } from "@settlemint/sdk-utils";
import { $ } from "bun";
import { stringify } from "yaml";
import { type SubgraphTemplate, subgraphSetup } from "./lib/common";
import { isGenerated } from "./lib/is-generated";
import { getSubgraphYamlConfig, getSubgraphYamlFile } from "./lib/utils";

export function subgraphDeployCommand() {
  return new Command("deploy").description("Deploy the subgraph").action(async () => {
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
    const { adminUrl, specVersion } = await selectMiddleware();

    const cwd = generated ? process.cwd() : "./subgraph";

    const subgraphYamlFile = await getSubgraphYamlFile();
    await updateSpecVersion(specVersion);
    await $`npx graph codegen ${subgraphYamlFile}`;

    if (generated) {
      const currentConfig: SubgraphTemplate = await Bun.file("./subgraph/subgraph.config.json").json();
      if (currentConfig.datasources.some((ds) => ds.address === "0x0000000000000000000000000000000000000000")) {
        throw new Error(
          'The "subgraph/subgraph.config.json" config has not been set, ensure all the contracts listed have an address added',
        );
      }
    }

    const scsName = process.env.BTP_SCS_NAME;
    await $`npx graph create --node ${adminUrl} ${scsName}`;
    await $`npx graph deploy --version-label v1.0.${Date.now()} --node ${adminUrl} --ipfs https://ipfs.network.thegraph.com ${scsName} ${subgraphYamlFile}`;
  });
}

async function selectMiddleware() {
  const defaultMiddleware = process.env.BTP_MIDDLEWARE as string;
  const defaultSpecVersion = process.env.BTP_MIDDLEWARE_SPEC_VERSION as string;

  if (defaultMiddleware && defaultSpecVersion) {
    return {
      adminUrl: defaultMiddleware,
      specVersion: defaultSpecVersion,
    };
  }

  const middlewaresResponse = await fetch(
    `${process.env.BTP_CLUSTER_MANAGER_URL}/graph-middleware/subgraph-deploy-targets/${process.env.BTP_SCS_ID}`,
    {
      headers: {
        "x-auth-token": process.env.BTP_SERVICE_TOKEN!,
      },
    },
  );

  const middlewares = (await middlewaresResponse.json()) as {
    uniqueName: string;
    adminUrl: string;
    specVersion: string;
  }[];

  if (middlewares.length === 0) {
    throw new Error(
      "You do not have any middlewares in the application to deploy the subgraph to. Please create one and try again.",
    );
  }

  const middleware = await select({
    message: "Which middleware do you want to deploy the subgraph to?",
    choices: middlewares.map((middleware) => ({
      name: middleware.uniqueName,
      value: middleware,
    })),
  });

  if (!middleware) {
    throw new Error("No middleware selected");
  }

  return middleware;
}

async function updateSpecVersion(specVersion: string) {
  const yamlConfig = await getSubgraphYamlConfig();
  yamlConfig.specVersion = specVersion;
  const subgraphYamlFile = await getSubgraphYamlFile();
  await Bun.write(subgraphYamlFile, stringify(yamlConfig));
}
