import { afterAll, beforeAll, describe, expect, mock, test } from "bun:test";
import type { Address } from "viem";
import { ModuleMocker } from "../../cli/src/utils/test/module-mocker.js";
import { EASPortalClient } from "./eas-portal-client.js";

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
    instance: "https://portal.settlemint.com/graphql",
    accessToken: "sm_aat_test_access_token",
    easContractAddress: "0x1234567890123456789012345678901234567890" as Address,
    schemaRegistryContractAddress: "0x1234567890123456789012345678901234567890" as Address,
    abiSource: { type: "hardcoded" as const },
  };

  test("should create an EAS Portal client", () => {
    const easClient = new EASPortalClient(options);
    expect(easClient).toBeDefined();
    expect(typeof easClient.registerSchema).toBe("function");
    expect(typeof easClient.getSchema).toBe("function");
    expect(typeof easClient.attest).toBe("function");
    expect(typeof easClient.revoke).toBe("function");
  });

  test("should register a schema", async () => {
    const easClient = new EASPortalClient(options);
    const result = await easClient.registerSchema({
      schema: "address userAddress, uint256 score",
      resolver: "0x0000000000000000000000000000000000000000" as Address,
      revocable: true,
    });

    expect(result).toBeDefined();
    expect(result.hash).toBe("0x...");
  });

  test("should have Portal client methods", () => {
    const easClient = new EASPortalClient(options);
    expect(typeof easClient.getPortalClient).toBe("function");
    expect(typeof easClient.getOptions).toBe("function");
    expect(typeof easClient.getAbis).toBe("function");
  });
});
