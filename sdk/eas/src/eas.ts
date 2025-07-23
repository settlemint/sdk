import { createPortalClient, waitForTransactionReceipt } from "@settlemint/sdk-portal";
import { createLogger, requestLogger } from "@settlemint/sdk-utils/logging";
import { validate } from "@settlemint/sdk-utils/validation";
import type { Address, Hex } from "viem";
import { GraphQLOperations } from "./portal/operations.js";
import type { PortalClient } from "./portal/portal-client.js";
import type { introspection } from "./portal/portal-env.d.ts";
import {
  type AttestationInfo,
  type AttestationRequest,
  type DeploymentResult,
  type EASClientOptions,
  type GetAttestationsOptions,
  type GetSchemasOptions,
  type SchemaData,
  type SchemaField,
  type SchemaRequest,
  type TransactionResult,
  ZERO_ADDRESS,
} from "./schema.js";
import { EASClientOptionsSchema } from "./utils/validation.js";

const LOGGER = createLogger();

const DEFAULT_GAS_LIMIT = "0x3d0900";

/**
 * Main EAS client class for interacting with Ethereum Attestation Service via Portal
 *
 * @example
 * ```typescript
 * import { createEASClient } from "@settlemint/sdk-eas";
 *
 * const easClient = createEASClient({
 *   instance: "https://your-portal-instance.settlemint.com",
 *   accessToken: "your-access-token"
 * });
 *
 * // Deploy EAS contracts
 * const deployment = await easClient.deploy("0x1234...deployer-address");
 * console.log("EAS deployed at:", deployment.easAddress);
 * ```
 */
export class EASClient {
  private readonly options: EASClientOptions;
  private readonly portalClient: PortalClient["client"];
  private readonly portalGraphql: PortalClient["graphql"];
  private deployedAddresses?: DeploymentResult;

  /**
   * Create a new EAS client instance
   *
   * @param options - Configuration options for the EAS client
   */
  constructor(options: EASClientOptions) {
    this.options = validate(EASClientOptionsSchema, options);

    const { client: portalClient, graphql: portalGraphql } = createPortalClient<{
      introspection: introspection;
      disableMasking: true;
      scalars: {
        // Change unknown to the type you are using to store metadata
        JSON: unknown;
      };
    }>(
      {
        instance: this.options.instance,
        accessToken: this.options.accessToken,
      },
      {
        fetch: requestLogger(LOGGER, "portal", fetch) as typeof fetch,
      },
    );

    this.portalClient = portalClient;
    this.portalGraphql = portalGraphql;
  }

