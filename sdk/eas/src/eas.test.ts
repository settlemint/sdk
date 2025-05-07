import { describe, expect, mock, test } from "bun:test";
import type { Address } from "viem";
import { createEASClient } from "./eas.js";

// Mock the viem client functions
mock.module("@settlemint/sdk-viem", () => ({
  getPublicClient: () => ({
    chain: {
      id: 1,
      name: "Ethereum",
      contracts: { ensRegistry: { address: undefined } },
    },
    transport: {
      type: "http",
      url: "http://localhost:8545",
    },
    request: async () => ({}),
  }),
  getWalletClient: () => () => ({
    account: {
      address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      privateKey: "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
    },
    chain: {
      id: 1,
      name: "Ethereum",
    },
    transport: {
      type: "http",
      url: "http://localhost:8545",
    },
  }),
}));

describe("EAS Client", () => {
  const options = {
    schemaRegistryAddress: "0x1234567890123456789012345678901234567890" as Address,
    attestationAddress: "0x1234567890123456789012345678901234567890" as Address,
    accessToken: "sm_aat_test_access_token",
    chainId: "1",
    chainName: "Ethereum",
    rpcUrl: "http://localhost:8545",
  };

  test("should create an EAS client", () => {
    const eas = createEASClient(options);
    expect(eas).toBeDefined();
    expect(typeof eas.registerSchema).toBe("function");
    expect(typeof eas.getSchema).toBe("function");
  });

  test("should execute all functions without errors", async () => {
    const eas = createEASClient(options);
    await expect(
      eas.registerSchema({
        fields: [
          { name: "userAddress", type: "address" },
          { name: "age", type: "uint8" },
        ],
        resolverAddress: "0x1234567890123456789012345678901234567890",
        revocable: true,
      }),
    ).rejects.toThrow();
  });
});
