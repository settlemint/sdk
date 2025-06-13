import { afterAll, afterEach, beforeAll, describe, expect, setDefaultTimeout, test } from "bun:test";
import { copyFile, rmdir, stat } from "node:fs/promises";
import { join } from "node:path";
import { exists } from "@settlemint/sdk-utils/filesystem";
import { $ } from "bun";
import {} from "../sdk/cli/src/utils/subgraph/subgraph-config";
import { getSubgraphYamlConfig } from "../sdk/cli/src/utils/subgraph/subgraph-config";
import {} from "./utils/link-dependencies";
import { forceExitAllCommands, runCommand } from "./utils/run-command";

const PROJECT_NAME = "contracts-subgraphs-not-generated";
const COMMAND_TEST_SCOPE = __filename;
const TEMPLATE_NAME = "asset-tokenization";
const TEMPLATE_VERSION = "1.1.1";
const SUBGRAPH_NAME = "kit";

const projectDir = join(__dirname, PROJECT_NAME);
const contractsDir = join(projectDir, "kit", "contracts");
const subgraphDir = join(projectDir, "kit", "subgraph");

setDefaultTimeout(15 * 60_000);

async function cleanup() {
  try {
    if (await exists(projectDir)) {
      await rmdir(projectDir, { recursive: true });
    }
  } catch (err) {
    console.log("Failed to delete project dir", err);
  }
}

beforeAll(cleanup);
afterAll(cleanup);

afterEach(() => {
  forceExitAllCommands(COMMAND_TEST_SCOPE);
});

describe("Add a subgraph to a subgraph which is using a manually maintained subgrapy config yaml", () => {
  test(`Create a ${TEMPLATE_NAME} project`, async () => {
    const { output } = await runCommand(
      COMMAND_TEST_SCOPE,
      ["create", "--project-name", PROJECT_NAME, "--template", TEMPLATE_NAME, "--version", TEMPLATE_VERSION],
      {
        cwd: __dirname,
      },
    ).result;
    expect((await stat(projectDir)).isDirectory()).toBeTrue();
    expect(output).toInclude("Your project is ready to go!");
    if (await exists(join(__dirname, "../.env"))) {
      await copyFile(join(__dirname, "../.env"), join(projectDir, ".env"));
    }
    if (await exists(join(__dirname, "../.env.local"))) {
      await copyFile(join(__dirname, "../.env.local"), join(projectDir, ".env.local"));
    }
  });

  test("Install dependencies", async () => {
    const env = { ...process.env, NODE_ENV: "production" };
    await $`bun install`.cwd(projectDir).env(env);
  });

  test("Connect to platform", async () => {
    const { output } = await runCommand(COMMAND_TEST_SCOPE, ["connect", "--accept-defaults"], { cwd: projectDir })
      .result;
    expect(output).toInclude("dApp connected");
  });

  test("contracts - Install dependencies", async () => {
    const result = await $`bun run dependencies`.cwd(contractsDir);
    expect(result.exitCode).toBe(0);
  });

  test("contracts - Build smart contracts", async () => {
    const { output } = await runCommand(COMMAND_TEST_SCOPE, ["scs", "hardhat", "build", "--quiet"], {
      cwd: contractsDir,
    }).result;
    expect(output).toMatch(/.*Compiled [0-9]+ Solidity files successfully.*/);
  });

  test("subgraph - Add subgraph", async () => {
    const contractName = "IERC20";
    const { output } = await runCommand(
      COMMAND_TEST_SCOPE,
      [
        "smart-contract-set",
        "subgraph",
        "add",
        "--abi",
        join(projectDir, "kit/contracts/artifacts/@openzeppelin/contracts/token/ERC20/IERC20.sol/IERC20.json"),
        "--contract-name",
        contractName,
      ],
      {
        cwd: subgraphDir,
      },
    ).result;

    expect(output).toInclude(`Subgraph config for contract ${contractName} added successfully`);

    const subgraphYaml = await getSubgraphYamlConfig(subgraphDir);

    const datasource = subgraphYaml.dataSources.find((ds) => ds.name === contractName);
    expect(datasource).toBeDefined();
    expect(datasource?.network).toBe("settlemint");
    expect(datasource?.source.address).toBe("0x0000000000000000000000000000000000000000");
    expect(datasource?.mapping.abis).toEqual([
      {
        name: "IERC20",
        file: "../contracts/artifacts/@openzeppelin/contracts/token/ERC20/IERC20.sol/IERC20.json",
      },
    ]);
  });
});
