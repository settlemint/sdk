import { afterEach, describe, expect, setDefaultTimeout, test } from "bun:test";
import { createSettleMintClient } from "@settlemint/sdk-js";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { NODE_NAME } from "./constants/test-resources";
import { forceExitAllCommands, runCommand } from "./utils/run-command";

const COMMAND_TEST_SCOPE = __filename;

setDefaultTimeout(15 * 60_000); // 15 minutes timeout for blockchain node operations

afterEach(() => {
  forceExitAllCommands(COMMAND_TEST_SCOPE);
});

describe("Pause and resume blockchain node operations using the SDK", () => {
  test("Pause and resume a blockchain node", async () => {
    const env = await loadEnv(false, false);
    const settlemint = createSettleMintClient({
      accessToken: process.env.SETTLEMINT_ACCESS_TOKEN_E2E_TESTS!,
      instance: env.SETTLEMINT_INSTANCE!,
    });

    // Get the blockchain node unique name from environment
    const blockchainNodeUniqueName = env.SETTLEMINT_BLOCKCHAIN_NODE!;

    // Verify the node is initially running (status should be COMPLETED)
    const initialNode = await settlemint.blockchainNode.read(blockchainNodeUniqueName);
    expect(initialNode.status).toBe("COMPLETED");
    expect(initialNode.name).toBe(NODE_NAME);

    // Pause the blockchain node
    const { output: pauseOutput } = await runCommand(COMMAND_TEST_SCOPE, [
      "platform",
      "pause",
      "blockchain-node",
      blockchainNodeUniqueName,
      "--wait",
      "--accept-defaults",
    ]).result;

    expect(pauseOutput).toInclude(`Blockchain node ${NODE_NAME} pause initiated successfully`);

    // Verify the node is paused
    const pausedNode = await settlemint.blockchainNode.read(blockchainNodeUniqueName);
    expect(pausedNode.status).toMatch(/^(PAUSED|AUTO_PAUSED)$/);

    // Resume the blockchain node
    const { output: resumeOutput } = await runCommand(COMMAND_TEST_SCOPE, [
      "platform",
      "resume",
      "blockchain-node",
      blockchainNodeUniqueName,
      "--wait",
      "--accept-defaults",
    ]).result;

    expect(resumeOutput).toInclude(`Blockchain node ${NODE_NAME} resume initiated successfully`);

    // Verify the node is running again
    const resumedNode = await settlemint.blockchainNode.read(blockchainNodeUniqueName);
    expect(resumedNode.status).toBe("COMPLETED");

    // Verify the node maintains its configuration after pause/resume
    expect(resumedNode.name).toBe(initialNode.name);
    expect(resumedNode.uniqueName).toBe(initialNode.uniqueName);
    expect(resumedNode.provider).toBe(initialNode.provider);
    expect(resumedNode.region).toBe(initialNode.region);
  });

  test("Pause blockchain node without waiting", async () => {
    const env = await loadEnv(false, false);
    const blockchainNodeUniqueName = env.SETTLEMINT_BLOCKCHAIN_NODE!;

    // Pause without waiting
    const { output } = await runCommand(COMMAND_TEST_SCOPE, [
      "platform",
      "pause",
      "blockchain-node",
      blockchainNodeUniqueName,
      "--accept-defaults",
    ]).result;

    expect(output).toInclude(`Blockchain node ${NODE_NAME} pause initiated successfully`);
    expect(output).not.toInclude("Waiting for blockchain node to be paused");

    // Resume to clean up state
    await runCommand(COMMAND_TEST_SCOPE, [
      "platform",
      "resume",
      "blockchain-node",
      blockchainNodeUniqueName,
      "--wait",
      "--accept-defaults",
    ]).result;
  });

  test("Resume blockchain node without waiting", async () => {
    const env = await loadEnv(false, false);
    const blockchainNodeUniqueName = env.SETTLEMINT_BLOCKCHAIN_NODE!;

    // First pause the node
    await runCommand(COMMAND_TEST_SCOPE, [
      "platform",
      "pause",
      "blockchain-node",
      blockchainNodeUniqueName,
      "--wait",
      "--accept-defaults",
    ]).result;

    // Resume without waiting
    const { output } = await runCommand(COMMAND_TEST_SCOPE, [
      "platform",
      "resume",
      "blockchain-node",
      blockchainNodeUniqueName,
      "--accept-defaults",
    ]).result;

    expect(output).toInclude(`Blockchain node ${NODE_NAME} resume initiated successfully`);
    expect(output).not.toInclude("Waiting for blockchain node to be resumed");

    // Wait for completion to ensure cleanup
    await runCommand(COMMAND_TEST_SCOPE, [
      "platform",
      "resume",
      "blockchain-node",
      blockchainNodeUniqueName,
      "--wait",
      "--accept-defaults",
    ]).result;
  });

  test("Handle invalid blockchain node unique name", async () => {
    const invalidUniqueName = "non-existent-blockchain-node";

    // Test pause with invalid name
    const pauseCommand = runCommand(COMMAND_TEST_SCOPE, [
      "platform",
      "pause",
      "blockchain-node",
      invalidUniqueName,
      "--accept-defaults",
    ]);

    const pauseOutputs: string[] = [];
    pauseCommand.stdout.on("data", (data: Buffer) => {
      pauseOutputs.push(data.toString());
    });

    expect(() => pauseCommand.result).toThrow();
    expect(pauseOutputs.join("\n")).toInclude("not found");

    // Test resume with invalid name
    const resumeCommand = runCommand(COMMAND_TEST_SCOPE, [
      "platform",
      "resume",
      "blockchain-node",
      invalidUniqueName,
      "--accept-defaults",
    ]);

    const resumeOutputs: string[] = [];
    resumeCommand.stdout.on("data", (data: Buffer) => {
      resumeOutputs.push(data.toString());
    });

    expect(() => resumeCommand.result).toThrow();
    expect(resumeOutputs.join("\n")).toInclude("not found");
  });
});
