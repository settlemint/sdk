import { describe, expect, test } from "bun:test";
import { ZodError } from "zod";
import { IdSchema, SettleMintClientOptionsSchema, validate } from "./schemas";

describe("Schemas", () => {
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
      const invalidId = "not-a-valid-id";
      expect(() => IdSchema.parse(invalidId)).toThrow(ZodError);
    });
  });

  describe("SettleMintClientOptionsSchema", () => {
    test("should validate valid client options", () => {
      const validOptions = {
        accessToken: "btp_pat_validtoken",
        instance: "https://example.com",
      };
      expect(() => SettleMintClientOptionsSchema.parse(validOptions)).not.toThrow();
    });

    test("should reject invalid access token", () => {
      const invalidOptions = {
        accessToken: "invalid_token",
        instance: "https://example.com",
      };
      expect(() => SettleMintClientOptionsSchema.parse(invalidOptions)).toThrow(ZodError);
    });

    test("should reject invalid URL", () => {
      const invalidOptions = {
        accessToken: "btp_pat_validtoken",
        instance: "not-a-url",
      };
      expect(() => SettleMintClientOptionsSchema.parse(invalidOptions)).toThrow(ZodError);
    });
  });

  describe("validate function", () => {
    test("should return parsed value for valid input", () => {
      const validId = "550e8400-e29b-41d4-a716-446655440000";
      expect(validate(IdSchema, validId)).toBe(validId);
    });

    test("should throw formatted error for invalid input", () => {
      const invalidId = "not-a-valid-id";
      expect(() => validate(IdSchema, invalidId)).toThrow(/Validation error/);
    });

    test("should handle non-ZodError", () => {
      const mockSchema = {
        parse: () => {
          throw new Error("Non-Zod error");
        },
      };
      // biome-ignore lint/suspicious/noExplicitAny: by design
      expect(() => validate(mockSchema as any, "any")).toThrow("Non-Zod error");
    });
  });
});
