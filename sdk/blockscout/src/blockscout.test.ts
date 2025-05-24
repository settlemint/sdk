import { describe, expect, it } from "bun:test";
import { ClientOptionsSchema } from "./blockscout.js";

describe("ClientOptionsSchema", () => {
  it("should validate valid options", () => {
    const validOptions = {
      instance: "https://api.example.com",
      accessToken: "sm_aat_abcdef123456789",
    };

    const result = ClientOptionsSchema.safeParse(validOptions);
    expect(result.success).toBe(true);
  });

  it("should validate options without access token", () => {
    const validOptions = {
      instance: "https://api.example.com",
    };

    const result = ClientOptionsSchema.safeParse(validOptions);
    expect(result.success).toBe(true);
  });

  it("should reject invalid instance URL", () => {
    const invalidOptions = {
      instance: "not-a-url",
      accessToken: "sm_aat_abcdef123456789",
    };

    const result = ClientOptionsSchema.safeParse(invalidOptions);
    expect(result.success).toBe(false);
  });

  it("should reject invalid access token format", () => {
    const invalidOptions = {
      instance: "https://api.example.com",
      accessToken: "invalid-token",
    };

    const result = ClientOptionsSchema.safeParse(invalidOptions);
    expect(result.success).toBe(false);
  });

  it("should reject missing instance", () => {
    const invalidOptions = {
      accessToken: "sm_aat_abcdef123456789",
    };

    const result = ClientOptionsSchema.safeParse(invalidOptions);
    expect(result.success).toBe(false);
  });
});
