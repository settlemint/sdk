import { afterAll, afterEach, beforeAll, describe, expect, setDefaultTimeout, test } from "bun:test";
import { copyFile, readFile, rmdir, stat } from "node:fs/promises";
import { join } from "node:path";
import { $ } from "bun";
import { parse } from "yaml";
import { forceExitAllCommands, runCommand } from "./utils/run-command";

const PROJECT_NAME = "contracts-subgraphs";
const COMMAND_TEST_SCOPE = __filename;
const USE_CASE = "solidity-token-erc20";

const projectDir = join(process.cwd(), "test", PROJECT_NAME);

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
  test("Create a smart contract set and install packages", async () => {
    const { output } = await runCommand(
      COMMAND_TEST_SCOPE,
      ["smart-contract-set", "create", "--project-name", PROJECT_NAME, "--use-case", USE_CASE],
      { cwd: __dirname },
    ).result;
    expect((await stat(projectDir)).isDirectory()).toBeTrue();
    expect(output).toInclude("Your smart contract set is ready to go!");
    await $`bun install`.cwd(projectDir);
    await copyFile(join(__dirname, "../.env"), join(projectDir, ".env"));
    await copyFile(join(__dirname, "../.env.local"), join(projectDir, ".env.local"));
  });

  test("Build subgraph", async () => {
    const { output } = await runCommand(
      COMMAND_TEST_SCOPE,
      ["smart-contract-set", "subgraph", "build", "--accept-defaults"],
      {
        cwd: projectDir,
      },
    ).result;
    expect(output).toInclude("Build completed");
    const subgraphYaml = await readFile(join(projectDir, "build", "subgraph.yaml"));
    const parsed = parse(subgraphYaml.toString());
    expect(parsed).toEqual({
      specVersion: "0.0.4",
      schema: {
        file: "scs.schema.graphql",
      },
      dataSources: [
        {
          kind: "ethereum/contract",
          name: "erc20",
          network: "settlemint",
          source: {
            address: "0x0000000000000000000000000000000000000000",
            abi: "IERC20",
            startBlock: 0,
          },
          mapping: {
            kind: "ethereum/events",
            apiVersion: "0.0.9",
            language: "wasm/assemblyscript",
            entities: ["ERC20Contract"],
            abis: [
              {
                name: "IERC20",
                file: "erc20/IERC20Metadata.json",
              },
            ],
            eventHandlers: [
              {
                event: "Approval(indexed address,indexed address,uint256)",
                handler: "handleApproval",
              },
              {
                event: "Transfer(indexed address,indexed address,uint256)",
                handler: "handleTransfer",
              },
            ],
            file: "erc20/erc20.wasm",
          },
        },
        {
          kind: "ethereum/contract",
          name: "pausable",
          network: "settlemint",
          source: {
            address: "0x0000000000000000000000000000000000000000",
            abi: "Pausable",
            startBlock: 0,
          },
          mapping: {
            kind: "ethereum/events",
            apiVersion: "0.0.9",
            language: "wasm/assemblyscript",
            entities: ["Pausable"],
            abis: [
              {
                name: "Pausable",
                file: "pausable/Pausable.json",
              },
            ],
            eventHandlers: [
              {
                event: "Paused(address)",
                handler: "handlePaused",
              },
              {
                event: "Unpaused(address)",
                handler: "handleUnpaused",
              },
            ],
            file: "pausable/pausable.wasm",
          },
        },
        {
          kind: "ethereum/contract",
          name: "accesscontrol",
          network: "settlemint",
          source: {
            address: "0x0000000000000000000000000000000000000000",
            abi: "AccessControl",
            startBlock: 0,
          },
          mapping: {
            kind: "ethereum/events",
            apiVersion: "0.0.9",
            language: "wasm/assemblyscript",
            entities: ["AccessControl"],
            abis: [
              {
                name: "AccessControl",
                file: "accesscontrol/IAccessControl.json",
              },
            ],
            eventHandlers: [
              {
                event: "RoleAdminChanged(indexed bytes32,indexed bytes32,indexed bytes32)",
                handler: "handleRoleAdminChanged",
              },
              {
                event: "RoleGranted(indexed bytes32,indexed address,indexed address)",
                handler: "handleRoleGranted",
              },
              {
                event: "RoleRevoked(indexed bytes32,indexed address,indexed address)",
                handler: "handleRoleRevoked",
              },
            ],
            file: "accesscontrol/accesscontrol.wasm",
          },
        },
      ],
      features: ["nonFatalErrors", "fullTextSearch", "ipfsOnEthereumContracts"],
    });
  });
});
