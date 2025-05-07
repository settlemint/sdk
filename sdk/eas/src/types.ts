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
 *
 * @property name - The name of the field
 * @property type - The Solidity type of the field
 * @property description - Optional description of the field's purpose
 */
export interface SchemaField {
  name: string;
  type: EASFieldType;
  description?: string;
}

/**
 * Options for registering a new schema in the EAS Schema Registry.
 *
 * @property fields - Array of fields that make up the schema
 * @property resolverAddress - Address of the resolver contract that will handle attestations
 * @property revocable - Whether attestations using this schema can be revoked
 */
export interface RegisterSchemaOptions {
  fields: SchemaField[];
  resolverAddress: string;
  revocable: boolean;
}
