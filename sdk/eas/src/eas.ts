import { createPortalClient } from "@settlemint/sdk-portal";
import type { Address, Hex } from "viem";
import { GraphQLOperations } from "./graphql/operations.js";
import { ZERO_ADDRESS } from "./types.js";
import type {
  AttestationInfo,
  AttestationRequest,
  DeploymentResult,
  EASClientOptions,
  GetAttestationsOptions,
  GetSchemasOptions,
  PortalTransactionResponse,
  SchemaData,
  SchemaField,
  SchemaRequest,
  TransactionResult,
} from "./types.js";

/**
 * Main EAS client class for interacting with Ethereum Attestation Service via Portal
 */
export class EASClient {
  private options: EASClientOptions;
  private portalClient: ReturnType<typeof createPortalClient>["client"];
  private deployedAddresses?: DeploymentResult;

  constructor(options: EASClientOptions) {
    this.options = options;

    const portalClientResult = createPortalClient({
      instance: options.instance,
      accessToken: options.accessToken,
    });

    this.portalClient = portalClientResult.client;
  }

  /**
   * Deploy EAS contracts via Portal
   */
  async deploy(deployerAddress: Address, forwarderAddress?: Address, gasLimit?: string): Promise<DeploymentResult> {
    const defaultForwarder = forwarderAddress || ZERO_ADDRESS;
    const defaultGasLimit = gasLimit || "0x7a1200";

    try {
      // Deploy Schema Registry first
      const schemaRegistryResult = await this.portalClient.request(GraphQLOperations.mutations.deploySchemaRegistry, {
        from: deployerAddress,
        constructorArguments: {
          forwarder: defaultForwarder,
        },
        gasLimit: defaultGasLimit,
      });

      const schemaRegistryResponse = schemaRegistryResult as {
        DeployContractEASSchemaRegistry?: { transactionHash?: string };
      };

      if (!schemaRegistryResponse.DeployContractEASSchemaRegistry?.transactionHash) {
        throw new Error("Schema Registry deployment failed - no transaction hash returned");
      }

      const schemaRegistryTxHash = schemaRegistryResponse.DeployContractEASSchemaRegistry.transactionHash;

      // Wait for Schema Registry deployment and get contract address
      let schemaRegistryAddress: Address | null = null;
      let attempts = 0;
      const maxAttempts = 30;

      while (!schemaRegistryAddress && attempts < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        attempts++;

        try {
          const contractsResult = await this.portalClient.request(
            "query GetSchemaRegistryContracts { getContractsEasSchemaRegistry { records { address } } }",
          );

          const contractsResponse = contractsResult as {
            getContractsEasSchemaRegistry?: { records: Array<{ address: string }> };
          };

          const contracts = contractsResponse.getContractsEasSchemaRegistry?.records || [];
          if (contracts.length > 0) {
            schemaRegistryAddress = contracts[contracts.length - 1]?.address as Address;
            break;
          }
        } catch (error) {
          // Continue waiting
        }
      }

      if (!schemaRegistryAddress) {
        throw new Error("Schema Registry deployment timed out - could not get contract address");
      }

      // Deploy EAS contract with correct Schema Registry address
      const easResult = await this.portalClient.request(GraphQLOperations.mutations.deployEAS, {
        from: deployerAddress,
        constructorArguments: {
          registry: schemaRegistryAddress,
          forwarder: defaultForwarder,
        },
        gasLimit: defaultGasLimit,
      });

      const easResponse = easResult as {
        DeployContractEAS?: { transactionHash?: string };
      };

      if (!easResponse.DeployContractEAS?.transactionHash) {
        throw new Error("EAS deployment failed - no transaction hash returned");
      }

      const easTxHash = easResponse.DeployContractEAS.transactionHash;

      // Wait for EAS deployment and get contract address
      let easAddress: Address | null = null;
      attempts = 0;

      while (!easAddress && attempts < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        attempts++;

        try {
          const contractsResult = await this.portalClient.request(
            "query GetEASContracts { getContractsEas { records { address } } }",
          );

          const contractsResponse = contractsResult as {
            getContractsEas?: { records: Array<{ address: string }> };
          };

          const contracts = contractsResponse.getContractsEas?.records || [];
          if (contracts.length > 0) {
            easAddress = contracts[contracts.length - 1]?.address as Address;
            break;
          }
        } catch (error) {
          // Continue waiting
        }
      }

      if (!easAddress) {
        throw new Error("EAS deployment timed out - could not get contract address");
      }

      this.deployedAddresses = {
        easAddress,
        schemaRegistryAddress,
        easTransactionHash: easTxHash as Hex,
        schemaRegistryTransactionHash: schemaRegistryTxHash as Hex,
      };

      return this.deployedAddresses;
    } catch (error) {
      throw new Error(`Failed to deploy EAS contracts: ${error}`);
    }
  }

