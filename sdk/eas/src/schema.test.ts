import { describe, expect, test } from "bun:test";
import {
  type EASFieldType,
  EAS_FIELD_TYPES,
  type RegisterSchemaOptions,
  type SchemaField,
  buildSchemaString,
  registerSchema,
  validateFieldName,
  validateFieldType,
  validateSchemaFields,
} from "./schema.js";

describe("EAS Schema Types", () => {
  test("EAS_FIELD_TYPES should contain all supported types", () => {
    expect(EAS_FIELD_TYPES).toEqual({
      string: "string",
      address: "address",
      bool: "bool",
      bytes: "bytes",
      bytes32: "bytes32",
      uint256: "uint256",
      int256: "int256",
      uint8: "uint8",
      int8: "int8",
    });
  });

  test("EASFieldType should be a union of all field type keys", () => {
    const validType: EASFieldType = "string";
    expect(validType).toBeDefined();
  });
});

describe("SchemaField Validation", () => {
  test("validateFieldName should accept valid names", () => {
    expect(() => validateFieldName("validName")).not.toThrow();
    expect(() => validateFieldName("valid_name")).not.toThrow();
    expect(() => validateFieldName("validName123")).not.toThrow();
  });

  test("validateFieldName should reject invalid names", () => {
    expect(() => validateFieldName("")).toThrow("Field name cannot be empty");
    expect(() => validateFieldName("invalid name")).toThrow("Field name cannot contain spaces");
    expect(() => validateFieldName("123invalid")).toThrow("Field name must start with a letter or underscore");
    expect(() => validateFieldName("invalid-name")).toThrow("Field name must start with a letter or underscore");
  });

  test("validateFieldType should accept valid types", () => {
    Object.keys(EAS_FIELD_TYPES).forEach((type) => {
      expect(() => validateFieldType(type)).not.toThrow();
    });
  });

  test("validateFieldType should reject invalid types", () => {
    expect(() => validateFieldType("invalidType")).toThrow();
  });
});

describe("Schema Fields Validation", () => {
  const validFields: SchemaField[] = [
    { name: "name", type: "string" },
    { name: "age", type: "uint8" },
  ];

  test("validateSchemaFields should accept valid fields", () => {
    expect(() => validateSchemaFields(validFields)).not.toThrow();
  });

  test("validateSchemaFields should reject empty fields array", () => {
    expect(() => validateSchemaFields([])).toThrow("Schema must have at least one field");
  });

  test("validateSchemaFields should reject duplicate field names", () => {
    const duplicateFields: SchemaField[] = [
      { name: "name", type: "string" },
      { name: "name", type: "uint8" },
    ];
    expect(() => validateSchemaFields(duplicateFields)).toThrow("Duplicate field name: name");
  });
});

describe("Schema String Building", () => {
  test("buildSchemaString should create valid schema strings", () => {
    const fields: SchemaField[] = [
      { name: "name", type: "string" },
      { name: "age", type: "uint8" },
      { name: "isActive", type: "bool" },
    ];

    const schemaString = buildSchemaString(fields);
    expect(schemaString).toBe("string name, uint8 age, bool isActive");
  });

  test("buildSchemaString should validate fields before building", () => {
    const invalidFields: SchemaField[] = [
      { name: "name", type: "string" },
      { name: "invalid type", type: "invalidType" as EASFieldType },
    ];

    expect(() => buildSchemaString(invalidFields)).toThrow();
  });
});

describe("Schema Registration", () => {
  const validOptions: RegisterSchemaOptions = {
    fields: [
      { name: "name", type: "string" as const },
      { name: "age", type: "uint8" as const },
    ],
    resolverAddress: "0x1234567890123456789012345678901234567890",
    revocable: true,
  };

  test("registerSchema should accept valid options", async () => {
    const schemaUID = await registerSchema(validOptions);
    expect(schemaUID).toBeDefined();
    expect(schemaUID).toMatch(/^0x[0-9a-f]{64}$/);
  });

  test("registerSchema should reject invalid resolver address", async () => {
    const invalidOptions: RegisterSchemaOptions = {
      ...validOptions,
      resolverAddress: "invalid-address",
    };

    await expect(registerSchema(invalidOptions)).rejects.toThrow();
  });

  test("registerSchema should validate fields before registration", async () => {
    const invalidOptions: RegisterSchemaOptions = {
      ...validOptions,
      fields: [
        { name: "name", type: "string" as const },
        { name: "invalid type", type: "invalidType" as EASFieldType },
      ],
    };

    await expect(registerSchema(invalidOptions)).rejects.toThrow();
  });
});
