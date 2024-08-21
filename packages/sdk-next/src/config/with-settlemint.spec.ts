import { activeConfig } from "@settlemint/sdk-common/config";
import { describe, expect, mock, test } from "bun:test";
import type { NextConfig } from "next";
import { withSettleMint } from "./with-settlemint.js";

// Mock the activeConfig function
mock.module("@settlemint/sdk-common/config", () => ({
  activeConfig: mock(() => {}),
}));

describe("withSettleMint", () => {
  const mockNextConfig: NextConfig = {
    rewrites: mock(() => Promise.resolve([])),
  };

  test("should return unmodified config when disabled", () => {
    const result = withSettleMint(mockNextConfig, { disabled: true });
    expect(result).toEqual(mockNextConfig);
  });

  test("should return config with default output when activeConfig returns null", () => {
    (activeConfig as unknown as ReturnType<typeof mock>).mockReturnValue(null);
    const result = withSettleMint(mockNextConfig);
    expect(result).toEqual({ ...mockNextConfig, output: "standalone" });
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
    expect(result.output).toBe("standalone");
    expect(result.rewrites).toBeDefined();
  });

  test("should respect custom output option", () => {
    (activeConfig as unknown as ReturnType<typeof mock>).mockReturnValue({});
    const result = withSettleMint(mockNextConfig, { output: "export" });
    expect(result.output).toBe("export");
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
    const rewrites = typeof result.rewrites === "function" ? await result.rewrites() : [];

    expect(Array.isArray(rewrites)).toBe(true);
    if (Array.isArray(rewrites)) {
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
    }
  });

  test("should handle existing rewrites", async () => {
    (activeConfig as unknown as ReturnType<typeof mock>).mockReturnValue({
      thegraphGql: "http://thegraph.example.com",
    });

    const existingRewrites = [{ source: "/existing", destination: "/existing-dest" }];
    const mockConfigWithRewrites: NextConfig = {
      rewrites: mock(() => Promise.resolve(existingRewrites)),
    };

    const result = withSettleMint(mockConfigWithRewrites);
    const rewrites = typeof result.rewrites === "function" ? await result.rewrites() : [];

    expect(Array.isArray(rewrites)).toBe(true);
    if (Array.isArray(rewrites)) {
      expect(rewrites).toHaveLength(2);
      expect(rewrites).toContainEqual(existingRewrites[0]);
      expect(rewrites).toContainEqual({
        source: "/proxy/thegraph/graphql",
        destination: "http://thegraph.example.com",
      });
    }
  });

  test("should handle complex existing rewrites structure", async () => {
    (activeConfig as unknown as ReturnType<typeof mock>).mockReturnValue({
      thegraphGql: "http://thegraph.example.com",
    });

    const complexRewrites = {
      beforeFiles: [{ source: "/before", destination: "/before-dest" }],
      afterFiles: [{ source: "/after", destination: "/after-dest" }],
      fallback: [{ source: "/fallback", destination: "/fallback-dest" }],
    };
    const mockConfigWithComplexRewrites: NextConfig = {
      rewrites: mock(() => Promise.resolve(complexRewrites)),
    };

    const result = withSettleMint(mockConfigWithComplexRewrites);
    const rewrites = typeof result.rewrites === "function" ? await result.rewrites() : [];

    expect(rewrites).toEqual({
      beforeFiles: complexRewrites.beforeFiles,
      afterFiles: [
        ...complexRewrites.afterFiles,
        {
          source: "/proxy/thegraph/graphql",
          destination: "http://thegraph.example.com",
        },
      ],
      fallback: complexRewrites.fallback,
    });
  });
});
