import { createPortalClient } from "@settlemint/sdk-portal";
import type { Abi, Address, Hash, Hex } from "viem";
import { EAS_ABI, SCHEMA_REGISTRY_ABI } from "./abis.js";
import { validatePortalClientOptions } from "./portal-client-options.schema.js";
import type {
  AttestationData,
  AttestationRequest,
  PortalClientOptions,
  SchemaData,
  SchemaRequest,
  TransactionResult,
} from "./portal-types.js";
import { EASErrorCode, EASPortalError } from "./portal-types.js";
import type {} from "./schema.js";
import { buildSchemaString, validateSchemaFields } from "./utils/validation.js";

/**
 * EAS Portal client for interacting with Ethereum Attestation Service contracts via Portal.
 * Supports multiple ABI sources with priority: hardcoded (default) > custom (user override) > predeployed (Portal's ABIs).
 */
export class EASPortalClient {
  private portalClient: unknown;
  private options: PortalClientOptions;
  private easAbi!: Abi;
  private schemaRegistryAbi!: Abi;

  /**
   * Creates a new EAS Portal client instance.
   *
   * @param options - Configuration options for the client
   *
   * @example
   * ```typescript
   * import { EASPortalClient } from "@settlemint/sdk-eas";
   *
   * // Using default hardcoded ABIs
   * const client = new EASPortalClient({
   *   instance: "https://portal.settlemint.com",
   *   accessToken: "your-token",
   *   easContractAddress: "0x...",
   *   schemaRegistryContractAddress: "0x...",
   * });
   *
   * // Using custom ABIs
   * const clientWithCustomAbis = new EASPortalClient({
   *   instance: "https://portal.settlemint.com",
   *   accessToken: "your-token",
   *   easContractAddress: "0x...",
   *   schemaRegistryContractAddress: "0x...",
   *   abiSource: {
   *     type: "custom",
   *     easAbi: customEasAbi,
   *     schemaRegistryAbi: customSchemaRegistryAbi,
   *   },
   * });
   *
   * // Using predeployed ABIs
   * const clientWithPredeployed = new EASPortalClient({
   *   instance: "https://portal.settlemint.com",
   *   accessToken: "your-token",
   *   easContractAddress: "0x...",
   *   schemaRegistryContractAddress: "0x...",
   *   abiSource: {
   *     type: "predeployed",
   *     abiNames: ["eas"],
   *   },
   * });
   * ```
   */
  constructor(options: PortalClientOptions) {
    this.options = validatePortalClientOptions(options);

    // Initialize Portal client
    const { client } = createPortalClient({
      instance: this.options.instance,
      accessToken: this.options.accessToken,
    });
    this.portalClient = client;

    // Set ABIs based on priority system
    this.setAbis();
  }

  /**
   * Sets the ABIs based on the configured source priority.
   * Priority: hardcoded (default) > custom (user override) > predeployed (Portal's ABIs)
   */
  private setAbis(): void {
    const { abiSource } = this.options;

    switch (abiSource.type) {
      case "custom":
        // User-provided ABIs override everything
        this.easAbi = abiSource.easAbi;
        this.schemaRegistryAbi = abiSource.schemaRegistryAbi;
        if (this.options.debug) {
          console.log("Using custom ABIs provided by user");
        }
        break;

      case "predeployed":
        // Use Portal's predeployed ABIs
        // Note: This would require Portal SDK to support ABI retrieval
        // For now, we'll fall back to hardcoded ABIs with a warning
        console.warn("Predeployed ABIs not yet supported, falling back to hardcoded ABIs");
        this.easAbi = EAS_ABI;
        this.schemaRegistryAbi = SCHEMA_REGISTRY_ABI;
        break;

      default:
        // Default: Use standard EAS ABIs (covers "hardcoded" and any other case)
        this.easAbi = EAS_ABI;
        this.schemaRegistryAbi = SCHEMA_REGISTRY_ABI;
        if (this.options.debug) {
          console.log("Using hardcoded standard EAS ABIs");
        }
        break;
    }
  }

  /**
   * Creates a new attestation on-chain.
   *
   * @param request - The attestation request data
   * @returns Promise resolving to transaction result
   * @throws EASPortalError if the operation fails
   */
  async attest(request: AttestationRequest): Promise<TransactionResult> {
    try {
      // Note: This is a simplified implementation
      // The actual Portal SDK integration would use proper GraphQL mutations
      const result = await this.executeContractWrite("attest", [request]);

      return {
        hash: result.hash as Hash,
        success: true,
      };
    } catch (error) {
      throw this.createError(EASErrorCode.TRANSACTION_FAILED, `Failed to create attestation: ${error}`);
    }
  }

