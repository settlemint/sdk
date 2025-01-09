import { afterEach, describe, expect, test } from "bun:test";
import { CLUSTER_PROVIDER, CLUSTER_REGION } from "./constants/test-resources";
import { forceExitAllCommands, runCommand } from "./utils/run-command";

const COMMAND_TEST_SCOPE = __filename;

afterEach(() => {
  forceExitAllCommands(COMMAND_TEST_SCOPE);
});

describe("Test commands depending on platform configuration", () => {
  test("Create a smart contract set (invalid use case)", async () => {
    const command = runCommand(COMMAND_TEST_SCOPE, [
      "smart-contract-set",
      "create",
      "--project-name",
      "contract",
      "--use-case",
      "invalid-use-case",
    ]);
    const outputs: string[] = [];
    command.stdout.on("data", (data: Buffer) => {
      outputs.push(data.toString());
    });
    expect(() => command.result).toThrow();
    expect(outputs.join("\n")).toInclude("No use case found with id 'invalid-use-case'. Possible use cases: '");
  });

  test("Create a smart contract portal (invalid predeployed abis)", async () => {
    const command = runCommand(COMMAND_TEST_SCOPE, [
      "platform",
      "create",
      "middleware",
      "smart-contract-portal",
      "Portal",
      "--accept-defaults",
      "--provider",
      CLUSTER_PROVIDER,
      "--region",
      CLUSTER_REGION,
      "--include-predeployed-abis",
      "invalid-abi",
      "other-invalid-abi",
      "StableCoin",
    ]);
    const outputs: string[] = [];
    command.stdout.on("data", (data: Buffer) => {
      outputs.push(data.toString());
    });
    expect(() => command.result).toThrow();
    expect(outputs.join("\n")).toInclude(
      "Invalid pre-deployed abis: 'invalid-abi, other-invalid-abi'. Possible values: '",
    );
  });

  test("Create a blockchain node (invalid provider)", async () => {
    const command = runCommand(COMMAND_TEST_SCOPE, [
      "platform",
      "create",
      "blockchain-node",
      "besu",
      "Node",
      "--accept-defaults",
      "--node-type",
      "NON_VALIDATOR",
      "--provider",
      "invalid-provider",
      "--region",
      CLUSTER_REGION,
    ]);
    const outputs: string[] = [];
    command.stdout.on("data", (data: Buffer) => {
      outputs.push(data.toString());
    });
    expect(() => command.result).toThrow();
    expect(outputs.join("\n")).toInclude("No provider found with id 'invalid-provider'. Possible providers: '");
  });

  test("Create a blockchain node (invalid region)", async () => {
    const command = runCommand(COMMAND_TEST_SCOPE, [
      "platform",
      "create",
      "blockchain-node",
      "besu",
      "Node",
      "--accept-defaults",
      "--node-type",
      "NON_VALIDATOR",
      "--provider",
      CLUSTER_PROVIDER,
      "--region",
      "invalid-region",
    ]);
    const outputs: string[] = [];
    command.stdout.on("data", (data: Buffer) => {
      outputs.push(data.toString());
    });
    expect(() => command.result).toThrow();
    expect(outputs.join("\n")).toInclude("No region found with id 'invalid-region'. Possible regions: '");
  });
});
