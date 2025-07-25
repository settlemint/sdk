import { describe, expect, it } from "bun:test";
import { ClientOptionsSchema, ServerClientOptionsSchema } from "./client-options.schema.js";

describe("ClientOptionsSchema", () => {
  it("should validate valid options", () => {
    const validOptions = {
      instance: "https://ipfs.example.com",
    };

    const result = ClientOptionsSchema.safeParse(validOptions);
    expect(result.success).toBe(true);
  });

  it("should reject invalid URL", () => {
    const invalidOptions = {
      instance: "not-a-url",
    };

    const result = ClientOptionsSchema.safeParse(invalidOptions);
    expect(result.success).toBe(false);
  });

  it("should reject missing instance", () => {
    const invalidOptions = {};

    const result = ClientOptionsSchema.safeParse(invalidOptions);
    expect(result.success).toBe(false);
  });

  it("should accept URLs with different protocols", () => {
    const validOptions = {
      instance: "http://localhost:5001",
    };

    const result = ClientOptionsSchema.safeParse(validOptions);
    expect(result.success).toBe(true);
  });
});

describe("ServerClientOptionsSchema", () => {
  const generateTestToken = () => `sm_aat_${Math.random().toString(36).substring(2, 15)}`;
  const generatePersonalToken = () => `sm_pat_${Math.random().toString(36).substring(2, 15)}`;

  it("should validate valid server options", () => {
    const validOptions = {
      instance: "https://ipfs.example.com",
      accessToken: generateTestToken(),
    };

    const result = ServerClientOptionsSchema.safeParse(validOptions);
    expect(result.success).toBe(true);
  });

  it("should validate server options with personal access token", () => {
    const validOptions = {
      instance: "https://ipfs.example.com",
      accessToken: generatePersonalToken(),
    };

    const result = ServerClientOptionsSchema.safeParse(validOptions);
    expect(result.success).toBe(true);
  });

  it("should reject invalid access token format", () => {
    const invalidOptions = {
      instance: "https://ipfs.example.com",
      accessToken: "invalid-token",
    };

    const result = ServerClientOptionsSchema.safeParse(invalidOptions);
    expect(result.success).toBe(false);
  });

  it("should reject invalid URL", () => {
    const invalidOptions = {
      instance: "not-a-url",
      accessToken: "sm_aat_abcdef123456789",
    };

    const result = ServerClientOptionsSchema.safeParse(invalidOptions);
    expect(result.success).toBe(false);
  });

  it("should accept valid personal access token", () => {
    const validOptions = {
      instance: "https://ipfs.example.com",
      accessToken: "sm_aat_abcdef123456789",
    };

    const result = ServerClientOptionsSchema.safeParse(validOptions);
    expect(result.success).toBe(true);
  });
});
