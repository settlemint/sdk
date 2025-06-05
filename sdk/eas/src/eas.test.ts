import { afterAll, beforeAll, describe, expect, mock, test } from "bun:test";
import type { Address, Hex } from "viem";
import { ModuleMocker } from "../../cli/src/utils/test/module-mocker.js";
import { createEASClient } from "./eas.js";

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
    const client = createEASClient(optionsWithAddresses);
    expect(client).toBeDefined();
    expect(typeof client.registerSchema).toBe("function");
    expect(typeof client.getSchema).toBe("function");
    expect(typeof client.attest).toBe("function");
    expect(typeof client.revoke).toBe("function");
    expect(typeof client.deploy).toBe("function");
    expect(typeof client.multiAttest).toBe("function");
    expect(typeof client.getSchemas).toBe("function");
    expect(typeof client.getAttestation).toBe("function");
    expect(typeof client.getAttestations).toBe("function");
    expect(typeof client.isValidAttestation).toBe("function");
    expect(typeof client.getTimestamp).toBe("function");
  });

  test("should create an EAS Portal client without contract addresses", () => {
    const client = createEASClient(optionsWithoutAddresses);
    expect(client).toBeDefined();
    expect(typeof client.deploy).toBe("function");
    expect(typeof client.getContractAddresses).toBe("function");
  });

  test("should have Portal client methods", () => {
    const client = createEASClient(optionsWithAddresses);
    expect(typeof client.getPortalClient).toBe("function");
    expect(typeof client.getOptions).toBe("function");
    expect(typeof client.getContractAddresses).toBe("function");
  });

  test("should return client options", () => {
    const client = createEASClient(optionsWithAddresses);
    const clientOptions = client.getOptions();
    expect(clientOptions.instance).toBe(optionsWithAddresses.instance);
    expect(clientOptions.accessToken).toBe(optionsWithAddresses.accessToken);
    expect(clientOptions.easContractAddress).toBe(optionsWithAddresses.easContractAddress);
    expect(clientOptions.schemaRegistryContractAddress).toBe(optionsWithAddresses.schemaRegistryContractAddress);
  });

  test("should return contract addresses from options", () => {
    const client = createEASClient(optionsWithAddresses);
    const addresses = client.getContractAddresses();
    expect(addresses.easAddress).toBe(optionsWithAddresses.easContractAddress);
    expect(addresses.schemaRegistryAddress).toBe(optionsWithAddresses.schemaRegistryContractAddress);
  });

  test("should return empty contract addresses when not provided", () => {
    const client = createEASClient(optionsWithoutAddresses);
    const addresses = client.getContractAddresses();
    expect(addresses.easAddress).toBeUndefined();
    expect(addresses.schemaRegistryAddress).toBeUndefined();
  });

  test("should deploy contracts and store addresses", async () => {
    const client = createEASClient(optionsWithoutAddresses);
    const result = await client.deploy();

    expect(result.easAddress).toBeDefined();
    expect(result.schemaRegistryAddress).toBeDefined();

    // Check that addresses are now available
    const addresses = client.getContractAddresses();
    expect(addresses.easAddress).toBe(result.easAddress);
    expect(addresses.schemaRegistryAddress).toBe(result.schemaRegistryAddress);
  });

  test("should register a schema with provided addresses", async () => {
    const client = createEASClient(optionsWithAddresses);
    const result = await client.registerSchema({
      fields: [
        { name: "user", type: "address" },
        { name: "score", type: "uint256" },
      ],
      resolver: "0x0000000000000000000000000000000000000000" as Address,
      revocable: true,
    });

    expect(result.success).toBe(true);
    expect(result.hash).toBeDefined();
    expect(result.hash.length).toBe(66); // 0x + 64 hex chars
  });

  test("should register a schema after deployment", async () => {
    const client = createEASClient(optionsWithoutAddresses);

    // Deploy first
    await client.deploy();

    // Then register schema
    const result = await client.registerSchema({
      fields: [
        { name: "user", type: "address" },
        { name: "score", type: "uint256" },
      ],
      resolver: "0x0000000000000000000000000000000000000000" as Address,
      revocable: true,
    });

    expect(result.success).toBe(true);
    expect(result.hash).toBeDefined();
  });

  test("should throw error when trying to register schema without addresses", async () => {
    const client = createEASClient(optionsWithoutAddresses);

    await expect(
      client.registerSchema({
        fields: [
          { name: "user", type: "address" },
          { name: "score", type: "uint256" },
        ],
        resolver: "0x0000000000000000000000000000000000000000" as Address,
        revocable: true,
      }),
    ).rejects.toThrow("Schema Registry contract address not available");
  });

  test("should create an attestation with provided addresses", async () => {
    const client = createEASClient(optionsWithAddresses);
    const result = await client.attest({
      schema: "0x1234567890123456789012345678901234567890123456789012345678901234" as Hex,
      data: {
        recipient: "0x8ba1f109551bD432803012645Hac136c22C177ec" as Address,
        expirationTime: BigInt(0),
        revocable: true,
        refUID: "0x0000000000000000000000000000000000000000000000000000000000000000" as Hex,
        data: "0x" as Hex,
        value: BigInt(0),
      },
    });

    expect(result.success).toBe(true);
    expect(result.hash).toBeDefined();
    expect(result.hash.length).toBe(66);
  });

  test("should throw error when trying to attest without addresses", async () => {
    const client = createEASClient(optionsWithoutAddresses);

    await expect(
      client.attest({
        schema: "0x1234567890123456789012345678901234567890123456789012345678901234" as Hex,
        data: {
          recipient: "0x8ba1f109551bD432803012645Hac136c22C177ec" as Address,
          expirationTime: BigInt(0),
          revocable: true,
          refUID: "0x0000000000000000000000000000000000000000000000000000000000000000" as Hex,
          data: "0x" as Hex,
          value: BigInt(0),
        },
      }),
    ).rejects.toThrow("EAS contract address not available");
  });

  test("should create multiple attestations", async () => {
    const client = createEASClient(optionsWithAddresses);
    const requests = [
      {
        schema: "0x1234567890123456789012345678901234567890123456789012345678901234" as Hex,
        data: {
          recipient: "0x8ba1f109551bD432803012645Hac136c22C177ec" as Address,
          expirationTime: BigInt(0),
          revocable: true,
          refUID: "0x0000000000000000000000000000000000000000000000000000000000000000" as Hex,
          data: "0x" as Hex,
          value: BigInt(0),
        },
      },
    ];

    const result = await client.multiAttest(requests);
    expect(result.success).toBe(true);
    expect(result.hash).toBeDefined();
  });

  test("should revoke an attestation", async () => {
    const client = createEASClient(optionsWithAddresses);
    const result = await client.revoke("0x1234567890123456789012345678901234567890123456789012345678901234" as Hex);

    expect(result.success).toBe(true);
    expect(result.hash).toBeDefined();
  });

  test("should get a schema", async () => {
    const client = createEASClient(optionsWithAddresses);
    const schema = await client.getSchema("0x1234567890123456789012345678901234567890123456789012345678901234" as Hex);

    expect(schema.uid).toBeDefined();
    expect(schema.resolver).toBeDefined();
    expect(schema.schema).toBeDefined();
    expect(typeof schema.revocable).toBe("boolean");
  });

  test("should get schemas with options", async () => {
    const client = createEASClient(optionsWithAddresses);
    const schemas = await client.getSchemas({
      limit: 10,
      offset: 0,
    });

    expect(Array.isArray(schemas)).toBe(true);
    expect(schemas.length).toBeGreaterThan(0);
  });

  test("should get an attestation", async () => {
    const client = createEASClient(optionsWithAddresses);
    const attestation = await client.getAttestation(
      "0x1234567890123456789012345678901234567890123456789012345678901234" as Hex,
    );

    expect(attestation.uid).toBeDefined();
    expect(attestation.schema).toBeDefined();
    expect(attestation.attester).toBeDefined();
    expect(attestation.recipient).toBeDefined();
  });

  test("should validate attestation", async () => {
    const client = createEASClient(optionsWithAddresses);
    const isValid = await client.isValidAttestation(
      "0x1234567890123456789012345678901234567890123456789012345678901234" as Hex,
    );

    expect(typeof isValid).toBe("boolean");
  });

  test("should get timestamp", async () => {
    const client = createEASClient(optionsWithAddresses);
    const timestamp = await client.getTimestamp();

    expect(typeof timestamp).toBe("bigint");
    expect(timestamp).toBeGreaterThan(BigInt(0));
  });
});
