import { defineConfig } from "tsdown";
import { createConfig, createSmartExternal, withPerformanceMonitoring } from "../../shared/tsdown-factory.js";

export default defineConfig(
  withPerformanceMonitoring(
    createConfig({
      entry: ["src/mcp.ts"],
      format: ["esm"],
      platform: "node",
      shims: true,
      external: createSmartExternal(true), // Bundle small utilities for MCP
      banner: {
        js: "/* SettleMint MCP Server - AI Assistant Optimized */",
      },
      define: {
        __MCP_SERVER__: "true",
        __AI_TOOLS__: "true",
      },
    }),
  ),
);
