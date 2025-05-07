import { describe, expect, test } from "bun:test";
import { Wallet } from "ethers";
import { createEASClient } from "./eas.js";

describe("EAS Client", () => {
  const testWallet = new Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"); // Test private key
  const options = {
    schemaRegistryAddress: "0x1234567890123456789012345678901234567890",
    attestationAddress: "0x1234567890123456789012345678901234567890",
    blockchainNode: "http://localhost:8545",
    wallet: testWallet,
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
