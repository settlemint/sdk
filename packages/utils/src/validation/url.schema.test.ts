import { describe, expect, test } from "bun:test";
import { ZodError } from "zod";
import { UrlSchema } from "./url.schema.js";

describe("UrlSchema", () => {
  test("should validate correct URL formats", () => {
    const validUrls = [
      "https://example.com",
      "http://subdomain.example.com",
      "https://example.com/path",
      "http://example.com:8080",
      "https://example.com/path?query=string",
      "http://localhost:3000",
      "https://192.168.1.1",
    ];

    for (const url of validUrls) {
      expect(() => UrlSchema.parse(url)).not.toThrow();
    }
  });

  test("should reject invalid URL formats", () => {
    const invalidUrls = [
      "not-a-url",
      "ftp://example.com",
      "//example.com",
      "http://",
      "https://",
      "",
      "http:/example.com",
      "https:example.com",
      "http://example.com:abc",
    ];

    for (const url of invalidUrls) {
      expect(() => UrlSchema.parse(url)).toThrow(ZodError);
    }
  });

  test("should reject non-string inputs", () => {
    const invalidInputs = [null, undefined, 123, true, {}, []];

    for (const input of invalidInputs) {
      expect(() => UrlSchema.parse(input)).toThrow(ZodError);
    }
  });

  test("should trim whitespace from valid URLs", () => {
    const urlWithWhitespace = "  https://example.com  ";
    const result = UrlSchema.parse(urlWithWhitespace);
    expect(result).toBe("https://example.com");
  });
});