  /**
   * Register a new schema in the EAS Schema Registry
   */
  async registerSchema(request: SchemaRequest, fromAddress: Address, gasLimit?: string): Promise<TransactionResult> {
    const schemaRegistryAddress = this.getSchemaRegistryAddress();

    let schemaString = request.schema;
    if (request.fields && !schemaString) {
      schemaString = this.buildSchemaString(request.fields);
    }

    if (!schemaString) {
      throw new Error("Schema string is required. Provide either 'schema' or 'fields'.");
    }

    try {
      const result = await this.portalClient.request(GraphQLOperations.mutations.registerSchema, {
        address: schemaRegistryAddress,
        from: fromAddress,
        input: {
          schema: schemaString,
          resolver: request.resolver,
          revocable: request.revocable,
        },
        gasLimit: gasLimit || "0x3d0900",
      });

      const response = result as { EASSchemaRegistryRegister?: PortalTransactionResponse };
      const transactionHash = response.EASSchemaRegistryRegister?.transactionHash;

      if (!transactionHash) {
        throw new Error("No transaction hash returned from Portal");
      }

      return {
        hash: transactionHash as Hex,
        success: true,
      };
    } catch (error) {
      throw new Error(`Failed to register schema: ${error}`);
    }
  }

  /**
   * Create an attestation
   */
  async attest(request: AttestationRequest, fromAddress: Address, gasLimit?: string): Promise<TransactionResult> {
    const easAddress = this.getEASAddress();

    try {
      const result = await this.portalClient.request(GraphQLOperations.mutations.attest, {
        address: easAddress,
        from: fromAddress,
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
        },
        gasLimit: gasLimit || "0x3d0900",
      });

      const response = result as { EASAttest?: PortalTransactionResponse };
      const transactionHash = response.EASAttest?.transactionHash;

      if (!transactionHash) {
        throw new Error("No transaction hash returned from Portal");
      }

      return {
        hash: transactionHash as Hex,
        success: true,
      };
    } catch (error) {
      throw new Error(`Failed to create attestation: ${error}`);
    }
  }

  /**
   * Create multiple attestations in a single transaction
   */
  async multiAttest(
    requests: AttestationRequest[],
    fromAddress: Address,
    gasLimit?: string,
  ): Promise<TransactionResult> {
    if (requests.length === 0) {
      throw new Error("At least one attestation request is required");
    }

    const easAddress = this.getEASAddress();

    try {
      const result = await this.portalClient.request(GraphQLOperations.mutations.multiAttest, {
        address: easAddress,
        from: fromAddress,
        input: {
          multiRequests: requests.map((request) => ({
            schema: request.schema,
            data: [
              {
                recipient: request.data.recipient,
                expirationTime: request.data.expirationTime.toString(),
                revocable: request.data.revocable,
                refUID: request.data.refUID,
                data: request.data.data,
                value: request.data.value.toString(),
              },
            ],
          })),
        },
        gasLimit: gasLimit || "0x3d0900",
      });

      const response = result as { EASMultiAttest?: PortalTransactionResponse };
      const transactionHash = response.EASMultiAttest?.transactionHash;

      if (!transactionHash) {
        throw new Error("No transaction hash returned from Portal");
      }

      return {
        hash: transactionHash as Hex,
        success: true,
      };
    } catch (error) {
      throw new Error(`Failed to create multiple attestations: ${error}`);
    }
  }

  /**
   * Revoke an attestation
   */
  async revoke(uid: Hex, fromAddress: Address, value?: bigint, gasLimit?: string): Promise<TransactionResult> {
    const easAddress = this.getEASAddress();

    try {
      const result = await this.portalClient.request(GraphQLOperations.mutations.revoke, {
        address: easAddress,
        from: fromAddress,
        input: {
          request: {
            schema: uid,
            data: {
              uid: uid,
              value: (value || BigInt(0)).toString(),
            },
          },
        },
        gasLimit: gasLimit || "0x3d0900",
      });

      const response = result as { EASRevoke?: PortalTransactionResponse };
      const transactionHash = response.EASRevoke?.transactionHash;

      if (!transactionHash) {
        throw new Error("No transaction hash returned from Portal");
      }

      return {
        hash: transactionHash as Hex,
        success: true,
      };
    } catch (error) {
      throw new Error(`Failed to revoke attestation: ${error}`);
    }
  }

  /**
   * Get a schema by UID
   *
   * TODO: Implement using The Graph subgraph for EAS data queries
   */
  async getSchema(uid: Hex): Promise<SchemaData> {
    throw new Error(
      `Schema queries not implemented yet. Use The Graph subgraph for reading schema data. Schema UID: ${uid}`,
    );
  }

  /**
   * Get all schemas with pagination
   *
   * TODO: Implement using The Graph subgraph for EAS data queries
   */
  async getSchemas(options?: GetSchemasOptions): Promise<SchemaData[]> {
    throw new Error("Schema listing not implemented yet. Use The Graph subgraph for reading schema data.");
  }

  /**
   * Get an attestation by UID
   *
   * TODO: Implement using The Graph subgraph for EAS data queries
   */
  async getAttestation(uid: Hex): Promise<AttestationInfo> {
    throw new Error(
      `Attestation queries not implemented yet. Use The Graph subgraph for reading attestation data. Attestation UID: ${uid}`,
    );
  }

  /**
   * Get attestations with pagination and filtering
   *
   * TODO: Implement using The Graph subgraph for EAS data queries
   */
  async getAttestations(options?: GetAttestationsOptions): Promise<AttestationInfo[]> {
    throw new Error("Attestation listing not implemented yet. Use The Graph subgraph for reading attestation data.");
  }

  /**
   * Check if an attestation is valid
   *
   * TODO: Implement using The Graph subgraph for EAS data queries
   */
  async isValidAttestation(uid: Hex): Promise<boolean> {
    return false;
  }

  /**
   * Get the current timestamp from the contract
   *
   * TODO: Fix Portal GraphQL query parameter encoding or use The Graph subgraph
   */
  async getTimestamp(): Promise<bigint> {
    throw new Error("Timestamp query not implemented yet. Fix Portal query parameters or use The Graph subgraph.");
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
  getPortalClient(): ReturnType<typeof createPortalClient>["client"] {
    return this.portalClient;
  }

  /**
   * Get current contract addresses
   */
  getContractAddresses(): { easAddress?: Address; schemaRegistryAddress?: Address } {
    return {
      easAddress: this.options.easContractAddress || this.deployedAddresses?.easAddress,
      schemaRegistryAddress:
        this.options.schemaRegistryContractAddress || this.deployedAddresses?.schemaRegistryAddress,
    };
  }

  private getEASAddress(): Address {
    if (this.options.easContractAddress) {
      return this.options.easContractAddress;
    }
    if (this.deployedAddresses?.easAddress) {
      return this.deployedAddresses.easAddress;
    }
    throw new Error("EAS contract address not available. Please provide it in options or deploy contracts first.");
  }

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

export { EAS_FIELD_TYPES, ZERO_ADDRESS, ZERO_BYTES32 } from "./types.js";

// Re-export validation utilities
export { validateSchemaFields, buildSchemaString } from "./utils/validation.js";

// Re-export GraphQL operations for advanced usage
export { GraphQLOperations } from "./graphql/operations.js";
