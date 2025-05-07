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

export interface SchemaField {
  name: string;
  type: EASFieldType;
  description?: string;
}

export interface RegisterSchemaOptions {
  fields: SchemaField[];
  resolverAddress: string;
  revocable: boolean;
}
