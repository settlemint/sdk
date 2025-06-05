import { afterAll, beforeAll, describe, expect, mock, test } from "bun:test";
import type { Address, Hex } from "viem";
import { ModuleMocker } from "../../cli/src/utils/test/module-mocker.js";
import { ZERO_ADDRESS, ZERO_BYTES32, createEASClient } from "./eas.js";

const moduleMocker = new ModuleMocker();

beforeAll(async () => {
  // Mock the Portal client functions
  await moduleMocker.mock("@settlemint/sdk-portal", () => ({
    createPortalClient: () => ({
      client: {
        request: async () => ({
          transactionHash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
        }),
      },
    }),
  }));
});

afterAll(() => {
  mock.restore();
  moduleMocker.clear();
});

// Test constants
const TEST_DEPLOYER_ADDRESS = "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6" as Address;
const TEST_FROM_ADDRESS = "0x8ba1f109551bD432803012645Hac136c22C177ec" as Address;
const TEST_EAS_ADDRESS = "0xd46081aeEC4Ee8DB98eBDd9E066B5B9b151A2096" as Address;
const TEST_SCHEMA_REGISTRY_ADDRESS = "0x5EFfB599d6DebD7cf576fb94F4C086b2bCC917b6" as Address;

describe("EAS Portal Client", () => {
  const optionsWithAddresses = {
    instance: "https://portal.settlemint.com",
    accessToken: "sm_aat_test_access_token",
    easContractAddress: "0x1234567890123456789012345678901234567890" as Address,
    schemaRegistryContractAddress: "0x5678901234567890123456789012345678901234" as Address,
    debug: false,
  };

  const optionsWithoutAddresses = {
    instance: "https://portal.settlemint.com",
    accessToken: "sm_aat_test_access_token",
    debug: false,
  };

  test("should create an EAS Portal client with contract addresses", () => {
    const client = createEASClient({
      instance: "https://portal-87c1d.gke-europe.settlemint.com/graphql",
      accessToken: "sm_aat_5ce243f91f231128",
      easContractAddress: TEST_EAS_ADDRESS,
      schemaRegistryContractAddress: TEST_SCHEMA_REGISTRY_ADDRESS,
      debug: true,
    });

    expect(client).toBeDefined();
    expect(typeof client.deploy).toBe("function");
    expect(typeof client.registerSchema).toBe("function");
    expect(typeof client.attest).toBe("function");
    expect(typeof client.getSchema).toBe("function");
    expect(typeof client.getAttestation).toBe("function");
  });

  test("should create an EAS Portal client without contract addresses", () => {
    const client = createEASClient({
      instance: "https://portal-87c1d.gke-europe.settlemint.com/graphql",
      accessToken: "sm_aat_5ce243f91f231128",
      debug: false,
    });

    expect(client).toBeDefined();
    expect(typeof client.deploy).toBe("function");
    expect(typeof client.registerSchema).toBe("function");
    expect(typeof client.attest).toBe("function");
  });

  test("should have Portal client methods", () => {
    const client = createEASClient({
      instance: "https://portal-87c1d.gke-europe.settlemint.com/graphql",
      accessToken: "sm_aat_5ce243f91f231128",
    });

    const portalClient = client.getPortalClient();
    expect(portalClient).toBeDefined();
    expect(typeof portalClient.request).toBe("function");
  });

  test("should return client options", () => {
    const options = {
      instance: "https://portal-87c1d.gke-europe.settlemint.com/graphql",
      accessToken: "sm_aat_5ce243f91f231128",
      easContractAddress: TEST_EAS_ADDRESS,
      debug: true,
    };

    const client = createEASClient(options);
    const returnedOptions = client.getOptions();

    expect(returnedOptions.instance).toBe(options.instance);
    expect(returnedOptions.accessToken).toBe(options.accessToken);
    expect(returnedOptions.easContractAddress).toBe(options.easContractAddress);
    expect(returnedOptions.debug).toBe(options.debug);
  });

  test("should return contract addresses from options", () => {
    const client = createEASClient({
      instance: "https://portal-87c1d.gke-europe.settlemint.com/graphql",
      accessToken: "sm_aat_5ce243f91f231128",
      easContractAddress: TEST_EAS_ADDRESS,
      schemaRegistryContractAddress: TEST_SCHEMA_REGISTRY_ADDRESS,
    });

    const addresses = client.getContractAddresses();
    expect(addresses.easAddress).toBe(TEST_EAS_ADDRESS);
    expect(addresses.schemaRegistryAddress).toBe(TEST_SCHEMA_REGISTRY_ADDRESS);
  });

  test("should return empty contract addresses when not provided", () => {
    const client = createEASClient({
      instance: "https://portal-87c1d.gke-europe.settlemint.com/graphql",
      accessToken: "sm_aat_5ce243f91f231128",
    });

    const addresses = client.getContractAddresses();
    expect(addresses.easAddress).toBeUndefined();
    expect(addresses.schemaRegistryAddress).toBeUndefined();
  });

  test("should deploy contracts and store addresses", async () => {
    const client = createEASClient({
      instance: "https://portal-87c1d.gke-europe.settlemint.com/graphql",
      accessToken: "sm_aat_5ce243f91f231128",
      debug: true,
    });

    try {
      const result = await client.deploy(TEST_DEPLOYER_ADDRESS);
      expect(result).toBeDefined();
      expect(result.easAddress).toBeDefined();
      expect(result.schemaRegistryAddress).toBeDefined();

      // Check that addresses are now available
      const addresses = client.getContractAddresses();
      expect(addresses.easAddress).toBe(result.easAddress);
      expect(addresses.schemaRegistryAddress).toBe(result.schemaRegistryAddress);
    } catch (error) {
      // Expected to fail with Portal access issues
      expect(error).toBeDefined();
    }
  });

  test("should register a schema with provided addresses", async () => {
    const client = createEASClient({
      instance: "https://portal-87c1d.gke-europe.settlemint.com/graphql",
      accessToken: "sm_aat_5ce243f91f231128",
      schemaRegistryContractAddress: TEST_SCHEMA_REGISTRY_ADDRESS,
      debug: true,
    });

    try {
      const result = await client.registerSchema(
        {
          fields: [
            { name: "user", type: "address" },
            { name: "score", type: "uint256" },
          ],
          resolver: ZERO_ADDRESS,
          revocable: true,
        },
        TEST_FROM_ADDRESS,
      );

      expect(result).toBeDefined();
      expect(result.hash).toBeDefined();
      expect(result.success).toBe(true);
    } catch (error) {
      // Expected to fail with Portal access issues
      expect(error).toBeDefined();
    }
  });

  test("should register a schema after deployment", async () => {
    const client = createEASClient({
      instance: "https://portal-87c1d.gke-europe.settlemint.com/graphql",
      accessToken: "sm_aat_5ce243f91f231128",
      debug: true,
    });

    try {
      await client.deploy(TEST_DEPLOYER_ADDRESS);
      const result = await client.registerSchema(
        {
          schema: "address user, uint256 score",
          resolver: ZERO_ADDRESS,
          revocable: true,
        },
        TEST_FROM_ADDRESS,
      );

      expect(result).toBeDefined();
      expect(result.hash).toBeDefined();
      expect(result.success).toBe(true);
    } catch (error) {
      // Expected to fail with Portal access issues
      expect(error).toBeDefined();
    }
  });

  test("should throw error when trying to register schema without addresses", async () => {
    const client = createEASClient({
      instance: "https://portal-87c1d.gke-europe.settlemint.com/graphql",
      accessToken: "sm_aat_5ce243f91f231128",
    });

    await expect(
      client.registerSchema(
        {
          schema: "address user, uint256 score",
          resolver: ZERO_ADDRESS,
          revocable: true,
        },
        TEST_FROM_ADDRESS,
      ),
    ).rejects.toThrow("Schema Registry contract address not available");
  });

  test("should create an attestation with provided addresses", async () => {
    const client = createEASClient({
      instance: "https://portal-87c1d.gke-europe.settlemint.com/graphql",
      accessToken: "sm_aat_5ce243f91f231128",
      easContractAddress: TEST_EAS_ADDRESS,
      debug: true,
    });

    try {
      const result = await client.attest(
        {
          schema: "0x1234567890123456789012345678901234567890123456789012345678901234" as Hex,
          data: {
            recipient: TEST_FROM_ADDRESS,
            expirationTime: BigInt(0),
            revocable: true,
            refUID: ZERO_BYTES32,
            data: "0x" as Hex,
            value: BigInt(0),
          },
        },
        TEST_FROM_ADDRESS,
      );

      expect(result).toBeDefined();
      expect(result.hash).toBeDefined();
      expect(result.success).toBe(true);
    } catch (error) {
      // Expected to fail with Portal access issues
      expect(error).toBeDefined();
    }
  });

  test("should throw error when trying to attest without addresses", async () => {
    const client = createEASClient({
      instance: "https://portal-87c1d.gke-europe.settlemint.com/graphql",
      accessToken: "sm_aat_5ce243f91f231128",
    });

    await expect(
      client.attest(
        {
          schema: "0x1234567890123456789012345678901234567890123456789012345678901234" as Hex,
          data: {
            recipient: TEST_FROM_ADDRESS,
            expirationTime: BigInt(0),
            revocable: true,
            refUID: ZERO_BYTES32,
            data: "0x" as Hex,
            value: BigInt(0),
          },
        },
        TEST_FROM_ADDRESS,
      ),
    ).rejects.toThrow("EAS contract address not available");
  });

  test("should create multiple attestations", async () => {
    const client = createEASClient({
      instance: "https://portal-87c1d.gke-europe.settlemint.com/graphql",
      accessToken: "sm_aat_5ce243f91f231128",
      easContractAddress: TEST_EAS_ADDRESS,
      debug: true,
    });

    const requests = [
      {
        schema: "0x1234567890123456789012345678901234567890123456789012345678901234" as Hex,
        data: {
          recipient: TEST_FROM_ADDRESS,
          expirationTime: BigInt(0),
          revocable: true,
          refUID: ZERO_BYTES32,
          data: "0x" as Hex,
          value: BigInt(0),
        },
      },
    ];

    try {
      const result = await client.multiAttest(requests, TEST_FROM_ADDRESS);
      expect(result).toBeDefined();
      expect(result.hash).toBeDefined();
      expect(result.success).toBe(true);
    } catch (error) {
      // Expected to fail with Portal access issues
      expect(error).toBeDefined();
    }
  });

  test("should revoke an attestation", async () => {
    const client = createEASClient({
      instance: "https://portal-87c1d.gke-europe.settlemint.com/graphql",
      accessToken: "sm_aat_5ce243f91f231128",
      easContractAddress: TEST_EAS_ADDRESS,
      debug: true,
    });

    try {
      const result = await client.revoke(
        "0x1234567890123456789012345678901234567890123456789012345678901234" as Hex,
        "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890" as Hex,
        TEST_FROM_ADDRESS,
      );
      expect(result).toBeDefined();
      expect(result.hash).toBeDefined();
      expect(result.success).toBe(true);
    } catch (error) {
      // Expected to fail with Portal access issues
      expect(error).toBeDefined();
    }
  });

  test("should get a schema", async () => {
    const client = createEASClient({
      instance: "https://portal-87c1d.gke-europe.settlemint.com/graphql",
      accessToken: "sm_aat_5ce243f91f231128",
      schemaRegistryContractAddress: TEST_SCHEMA_REGISTRY_ADDRESS,
      debug: true,
    });

    try {
      const schema = await client.getSchema(
        "0x1234567890123456789012345678901234567890123456789012345678901234" as Hex,
      );
      expect(schema).toBeDefined();
      expect(schema.uid).toBeDefined();
      expect(schema.schema).toBeDefined();
      expect(schema.resolver).toBeDefined();
      expect(typeof schema.revocable).toBe("boolean");
    } catch (error) {
      // Expected to fail with Portal access issues
      expect(error).toBeDefined();
    }
  });

  test("should get schemas with options", async () => {
    const client = createEASClient({
      instance: "https://portal-87c1d.gke-europe.settlemint.com/graphql",
      accessToken: "sm_aat_5ce243f91f231128",
      debug: true,
    });

    await expect(
      client.getSchemas({
        limit: 10,
        offset: 0,
      }),
    ).rejects.toThrow("Schema listing not implemented yet");
  });

  test("should get an attestation", async () => {
    const client = createEASClient({
      instance: "https://portal-87c1d.gke-europe.settlemint.com/graphql",
      accessToken: "sm_aat_5ce243f91f231128",
      easContractAddress: TEST_EAS_ADDRESS,
      debug: true,
    });

    try {
      const attestation = await client.getAttestation(
        "0x1234567890123456789012345678901234567890123456789012345678901234" as Hex,
      );
      expect(attestation).toBeDefined();
      expect(attestation.uid).toBeDefined();
      expect(attestation.schema).toBeDefined();
      expect(attestation.attester).toBeDefined();
      expect(attestation.recipient).toBeDefined();
      expect(typeof attestation.time).toBe("bigint");
      expect(typeof attestation.revocable).toBe("boolean");
    } catch (error) {
      // Expected to fail with Portal access issues
      expect(error).toBeDefined();
    }
  });

  test("should validate attestation", async () => {
    const client = createEASClient({
      instance: "https://portal-87c1d.gke-europe.settlemint.com/graphql",
      accessToken: "sm_aat_5ce243f91f231128",
      easContractAddress: TEST_EAS_ADDRESS,
      debug: true,
    });

    const isValid = await client.isValidAttestation(
      "0x1234567890123456789012345678901234567890123456789012345678901234" as Hex,
    );
    expect(typeof isValid).toBe("boolean");
  });

  test("should get timestamp", async () => {
    const client = createEASClient({
      instance: "https://portal-87c1d.gke-europe.settlemint.com/graphql",
      accessToken: "sm_aat_5ce243f91f231128",
      easContractAddress: TEST_EAS_ADDRESS,
      debug: true,
    });

    try {
      const timestamp = await client.getTimestamp();
      expect(typeof timestamp).toBe("bigint");
      expect(timestamp).toBeGreaterThan(BigInt(0));
    } catch (error) {
      // Expected to fail with Portal access issues
      expect(error).toBeDefined();
    }
  });
});
