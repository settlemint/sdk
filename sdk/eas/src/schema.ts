import { type Address, type Hex, zeroAddress } from "viem";
import type { z } from "zod";
import type { EASClientOptionsSchema } from "./utils/validation.js";

/**
 * Common address constants
 */
export const ZERO_ADDRESS = zeroAddress;
export const ZERO_BYTES32 = "0x0000000000000000000000000000000000000000000000000000000000000000" as Hex;

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
export type EASClientOptions = z.infer<typeof EASClientOptionsSchema>;

/**
 * Schema registration request
 */
export interface SchemaRequest {
  /** Schema fields (alternative to schema string) */
  fields?: SchemaField[];
  /** Raw schema string (alternative to fields) */
  schema?: string;
  /** Resolver contract address (use ZERO_ADDRESS for no resolver) */
  resolver: Address;
  /** Whether attestations using this schema can be revoked */
  revocable: boolean;
}

/**
 * Attestation data structure
 */
export interface AttestationData {
  /** Recipient of the attestation */
  recipient: Address;
  /** Expiration time (0 for no expiration) */
  expirationTime: bigint;
  /** Whether this attestation can be revoked */
  revocable: boolean;
  /** Reference UID (use ZERO_BYTES32 for no reference) */
  refUID: Hex;
  /** Encoded attestation data */
  data: Hex;
  /** Value sent with the attestation */
  value: bigint;
}

/**
 * Attestation request
 */
export interface AttestationRequest {
  /** Schema UID to attest against */
  schema: Hex;
  /** Attestation data */
  data: AttestationData;
}

/**
 * Transaction result
 */
export interface TransactionResult {
  /** Transaction hash */
  hash: Hex;
  /** Whether the transaction was successful */
  success: boolean;
}

/**
 * Schema information
 */
export interface SchemaData {
  /** Schema UID */
  uid: Hex;
  /** Resolver contract address */
  resolver: Address;
  /** Whether attestations can be revoked */
  revocable: boolean;
  /** Schema string */
  schema: string;
}

/**
 * Attestation information
 */
export interface AttestationInfo {
  /** Attestation UID */
  uid: Hex;
  /** Schema UID */
  schema: Hex;
  /** Address that created the attestation */
  attester: Address;
  /** Recipient of the attestation */
  recipient: Address;
  /** Creation timestamp */
  time: bigint;
  /** Expiration timestamp */
  expirationTime: bigint;
  /** Whether this attestation can be revoked */
  revocable: boolean;
  /** Reference UID */
  refUID: Hex;
  /** Encoded attestation data */
  data: Hex;
  /** Value sent with the attestation */
  value: bigint;
}

/**
 * Options for retrieving schemas
 */
export interface GetSchemasOptions {
  /** Maximum number of schemas to return */
  limit?: number;
  /** Number of schemas to skip */
  offset?: number;
}

/**
 * Options for retrieving attestations
 */
export interface GetAttestationsOptions {
  /** Maximum number of attestations to return */
  limit?: number;
  /** Number of attestations to skip */
  offset?: number;
  /** Filter by schema UID */
  schema?: Hex;
  /** Filter by attester address */
  attester?: Address;
  /** Filter by recipient address */
  recipient?: Address;
}

/**
 * Contract deployment result
 */
export interface DeploymentResult {
  /** Deployed EAS contract address */
  easAddress: Address;
  /** Deployed Schema Registry contract address */
  schemaRegistryAddress: Address;
  /** EAS deployment transaction hash (when address not immediately available) */
  easTransactionHash?: Hex;
  /** Schema Registry deployment transaction hash (when address not immediately available) */
  schemaRegistryTransactionHash?: Hex;
}

/**
 * @deprecated Use SchemaRequest instead
 */
export interface RegisterSchemaOptions extends SchemaRequest {}
