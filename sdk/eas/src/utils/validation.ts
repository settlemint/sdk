import type { Address } from "viem";
import { z } from "zod";
import { type EASFieldType, EAS_FIELD_TYPES, type SchemaField } from "../schema.js";

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

export function validateFieldType(type: string): asserts type is EASFieldType {
  if (!(type in EAS_FIELD_TYPES)) {
    throw new Error(`Invalid field type: ${type}. Must be one of: ${Object.keys(EAS_FIELD_TYPES).join(", ")}`);
  }
}

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

export function buildSchemaString(fields: SchemaField[]): string {
  validateSchemaFields(fields);
  return fields.map((field) => `${field.type} ${field.name}`).join(", ");
}

const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
const ethAddressSchema = z.custom<Address>((val) => {
  return typeof val === "string" && ethAddressRegex.test(val);
}, "Invalid Ethereum address");

/**
 * @description Zod schema for EASClientOptions.
 */
export const EASClientOptionsSchema = z.object({
  instance: z.string().url("Invalid instance URL"),
  accessToken: z.string().optional(),
  easContractAddress: ethAddressSchema.optional(),
  schemaRegistryContractAddress: ethAddressSchema.optional(),
  debug: z.boolean().optional(),
});
