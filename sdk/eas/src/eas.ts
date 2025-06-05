import { createPortalClient } from "@settlemint/sdk-portal";
import type { GraphQLClient } from "graphql-request";
import type { Address, Hex } from "viem";
import type {
  AttestationInfo,
  AttestationRequest,
  DeploymentResult,
  EASClientOptions,
  GetAttestationsOptions,
  GetSchemasOptions,
  SchemaData,
  SchemaField,
  SchemaRequest,
  TransactionResult,
} from "./types.js";

/**
 * Main EAS client class
 */
export class EASClient {
  private options: EASClientOptions;
  private portalClient: GraphQLClient;
  private deployedAddresses?: DeploymentResult;

  constructor(options: EASClientOptions) {
    this.options = options;

    // Initialize Portal client
    const { client } = createPortalClient({
      instance: options.instance,
      accessToken: options.accessToken,
    });
    this.portalClient = client;

    if (options.debug) {
      console.log("EAS client initialized with Portal SDK");
    }
  }

  /**
   * Deploy EAS contracts (if needed)
   */
  async deploy(): Promise<DeploymentResult> {
    if (this.options.debug) {
      console.log("Deploying EAS contracts via Portal...");
    }

    // Mock GraphQL mutation for contract deployment
    const deployMutation = `
      mutation DeployEASContracts($input: DeployEASContractsInput!) {
        DeployContract(input: $input) {
          transactionHash
          contractAddress
        }
      }
    `;

    try {
      // Mock implementation - replace with actual Portal call later
      const mockResult = await this.mockPortalCall(deployMutation, {
        input: {
          contractType: "EAS",
          network: "optimism-sepolia",
        },
      });

      // Store deployed addresses
      this.deployedAddresses = {
        easAddress: "0xd46081aeEC4Ee8DB98eBDd9E066B5B9b151A2096" as Address,
        schemaRegistryAddress: "0x5EFfB599d6DebD7cf576fb94F4C086b2bCC917b6" as Address,
      };

      return this.deployedAddresses;
    } catch (error) {
      throw new Error(`Failed to deploy EAS contracts: ${error}`);
    }
  }

  /**
   * Get the EAS contract address (from options or deployment)
   */
  private getEASAddress(): Address {
    if (this.options.easContractAddress) {
      return this.options.easContractAddress;
    }
    if (this.deployedAddresses?.easAddress) {
      return this.deployedAddresses.easAddress;
    }
    throw new Error("EAS contract address not available. Please provide it in options or deploy contracts first.");
  }

  /**
   * Get the Schema Registry contract address (from options or deployment)
   */
  private getSchemaRegistryAddress(): Address {
    if (this.options.schemaRegistryContractAddress) {
      return this.options.schemaRegistryContractAddress;
    }
    if (this.deployedAddresses?.schemaRegistryAddress) {
      return this.deployedAddresses.schemaRegistryAddress;
    }
    throw new Error(
      "Schema Registry contract address not available. Please provide it in options or deploy contracts first.",
    );
  }

  /**
   * Register a new schema
   */
  async registerSchema(request: SchemaRequest): Promise<TransactionResult> {
    if (this.options.debug) {
      console.log("Registering schema via Portal...", request);
    }

    // Ensure we have the schema registry address
    const schemaRegistryAddress = this.getSchemaRegistryAddress();

    // Build schema string if fields provided
    let schemaString = request.schema;
    if (request.fields && !schemaString) {
      schemaString = this.buildSchemaString(request.fields);
    }

    // Mock GraphQL mutation for schema registration
    const registerSchemaMutation = `
      mutation EasSchemaRegistryRegister($input: EasSchemaRegistryRegisterInput!) {
        EasSchemaRegistryRegister(input: $input) {
          transactionHash
        }
      }
    `;

    try {
      // Mock implementation - replace with actual Portal call later
      const result = await this.mockPortalCall(registerSchemaMutation, {
        input: {
          schema: schemaString,
          resolver: request.resolver,
          revocable: request.revocable,
          contractAddress: schemaRegistryAddress,
        },
      });

      return {
        hash: "0x1234567890123456789012345678901234567890123456789012345678901234" as Hex,
        success: true,
      };
    } catch (error) {
      throw new Error(`Failed to register schema: ${error}`);
    }
  }

