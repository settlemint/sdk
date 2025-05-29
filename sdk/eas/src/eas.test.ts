import { afterAll, beforeAll, describe, expect, mock, test } from "bun:test";
import type { Address } from "viem";
import { ModuleMocker } from "../../cli/src/utils/test/module-mocker.js";
import { createEASClient } from "./eas.js";

const moduleMocker = new ModuleMocker();

beforeAll(async () => {
  // Mock the Portal client functions
  await moduleMocker.mock("@settlemint/sdk-portal", () => ({
    createPortalClient: () => ({
      client: {
        request: async () => ({
          callContract: {
            transactionHash: "0x1234567890abcdef",
          },
        }),
      },
      graphql: (query: string) => query,
    }),
    waitForTransactionReceipt: async () => ({
      receipt: {
        status: "Success",
        events: [],
      },
    }),
  }));
});

afterAll(() => {
  mock.restore();
  moduleMocker.clear();
});

describe("EAS Portal Client", () => {
  const options = {
    instance: "https://portal.settlemint.com",
    accessToken: "sm_aat_test_access_token",
    easContractAddress: "0x1234567890123456789012345678901234567890" as Address,
    schemaRegistryContractAddress: "0x1234567890123456789012345678901234567890" as Address,
    abiSource: { type: "hardcoded" as const },
  };

  test("should create an EAS Portal client", () => {
    const client = createEASClient(options);
    expect(client).toBeDefined();
    expect(typeof client.registerSchema).toBe("function");
    expect(typeof client.getSchema).toBe("function");
    expect(typeof client.attest).toBe("function");
    expect(typeof client.revoke).toBe("function");
  });

  test("should have Portal client methods", () => {
    const client = createEASClient(options);
    expect(typeof client.getPortalClient).toBe("function");
    expect(typeof client.getOptions).toBe("function");
    expect(typeof client.getAbis).toBe("function");
  });

  test("should validate options", () => {
    expect(() => {
      createEASClient({
        ...options,
        easContractAddress: "invalid-address",
      });
    }).toThrow();
  });

  test("should use hardcoded ABIs by default", () => {
    const client = createEASClient(options);
    const abis = client.getAbis();
    expect(abis.easAbi).toBeDefined();
    expect(abis.schemaRegistryAbi).toBeDefined();
  });

  test("should support custom ABIs", () => {
    const customEasAbi = [
      {
        type: "function",
        name: "test",
        inputs: [],
        outputs: [],
        stateMutability: "view",
      },
    ] as const;
    const customSchemaRegistryAbi = [
      {
        type: "function",
        name: "testSchema",
        inputs: [],
        outputs: [],
        stateMutability: "view",
      },
    ] as const;

    const client = createEASClient({
      ...options,
      abiSource: {
        type: "custom",
        easAbi: customEasAbi,
        schemaRegistryAbi: customSchemaRegistryAbi,
      },
    });

    const abis = client.getAbis();
    expect(abis.easAbi).toEqual(customEasAbi);
    expect(abis.schemaRegistryAbi).toEqual(customSchemaRegistryAbi);
  });
});
