import { describe, expect, test } from "bun:test";
import { createEASClient } from "./eas.js";

describe("EAS Client", () => {
  const options = {
    schemaRegistryAddress: "0x1234567890123456789012345678901234567890",
    attestationAddress: "0x1234567890123456789012345678901234567890",
    blockchainNode: "http://localhost:8545",
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