  /**
   * Create an attestation
   */
  async attest(request: AttestationRequest): Promise<TransactionResult> {
    if (this.options.debug) {
      console.log("Creating attestation via Portal...", request);
    }

    // Ensure we have the EAS contract address
    const easAddress = this.getEASAddress();

    // Mock GraphQL mutation for attestation
    const attestMutation = `
      mutation EasDeploymentAttest($input: EasDeploymentAttestInput!) {
        EasDeploymentAttest(input: $input) {
          transactionHash
        }
      }
    `;

    try {
      // Mock implementation - replace with actual Portal call later
      const result = await this.mockPortalCall(attestMutation, {
        input: {
          request: {
            schema: request.schema,
            data: {
              recipient: request.data.recipient,
              expirationTime: request.data.expirationTime.toString(),
              revocable: request.data.revocable,
              refUID: request.data.refUID,
              data: request.data.data,
              value: request.data.value.toString(),
            },
          },
          contractAddress: easAddress,
        },
      });

      return {
        hash: "0xabcd567890123456789012345678901234567890123456789012345678901234" as Hex,
        success: true,
      };
    } catch (error) {
      throw new Error(`Failed to create attestation: ${error}`);
    }
  }

  /**
   * Create multiple attestations
   */
  async multiAttest(requests: AttestationRequest[]): Promise<TransactionResult> {
    if (this.options.debug) {
      console.log("Creating multiple attestations via Portal...", requests.length);
    }

    // Ensure we have the EAS contract address
    const easAddress = this.getEASAddress();

    // Mock GraphQL mutation for multi-attestation
    const multiAttestMutation = `
      mutation EasDeploymentMultiAttest($input: EasDeploymentMultiAttestInput!) {
        EasDeploymentMultiAttest(input: $input) {
          transactionHash
        }
      }
    `;

    try {
      // Mock implementation - replace with actual Portal call later
      const result = await this.mockPortalCall(multiAttestMutation, {
        input: {
          multiRequests: requests.map((request) => ({
            schema: request.schema,
            data: {
              recipient: request.data.recipient,
              expirationTime: request.data.expirationTime.toString(),
              revocable: request.data.revocable,
              refUID: request.data.refUID,
              data: request.data.data,
              value: request.data.value.toString(),
            },
          })),
          contractAddress: easAddress,
        },
      });

      return {
        hash: "0xefgh567890123456789012345678901234567890123456789012345678901234" as Hex,
        success: true,
      };
    } catch (error) {
      throw new Error(`Failed to create multiple attestations: ${error}`);
    }
  }

  /**
   * Revoke an attestation
   */
  async revoke(uid: Hex, value?: bigint): Promise<TransactionResult> {
    if (this.options.debug) {
      console.log("Revoking attestation via Portal...", uid);
    }

    // Ensure we have the EAS contract address
    const easAddress = this.getEASAddress();

    // Mock GraphQL mutation for revocation
    const revokeMutation = `
      mutation EasDeploymentRevoke($input: EasDeploymentRevokeInput!) {
        EasDeploymentRevoke(input: $input) {
          transactionHash
        }
      }
    `;

    try {
      // Mock implementation - replace with actual Portal call later
      const result = await this.mockPortalCall(revokeMutation, {
        input: {
          request: {
            schema: uid, // Schema context for revocation
            data: {
              uid: uid,
              value: (value || BigInt(0)).toString(),
            },
          },
          contractAddress: easAddress,
        },
      });

      return {
        hash: "0x9876543210987654321098765432109876543210987654321098765432109876" as Hex,
        success: true,
      };
    } catch (error) {
      throw new Error(`Failed to revoke attestation: ${error}`);
    }
  }

