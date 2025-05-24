import { describe, expect, it } from "bun:test";
import type { NextConfig } from "next";
import { type WithSettleMintOptions, withSettleMint } from "./with-settlemint.js";

describe("withSettleMint", () => {
  it("should return unmodified config when disabled", async () => {
    const originalConfig: NextConfig = {
      reactStrictMode: false,
      poweredByHeader: true,
    };

    const options: WithSettleMintOptions = { disabled: true };
    const result = await withSettleMint(originalConfig, options);

    expect(result).toEqual(originalConfig);
  });

  it("should apply SettleMint defaults to empty config", async () => {
    const originalConfig: NextConfig = {};
    const result = await withSettleMint(originalConfig);

    expect(result).toEqual({
      headers: expect.any(Function),
      poweredByHeader: false,
      reactStrictMode: true,
    });
  });

  it("should override existing config properties", async () => {
    const originalConfig: NextConfig = {
      reactStrictMode: false,
      poweredByHeader: true,
      distDir: ".next",
    };

    const result = await withSettleMint(originalConfig);

    expect(result).toEqual({
      distDir: ".next",
      headers: expect.any(Function),
      poweredByHeader: false,
      reactStrictMode: true,
    });
  });

  it("should preserve custom config properties", async () => {
    const originalConfig: NextConfig = {
      distDir: "custom-dist",
      experimental: {
        turbo: {},
      },
      env: {
        CUSTOM_VAR: "value",
      },
    };

    const result = await withSettleMint(originalConfig);

    expect(result).toEqual({
      distDir: "custom-dist",
      experimental: {
        turbo: {},
      },
      env: {
        CUSTOM_VAR: "value",
      },
      headers: expect.any(Function),
      poweredByHeader: false,
      reactStrictMode: true,
    });
  });

  it("should set security headers correctly", async () => {
    const originalConfig: NextConfig = {};
    const result = await withSettleMint(originalConfig);

    expect(result.headers).toBeDefined();

    if (result.headers) {
      const headers = await result.headers();
      expect(headers).toEqual([
        {
          source: "/(.*)",
          headers: [{ key: "X-Frame-Options", value: "DENY" }],
        },
      ]);
    }
  });

  it("should work with default options", async () => {
    const originalConfig: NextConfig = {
      distDir: "build",
    };

    const result = await withSettleMint(originalConfig);

    expect(result).toEqual({
      distDir: "build",
      headers: expect.any(Function),
      poweredByHeader: false,
      reactStrictMode: true,
    });
  });

  it("should work with no options parameter", async () => {
    const originalConfig: NextConfig = {};
    const result = await withSettleMint(originalConfig);

    expect(result.poweredByHeader).toBe(false);
    expect(result.reactStrictMode).toBe(true);
    expect(result.headers).toBeDefined();
  });
});
