import { describe, expect, mock, test } from "bun:test";
import { activeConfig } from "@settlemint/sdk-common/config";
import { withSettleMint } from "./with-settlemint.js";

// Mock the activeConfig function
mock.module("@settlemint/sdk-common/config", () => ({
  activeConfig: mock(() => {}),
}));

describe("withSettleMint", () => {
  const mockNextConfig = {
    webpack: mock((config) => config),
    experimental: {},
    rewrites: mock(() => Promise.resolve([])),
  };

  test("should return unmodified config when disabled", () => {
    const result = withSettleMint(mockNextConfig, { disabled: true });
    expect(result).toEqual(mockNextConfig);
  });

  test("should return unmodified config when activeConfig returns null", () => {
    (activeConfig as unknown as ReturnType<typeof mock>).mockReturnValue(null);
    const result = withSettleMint(mockNextConfig);
    expect(result).toEqual(mockNextConfig);
  });

  test("should modify config when not disabled and activeConfig returns a value", () => {
    (activeConfig as unknown as ReturnType<typeof mock>).mockReturnValue({
      thegraphGql: "http://thegraph.example.com",
      hasuraGql: "http://hasura.example.com",
      portalRest: "http://portal.example.com/rest",
      portalGql: "http://portal.example.com/graphql",
      nodeJsonRpc: "http://node.example.com/jsonrpc",
    });

    const result = withSettleMint(mockNextConfig);

    expect(result).not.toEqual(mockNextConfig);
    expect(result.experimental).toBeDefined();
    expect(result.rewrites).toBeDefined();
  });

  test("should add correct rewrites based on activeConfig", async () => {
    (activeConfig as unknown as ReturnType<typeof mock>).mockReturnValue({
      thegraphGql: "http://thegraph.example.com",
      hasuraGql: "http://hasura.example.com",
      portalRest: "http://portal.example.com/rest",
      portalGql: "http://portal.example.com/graphql",
      nodeJsonRpc: "http://node.example.com/jsonrpc",
    });

    const result = withSettleMint(mockNextConfig);
    const rewrites = await result.rewrites();

    expect(rewrites).toHaveLength(5);
    expect(rewrites).toContainEqual({
      source: "/proxy/thegraph/graphql",
      destination: "http://thegraph.example.com",
    });
    expect(rewrites).toContainEqual({
      source: "/proxy/hasura/graphql",
      destination: "http://hasura.example.com",
    });
    expect(rewrites).toContainEqual({
      source: "/proxy/portal/rest/:path*",
      destination: "http://portal.example.com/rest/:path*",
    });
    expect(rewrites).toContainEqual({
      source: "/proxy/portal/graphql",
      destination: "http://portal.example.com/graphql",
    });
    expect(rewrites).toContainEqual({
      source: "/proxy/node/jsonrpc",
      destination: "http://node.example.com/jsonrpc",
    });
  });
});
