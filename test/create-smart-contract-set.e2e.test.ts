import { afterAll, afterEach, describe, expect, setDefaultTimeout, test } from "bun:test";
import { rmdir, stat } from "node:fs/promises";
import { join } from "node:path";
import { forceExitAllCommands, runCommand } from "./utils/run-command";

const SMART_CONTRACT_SET_NAME = "contracts";
const COMMAND_TEST_SCOPE = "create-smart-contract-set-e2e";

let projectDir: string;

setDefaultTimeout(15 * 60_000);

afterAll(async () => {
  if (!projectDir) {
    return;
  }
  try {
    await rmdir(projectDir, { recursive: true });
  } catch (err) {
    console.log("Failed to delete project dir", err);
  }
});

afterEach(() => {
  forceExitAllCommands(COMMAND_TEST_SCOPE);
});

describe("Setup a smart contract set using the SDK", () => {
  test("Create a smart contract set", async () => {
    const { cwd, output } = await runCommand(
      COMMAND_TEST_SCOPE,
      ["smart-contract-set", "create", "--project-name", SMART_CONTRACT_SET_NAME, "--use-case", "solidity-starterkit"],
      { cwd: __dirname },
    );
    projectDir = join(cwd, SMART_CONTRACT_SET_NAME);
    expect((await stat(projectDir)).isDirectory()).toBeTrue();
    expect(output).toInclude("Your smart contract set is ready to go!");
  });

  test("Compile smart contract set", async () => {
    // Clone smart contract set repo
    // Deploy to node
    // Deploy subgraph to graph instance
    // Extract abi for the portal (or can we use predeployed abis as wel?)
    // Extract contract address information from deployment
  });

  test("Deploy smart contract set (local)", async () => {
    // Clone smart contract set repo
    // Deploy to node
    // Deploy subgraph to graph instance
    // Extract abi for the portal (or can we use predeployed abis as wel?)
    // Extract contract address information from deployment
  });

  test("Deploy smart contract set (remote)", async () => {
    // Clone smart contract set repo
    // Deploy to node
    // Deploy subgraph to graph instance
    // Extract abi for the portal (or can we use predeployed abis as wel?)
    // Extract contract address information from deployment
  });

  test("Deploy subgraph", async () => {});
});
