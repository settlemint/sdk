import { describe, expect, test } from "bun:test";
import { ZodError } from "zod";
import { UrlSchema } from "./url.schema.js";

describe("UrlSchema", () => {
  test("should validate a valid URL", () => {
    const validURL = "https://example.com";
    expect(() => UrlSchema.parse(validURL)).not.toThrow();
  });

  test("should reject an invalid URL", () => {
    const invalidURLs = ["not-a-valid-url", "123", "", "example.com/path"];

    for (const invalidURL of invalidURLs) {
      expect(() => UrlSchema.parse(invalidURL)).toThrow(ZodError);
    }
  });

  test("should not reject a URL with trailing spaces", () => {
    expect(() => UrlSchema.parse(" https://example.com/trailing-space ")).not.toThrow();
  });

  test("should reject non-string inputs", () => {
    const invalidInputs = [null, undefined, 123, true, {}, []];

    for (const invalidInput of invalidInputs) {
      expect(() => UrlSchema.parse(invalidInput)).toThrow(ZodError);
    }
  });
});
