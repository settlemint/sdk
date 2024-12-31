import { afterAll, afterEach, beforeAll, describe, expect, setDefaultTimeout, test } from "bun:test";
import { copyFile, readFile, rmdir, stat } from "node:fs/promises";
import { join } from "node:path";
import { type DotEnv, loadEnv } from "@settlemint/sdk-utils";
import { $ } from "bun";
import {
  getSubgraphYamlConfig,
  updateSubgraphYamlConfig,
} from "../sdk/cli/src/commands/smart-contract-set/subgraph/utils/subgraph-config";
import { forceExitAllCommands, runCommand } from "./utils/run-command";

const PROJECT_NAME = "starter-kit-demo";
const TEMPLATE_NAME = "@settlemint/starterkit-asset-tokenization";

const COMMAND_TEST_SCOPE = __filename;

const projectDir = join(__dirname, PROJECT_NAME);
const dAppDir = join(projectDir, "kit", "dapp");
const contractsDir = join(projectDir, "kit", "contracts");
const subgraphDir = join(projectDir, "kit", "subgraph");

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

describe("Setup a project using the SDK", () => {
  let contractsDeploymentInfo: Record<string, string>;

  test("Create a starter kit project", async () => {
    const { output } = await runCommand(
      COMMAND_TEST_SCOPE,
      ["create", "--project-name", PROJECT_NAME, "--template", TEMPLATE_NAME],
      {
        cwd: __dirname,
      },
    ).result;
    expect((await stat(projectDir)).isDirectory()).toBeTrue();
    expect(output).toInclude("Your project is ready to go!");
    await copyFile(join(__dirname, "../.env"), join(projectDir, ".env"));
    await copyFile(join(__dirname, "../.env.local"), join(projectDir, ".env.local"));
  });

  test("Install dependencies and link SDK to use local one", async () => {
    const env = { NODE_ENV: "production" };
    await $`bun install`.cwd(projectDir).env({
      ...process.env,
      ...env,
    });
    // Delete the node_modules/@settlemint folder
    // It will automatically use the local ones when deleted
    await $`rm -rf ./node_modules/@settlemint`.cwd(projectDir);
  });

  test("Connect starter kit", async () => {
    const { output } = await runCommand(COMMAND_TEST_SCOPE, ["connect", "--accept-defaults"], { cwd: projectDir })
      .result;
    expect(output).toInclude("Connected to SettleMint");
  });

  test("Validate that .env file has the correct values", async () => {
    const env: Partial<DotEnv> = await loadEnv(false, false, projectDir);

    expect(env.SETTLEMINT_ACCESS_TOKEN).toBeString();
    expect(env.SETTLEMINT_INSTANCE).toBeString();
    expect(env.SETTLEMINT_WORKSPACE).toBeString();

    expect(env.SETTLEMINT_APPLICATION).toBeString();

    expect(env.SETTLEMINT_BLOCKCHAIN_NETWORK).toBeString();
    expect(env.SETTLEMINT_BLOCKCHAIN_NODE).toBeString();

    expect(env.SETTLEMINT_HD_PRIVATE_KEY).toBeString();

    expect(env.SETTLEMINT_IPFS).toBeString();
    expect(env.SETTLEMINT_IPFS_API_ENDPOINT).toBeString();
    expect(env.SETTLEMINT_IPFS_GATEWAY_ENDPOINT).toBeString();
    expect(env.SETTLEMINT_IPFS_PINNING_ENDPOINT).toBeString();

    expect(env.SETTLEMINT_THEGRAPH).toBeString();
    expect(env.SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS).toBeArray();

    expect(env.SETTLEMINT_PORTAL).toBeString();
    expect(env.SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT).toBeString();
    expect(env.SETTLEMINT_PORTAL_REST_ENDPOINT).toBeString();

    expect(env.SETTLEMINT_HASURA).toBeString();
    expect(env.SETTLEMINT_HASURA_ENDPOINT).toBeString();
    expect(env.SETTLEMINT_HASURA_ADMIN_SECRET).toBeString();

    expect(env.SETTLEMINT_BLOCKSCOUT).toBeString();
    expect(env.SETTLEMINT_BLOCKSCOUT_UI_ENDPOINT).toBeString();
    expect(env.SETTLEMINT_BLOCKSCOUT_GRAPHQL_ENDPOINT).toBeString();
  });

  test("contracts - Install dependencies", async () => {
    const result = await $`bun run dependencies`.cwd(contractsDir);
    expect(result.exitCode).toBe(0);
  });

  test("contracts - Build and Deploy smart contracts", async () => {
    const deploymentId = "starterkit-asset-tokenization";
    const { output: deployOutput } = await runCommand(
      COMMAND_TEST_SCOPE,
      ["scs", "hardhat", "deploy", "remote", "--deployment-id", deploymentId, "--accept-defaults"],
      {
        cwd: contractsDir,
        env: {
          HARDHAT_IGNITION_CONFIRM_DEPLOYMENT: "false",
        },
      },
    ).result;
    const deploymentInfoData = await readFile(
      join(contractsDir, "ignition", "deployments", deploymentId, "deployed_addresses.json"),
    );
    contractsDeploymentInfo = JSON.parse(deploymentInfoData.toString());
    expect(deployOutput).toInclude("successfully deployed 🚀");
    expect(deployOutput).not.toInclude("Error reading hardhat.config.ts");
  });

  test("subgraph - Update contract addresses", async () => {
    const config = await getSubgraphYamlConfig(subgraphDir);
    const updatedConfig: typeof config = {
      ...config,
      dataSources: config.dataSources.map((dataSource) => {
        const addressKey = Object.keys(contractsDeploymentInfo).find((key) => key.endsWith(`#${dataSource.name}`));
        const address = addressKey ? contractsDeploymentInfo[addressKey]! : dataSource.source.address;
        return {
          ...dataSource,
          source: {
            ...dataSource.source,
            address,
          },
        };
      }),
    };
    await updateSubgraphYamlConfig(updatedConfig, subgraphDir);
  });

  test("subgraph - Build subgraph", async () => {
    const { output } = await runCommand(
      COMMAND_TEST_SCOPE,
      ["smart-contract-set", "subgraph", "build", "--accept-defaults"],
      {
        cwd: subgraphDir,
      },
    ).result;
    expect(output).toInclude("Build completed");
  });

  test("subgraph - Codegen subgraph", async () => {
    const { output } = await runCommand(
      COMMAND_TEST_SCOPE,
      ["smart-contract-set", "subgraph", "codegen", "--accept-defaults"],
      {
        cwd: subgraphDir,
      },
    ).result;
    expect(output).toInclude("Types generated successfully");
  });

  test.skip("subgraph - Deploy subgraphs", async () => {
    const config = await getSubgraphYamlConfig(subgraphDir);
    for (const datasource of config.dataSources) {
      const { output } = await runCommand(
        COMMAND_TEST_SCOPE,
        ["smart-contract-set", "subgraph", "deploy", "--accept-defaults", datasource.name],
        {
          cwd: subgraphDir,
        },
      ).result;
      expect(output).toInclude("Build completed");
    }
    const env: Partial<DotEnv> = await loadEnv(false, false, projectDir);
    for (const datasource of config.dataSources) {
      expect(
        env.SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS?.some((endpoint) =>
          endpoint.endsWith(`/subgraphs/name/${datasource.name.toLowerCase()}`),
        ),
      ).toBeTrue();
    }
  });

  test("dApp - Codegen starter kit", async () => {
    const { output } = await runCommand(COMMAND_TEST_SCOPE, ["codegen", "--thegraph-subgraph-names", "starterkits"], {
      cwd: dAppDir,
    }).result;

    expect(output).toInclude("Generating Hasura resources");
    expect(output).toInclude("Generating Minio resources");
    expect(output).toInclude("Generating IPFS resources");
    expect(output).toInclude("Generating Blockscout resources");
    expect(output).toInclude("Generating Portal resources");
    expect(output).toInclude("Generating TheGraph resources");
    expect(output).toInclude("Codegen complete");
  });

  test("Build starter kit", async () => {
    const env = { NODE_ENV: "production" };
    await $`bun lint`.cwd(projectDir).env(env);
    await $`bun check-types`.cwd(projectDir).env(env);
  });
});
