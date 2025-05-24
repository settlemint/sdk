import { describe, expect, it } from "bun:test";
import { ClientOptionsSchema } from "./hasura.js";

describe("ClientOptionsSchema", () => {
  it("should validate valid options", () => {
    const validOptions = {
      instance: "https://hasura.example.com",
      accessToken: "sm_aat_abcdef123456789",
      adminSecret: "admin-secret-123",
    };

    const result = ClientOptionsSchema.safeParse(validOptions);
    expect(result.success).toBe(true);
  });

  it("should validate options without access token", () => {
    const validOptions = {
      instance: "https://hasura.example.com",
      adminSecret: "admin-secret-123",
    };

    const result = ClientOptionsSchema.safeParse(validOptions);
    expect(result.success).toBe(true);
  });

  it("should validate options with cache setting", () => {
    const validOptions = {
      instance: "https://hasura.example.com",
      accessToken: "sm_aat_abcdef123456789",
      adminSecret: "admin-secret-123",
      cache: "no-cache" as const,
    };

    const result = ClientOptionsSchema.safeParse(validOptions);
    expect(result.success).toBe(true);
  });

  it("should reject missing admin secret", () => {
    const invalidOptions = {
      instance: "https://hasura.example.com",
      accessToken: "sm_aat_abcdef123456789",
    };

    const result = ClientOptionsSchema.safeParse(invalidOptions);
    expect(result.success).toBe(false);
  });

  it("should reject invalid instance URL", () => {
    const invalidOptions = {
      instance: "not-a-url",
      accessToken: "sm_aat_abcdef123456789",
      adminSecret: "admin-secret-123",
    };

    const result = ClientOptionsSchema.safeParse(invalidOptions);
    expect(result.success).toBe(false);
  });

  it("should reject invalid cache value", () => {
    const invalidOptions = {
      instance: "https://hasura.example.com",
      accessToken: "sm_aat_abcdef123456789",
      adminSecret: "admin-secret-123",
      cache: "invalid-cache",
    };

    const result = ClientOptionsSchema.safeParse(invalidOptions);
    expect(result.success).toBe(false);
  });
});
