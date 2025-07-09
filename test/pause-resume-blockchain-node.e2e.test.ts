import { afterEach, beforeAll, describe, expect, setDefaultTimeout, test } from "bun:test";
import { NODE_NAME_3_WITHOUT_PK } from "./constants/test-resources";
import { forceExitAllCommands, runCommand } from "./utils/run-command";
import { findBlockchainNodeByName } from "./utils/test-resources";

const COMMAND_TEST_SCOPE = __filename;

setDefaultTimeout(15 * 60_000); // 15 minutes timeout for blockchain node operations

afterEach(() => {
  forceExitAllCommands(COMMAND_TEST_SCOPE);
});

describe("Pause and resume blockchain node operations using the SDK", () => {
  let blockchainNodeUniqueName: string;

  beforeAll(async () => {
    const blockchainNode = await findBlockchainNodeByName(NODE_NAME_3_WITHOUT_PK);
    blockchainNodeUniqueName = blockchainNode?.uniqueName!;
    expect(blockchainNodeUniqueName).toBeString();
  });

  test("Pause and resume a blockchain node", async () => {
    // Pause the blockchain node
    const { output: pauseOutput } = await runCommand(COMMAND_TEST_SCOPE, [
      "platform",
      "pause",
      "blockchain-node",
      blockchainNodeUniqueName,
      "--wait",
      "--accept-defaults",
    ]).result;

    expect(pauseOutput).toInclude(`Blockchain node ${NODE_NAME_3_WITHOUT_PK} pause initiated successfully`);
    expect(pauseOutput).toInclude("Blockchain node is paused");

    // Resume the blockchain node
    const { output: resumeOutput } = await runCommand(COMMAND_TEST_SCOPE, [
      "platform",
      "resume",
      "blockchain-node",
      blockchainNodeUniqueName,
      "--wait",
      "--accept-defaults",
    ]).result;

    expect(resumeOutput).toInclude(`Blockchain node ${NODE_NAME_3_WITHOUT_PK} resume initiated successfully`);
    expect(resumeOutput).toInclude("Blockchain node is resumed");
  });

  test("Pause blockchain node without waiting", async () => {
    // Pause without waiting
    const { output } = await runCommand(COMMAND_TEST_SCOPE, [
      "platform",
      "pause",
      "blockchain-node",
      blockchainNodeUniqueName,
      "--accept-defaults",
    ]).result;

    expect(output).toInclude(`Blockchain node ${NODE_NAME_3_WITHOUT_PK} pause initiated successfully`);
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

    expect(output).toInclude(`Blockchain node ${NODE_NAME_3_WITHOUT_PK} resume initiated successfully`);
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

    await expect(pauseCommand.result).rejects.toThrow();

    // Test resume with invalid name
    const resumeCommand = runCommand(COMMAND_TEST_SCOPE, [
      "platform",
      "resume",
      "blockchain-node",
      invalidUniqueName,
      "--accept-defaults",
    ]);

    await expect(resumeCommand.result).rejects.toThrow();
  });
});
