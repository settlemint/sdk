import { describe, expect, test } from "bun:test";
import { ZodError } from "zod";
import { ClientOptionsSchema } from "./client-options.schema.js";

describe("Schemas", () => {
  describe("ClientOptionsSchema", () => {
    test("should validate valid client options", () => {
      const validOptions = {
        accessToken: "btp_pat_validtoken",
        instance: "https://example.com",
      };
      expect(() => ClientOptionsSchema.parse(validOptions)).not.toThrow();
    });

    test("should reject invalid access token", () => {
      const invalidOptions = {
        accessToken: "invalid_token",
        instance: "https://example.com",
      };
      expect(() => ClientOptionsSchema.parse(invalidOptions)).toThrow(ZodError);
    });

    test("should reject invalid URL", () => {
      const invalidOptions = {
        accessToken: "btp_pat_validtoken",
        instance: "not-a-url",
      };
      expect(() => ClientOptionsSchema.parse(invalidOptions)).toThrow(ZodError);
    });
  });
});