  /**
   * Deploy EAS contracts via Portal
   *
   * @param deployerAddress - The address that will deploy the contracts
   * @param forwarderAddress - Optional trusted forwarder address (defaults to zero address)
   * @param gasLimit - Optional gas limit for deployment transactions (defaults to "0x7a1200")
   * @returns Promise resolving to deployment result with contract addresses and transaction hashes
   *
   * @example
   * ```typescript
   * import { createEASClient } from "@settlemint/sdk-eas";
   *
   * const easClient = createEASClient({
   *   instance: "https://your-portal-instance.settlemint.com",
   *   accessToken: "your-access-token"
   * });
   *
   * const deployment = await easClient.deploy(
   *   "0x1234567890123456789012345678901234567890", // deployer address
   *   "0x0000000000000000000000000000000000000000", // forwarder (optional)
   *   "0x7a1200" // gas limit (optional)
   * );
   *
   * console.log("Schema Registry:", deployment.schemaRegistryAddress);
   * console.log("EAS Contract:", deployment.easAddress);
   * ```
   */
  public async deploy(
    deployerAddress: Address,
    forwarderAddress?: Address,
    gasLimit?: string,
  ): Promise<DeploymentResult> {
    const defaultForwarder = forwarderAddress || ZERO_ADDRESS;
    const defaultGasLimit = gasLimit || "0x7a1200";

    try {
      // Deploy Schema Registry first
      const schemaRegistryResponse = await this.portalClient.request(
        GraphQLOperations.mutations.deploySchemaRegistry(this.portalGraphql),
        {
          from: deployerAddress,
          constructorArguments: {
            forwarder: defaultForwarder,
          },
          gasLimit: defaultGasLimit,
        },
      );

      if (!schemaRegistryResponse.DeployContractEASSchemaRegistry?.transactionHash) {
        throw new Error("Schema Registry deployment failed - no transaction hash returned");
      }

      const schemaRegistryTxHash = schemaRegistryResponse.DeployContractEASSchemaRegistry.transactionHash;

      // Wait for Schema Registry deployment and get contract address
      const schemaRegistryTransaction = await waitForTransactionReceipt(schemaRegistryTxHash as Hex, {
        portalGraphqlEndpoint: this.options.instance,
        accessToken: this.options.accessToken,
        timeout: 60_000,
      });

      if (!schemaRegistryTransaction?.receipt?.contractAddress) {
        throw new Error("Schema Registry deployment failed - could not get contract address from transaction receipt.");
      }

      const schemaRegistryAddress = schemaRegistryTransaction.receipt.contractAddress;

      // Deploy EAS contract with correct Schema Registry address
      const easResponse = await this.portalClient.request(GraphQLOperations.mutations.deployEAS(this.portalGraphql), {
        from: deployerAddress,
        constructorArguments: {
          registry: schemaRegistryAddress,
          forwarder: defaultForwarder,
        },
        gasLimit: defaultGasLimit,
      });
      if (!easResponse.DeployContractEAS?.transactionHash) {
        throw new Error("EAS deployment failed - no transaction hash returned");
      }

      const easTxHash = easResponse.DeployContractEAS.transactionHash as Hex;

      // Wait for EAS deployment and get contract address
      const easTransaction = await waitForTransactionReceipt(easTxHash, {
        portalGraphqlEndpoint: this.options.instance,
        accessToken: this.options.accessToken,
        timeout: 60_000,
      });

      if (!easTransaction?.receipt?.contractAddress) {
        throw new Error("EAS deployment failed - could not get contract address from transaction receipt.");
      }
      const easAddress = easTransaction.receipt.contractAddress;

      this.deployedAddresses = {
        easAddress,
        schemaRegistryAddress,
        easTransactionHash: easTxHash as Hex,
        schemaRegistryTransactionHash: schemaRegistryTxHash as Hex,
      };

      return this.deployedAddresses;
    } catch (err) {
      const error = err as Error;
      throw new Error(`Failed to deploy EAS contracts: ${error.message}`);
    }
  }

  /**
   * Register a new schema in the EAS Schema Registry
   *
   * @param request - Schema registration request containing schema definition
   * @param fromAddress - Address that will register the schema
   * @param gasLimit - Optional gas limit for the transaction (defaults to "0x3d0900")
   * @returns Promise resolving to transaction result
   *
   * @example
   * ```typescript
   * import { createEASClient } from "@settlemint/sdk-eas";
   *
   * const easClient = createEASClient({
   *   instance: "https://your-portal-instance.settlemint.com",
   *   accessToken: "your-access-token"
   * });
   *
   * const schemaResult = await easClient.registerSchema(
   *   {
   *     schema: "uint256 eventId, uint8 voteIndex",
   *     resolver: "0x0000000000000000000000000000000000000000",
   *     revocable: true
   *   },
   *   "0x1234567890123456789012345678901234567890" // from address
   * );
   *
   * console.log("Schema registered:", schemaResult.hash);
   * ```
   */
  public async registerSchema(
    request: SchemaRequest,
    fromAddress: Address,
    gasLimit?: string,
  ): Promise<TransactionResult> {
    const schemaRegistryAddress = this.getSchemaRegistryAddress();

    let schemaString = request.schema;
    if (request.fields && !schemaString) {
      schemaString = this.buildSchemaString(request.fields);
    }

    if (!schemaString) {
      throw new Error("Schema string is required. Provide either 'schema' or 'fields'.");
    }

    try {
      const response = await this.portalClient.request(GraphQLOperations.mutations.registerSchema(this.portalGraphql), {
        address: schemaRegistryAddress,
        from: fromAddress,
        input: {
          schema: schemaString,
          resolver: request.resolver,
          revocable: request.revocable,
        },
        gasLimit: gasLimit || DEFAULT_GAS_LIMIT,
      });

      const transactionHash = response.EASSchemaRegistryRegister?.transactionHash;

      if (!transactionHash) {
        throw new Error("No transaction hash returned from Portal");
      }

      return {
        hash: transactionHash as Hex,
        success: true,
      };
    } catch (err) {
      const error = err as Error;
      throw new Error(`Failed to register schema: ${error.message}`);
    }
  }

