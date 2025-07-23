import { afterAll, beforeAll, describe, expect, mock, test } from "bun:test";
import { type Hex, getAddress } from "viem";
import { ModuleMocker } from "../../cli/src/utils/test/module-mocker.js";
import { ZERO_ADDRESS, ZERO_BYTES32, createEASClient } from "./eas.js";

const moduleMocker = new ModuleMocker();

beforeAll(async () => {
  // Mock the Portal client functions
  await moduleMocker.mock("@settlemint/sdk-portal", () => ({
    createPortalClient: () => ({
      client: {
        request: async (query: string) => {
          // Mock responses based on query type
          if (query.includes("EASSchemaRegistryGetSchema")) {
            return {
              EASSchemaRegistry: {
                getSchema: {
                  uid: "0x1234567890123456789012345678901234567890123456789012345678901234",
                  resolver: "0x0000000000000000000000000000000000000000",
                  revocable: true,
                  schema: "uint256 score, address user",
                },
              },
            };
          }

          if (query.includes("EASGetAttestation")) {
            return {
              EAS: {
                getAttestation: {
                  uid: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
                  schema: "0x1234567890123456789012345678901234567890123456789012345678901234",
                  attester: "0x1111111111111111111111111111111111111111",
                  recipient: "0x2222222222222222222222222222222222222222",
                  time: "1640995200",
                  expirationTime: "0",
                  revocable: true,
                  refUID: "0x0000000000000000000000000000000000000000000000000000000000000000",
                  data: "0x1234",
                  revocationTime: "0",
                },
              },
            };
          }

          if (query.includes("EASIsAttestationValid")) {
            return {
              EAS: {
                isAttestationValid: true,
              },
            };
          }

          if (query.includes("EASGetTimestamp")) {
            return {
              EAS: {
                getTimestamp: "1640995200",
              },
            };
          }

          // Default mutation responses
          return {
            DeployContractEASSchemaRegistry: {
              transactionHash: "0x123",
              contractAddress: "0x456",
            },
            DeployContractEAS: {
              transactionHash: "0xabc",
              contractAddress: "0xdef",
            },
            EASSchemaRegistryRegister: { transactionHash: "0x789" },
            EASAttest: { transactionHash: "0xghi" },
            EASMultiAttest: { transactionHash: "0x मल्टी" },
            EASRevoke: { transactionHash: "0x-rev" },
          };
        },
      },
      graphql: (query: string) => query,
    }),
    waitForTransactionReceipt: async (txHash: Hex) => ({
      receipt: {
        status: "Success",
        events: [],
        contractAddress: txHash.includes("123") ? "0x456" : "0xdef",
      },
    }),
  }));
});

afterAll(() => {
  mock.restore();
  moduleMocker.clear();
});

// Test constants
const TEST_INSTANCE_URL = "https://portal.test.settlemint.com/graphql";
const TEST_ACCESS_TOKEN = "sm_aat_test_access_token";
const TEST_DEPLOYER_ADDRESS = getAddress("0x1111111111111111111111111111111111111111");
const TEST_FROM_ADDRESS = getAddress("0x2222222222222222222222222222222222222222");
const TEST_EAS_ADDRESS = getAddress("0x3333333333333333333333333333333333333333");
const TEST_SCHEMA_REGISTRY_ADDRESS = getAddress("0x4444444444444444444444444444444444444444");
const TEST_SCHEMA_UID = "0x1234567890123456789012345678901234567890123456789012345678901234" as Hex;
const TEST_ATTESTATION_UID = "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890" as Hex;

