import type { Abi, Address, Hex } from "viem";
import type { SchemaField } from "./schema.js";

/**
 * Simple transaction event type for EAS Portal integration
 */
export interface TransactionEvent {
  /** The name of the event that was emitted */
  eventName: string;
  /** The arguments emitted by the event */
  args: Record<string, unknown>;
  /** Indexed event parameters used for filtering and searching */
  topics: Hex[];
}

/**
 * Simple transaction receipt type for EAS Portal integration
 */
export interface TransactionReceipt {
  /** The transaction hash */
  transactionHash: string;
  /** The block hash */
  blockHash: string;
  /** The block number */
  blockNumber: string;
  /** Transaction status */
  status: "Success" | "Reverted";
  /** Gas used */
  gasUsed: string;
  /** From address */
  from: string;
  /** To address */
  to?: string;
  /** Contract address (if contract deployment) */
  contractAddress?: string;
  /** Array of events emitted during the transaction */
  events: TransactionEvent[];
  /** The raw reason for transaction reversion, if applicable */
  revertReason?: string;
  /** Human-readable version of the revert reason */
  revertReasonDecoded?: string;
}

/**
 * Enhanced schema registration options for Portal integration
 */
export interface PortalRegisterSchemaOptions {
  /** Array of fields that make up the schema */
  fields: SchemaField[];
  /** Address of the resolver contract that will handle attestations */
  resolverAddress: Address;
  /** Whether attestations using this schema can be revoked */
  revocable: boolean;
  /** The address to send the transaction from */
  from: Address;
  /** Optional gas limit for the transaction */
  gasLimit?: string;
  /** Optional gas price for the transaction */
  gasPrice?: string;
  /** Optional metadata to store with the transaction */
  metadata?: Record<string, unknown>;
  /** Whether to simulate the transaction before sending */
  simulate?: boolean;
}

/**
 * Enhanced attestation creation options for Portal integration
 */
export interface PortalCreateAttestationOptions {
  /** The schema UID to attest against */
  schemaUID: string;
  /** The recipient of the attestation */
  recipient: Address;
  /** The attestation data (encoded) */
  data: string;
  /** Optional expiration time (timestamp) */
  expirationTime?: number;
  /** Whether this attestation can be revoked */
  revocable?: boolean;
  /** Optional reference to another attestation */
  refUID?: string;
  /** Optional value to send with the attestation */
  value?: string;
  /** The address to send the transaction from */
  from: Address;
  /** Optional gas limit for the transaction */
  gasLimit?: string;
  /** Optional gas price for the transaction */
  gasPrice?: string;
  /** Optional metadata to store with the transaction */
  metadata?: Record<string, unknown>;
  /** Whether to simulate the transaction before sending */
  simulate?: boolean;
}

/**
 * Enhanced revocation options for Portal integration
 */
export interface PortalRevokeAttestationOptions {
  /** The UID of the attestation to revoke */
  uid: string;
  /** The schema UID of the attestation */
  schemaUID: string;
  /** Optional value to send with the revocation */
  value?: string;
  /** The address to send the transaction from */
  from: Address;
  /** Optional gas limit for the transaction */
  gasLimit?: string;
  /** Optional gas price for the transaction */
  gasPrice?: string;
  /** Optional metadata to store with the transaction */
  metadata?: Record<string, unknown>;
  /** Whether to simulate the transaction before sending */
  simulate?: boolean;
}

/**
 * Result of a schema registration operation
 */
export interface SchemaRegistrationResult {
  /** The transaction hash */
  transactionHash: string;
  /** The schema UID (available after transaction confirmation) */
  schemaUID?: string;
  /** The transaction receipt (available after confirmation) */
  receipt?: TransactionReceipt;
  /** Events emitted during the transaction */
  events?: TransactionEvent[];
}

/**
 * Result of an attestation creation operation
 */
export interface AttestationResult {
  /** The transaction hash */
  transactionHash: string;
  /** The attestation UID (available after transaction confirmation) */
  attestationUID?: string;
  /** The transaction receipt (available after confirmation) */
  receipt?: TransactionReceipt;
  /** Events emitted during the transaction */
  events?: TransactionEvent[];
}

/**
 * Result of an attestation revocation operation
 */
export interface RevocationResult {
  /** The transaction hash */
  transactionHash: string;
  /** The transaction receipt (available after confirmation) */
  receipt?: TransactionReceipt;
  /** Events emitted during the transaction */
  events?: TransactionEvent[];
}

/**
 * Detailed schema information from Portal
 */
export interface SchemaDetails {
  /** The schema UID */
  uid: string;
  /** The resolver address */
  resolver: Address;
  /** Whether attestations can be revoked */
  revocable: boolean;
  /** The schema string */
  schema: string;
  /** Registration transaction hash */
  registrationTxHash?: string;
  /** Registration block number */
  registrationBlock?: number;
  /** Number of attestations using this schema */
  attestationCount?: number;
}

/**
 * Detailed attestation information from Portal
 */
export interface AttestationDetails {
  /** The attestation UID */
  uid: string;
  /** The schema UID */
  schema: string;
  /** Creation timestamp */
  time: number;
  /** Expiration timestamp (0 if no expiration) */
  expirationTime: number;
  /** Revocation timestamp (0 if not revoked) */
  revocationTime: number;
  /** Reference UID */
  refUID: string;
  /** Recipient address */
  recipient: Address;
  /** Attester address */
  attester: Address;
  /** Whether this attestation is revocable */
  revocable: boolean;
  /** The attestation data */
  data: string;
  /** Creation transaction hash */
  creationTxHash?: string;
  /** Revocation transaction hash (if revoked) */
  revocationTxHash?: string;
}

