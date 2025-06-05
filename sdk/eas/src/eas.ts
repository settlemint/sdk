import { createPortalClient } from "@settlemint/sdk-portal";
import type { Address, Hex } from "viem";
import { GraphQLOperations } from "./graphql/operations.js";
import { ZERO_ADDRESS, ZERO_BYTES32 } from "./types.js";
import type {
  AttestationInfo,
  AttestationRequest,
  DeploymentResult,
  EASClientOptions,
  GetAttestationsOptions,
  GetSchemasOptions,
  PortalAttestationResponse,
  PortalContractsResponse,
  PortalSchemaResponse,
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

    if (options.debug) {
      console.log("EAS client initialized with Portal SDK");
    }
  }

  /**
   * Deploy EAS contracts via Portal
   * @param deployerAddress - Address to deploy contracts from
   * @param forwarderAddress - Optional forwarder address for meta-transactions (defaults to zero address)
   * @param gasLimit - Optional gas limit for deployment transactions
   */
  async deploy(deployerAddress: Address, forwarderAddress?: Address, gasLimit?: string): Promise<DeploymentResult> {
    if (this.options.debug) {
      console.log("Deploying EAS contracts via Portal...");
    }

    const defaultForwarder = forwarderAddress || ZERO_ADDRESS;
    const defaultGasLimit = gasLimit || "0x3d0900";

    try {
      const schemaRegistryResult = await this.portalClient.request(GraphQLOperations.mutations.deploySchemaRegistry, {
        from: deployerAddress,
        constructorArguments: {
          forwarder: defaultForwarder,
        },
        gasLimit: defaultGasLimit,
      });

      const schemaRegistryResponse = schemaRegistryResult as {
        DeployContractEASSchemaRegistry?: { transactionHash?: string; contractAddress?: string };
      };

      if (!schemaRegistryResponse.DeployContractEASSchemaRegistry?.contractAddress) {
        throw new Error("Schema Registry deployment failed - no contract address returned");
      }

      const schemaRegistryAddress = schemaRegistryResponse.DeployContractEASSchemaRegistry.contractAddress as Address;

      const easResult = await this.portalClient.request(GraphQLOperations.mutations.deployEAS, {
        from: deployerAddress,
        constructorArguments: {
          registry: schemaRegistryAddress,
          forwarder: defaultForwarder,
        },
        gasLimit: defaultGasLimit,
      });

      const easResponse = easResult as {
        DeployContractEAS?: { transactionHash?: string; contractAddress?: string };
      };

      if (!easResponse.DeployContractEAS?.contractAddress) {
        throw new Error("EAS deployment failed - no contract address returned");
      }

      this.deployedAddresses = {
        easAddress: easResponse.DeployContractEAS.contractAddress as Address,
        schemaRegistryAddress,
      };

      return this.deployedAddresses;
    } catch (error) {
      throw new Error(`Failed to deploy EAS contracts: ${error}`);
    }
  }

  /**
   * Get the EAS contract address
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
   * Get the Schema Registry contract address
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
   * Register a new schema in the EAS Schema Registry
   * @param request - Schema registration request
   * @param fromAddress - Address to send transaction from
   * @param gasLimit - Optional gas limit for the transaction
   */
  async registerSchema(request: SchemaRequest, fromAddress: Address, gasLimit?: string): Promise<TransactionResult> {
    if (this.options.debug) {
      console.log("Registering schema via Portal...", request);
    }

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
   * @param request - Attestation request
   * @param fromAddress - Address to send transaction from
   * @param gasLimit - Optional gas limit for the transaction
   */
  async attest(request: AttestationRequest, fromAddress: Address, gasLimit?: string): Promise<TransactionResult> {
    if (this.options.debug) {
      console.log("Creating attestation via Portal...", request);
    }

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
   * @param requests - Array of attestation requests
   * @param fromAddress - Address to send transaction from
   * @param gasLimit - Optional gas limit for the transaction
   */
  async multiAttest(
    requests: AttestationRequest[],
    fromAddress: Address,
    gasLimit?: string,
  ): Promise<TransactionResult> {
    if (this.options.debug) {
      console.log("Creating multiple attestations via Portal...", requests.length);
    }

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
   * @param uid - UID of the attestation to revoke
   * @param fromAddress - Address to send transaction from
   * @param value - Optional value to send with revocation
   * @param gasLimit - Optional gas limit for the transaction
   */
  async revoke(uid: Hex, fromAddress: Address, value?: bigint, gasLimit?: string): Promise<TransactionResult> {
    if (this.options.debug) {
      console.log("Revoking attestation via Portal...", uid);
    }

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
   */
  async getSchema(uid: Hex): Promise<SchemaData> {
    if (this.options.debug) {
      console.log("Retrieving schema via Portal...", uid);
    }

    const schemaRegistryAddress = this.getSchemaRegistryAddress();

    try {
      const result = await this.portalClient.request(GraphQLOperations.queries.getSchema, {
        address: schemaRegistryAddress,
        uid,
      });

      const response = result as PortalSchemaResponse;
      const schemaData = response.EASSchemaRegistry?.getSchema;

      if (!schemaData) {
        throw new Error(`Schema not found: ${uid}`);
      }

      return {
        uid: schemaData.uid as Hex,
        resolver: schemaData.resolver as Address,
        revocable: schemaData.revocable,
        schema: schemaData.schema,
      };
    } catch (error) {
      throw new Error(`Failed to get schema: ${error}`);
    }
  }

  /**
   * Get all schemas with pagination
   */
  async getSchemas(options?: GetSchemasOptions): Promise<SchemaData[]> {
    if (this.options.debug) {
      console.log("Retrieving schemas via Portal...", options);
    }

    try {
      const result = await this.portalClient.request(GraphQLOperations.queries.getSchemas, {
        page: Math.floor((options?.offset || 0) / (options?.limit || 100)),
        pageSize: options?.limit || 100,
      });

      const response = result as PortalContractsResponse;
      const contracts = response.getContractsEasSchemaRegistry?.records || [];

      return contracts.map((contract, index) => ({
        uid: `0x${index.toString(16).padStart(64, "0")}` as Hex,
        resolver: contract.address as Address,
        revocable: true,
        schema: "string name, bool verified",
      }));
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

    const easAddress = this.getEASAddress();

    try {
      const result = await this.portalClient.request(GraphQLOperations.queries.getAttestation, {
        address: easAddress,
        uid,
      });

      const response = result as PortalAttestationResponse;
      const attestationData = response.EAS?.getAttestation;

      if (!attestationData) {
        throw new Error(`Attestation not found: ${uid}`);
      }

      return {
        uid: attestationData.uid as Hex,
        schema: attestationData.schema as Hex,
        attester: attestationData.attester as Address,
        recipient: attestationData.recipient as Address,
        time: BigInt(attestationData.time),
        expirationTime: BigInt(attestationData.expirationTime),
        revocable: attestationData.revocable,
        refUID: attestationData.refUID as Hex,
        data: attestationData.data as Hex,
        value: BigInt(0),
      };
    } catch (error) {
      throw new Error(`Failed to get attestation: ${error}`);
    }
  }

  /**
   * Get attestations with pagination and filtering
   */
  async getAttestations(options?: GetAttestationsOptions): Promise<AttestationInfo[]> {
    if (this.options.debug) {
      console.log("Retrieving attestations via Portal...", options);
    }

    try {
      const result = await this.portalClient.request(GraphQLOperations.queries.getAttestations, {
        page: Math.floor((options?.offset || 0) / (options?.limit || 100)),
        pageSize: options?.limit || 100,
      });

      const response = result as PortalContractsResponse;
      const contracts = response.getContractsEas?.records || [];

      return contracts.map((contract, index) => ({
        uid: `0x${index.toString(16).padStart(64, "0")}` as Hex,
        schema: options?.schema || (`0x${"1".repeat(64)}` as Hex),
        attester: contract.address as Address,
        recipient: ZERO_ADDRESS,
        time: BigInt(Math.floor(Date.now() / 1000)),
        expirationTime: BigInt(0),
        revocable: true,
        refUID: ZERO_BYTES32,
        data: "0x" as Hex,
        value: BigInt(0),
      }));
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

    const easAddress = this.getEASAddress();

    try {
      const result = await this.portalClient.request(GraphQLOperations.queries.isAttestationValid, {
        address: easAddress,
        uid,
      });

      const response = result as PortalAttestationResponse;
      return response.EAS?.isAttestationValid || false;
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

    const easAddress = this.getEASAddress();

    try {
      const result = await this.portalClient.request(GraphQLOperations.queries.getTimestamp, {
        address: easAddress,
      });

      const response = result as PortalAttestationResponse;
      const timestamp = response.EAS?.getTimestamp;

      if (!timestamp) {
        throw new Error("No timestamp returned from Portal");
      }

      return BigInt(timestamp);
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

  /**
   * Build schema string from fields
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

export { EAS_FIELD_TYPES, ZERO_ADDRESS, ZERO_BYTES32 } from "./types.js";

// Re-export validation utilities
export { validateSchemaFields, buildSchemaString } from "./utils/validation.js";

// Re-export GraphQL operations for advanced usage
export { GraphQLOperations } from "./graphql/operations.js";