  /**
   * Get a schema by UID
   */
  async getSchema(uid: Hex): Promise<SchemaData> {
    if (this.options.debug) {
      console.log("Retrieving schema via Portal...", uid);
    }

    // Mock GraphQL query for schema retrieval
    const getSchemaQuery = `
      query GetSchema($uid: String!) {
        getSchema(uid: $uid) {
          uid
          resolver
          revocable
          schema
        }
      }
    `;

    try {
      // Mock implementation - replace with actual Portal call later
      const result = await this.mockPortalCall(getSchemaQuery, { uid });

      return {
        uid,
        resolver: "0x0000000000000000000000000000000000000000" as Address,
        revocable: true,
        schema: "address user, uint256 score, string category, uint256 timestamp, bool verified",
      };
    } catch (error) {
      throw new Error(`Failed to get schema: ${error}`);
    }
  }

  /**
   * Get all schemas (paginated)
   */
  async getSchemas(options?: GetSchemasOptions): Promise<SchemaData[]> {
    if (this.options.debug) {
      console.log("Retrieving schemas via Portal...", options);
    }

    // Mock GraphQL query for schemas retrieval
    const getSchemasQuery = `
      query GetSchemas($limit: Int, $offset: Int, $resolver: String) {
        getSchemas(limit: $limit, offset: $offset, resolver: $resolver) {
          uid
          resolver
          revocable
          schema
        }
      }
    `;

    try {
      // Mock implementation - replace with actual Portal call later
      const result = await this.mockPortalCall(getSchemasQuery, options);

      return [
        {
          uid: "0x1234567890123456789012345678901234567890123456789012345678901234" as Hex,
          resolver: "0x0000000000000000000000000000000000000000" as Address,
          revocable: true,
          schema: "address user, uint256 score",
        },
        {
          uid: "0x5678901234567890123456789012345678901234567890123456789012345678" as Hex,
          resolver: "0x0000000000000000000000000000000000000000" as Address,
          revocable: false,
          schema: "string name, bool verified",
        },
      ];
    } catch (error) {
      throw new Error(`Failed to get schemas: ${error}`);
    }
  }

  /**
   * Get an attestation by UID
   */
  async getAttestation(uid: Hex): Promise<AttestationInfo> {
    if (this.options.debug) {
      console.log("Retrieving attestation via Portal...", uid);
    }

    // Mock GraphQL query for attestation retrieval
    const getAttestationQuery = `
      query GetAttestation($uid: String!) {
        getAttestation(uid: $uid) {
          uid
          schema
          attester
          recipient
          time
          expirationTime
          revocable
          refUID
          data
          value
        }
      }
    `;

    try {
      // Mock implementation - replace with actual Portal call later
      const result = await this.mockPortalCall(getAttestationQuery, { uid });

      return {
        uid,
        schema: "0x1234567890123456789012345678901234567890123456789012345678901234" as Hex,
        attester: "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6" as Address,
        recipient: "0x8ba1f109551bD432803012645Hac136c22C177ec" as Address,
        time: BigInt(Math.floor(Date.now() / 1000)),
        expirationTime: BigInt(0),
        revocable: true,
        refUID: "0x0000000000000000000000000000000000000000000000000000000000000000" as Hex,
        data: "0x" as Hex,
        value: BigInt(0),
      };
    } catch (error) {
      throw new Error(`Failed to get attestation: ${error}`);
    }
  }

  /**
   * Get attestations (paginated)
   */
  async getAttestations(options?: GetAttestationsOptions): Promise<AttestationInfo[]> {
    if (this.options.debug) {
      console.log("Retrieving attestations via Portal...", options);
    }

    // Mock GraphQL query for attestations retrieval
    const getAttestationsQuery = `
      query GetAttestations($limit: Int, $offset: Int, $schema: String, $attester: String, $recipient: String) {
        getAttestations(limit: $limit, offset: $offset, schema: $schema, attester: $attester, recipient: $recipient) {
          uid
          schema
          attester
          recipient
          time
          expirationTime
          revocable
          refUID
          data
          value
        }
      }
    `;

    try {
      // Mock implementation - replace with actual Portal call later
      const result = await this.mockPortalCall(getAttestationsQuery, options);

      return [
        {
          uid: "0xabcd567890123456789012345678901234567890123456789012345678901234" as Hex,
          schema: "0x1234567890123456789012345678901234567890123456789012345678901234" as Hex,
          attester: "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6" as Address,
          recipient: "0x8ba1f109551bD432803012645Hac136c22C177ec" as Address,
          time: BigInt(Math.floor(Date.now() / 1000)),
          expirationTime: BigInt(0),
          revocable: true,
          refUID: "0x0000000000000000000000000000000000000000000000000000000000000000" as Hex,
          data: "0x" as Hex,
          value: BigInt(0),
        },
      ];
    } catch (error) {
      throw new Error(`Failed to get attestations: ${error}`);
    }
  }