  /**
   * Create an attestation
   *
   * @param request - Attestation request containing schema and data
   * @param fromAddress - Address that will create the attestation
   * @param gasLimit - Optional gas limit for the transaction (defaults to "0x3d0900")
   * @returns Promise resolving to transaction result
   *
   * @example
   * ```typescript
   * import { createEASClient } from "@settlemint/sdk-eas";
   *
   * const easClient = createEASClient({
   *   instance: "https://your-portal-instance.settlemint.com",
   *   accessToken: "your-access-token"
   * });
   *
   * const attestationResult = await easClient.attest(
   *   {
   *     schema: "0x1234567890123456789012345678901234567890123456789012345678901234",
   *     data: {
   *       recipient: "0x1234567890123456789012345678901234567890",
   *       expirationTime: BigInt(0), // No expiration
   *       revocable: true,
   *       refUID: "0x0000000000000000000000000000000000000000000000000000000000000000",
   *       data: "0x1234", // ABI-encoded data
   *       value: BigInt(0)
   *     }
   *   },
   *   "0x1234567890123456789012345678901234567890" // from address
   * );
   *
   * console.log("Attestation created:", attestationResult.hash);
   * ```
   */
  public async attest(
    request: AttestationRequest,
    fromAddress: Address,
    gasLimit?: string,
  ): Promise<TransactionResult> {
    const easAddress = this.getEASAddress();

    try {
      const response = await this.portalClient.request(GraphQLOperations.mutations.attest(this.portalGraphql), {
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
              value: request.data.value?.toString() || "0",
            },
          },
        },
        gasLimit: gasLimit || DEFAULT_GAS_LIMIT,
      });

      const transactionHash = response.EASAttest?.transactionHash;

      if (!transactionHash) {
        throw new Error("No transaction hash returned from Portal");
      }

      return {
        hash: transactionHash as Hex,
        success: true,
      };
    } catch (err) {
      const error = err as Error;
      throw new Error(`Failed to create attestation: ${error.message}`);
    }
  }

  /**
   * Create multiple attestations in a single transaction
   *
   * @param requests - Array of attestation requests
   * @param fromAddress - Address that will create the attestations
   * @param gasLimit - Optional gas limit for the transaction (defaults to "0x3d0900")
   * @returns Promise resolving to transaction result
   *
   * @example
   * ```typescript
   * import { createEASClient } from "@settlemint/sdk-eas";
   *
   * const easClient = createEASClient({
   *   instance: "https://your-portal-instance.settlemint.com",
   *   accessToken: "your-access-token"
   * });
   *
   * const multiAttestResult = await easClient.multiAttest(
   *   [
   *     {
   *       schema: "0x1234567890123456789012345678901234567890123456789012345678901234",
   *       data: {
   *         recipient: "0x1234567890123456789012345678901234567890",
   *         expirationTime: BigInt(0),
   *         revocable: true,
   *         refUID: "0x0000000000000000000000000000000000000000000000000000000000000000",
   *         data: "0x1234",
   *         value: BigInt(0)
   *       }
   *     },
   *     {
   *       schema: "0x5678901234567890123456789012345678901234567890123456789012345678",
   *       data: {
   *         recipient: "0x5678901234567890123456789012345678901234",
   *         expirationTime: BigInt(0),
   *         revocable: false,
   *         refUID: "0x0000000000000000000000000000000000000000000000000000000000000000",
   *         data: "0x5678",
   *         value: BigInt(0)
   *       }
   *     }
   *   ],
   *   "0x1234567890123456789012345678901234567890" // from address
   * );
   *
   * console.log("Multiple attestations created:", multiAttestResult.hash);
   * ```
   */
  public async multiAttest(
    requests: AttestationRequest[],
    fromAddress: Address,
    gasLimit?: string,
  ): Promise<TransactionResult> {
    if (requests.length === 0) {
      throw new Error("At least one attestation request is required");
    }

    const easAddress = this.getEASAddress();

    try {
      const response = await this.portalClient.request(GraphQLOperations.mutations.multiAttest(this.portalGraphql), {
        address: easAddress,
        from: fromAddress,
        input: {
          multiRequests: requests.map((req) => ({
            schema: req.schema,
            data: [
              {
                recipient: req.data.recipient,
                expirationTime: req.data.expirationTime.toString(),
                revocable: req.data.revocable,
                refUID: req.data.refUID,
                data: req.data.data,
                value: req.data.value?.toString() || "0",
              },
            ],
          })),
        },
        gasLimit: gasLimit || DEFAULT_GAS_LIMIT,
      });

      const transactionHash = response.EASMultiAttest?.transactionHash;

      if (!transactionHash) {
        throw new Error("No transaction hash returned from Portal");
      }

      return {
        hash: transactionHash as Hex,
        success: true,
      };
    } catch (err) {
      const error = err as Error;
      throw new Error(`Failed to create multiple attestations: ${error.message}`);
    }
  }

  /**
   * Revoke an existing attestation
   *
   * @param schemaUID - UID of the schema used for the attestation
   * @param attestationUID - UID of the attestation to revoke
   * @param fromAddress - Address that will revoke the attestation
   * @param value - Optional ETH value to send with the revocation
   * @param gasLimit - Optional gas limit for the transaction (defaults to "0x3d0900")
   * @returns Promise resolving to transaction result
   *
   * @example
   * ```typescript
   * import { createEASClient } from "@settlemint/sdk-eas";
   *
   * const easClient = createEASClient({
   *   instance: "https://your-portal-instance.settlemint.com",
   *   accessToken: "your-access-token"
   * });
   *
   * const revokeResult = await easClient.revoke(
   *   "0x1234567890123456789012345678901234567890123456789012345678901234", // schema UID
   *   "0x5678901234567890123456789012345678901234567890123456789012345678", // attestation UID
   *   "0x1234567890123456789012345678901234567890", // from address
   *   BigInt(0) // value (optional)
   * );
   *
   * console.log("Attestation revoked:", revokeResult.hash);
   * ```
   */
  public async revoke(
    schemaUID: Hex,
    attestationUID: Hex,
    fromAddress: Address,
    value?: bigint,
    gasLimit?: string,
  ): Promise<TransactionResult> {
    try {
      const response = await this.portalClient.request(GraphQLOperations.mutations.revoke(this.portalGraphql), {
        address: this.getEASAddress(),
        from: fromAddress,
        input: {
          request: {
            schema: schemaUID,
            data: {
              uid: attestationUID,
              value: value?.toString() || "0",
            },
          },
        },
        gasLimit: gasLimit || DEFAULT_GAS_LIMIT,
      });

      const transactionHash = response.EASRevoke?.transactionHash;

      if (!transactionHash) {
        throw new Error("No transaction hash returned from Portal");
      }

      return {
        hash: transactionHash as Hex,
        success: true,
      };
    } catch (err) {
      const error = err as Error;
      throw new Error(`Failed to revoke attestation: ${error.message}`);
    }
  }

  /**
   * Get a schema by UID
   */
  public async getSchema(uid: Hex): Promise<SchemaData> {
    const schemaRegistryAddress = this.getSchemaRegistryAddress();

    try {
      const response = await this.portalClient.request(GraphQLOperations.queries.getSchema(this.portalGraphql), {
        address: schemaRegistryAddress,
        uid: uid,
      });

      const schemaResult = response.EASSchemaRegistry?.getSchema;

      if (!schemaResult) {
        throw new Error(`Schema not found: ${uid}`);
      }

      return {
        uid: schemaResult.uid as Hex,
        resolver: schemaResult.resolver as Address,
        revocable: Boolean(schemaResult.revocable),
        schema: schemaResult.schema || "",
      };
    } catch (err) {
      const error = err as Error;
      throw new Error(`Failed to get schema: ${error.message}`);
    }
  }

  /**
   * Get all schemas with pagination
   *
   * Note: This method requires The Graph subgraph or additional indexing infrastructure
   * as Portal's direct contract queries don't support listing all schemas.
   * Consider using getSchema() for individual schema lookups.
   */
  public async getSchemas(options?: GetSchemasOptions): Promise<SchemaData[]> {
    throw new Error(
      "Schema listing not implemented yet. Portal's direct contract queries don't support listing all schemas. Use getSchema() for individual schema lookups or implement The Graph subgraph integration for bulk queries.",
    );
  }

  /**
   * Get an attestation by UID
   */
  public async getAttestation(uid: Hex): Promise<AttestationInfo> {
    const easAddress = this.getEASAddress();

    try {
      const response = await this.portalClient.request(GraphQLOperations.queries.getAttestation(this.portalGraphql), {
        address: easAddress,
        uid: uid,
      });

      const attestationResult = response.EAS?.getAttestation;

      if (!attestationResult) {
        throw new Error(`Attestation not found: ${uid}`);
      }

      return {
        uid: attestationResult.uid as Hex,
        schema: attestationResult.schema as Hex,
        attester: attestationResult.attester as Address,
        recipient: attestationResult.recipient as Address,
        time: attestationResult.time ? BigInt(attestationResult.time) : BigInt(0),
        expirationTime: attestationResult.expirationTime ? BigInt(attestationResult.expirationTime) : BigInt(0),
        revocable: Boolean(attestationResult.revocable),
        refUID: attestationResult.refUID as Hex,
        data: attestationResult.data as Hex,
        value: BigInt(0), // Note: Portal schema doesn't include value, defaulting to 0
      };
    } catch (err) {
      const error = err as Error;
      throw new Error(`Failed to get attestation: ${error.message}`);
    }
  }

  /**
   * Get attestations with pagination and filtering
   *
   * Note: This method requires The Graph subgraph or additional indexing infrastructure
   * as Portal's direct contract queries don't support listing all attestations.
   * Consider using getAttestation() for individual attestation lookups.
   */
  public async getAttestations(options?: GetAttestationsOptions): Promise<AttestationInfo[]> {
    throw new Error(
      "Attestation listing not implemented yet. Portal's direct contract queries don't support listing all attestations. Use getAttestation() for individual attestation lookups or implement The Graph subgraph integration for bulk queries.",
    );
  }

  /**
   * Check if an attestation is valid
   */
  public async isValidAttestation(uid: Hex): Promise<boolean> {
    const easAddress = this.getEASAddress();

    try {
      const response = await this.portalClient.request(
        GraphQLOperations.queries.isAttestationValid(this.portalGraphql),
        {
          address: easAddress,
          uid: uid,
        },
      );

      return response.EAS?.isAttestationValid ?? false;
    } catch (err) {
      const error = err as Error;
      throw new Error(`Failed to check attestation validity: ${error.message}`);
    }
  }

  /**
   * Get the timestamp for specific data
   *
   * @param data - The data to get timestamp for
   * @returns The timestamp when the data was timestamped
   */
  public async getTimestamp(data: Hex): Promise<bigint> {
    const easAddress = this.getEASAddress();

    try {
      const response = await this.portalClient.request(GraphQLOperations.queries.getTimestamp(this.portalGraphql), {
        address: easAddress,
        data: data,
      });

      const timestampResult = response.EAS?.getTimestamp;

      if (timestampResult === undefined || timestampResult === null) {
        throw new Error(`No timestamp found for data: ${data}`);
      }

      return BigInt(timestampResult);
    } catch (err) {
      const error = err as Error;
      throw new Error(`Failed to get timestamp: ${error.message}`);
    }
  }

  /**
   * Get client configuration
   */
  public getOptions(): EASClientOptions {
    return { ...this.options };
  }

  /**
   * Get the Portal client instance for advanced operations
   */
  public getPortalClient(): PortalClient["client"] {
    return this.portalClient;
  }

  /**
   * Get current contract addresses
   */
  public getContractAddresses(): { easAddress?: Address; schemaRegistryAddress?: Address } {
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
 * Create an EAS client instance
 *
 * @param options - Configuration options for the EAS client
 * @returns EAS client instance
 *
 * @example
 * ```typescript
 * import { createEASClient } from "@settlemint/sdk-eas";
 *
 * const easClient = createEASClient({
 *   instance: "https://your-portal-instance.settlemint.com",
 *   accessToken: "your-access-token"
 * });
 *
 * // Use the client
 * const deployment = await easClient.deploy("0x1234...deployer-address");
 * ```
 */
export function createEASClient(options: EASClientOptions): EASClient {
  return new EASClient(options);
}

// Re-export GraphQL operations for advanced usage
export { GraphQLOperations } from "./portal/operations.js";
// Re-export types and constants
export type {
  AttestationData,
  AttestationInfo,
  AttestationRequest,
  DeploymentResult,
  EASClientOptions,
  EASFieldType,
  GetAttestationsOptions,
  GetSchemasOptions,
  RegisterSchemaOptions,
  SchemaData,
  SchemaField,
  SchemaRequest,
  TransactionResult,
} from "./schema.js";
export { EAS_FIELD_TYPES, ZERO_ADDRESS, ZERO_BYTES32 } from "./schema.js";
// Re-export validation utilities
export { EASClientOptionsSchema } from "./utils/validation.js";
