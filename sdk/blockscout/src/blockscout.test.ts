import { describe, expect, it } from "bun:test";
import { ClientOptionsSchema } from "./blockscout.js";

describe("ClientOptionsSchema", () => {
  const generateTestToken = () => `sm_aat_${Math.random().toString(36).substring(2, 15)}`;

  it("should validate valid options", () => {
    const validOptions = {
      instance: "https://api.example.com",
      accessToken: generateTestToken(),
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
      accessToken: generateTestToken(),
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
      accessToken: generateTestToken(),
    };

    const result = ClientOptionsSchema.safeParse(invalidOptions);
    expect(result.success).toBe(false);
  });
});
