import { afterAll, afterEach, beforeAll, describe, expect, setDefaultTimeout, test } from "bun:test";
import { copyFile, readFile, rmdir, stat } from "node:fs/promises";
import { join } from "node:path";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { exists } from "@settlemint/sdk-utils/filesystem";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { $ } from "bun";
import {
  getSubgraphConfig,
  getSubgraphYamlConfig,
  updateSubgraphConfig,
} from "../sdk/cli/src/commands/smart-contract-set/subgraph/utils/subgraph-config";
import { forceExitAllCommands, runCommand } from "./utils/run-command";

const PROJECT_NAME = "contracts-subgraphs";
const COMMAND_TEST_SCOPE = __filename;
const USE_CASE = "solidity-diamond-bond";

const projectDir = join(__dirname, PROJECT_NAME);

setDefaultTimeout(15 * 60_000);

async function cleanup() {
  try {
    await rmdir(projectDir, { recursive: true });
  } catch (err) {
    console.log("Failed to delete project dir", err);
  }
}

beforeAll(cleanup);
afterAll(cleanup);

afterEach(() => {
  forceExitAllCommands(COMMAND_TEST_SCOPE);
});

describe("Build and deploy a subgraph using the SDK", () => {
  let contractsDeploymentInfo: Record<string, string>;

  test("Create a smart contract set and install packages", async () => {
    const { output } = await runCommand(
      COMMAND_TEST_SCOPE,
      ["smart-contract-set", "create", "--project-name", PROJECT_NAME, "--use-case", USE_CASE],
      { cwd: __dirname },
    ).result;
    expect((await stat(projectDir)).isDirectory()).toBeTrue();
    expect(output).toInclude("Your smart contract set is ready to go!");
    await $`bun install --save-text-lockfile`.cwd(projectDir);
    if (await exists(join(__dirname, "../.env"))) {
      await copyFile(join(__dirname, "../.env"), join(projectDir, ".env"));
    }
    if (await exists(join(__dirname, "../.env.local"))) {
      await copyFile(join(__dirname, "../.env.local"), join(projectDir, ".env.local"));
    }
  });

  test("Deploy smart contract and get address info", async () => {
    const deploymentId = "diamond-bond";
    const { output: deployOutput } = await runCommand(
      COMMAND_TEST_SCOPE,
      ["scs", "hardhat", "deploy", "remote", "--deployment-id", deploymentId, "--accept-defaults"],
      {
        cwd: projectDir,
        env: {
          HARDHAT_IGNITION_CONFIRM_DEPLOYMENT: "false",
        },
      },
    ).result;
    const deploymentInfoData = await readFile(
      join(projectDir, "ignition", "deployments", deploymentId, "deployed_addresses.json"),
    );
    contractsDeploymentInfo = JSON.parse(deploymentInfoData.toString());
    expect(deployOutput).toInclude("successfully deployed 🚀");
  });

  test("Build subgraph", async () => {
    const { output } = await runCommand(COMMAND_TEST_SCOPE, ["smart-contract-set", "subgraph", "build"], {
      cwd: projectDir,
    }).result;
    expect(output).toInclude("Build completed");
    const subgraphYaml = await getSubgraphYamlConfig(projectDir);
    expect(subgraphYaml.dataSources).toHaveLength(4);
    expect(subgraphYaml.dataSources.map((ds) => ds.name)).toEqual(["diamond", "erc20", "pausable", "accesscontrol"]);
  });

  test("Codegen subgraph", async () => {
    const { output } = await runCommand(COMMAND_TEST_SCOPE, ["smart-contract-set", "subgraph", "codegen"], {
      cwd: projectDir,
    }).result;
    expect(output).toInclude("Types generated successfully");
  });

  test("Deploy subgraphs (invalid subgraph.config.json)", async () => {
    const command = runCommand(COMMAND_TEST_SCOPE, ["smart-contract-set", "subgraph", "deploy", "--accept-defaults"], {
      cwd: projectDir,
    });
    const outputs: string[] = [];
    command.stdout.on("data", (data: Buffer) => {
      outputs.push(data.toString());
    });
    expect(() => command.result).toThrow();
    expect(outputs.join("\n")).toMatch(
      /The "subgraph\/subgraph\.config\.json" config has not been set, ensure all the contracts listed have an address added/i,
    );
  });

  test("Deploy subgraphs (fix subgraph.config.json and deploy)", async () => {
    const config = await getSubgraphConfig(projectDir);
    expect(config).toBeDefined();
    expect(config).not.toBeNull();
    await updateSubgraphConfig(
      {
        ...config!,
        datasources: config!.datasources.map((source) => {
          const addressKey = Object.keys(contractsDeploymentInfo).find((key) => key.endsWith(`#${source.name}`));
          const address = addressKey ? contractsDeploymentInfo[addressKey]! : source.address;
          return {
            ...source,
            address,
          };
        }),
      },
      projectDir,
    );
    for (const datasource of config!.datasources) {
      const { output } = await runCommand(
        COMMAND_TEST_SCOPE,
        ["smart-contract-set", "subgraph", "deploy", "--accept-defaults", datasource.name],
        {
          cwd: projectDir,
        },
      ).result;
      expect(output).toInclude("Build completed");
    }
    const env: Partial<DotEnv> = await loadEnv(false, false, projectDir);
    for (const datasource of config!.datasources) {
      const subgraphDeployed = env.SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS?.some((endpoint) =>
        endpoint.endsWith(`/subgraphs/name/${datasource.name.toLowerCase()}`),
      );
      if (!subgraphDeployed) {
        expect(env.SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS).toInclude(datasource.name.toLowerCase());
      } else {
        expect(subgraphDeployed).toBeTrue();
      }
    }
  });
});
