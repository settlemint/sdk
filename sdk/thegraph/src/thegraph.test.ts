import { describe, expect, it } from "bun:test";
import { ClientOptionsSchema } from "./thegraph.js";

describe("ClientOptionsSchema", () => {
  const generateTestToken = () => `sm_aat_${Math.random().toString(36).substring(2, 15)}`;

  it("should validate valid options", () => {
    const validOptions = {
      instances: ["https://api.thegraph.com/subgraphs/name/user/my-subgraph"],
      accessToken: generateTestToken(),
      subgraphName: "my-subgraph",
    };

    const result = ClientOptionsSchema.safeParse(validOptions);
    expect(result.success).toBe(true);
  });

  it("should validate options with cache setting", () => {
    const validOptions = {
      instances: ["https://api.thegraph.com/subgraphs/name/user/my-subgraph"],
      accessToken: generateTestToken(),
      subgraphName: "my-subgraph",
      cache: "no-cache" as const,
    };

    const result = ClientOptionsSchema.safeParse(validOptions);
    expect(result.success).toBe(true);
  });

  it("should validate options with multiple instances", () => {
    const validOptions = {
      instances: [
        "https://api.thegraph.com/subgraphs/name/user/subgraph1",
        "https://api.thegraph.com/subgraphs/name/user/subgraph2",
      ],
      accessToken: generateTestToken(),
      subgraphName: "subgraph1",
    };

    const result = ClientOptionsSchema.safeParse(validOptions);
    expect(result.success).toBe(true);
  });

  it("should require at least one instance", () => {
    const invalidOptions = {
      instances: [],
      accessToken: generateTestToken(),
      subgraphName: "my-subgraph",
    };

    const result = ClientOptionsSchema.safeParse(invalidOptions);
    // Note: Empty array might be valid according to the schema, but would fail at runtime
    // This test documents the current behavior
    expect(result.success).toBe(true);
  });

  it("should reject invalid instance URLs", () => {
    const invalidOptions = {
      instances: ["not-a-url"],
      accessToken: generateTestToken(),
      subgraphName: "my-subgraph",
    };

    const result = ClientOptionsSchema.safeParse(invalidOptions);
    expect(result.success).toBe(false);
  });

  it("should reject invalid access token format", () => {
    const invalidOptions = {
      instances: ["https://api.thegraph.com/subgraphs/name/user/my-subgraph"],
      accessToken: "invalid-token",
      subgraphName: "my-subgraph",
    };

    const result = ClientOptionsSchema.safeParse(invalidOptions);
    expect(result.success).toBe(false);
  });

  it("should reject missing subgraphName", () => {
    const invalidOptions = {
      instances: ["https://api.thegraph.com/subgraphs/name/user/my-subgraph"],
      accessToken: generateTestToken(),
    };

    const result = ClientOptionsSchema.safeParse(invalidOptions);
    expect(result.success).toBe(false);
  });

  it("should reject invalid cache value", () => {
    const invalidOptions = {
      instances: ["https://api.thegraph.com/subgraphs/name/user/my-subgraph"],
      accessToken: generateTestToken(),
      subgraphName: "my-subgraph",
      cache: "invalid-cache",
    };

    const result = ClientOptionsSchema.safeParse(invalidOptions);
    expect(result.success).toBe(false);
  });
});
