import type { Address, Hex } from "viem";

/**
 * Supported field types for EAS schema fields.
 * Maps to the Solidity types that can be used in EAS schemas.
 */
export const EAS_FIELD_TYPES = {
  string: "string",
  address: "address",
  bool: "bool",
  bytes: "bytes",
  bytes32: "bytes32",
  uint256: "uint256",
  int256: "int256",
  uint8: "uint8",
  int8: "int8",
} as const;

export type EASFieldType = keyof typeof EAS_FIELD_TYPES;

/**
 * Represents a single field in an EAS schema.
 */
export interface SchemaField {
  /** The name of the field */
  name: string;
  /** The Solidity type of the field */
  type: EASFieldType;
  /** Optional description of the field's purpose */
  description?: string;
}

/**
 * Configuration options for the EAS client
 */
export interface EASClientOptions {
  instance: string;
  accessToken: string;
  easContractAddress?: Address;
  schemaRegistryContractAddress?: Address;
  debug?: boolean;
}

/**
 * Schema registration request
 */
export interface SchemaRequest {
  schema?: string;
  fields?: SchemaField[];
  resolver: Address;
  revocable: boolean;
}

/**
 * Options for registering a new schema in the EAS Schema Registry.
 * @deprecated Use SchemaRequest instead
 */
export interface RegisterSchemaOptions {
  /** Array of fields that make up the schema */
  fields: SchemaField[];
  /** Address of the resolver contract that will handle attestations */
  resolverAddress: string;
  /** Whether attestations using this schema can be revoked */
  revocable: boolean;
}

/**
 * Attestation data structure
 */
export interface AttestationData {
  recipient: Address;
  expirationTime: bigint;
  revocable: boolean;
  refUID: Hex;
  data: Hex;
  value: bigint;
}

/**
 * Attestation request
 */
export interface AttestationRequest {
  schema: Hex;
  data: AttestationData;
}

/**
 * Transaction result
 */
export interface TransactionResult {
  hash: Hex;
  success: boolean;
}

/**
 * Schema data from registry
 */
export interface SchemaData {
  uid: Hex;
  resolver: Address;
  revocable: boolean;
  schema: string;
}

/**
 * Attestation data from contract
 */
export interface AttestationInfo {
  uid: Hex;
  schema: Hex;
  attester: Address;
  recipient: Address;
  time: bigint;
  expirationTime: bigint;
  revocable: boolean;
  refUID: Hex;
  data: Hex;
  value: bigint;
}

/**
 * Options for retrieving schemas
 */
export interface GetSchemasOptions extends Record<string, unknown> {
  limit?: number;
  offset?: number;
  resolver?: Address;
}

/**
 * Options for retrieving attestations
 */
export interface GetAttestationsOptions extends Record<string, unknown> {
  limit?: number;
  offset?: number;
  schema?: Hex;
  attester?: Address;
  recipient?: Address;
}

/**
 * Contract deployment result
 */
export interface DeploymentResult {
  easAddress: Address;
  schemaRegistryAddress: Address;
}
