import { describe, expect, test } from "bun:test";
import { ZodError } from "zod";
import { IdSchema } from "./id.schema.js";

describe("IdSchema", () => {
  test("should validate a valid PostgreSQL UUID", () => {
    const validUUID = "550e8400-e29b-41d4-a716-446655440000";
    expect(() => IdSchema.parse(validUUID)).not.toThrow();
  });

  test("should validate a valid MongoDB ObjectID", () => {
    const validObjectID = "507f1f77bcf86cd799439011";
    expect(() => IdSchema.parse(validObjectID)).not.toThrow();
  });

  test("should reject an invalid ID", () => {
    const invalidIds = [
      "not-a-valid-id",
      "123",
      "",
      "550e8400-e29b-41d4-a716-44665544000", // UUID too short
      "550e8400-e29b-41d4-a716-4466554400000", // UUID too long
      "507f1f77bcf86cd79943901", // ObjectID too short
      "507f1f77bcf86cd7994390111", // ObjectID too long
      "507f1f77bcf86cd79943901g", // ObjectID with invalid character
    ];

    for (const invalidId of invalidIds) {
      expect(() => IdSchema.parse(invalidId)).toThrow(ZodError);
    }
  });

  test("should reject non-string inputs", () => {
    const invalidInputs = [null, undefined, 123, true, {}, []];

    for (const invalidInput of invalidInputs) {
      expect(() => IdSchema.parse(invalidInput)).toThrow(ZodError);
    }
  });
});