  /**
   * Creates multiple attestations in a single transaction.
   *
   * @param requests - Array of attestation requests
   * @returns Promise resolving to transaction result
   * @throws EASPortalError if the operation fails
   */
  async multiAttest(requests: AttestationRequest[]): Promise<TransactionResult> {
    try {
      const result = await this.executeContractWrite("multiAttest", [requests]);

      return {
        hash: result.hash as Hash,
        success: true,
      };
    } catch (error) {
      throw this.createError(EASErrorCode.TRANSACTION_FAILED, `Failed to create multiple attestations: ${error}`);
    }
  }

  /**
   * Revokes an existing attestation.
   *
   * @param uid - The UID of the attestation to revoke
   * @param value - Optional ETH value to send with the transaction
   * @returns Promise resolving to transaction result
   * @throws EASPortalError if the operation fails
   */
  async revoke(uid: Hex, value?: bigint): Promise<TransactionResult> {
    try {
      const result = await this.executeContractWrite("revoke", [{ schema: uid, data: { uid, value: value || 0n } }]);

      return {
        hash: result.hash as Hash,
        success: true,
      };
    } catch (error) {
      throw this.createError(EASErrorCode.TRANSACTION_FAILED, `Failed to revoke attestation: ${error}`);
    }
  }

  /**
   * Registers a new schema in the Schema Registry.
   * Supports both schema strings and schema fields with automatic validation.
   *
   * @param request - The schema registration request (schema string OR fields)
   * @returns Promise resolving to transaction result
   * @throws EASPortalError if the operation fails or validation fails
   *
   * @example
   * ```typescript
   * // Option 1: Using schema string
   * const result1 = await client.registerSchema({
   *   schema: "address user, uint256 score",
   *   resolver: "0x0000000000000000000000000000000000000000",
   *   revocable: true,
   * });
   *
   * // Option 2: Using schema fields (with automatic validation)
   * const result2 = await client.registerSchema({
   *   fields: [
   *     { name: "user", type: "address", description: "User's wallet address" },
   *     { name: "score", type: "uint256", description: "User's reputation score" }
   *   ],
   *   resolver: "0x0000000000000000000000000000000000000000",
   *   revocable: true,
   * });
   * ```
   */
  async registerSchema(request: SchemaRequest): Promise<TransactionResult> {
    try {
      let schemaString: string;

      // Handle both schema string and fields
      if (request.fields) {
        // Validate the schema fields using our validation utilities
        validateSchemaFields(request.fields);

        // Build the schema string from validated fields
        schemaString = buildSchemaString(request.fields);

        if (this.options.debug) {
          console.log(`Built schema string from fields: ${schemaString}`);
          console.log(`Fields validated: ${request.fields.length} fields`);
        }
      } else if (request.schema) {
        // Use provided schema string directly
        schemaString = request.schema;

        if (this.options.debug) {
          console.log(`Using provided schema string: ${schemaString}`);
        }
      } else {
        throw this.createError(
          EASErrorCode.INVALID_SCHEMA,
          "Either 'schema' string or 'fields' array must be provided",
        );
      }

      const result = await this.executeSchemaRegistryWrite("register", [
        schemaString,
        request.resolver,
        request.revocable,
      ]);

      return {
        hash: result.hash as Hash,
        success: true,
      };
    } catch (error) {
      if (error instanceof EASPortalError) {
        throw error; // Re-throw our own errors
      }
      if (error instanceof Error && error.message.includes("Field")) {
        // Re-throw validation errors with EAS-specific error code
        throw this.createError(EASErrorCode.INVALID_SCHEMA, `Schema validation failed: ${error.message}`);
      }
      throw this.createError(EASErrorCode.TRANSACTION_FAILED, `Failed to register schema: ${error}`);
    }
  }

  /**
   * Retrieves an attestation by its UID.
   *
   * @param uid - The UID of the attestation
   * @returns Promise resolving to attestation data
   * @throws EASPortalError if the attestation is not found
   */
  async getAttestation(uid: Hex): Promise<AttestationData> {
    try {
      const result = await this.executeContractRead("getAttestation", [uid]);

      // Type the result structure properly
      const attestation = result as {
        schema: Hex;
        attester: string;
        recipient: string;
        time: bigint;
        expirationTime: bigint;
        revocable: boolean;
        refUID: Hex;
        data: Hex;
        value: bigint;
      };

      return {
        uid,
        schema: attestation.schema,
        attester: attestation.attester as Address,
        recipient: attestation.recipient as Address,
        time: attestation.time,
        expirationTime: attestation.expirationTime,
        revocable: attestation.revocable,
        refUID: attestation.refUID,
        data: attestation.data,
        value: attestation.value,
      };
    } catch (error) {
      throw this.createError(EASErrorCode.ATTESTATION_NOT_FOUND, `Attestation not found: ${error}`);
    }
  }