  /**
   * Check if an attestation is valid
   */
  async isValidAttestation(uid: Hex): Promise<boolean> {
    if (this.options.debug) {
      console.log("Checking attestation validity via Portal...", uid);
    }

    // Mock GraphQL query for attestation validation
    const isValidQuery = `
      query IsValidAttestation($uid: String!) {
        isValidAttestation(uid: $uid)
      }
    `;

    try {
      // Mock implementation - replace with actual Portal call later
      const result = await this.mockPortalCall(isValidQuery, { uid });
      return true; // Mock: always valid
    } catch (error) {
      if (this.options.debug) {
        console.warn(`Failed to check attestation validity: ${error}`);
      }
      return false;
    }
  }

  /**
   * Get the current timestamp from the contract
   */
  async getTimestamp(): Promise<bigint> {
    if (this.options.debug) {
      console.log("Getting timestamp via Portal...");
    }

    // Mock GraphQL query for timestamp
    const getTimestampQuery = `
      query GetTimestamp {
        getTimestamp
      }
    `;

    try {
      // Mock implementation - replace with actual Portal call later
      const result = await this.mockPortalCall(getTimestampQuery, {});
      return BigInt(Math.floor(Date.now() / 1000));
    } catch (error) {
      throw new Error(`Failed to get timestamp: ${error}`);
    }
  }

  /**
   * Get client configuration
   */
  getOptions(): EASClientOptions {
    return { ...this.options };
  }

  /**
   * Get the Portal client instance for advanced operations
   */
  getPortalClient(): GraphQLClient {
    return this.portalClient;
  }

  /**
   * Get current contract addresses (from options or deployment)
   */
  getContractAddresses(): { easAddress?: Address; schemaRegistryAddress?: Address } {
    return {
      easAddress: this.options.easContractAddress || this.deployedAddresses?.easAddress,
      schemaRegistryAddress:
        this.options.schemaRegistryContractAddress || this.deployedAddresses?.schemaRegistryAddress,
    };
  }

  /**
   * Mock Portal GraphQL call - replace with actual implementation later
   * This provides a clean way to add real Portal calls
   */
  private async mockPortalCall(query: string, variables?: Record<string, unknown>): Promise<unknown> {
    if (this.options.debug) {
      console.log("Mock Portal call:", { query: query.split("\n")[1]?.trim(), variables });
    }

    // TODO: Replace with actual Portal client call
    // return await this.portalClient.request(query, variables);

    // For now, simulate a successful response
    await new Promise((resolve) => setTimeout(resolve, 100)); // Simulate network delay
    return { success: true };
  }

  /**
   * Build schema string from fields - utility method
   */
  private buildSchemaString(fields: SchemaField[]): string {
    return fields.map((field) => `${field.type} ${field.name}`).join(", ");
  }
}

/**
 * Create a new EAS client instance
 */
export function createEASClient(options: EASClientOptions): EASClient {
  return new EASClient(options);
}

// Re-export types and constants
export type {
  SchemaField,
  EASFieldType,
  EASClientOptions,
  SchemaRequest,
  AttestationData,
  AttestationRequest,
  TransactionResult,
  SchemaData,
  AttestationInfo,
  GetSchemasOptions,
  GetAttestationsOptions,
  DeploymentResult,
  RegisterSchemaOptions,
} from "./types.js";

export { EAS_FIELD_TYPES } from "./types.js";

// Re-export validation utilities
export { validateSchemaFields, buildSchemaString } from "./utils/validation.js";
