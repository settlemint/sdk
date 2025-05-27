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
 * Options for registering a new schema in the EAS Schema Registry.
 */
export interface RegisterSchemaOptions {
  /** Array of fields that make up the schema */
  fields: SchemaField[];
  /** Address of the resolver contract that will handle attestations */
  resolverAddress: string;
  /** Whether attestations using this schema can be revoked */
  revocable: boolean;
}
