import { EASPortalClient } from "./eas-portal-client.js";
import { validatePortalClientOptions } from "./portal-client-options.schema.js";
import type { PortalClientOptions } from "./portal-types.js";
import type { SchemaField } from "./schema.js";
import { buildSchemaString, validateSchemaFields } from "./utils/validation.js";

// Re-export types and constants for backward compatibility
export type { PortalClientOptions as ClientOptions } from "./portal-types.js";
export type { SchemaField, EASFieldType, RegisterSchemaOptions } from "./schema.js";
export { EAS_FIELD_TYPES } from "./schema.js";

/**
 * Creates an EAS client for interacting with the Ethereum Attestation Service via Portal.
 * This is the main entry point for the EAS SDK, now powered by Portal.
 *
 * @param options - Configuration options for the Portal-based client
 * @returns An EAS Portal client instance with enhanced methods
 * @throws Will throw an error if the options fail validation
 *
 * @example
 * ```ts
 * import { createEASClient } from '@settlemint/sdk-eas';
 *
 * const eas = createEASClient({
 *   instance: "https://portal.settlemint.com",
 *   accessToken: "your-access-token",
 *   easContractAddress: "0x1234567890123456789012345678901234567890",
 *   schemaRegistryContractAddress: "0x1234567890123456789012345678901234567890",
 * });
 *
 * // Register a schema with string
 * const result = await eas.registerSchema({
 *   schema: "address user, uint256 score",
 *   resolver: "0x0000000000000000000000000000000000000000",
 *   revocable: true,
 * });
 *
 * // Or register schema with fields (automatic validation)
 * const schemaResult = await eas.registerSchema({
 *   fields: [
 *     { name: "user", type: "address" },
 *     { name: "score", type: "uint256" }
 *   ],
 *   resolver: "0x0000000000000000000000000000000000000000",
 *   revocable: true,
 * });
 *
 * // Create attestations
 * const attestation = await eas.attest({
 *   schema: "0x...",
 *   data: {
 *     recipient: "0x...",
 *     expirationTime: 0n,
 *     revocable: true,
 *     refUID: "0x0000000000000000000000000000000000000000000000000000000000000000",
 *     data: "0x...",
 *     value: 0n,
 *   },
 * });
 * ```
 */
export function createEASClient(options: PortalClientOptions): EASPortalClient {
  // Validate options using the Portal schema
  const validatedOptions = validatePortalClientOptions(options);

  // Create and return the Portal-based EAS client
  return new EASPortalClient(validatedOptions);
}

// Re-export the Portal client class for direct usage
export { EASPortalClient } from "./eas-portal-client.js";

// Re-export validation and utility functions
export { validatePortalClientOptions } from "./portal-client-options.schema.js";
export { buildSchemaString, validateSchemaFields } from "./utils/validation.js";

/**
 * Validates schema fields and builds a schema string without requiring a client instance.
 * Useful for pre-validation or building schema strings for external use.
 *
 * @param fields - Array of schema fields to validate
 * @returns The validated schema string
 * @throws Error if validation fails
 *
 * @example
 * ```typescript
 * import { validateAndBuildSchema } from "@settlemint/sdk-eas";
 *
 * try {
 *   const schemaString = validateAndBuildSchema([
 *     { name: "user", type: "address", description: "User's wallet address" },
 *     { name: "score", type: "uint256", description: "User's reputation score" }
 *   ]);
 *   console.log("Schema is valid:", schemaString); // "address user, uint256 score"
 * } catch (error) {
 *   console.error("Schema validation failed:", error.message);
 * }
 * ```
 */
export function validateAndBuildSchema(fields: SchemaField[]): string {
  validateSchemaFields(fields);
  return buildSchemaString(fields);
}

// Re-export error handling
export { EASErrorCode, EASPortalError } from "./portal-types.js";

// Re-export ABIs
export { EAS_ABI, SCHEMA_REGISTRY_ABI, DEFAULT_EAS_ABIS } from "./abis.js";
