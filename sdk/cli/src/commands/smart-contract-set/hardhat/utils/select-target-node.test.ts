import { afterAll, beforeAll, describe, expect, mock, test } from "bun:test";
import { type BlockchainNodePromptArgs, blockchainNodePrompt } from "@/prompts/cluster-service/blockchain-node.prompt";
import { ModuleMocker } from "@/utils/test/module-mocker";
import type { BlockchainNode, SettlemintClient } from "@settlemint/sdk-js";
import { cancel } from "@settlemint/sdk-utils/terminal";
import { selectTargetNode } from "./select-target-node";

// Create mocks for all the dependencies
const moduleMocker = new ModuleMocker();

// Mock functions
const mockBlockchainNodePrompt = mock(blockchainNodePrompt);
const mockCancel = mock(cancel).mockImplementation((msg) => {
  throw new Error(msg);
});

// Setup before and after hooks
beforeAll(async () => {
  await moduleMocker.mock("@/prompts/cluster-service/blockchain-node.prompt", () => ({
    blockchainNodePrompt: mockBlockchainNodePrompt,
  }));
  await moduleMocker.mock("@settlemint/sdk-utils/terminal", () => ({
    cancel: mockCancel,
  }));
});

afterAll(() => {
  mock.restore();
  moduleMocker.clear();
});

describe("selectTargetNode", () => {
  // Mock blockchain node data
  const validEvmNode = {
    id: "node-1",
    uniqueName: "test-evm-node",
    name: "Test EVM Node",
    isEvm: true,
    status: "COMPLETED",
    privateKeys: [{ privateKeyType: "ACCESSIBLE_ECDSA_P256", address: "0x123" }],
  } as Partial<BlockchainNode>;

  const invalidEvmNode = {
    id: "node-2",
    uniqueName: "invalid-evm-node",
    name: "Invalid EVM Node",
    isEvm: false,
    status: "COMPLETED",
  } as Partial<BlockchainNode>;

  const noPrivateKeyNode = {
    id: "node-3",
    uniqueName: "no-privatekey-node",
    name: "No PrivateKey Node",
    isEvm: true,
    status: "COMPLETED",
    privateKeys: [],
  } as Partial<BlockchainNode>;

  const notRunningNode = {
    id: "node-4",
    uniqueName: "not-running-node",
    name: "Not Running Node",
    isEvm: true,
    status: "FAILED",
    privateKeys: [{ privateKeyType: "ACCESSIBLE_ECDSA_P256", address: "0x789" }],
  } as Partial<BlockchainNode>;

  const hdPrivateKeyNode = {
    id: "node-5",
    uniqueName: "hd-privatekey-node",
    name: "HD PrivateKey Node",
    isEvm: true,
    status: "COMPLETED",
    privateKeys: [{ privateKeyType: "HD_ECDSA_P256", address: "0xabc" }],
  } as Partial<BlockchainNode>;

  // Mock SettleMint client
  const mockSettlemint = {
    blockchainNode: {
      list: mock(async () => [validEvmNode, invalidEvmNode, noPrivateKeyNode, notRunningNode, hdPrivateKeyNode]),
      read: mock(async (uniqueName: string) => {
        switch (uniqueName) {
          case "test-evm-node":
            return validEvmNode;
          case "invalid-evm-node":
            return invalidEvmNode;
          case "no-privatekey-node":
            return noPrivateKeyNode;
          case "not-running-node":
            return notRunningNode;
          case "hd-privatekey-node":
            return hdPrivateKeyNode;
          default:
            throw new Error(`Node ${uniqueName} not found`);
        }
      }),
    },
  } as unknown as SettlemintClient;

  test("should validate node in env when autoAccept is true", async () => {
    expect(
      selectTargetNode({
        env: { SETTLEMINT_BLOCKCHAIN_NODE: "no-privatekey-node" },
        blockchainNodeUniqueName: undefined,
        autoAccept: true,
        settlemint: mockSettlemint,
      }),
    ).rejects.toThrow(
      `The specified blockchain node '${noPrivateKeyNode.uniqueName}' does not have an ECDSA P256 or HSM ECDSA P256 private key activated. Please activate an ECDSA P256 or HSM ECDSA P256 private key on your node and try again.`,
    );
  });

  test("should cancel when node is not an EVM node", async () => {
    expect(
      selectTargetNode({
        env: {},
        blockchainNodeUniqueName: "invalid-evm-node",
        autoAccept: false,
        settlemint: mockSettlemint,
      }),
    ).rejects.toThrow(
      `The specified blockchain node '${invalidEvmNode.uniqueName}' is not an EVM blockchain node. Please specify an EVM blockchain node to continue.`,
    );
  });

  test("should cancel when node has no private keys", async () => {
    expect(
      selectTargetNode({
        env: {},
        blockchainNodeUniqueName: "no-privatekey-node",
        autoAccept: false,
        settlemint: mockSettlemint,
      }),
    ).rejects.toThrow(
      `The specified blockchain node '${noPrivateKeyNode.uniqueName}' does not have an ECDSA P256 or HSM ECDSA P256 private key activated. Please activate an ECDSA P256 or HSM ECDSA P256 private key on your node and try again.`,
    );
  });

  test("should cancel when node has no ECDSA or HSM private keys", async () => {
    expect(
      selectTargetNode({
        env: {},
        blockchainNodeUniqueName: "hd-privatekey-node",
        autoAccept: false,
        settlemint: mockSettlemint,
      }),
    ).rejects.toThrow(
      `The specified blockchain node '${hdPrivateKeyNode.uniqueName}' does not have an ECDSA P256 or HSM ECDSA P256 private key activated. Please activate an ECDSA P256 or HSM ECDSA P256 private key on your node and try again.`,
    );
  });

  test("should filter out invalid nodes when prompting for selection", async () => {
    mockBlockchainNodePrompt.mockImplementation(async (args: BlockchainNodePromptArgs) => {
      // Verify that only valid nodes are passed to the prompt
      expect(args.nodes.length).toBe(1);
      expect(args.nodes[0].uniqueName).toBe("test-evm-node");
      return validEvmNode as BlockchainNode;
    });

    const result = await selectTargetNode({
      env: { SETTLEMINT_APPLICATION: "test-app" },
      blockchainNodeUniqueName: undefined,
      autoAccept: false,
      settlemint: mockSettlemint,
    });

    expect(result.isEvm).toEqual(true);
    expect(result.privateKeys?.length).toBe(1);
    expect(result.privateKeys?.[0].privateKeyType).toEqual("ACCESSIBLE_ECDSA_P256");
  });

  test("should cancel when no valid nodes are found", async () => {
    // Create a mock that returns only invalid nodes
    const noValidNodesSettlemint = {
      blockchainNode: {
        list: mock(async () => [invalidEvmNode, noPrivateKeyNode, notRunningNode, hdPrivateKeyNode]),
        read: mockSettlemint.blockchainNode.read,
      },
    } as unknown as SettlemintClient;

    expect(
      selectTargetNode({
        env: { SETTLEMINT_APPLICATION: "test-app" },
        blockchainNodeUniqueName: undefined,
        autoAccept: false,
        settlemint: noValidNodesSettlemint,
      }),
    ).rejects.toThrow(
      "No valid blockchain nodes found for deployment. A valid node must be an EVM blockchain node with an activated ECDSA P256 or HSM ECDSA P256 private key, and be running.",
    );
  });
});
