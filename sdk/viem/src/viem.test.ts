import { describe, expect, it } from "bun:test";
import { ClientOptionsSchema, GetChainIdOptionsSchema } from "./viem.js";

describe("ClientOptionsSchema", () => {
  const generateTestToken = () => `sm_aat_${Math.random().toString(36).substring(2, 15)}`;

  it("should validate valid options", () => {
    const validOptions = {
      accessToken: generateTestToken(),
      chainId: "1",
      chainName: "Ethereum",
      rpcUrl: "https://rpc.example.com",
    };

    const result = ClientOptionsSchema.safeParse(validOptions);
    expect(result.success).toBe(true);
  });

  it("should validate options without access token", () => {
    const validOptions = {
      chainId: "1",
      chainName: "Ethereum",
      rpcUrl: "https://rpc.example.com",
    };

    const result = ClientOptionsSchema.safeParse(validOptions);
    expect(result.success).toBe(true);
  });

  it("should reject invalid RPC URL", () => {
    const invalidOptions = {
      accessToken: generateTestToken(),
      chainId: "1",
      chainName: "Ethereum",
      rpcUrl: "not-a-url",
    };

    const result = ClientOptionsSchema.safeParse(invalidOptions);
    expect(result.success).toBe(false);
  });

  it("should reject missing required fields", () => {
    const invalidOptions = {
      accessToken: generateTestToken(),
    };

    const result = ClientOptionsSchema.safeParse(invalidOptions);
    expect(result.success).toBe(false);
  });
});

describe("GetChainIdOptionsSchema", () => {
  const generateTestToken = () => `sm_aat_${Math.random().toString(36).substring(2, 15)}`;

  it("should validate valid options", () => {
    const validOptions = {
      accessToken: generateTestToken(),
      rpcUrl: "https://rpc.example.com",
    };

    const result = GetChainIdOptionsSchema.safeParse(validOptions);
    expect(result.success).toBe(true);
  });

  it("should validate options without access token", () => {
    const validOptions = {
      rpcUrl: "https://rpc.example.com",
    };

    const result = GetChainIdOptionsSchema.safeParse(validOptions);
    expect(result.success).toBe(true);
  });

  it("should reject invalid RPC URL", () => {
    const invalidOptions = {
      rpcUrl: "not-a-url",
    };

    const result = GetChainIdOptionsSchema.safeParse(invalidOptions);
    expect(result.success).toBe(false);
  });
});
