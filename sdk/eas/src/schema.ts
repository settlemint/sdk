/**
 * Supported EAS schema field types.
 * Maps user-friendly type names to EAS-compatible type strings.
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

/**
 * Type representing all valid EAS field types.
 */
export type EASFieldType = keyof typeof EAS_FIELD_TYPES;

/**
 * Interface for defining a schema field.
 */
export interface SchemaField {
  /** The name of the field */
  name: string;
  /** The type of the field */
  type: EASFieldType;
  /** Optional description of the field */
  description?: string;
}

/**
 * Validates a schema field name.
 * @param name - The field name to validate
 * @throws Error if the name is invalid
 */
export function validateFieldName(name: string): void {
  if (!name) {
    throw new Error("Field name cannot be empty");
  }
  if (name.includes(" ")) {
    throw new Error("Field name cannot contain spaces");
  }
  if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name)) {
    throw new Error(
      "Field name must start with a letter or underscore and contain only alphanumeric characters and underscores",
    );
  }
}

/**
 * Validates a schema field type.
 * @param type - The field type to validate
 * @throws Error if the type is invalid
 */
export function validateFieldType(type: string): asserts type is EASFieldType {
  if (!(type in EAS_FIELD_TYPES)) {
    throw new Error(`Invalid field type: ${type}. Must be one of: ${Object.keys(EAS_FIELD_TYPES).join(", ")}`);
  }
}

/**
 * Validates an array of schema fields.
 * @param fields - The fields to validate
 * @throws Error if any field is invalid
 */
export function validateSchemaFields(fields: SchemaField[]): void {
  if (!fields || fields.length === 0) {
    throw new Error("Schema must have at least one field");
  }

  const seenNames = new Set<string>();
  for (const field of fields) {
    validateFieldName(field.name);
    validateFieldType(field.type);

    if (seenNames.has(field.name)) {
      throw new Error(`Duplicate field name: ${field.name}`);
    }
    seenNames.add(field.name);
  }
}

/**
 * Builds an EAS schema string from an array of fields.
 * @param fields - The fields to include in the schema
 * @returns The EAS-compatible schema string
 * @throws Error if any field is invalid
 */
export function buildSchemaString(fields: SchemaField[]): string {
  validateSchemaFields(fields);
  return fields.map((field) => `${field.type} ${field.name}`).join(", ");
}

/**
 * Options for registering a schema.
 */
export interface RegisterSchemaOptions {
  /** The fields that make up the schema */
  fields: SchemaField[];
  /** The Ethereum address of the resolver */
  resolverAddress: string;
  /** Whether attestations using this schema can be revoked */
  revocable: boolean;
}

/**
 * Validates an Ethereum address.
 * @param address - The address to validate
 * @throws Error if the address is invalid
 */
export function validateEthereumAddress(address: string): void {
  if (!address) {
    throw new Error("Resolver address cannot be empty");
  }
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    throw new Error("Invalid Ethereum address format");
  }
}

/**
 * Registers a new schema with EAS.
 * @param options - The schema registration options
 * @returns A promise that resolves to the schema UID
 * @throws Error if the schema registration fails
 */
export async function registerSchema(options: RegisterSchemaOptions): Promise<string> {
  const { fields, resolverAddress, revocable } = options;

  // Validate the schema fields
  validateSchemaFields(fields);

  // Validate the resolver address
  validateEthereumAddress(resolverAddress);

  // Build the schema string
  const schemaString = buildSchemaString(fields);

  // TODO: Implement actual EAS SDK registration
  // This is a placeholder that will be replaced with actual EAS SDK integration
  console.log(`[EAS] Registering schema: ${schemaString}`);
  console.log(`[EAS] Resolver: ${resolverAddress}`);
  console.log(`[EAS] Revocable: ${revocable}`);

  // Return a mock UID for now
  return `0x${"0".repeat(64)}`;
}