/**
 * Transaction status for real-time monitoring
 */
export interface TransactionStatus {
  /** The transaction hash */
  transactionHash: string;
  /** Current status */
  status: "pending" | "confirmed" | "failed";
  /** Transaction receipt (if confirmed) */
  receipt?: TransactionReceipt;
  /** Events emitted (if confirmed) */
  events?: TransactionEvent[];
  /** Error message (if failed) */
  error?: string;
}

/**
 * EAS-specific error codes
 */
export enum EASErrorCode {
  INVALID_SCHEMA = "INVALID_SCHEMA",
  SCHEMA_NOT_FOUND = "SCHEMA_NOT_FOUND",
  ATTESTATION_NOT_FOUND = "ATTESTATION_NOT_FOUND",
  UNAUTHORIZED = "UNAUTHORIZED",
  TRANSACTION_FAILED = "TRANSACTION_FAILED",
  INVALID_SIGNATURE = "INVALID_SIGNATURE",
  EXPIRED_ATTESTATION = "EXPIRED_ATTESTATION",
  NON_REVOCABLE = "NON_REVOCABLE",
  ALREADY_REVOKED = "ALREADY_REVOKED",
  PORTAL_ERROR = "PORTAL_ERROR",
}

/**
 * Enhanced error class for EAS Portal operations
 */
export class EASPortalError extends Error {
  readonly code: EASErrorCode;
  readonly transactionHash?: string;
  readonly revertReason?: string;
  readonly gasEstimate?: bigint;

  constructor(
    message: string,
    code: EASErrorCode,
    options?: {
      transactionHash?: string;
      revertReason?: string;
      gasEstimate?: bigint;
      cause?: Error;
    },
  ) {
    super(message);
    this.name = "EASPortalError";
    this.code = code;
    this.transactionHash = options?.transactionHash;
    this.revertReason = options?.revertReason;
    this.gasEstimate = options?.gasEstimate;
    if (options?.cause) {
      this.cause = options.cause;
    }
  }
}

/**
 * Options for watching transaction status
 */
export interface WatchTransactionOptions {
  /** Timeout in milliseconds */
  timeout?: number;
  /** Polling interval in milliseconds */
  interval?: number;
}

/**
 * Configuration options for the EAS Portal client
 */
export interface PortalClientOptions {
  /** Portal instance URL or path */
  instance: string;
  /** Access token for Portal authentication */
  accessToken: string;
  /** The address of the EAS Attestation contract */
  easContractAddress: string;
  /** The address of the EAS Schema Registry contract */
  schemaRegistryContractAddress: string;
  /** ABI source configuration */
  abiSource: AbiSource;
  /** Optional WebSocket URL for real-time transaction monitoring */
  wsUrl?: string;
  /** Request timeout in milliseconds */
  timeout?: number;
  /** Enable debug logging */
  debug?: boolean;
  /** Optional cache configuration for GraphQL requests */
  cache?: "default" | "force-cache" | "no-cache" | "no-store" | "only-if-cached" | "reload";
}

/**
 * ABI source configuration for EAS contracts
 */
export type AbiSource =
  | { type: "hardcoded" }
  | { type: "custom"; easAbi: Abi; schemaRegistryAbi: Abi }
  | { type: "predeployed"; abiNames?: string[] };

/**
 * Attestation request data structure
 */
export interface AttestationRequest {
  /** The schema UID to attest against */
  schema: Hex;
  /** The attestation data */
  data: {
    /** The recipient of the attestation */
    recipient: Address;
    /** Expiration time (0 for no expiration) */
    expirationTime: bigint;
    /** Whether this attestation is revocable */
    revocable: boolean;
    /** Reference UID (0x0 for no reference) */
    refUID: Hex;
    /** The attestation data (encoded) */
    data: Hex;
    /** Value to send with the attestation */
    value: bigint;
  };
}

/**
 * Schema registration request data structure
 * Supports both schema string and schema fields for enhanced developer experience
 */
export interface SchemaRequest {
  /** The schema string OR schema fields (one of these is required) */
  schema?: string;
  /** Array of schema fields (alternative to schema string) */
  fields?: SchemaField[];
  /** The resolver address */
  resolver: Address;
  /** Whether attestations using this schema can be revoked */
  revocable: boolean;
}

/**
 * Transaction result from Portal operations
 */
export interface TransactionResult {
  /** The transaction hash */
  hash: Hex;
  /** Whether the transaction was successful */
  success: boolean;
  /** Optional error message */
  error?: string;
}

/**
 * Attestation data structure returned from queries
 */
export interface AttestationData {
  /** The attestation UID */
  uid: Hex;
  /** The schema UID */
  schema: Hex;
  /** The attester address */
  attester: Address;
  /** The recipient address */
  recipient: Address;
  /** Creation timestamp */
  time: bigint;
  /** Expiration timestamp (0 if no expiration) */
  expirationTime: bigint;
  /** Whether this attestation is revocable */
  revocable: boolean;
  /** Reference UID */
  refUID: Hex;
  /** The attestation data */
  data: Hex;
  /** Value sent with the attestation */
  value: bigint;
}

/**
 * Schema data structure returned from queries
 */
export interface SchemaData {
  /** The schema UID */
  uid: Hex;
  /** The resolver address */
  resolver: Address;
  /** Whether attestations can be revoked */
  revocable: boolean;
  /** The schema string */
  schema: string;
}