  /**
   * Retrieves a schema by its UID.
   *
   * @param uid - The UID of the schema
   * @returns Promise resolving to schema data
   * @throws EASPortalError if the schema is not found
   */
  async getSchema(uid: Hex): Promise<SchemaData> {
    try {
      const result = await this.executeSchemaRegistryRead("getSchema", [uid]);

      // Type the result structure properly
      const schema = result as {
        resolver: string;
        revocable: boolean;
        schema: string;
      };

      return {
        uid,
        resolver: schema.resolver as Address,
        revocable: schema.revocable,
        schema: schema.schema,
      };
    } catch (error) {
      throw this.createError(EASErrorCode.SCHEMA_NOT_FOUND, `Schema not found: ${error}`);
    }
  }

  /**
   * Checks if an attestation is valid (exists and not revoked).
   *
   * @param uid - The UID of the attestation
   * @returns Promise resolving to boolean indicating validity
   */
  async isValidAttestation(uid: Hex): Promise<boolean> {
    try {
      const result = await this.executeContractRead("isValidAttestation", [uid]);
      return result as boolean;
    } catch (error) {
      if (this.options.debug) {
        console.warn(`Failed to check attestation validity: ${error}`);
      }
      return false;
    }
  }

  /**
   * Gets the current timestamp from the EAS contract.
   *
   * @returns Promise resolving to current timestamp
   */
  async getTimestamp(): Promise<bigint> {
    try {
      const result = await this.executeContractRead("getTimestamp", []);
      return result as bigint;
    } catch (error) {
      throw this.createError(EASErrorCode.TRANSACTION_FAILED, `Failed to get timestamp: ${error}`);
    }
  }

  /**
   * Executes a write operation on the EAS contract.
   *
   * @param functionName - The function name to call
   * @param args - The function arguments
   * @returns Promise resolving to transaction result
   */
  private async executeContractWrite(functionName: string, args: unknown[]): Promise<{ hash: string }> {
    // This is a placeholder implementation
    // The actual implementation would use Portal's GraphQL mutations
    return { hash: "0x..." };
  }

  /**
   * Executes a write operation on the Schema Registry contract.
   *
   * @param functionName - The function name to call
   * @param args - The function arguments
   * @returns Promise resolving to transaction result
   */
  private async executeSchemaRegistryWrite(functionName: string, args: unknown[]): Promise<{ hash: string }> {
    // This is a placeholder implementation
    // The actual implementation would use Portal's GraphQL mutations
    return { hash: "0x..." };
  }

  /**
   * Executes a read operation on the EAS contract.
   *
   * @param functionName - The function name to call
   * @param args - The function arguments
   * @returns Promise resolving to the result
   */
  private async executeContractRead(functionName: string, args: unknown[]): Promise<unknown> {
    // This is a placeholder implementation
    // The actual implementation would use Portal's GraphQL queries
    return {};
  }

  /**
   * Executes a read operation on the Schema Registry contract.
   *
   * @param functionName - The function name to call
   * @param args - The function arguments
   * @returns Promise resolving to the result
   */
  private async executeSchemaRegistryRead(functionName: string, args: unknown[]): Promise<unknown> {
    // This is a placeholder implementation
    // The actual implementation would use Portal's GraphQL queries
    return {};
  }

  /**
   * Creates a standardized EAS Portal error.
   *
   * @param code - Error code
   * @param message - Error message
   * @returns EASPortalError instance
   */
  private createError(code: EASErrorCode, message: string): EASPortalError {
    return new EASPortalError(message, code);
  }

  /**
   * Gets the Portal client instance for advanced operations.
   *
   * @returns The underlying Portal client
   */
  getPortalClient(): unknown {
    return this.portalClient;
  }

  /**
   * Gets the current configuration options.
   *
   * @returns The client configuration
   */
  getOptions(): PortalClientOptions {
    return { ...this.options };
  }

  /**
   * Gets the currently configured ABIs.
   *
   * @returns Object containing the EAS and Schema Registry ABIs
   */
  getAbis(): { easAbi: Abi; schemaRegistryAbi: Abi } {
    return {
      easAbi: this.easAbi,
      schemaRegistryAbi: this.schemaRegistryAbi,
    };
  }
}