describe("EAS Portal Client", () => {
  const optionsWithAddresses = {
    instance: TEST_INSTANCE_URL,
    accessToken: TEST_ACCESS_TOKEN,
    easContractAddress: TEST_EAS_ADDRESS,
    schemaRegistryContractAddress: TEST_SCHEMA_REGISTRY_ADDRESS,
    debug: true,
  };

  const optionsWithoutAddresses = {
    instance: TEST_INSTANCE_URL,
    accessToken: TEST_ACCESS_TOKEN,
    debug: true,
  };

  test("should create an EAS Portal client with contract addresses", () => {
    const client = createEASClient(optionsWithAddresses);

    expect(client).toBeDefined();
    expect(typeof client.deploy).toBe("function");
    expect(typeof client.registerSchema).toBe("function");
    expect(typeof client.attest).toBe("function");
    expect(typeof client.getSchema).toBe("function");
    expect(typeof client.getAttestation).toBe("function");
  });

  test("should create an EAS Portal client without contract addresses", () => {
    const client = createEASClient(optionsWithoutAddresses);

    expect(client).toBeDefined();
    expect(typeof client.deploy).toBe("function");
    expect(typeof client.registerSchema).toBe("function");
    expect(typeof client.attest).toBe("function");
  });

  test("should have Portal client methods", () => {
    const client = createEASClient(optionsWithoutAddresses);

    const portalClient = client.getPortalClient();
    expect(portalClient).toBeDefined();
    expect(typeof portalClient.request).toBe("function");
  });

  test("should return client options", () => {
    const client = createEASClient(optionsWithAddresses);
    const returnedOptions = client.getOptions();

    expect(returnedOptions.instance).toBe(optionsWithAddresses.instance);
    expect(returnedOptions.accessToken).toBe(optionsWithAddresses.accessToken);
    expect(returnedOptions.easContractAddress).toBe(optionsWithAddresses.easContractAddress);
    expect(returnedOptions.debug).toBe(optionsWithAddresses.debug);
  });

  test("should return contract addresses from options", () => {
    const client = createEASClient(optionsWithAddresses);

    const addresses = client.getContractAddresses();
    expect(addresses.easAddress).toBe(TEST_EAS_ADDRESS);
    expect(addresses.schemaRegistryAddress).toBe(TEST_SCHEMA_REGISTRY_ADDRESS);
  });

  test("should return empty contract addresses when not provided", () => {
    const client = createEASClient(optionsWithoutAddresses);

    const addresses = client.getContractAddresses();
    expect(addresses.easAddress).toBeUndefined();
    expect(addresses.schemaRegistryAddress).toBeUndefined();
  });

  test("should deploy contracts and store addresses", async () => {
    const client = createEASClient(optionsWithoutAddresses);
    const result = await client.deploy(TEST_DEPLOYER_ADDRESS);

    expect(result).toBeDefined();
    expect(result.easAddress).toBeDefined();
    expect(result.schemaRegistryAddress).toBeDefined();

    // Check that addresses are now available
    const addresses = client.getContractAddresses();
    expect(addresses.easAddress).toBe(result.easAddress);
    expect(addresses.schemaRegistryAddress).toBe(result.schemaRegistryAddress);
  });

  test("should register a schema with provided addresses", async () => {
    const client = createEASClient(optionsWithAddresses);

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
  });

  test("should register a schema after deployment", async () => {
    const client = createEASClient(optionsWithoutAddresses);

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
  });

  test("should throw error when trying to register schema without addresses", async () => {
    const client = createEASClient(optionsWithoutAddresses);

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
    const client = createEASClient(optionsWithAddresses);

    const result = await client.attest(
      {
        schema: TEST_SCHEMA_UID,
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
  });

  test("should throw error when trying to attest without addresses", async () => {
    const client = createEASClient(optionsWithoutAddresses);

    await expect(
      client.attest(
        {
          schema: TEST_SCHEMA_UID,
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
    const client = createEASClient(optionsWithAddresses);

    const requests = [
      {
        schema: TEST_SCHEMA_UID,
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

    const result = await client.multiAttest(requests, TEST_FROM_ADDRESS);
    expect(result).toBeDefined();
    expect(result.hash).toBeDefined();
    expect(result.success).toBe(true);
  });

  test("should revoke an attestation", async () => {
    const client = createEASClient(optionsWithAddresses);

    const result = await client.revoke(TEST_SCHEMA_UID, TEST_ATTESTATION_UID, TEST_FROM_ADDRESS);
    expect(result).toBeDefined();
    expect(result.hash).toBeDefined();
    expect(result.success).toBe(true);
  });

  test("should get a schema by UID", async () => {
    const client = createEASClient(optionsWithAddresses);

    const schema = await client.getSchema(TEST_SCHEMA_UID);

    expect(schema).toBeDefined();
    expect(schema.uid).toBe("0x1234567890123456789012345678901234567890123456789012345678901234");
    expect(schema.resolver).toBe("0x0000000000000000000000000000000000000000");
    expect(schema.revocable).toBe(true);
    expect(schema.schema).toBe("uint256 score, address user");
  });

  test("should get an attestation by UID", async () => {
    const client = createEASClient(optionsWithAddresses);

    const attestation = await client.getAttestation(TEST_ATTESTATION_UID);

    expect(attestation).toBeDefined();
    expect(attestation.uid).toBe("0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890");
    expect(attestation.schema).toBe("0x1234567890123456789012345678901234567890123456789012345678901234");
    expect(attestation.attester).toBe("0x1111111111111111111111111111111111111111");
    expect(attestation.recipient).toBe("0x2222222222222222222222222222222222222222");
    expect(attestation.time).toBe(BigInt(1640995200));
    expect(attestation.expirationTime).toBe(BigInt(0));
    expect(attestation.revocable).toBe(true);
    expect(attestation.refUID).toBe("0x0000000000000000000000000000000000000000000000000000000000000000");
    expect(attestation.data).toBe("0x1234");
  });

  test("should check if attestation is valid", async () => {
    const client = createEASClient(optionsWithAddresses);

    const isValid = await client.isValidAttestation(TEST_ATTESTATION_UID);

    expect(isValid).toBe(true);
  });

  test("should get timestamp for data", async () => {
    const client = createEASClient(optionsWithAddresses);

    const timestamp = await client.getTimestamp("0x1234" as Hex);

    expect(timestamp).toBe(BigInt(1640995200));
  });

  test("should throw error on bulk query methods", async () => {
    const client = createEASClient(optionsWithAddresses);

    await expect(client.getSchemas()).rejects.toThrow(
      "Schema listing not implemented yet. Portal's direct contract queries don't support listing all schemas",
    );
    await expect(client.getAttestations()).rejects.toThrow(
      "Attestation listing not implemented yet. Portal's direct contract queries don't support listing all attestations",
    );
  });

  test("should throw error when trying to query without contract addresses", async () => {
    const client = createEASClient(optionsWithoutAddresses);

    await expect(client.getSchema(TEST_SCHEMA_UID)).rejects.toThrow("Schema Registry contract address not available");
    await expect(client.getAttestation(TEST_ATTESTATION_UID)).rejects.toThrow("EAS contract address not available");
    await expect(client.isValidAttestation(TEST_ATTESTATION_UID)).rejects.toThrow("EAS contract address not available");
    await expect(client.getTimestamp("0x1234" as Hex)).rejects.toThrow("EAS contract address not available");
  });
});
