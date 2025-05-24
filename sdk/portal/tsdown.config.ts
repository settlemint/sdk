import { defineConfig } from "tsdown";
import { createWebOptimizedPackage, withPerformanceMonitoring } from "../../shared/tsdown-factory.js";

const configs = createWebOptimizedPackage(["src/portal.ts"], {
  external: ["graphql", "graphql-ws", "ws", "viem", "@settlemint/sdk-js", "@settlemint/sdk-utils"],
  banner: {
    js: "/* SettleMint Portal SDK - Blockchain Portal Optimized */",
  },
  define: {
    __PORTAL_PACKAGE__: "true",
    __GRAPHQL_ENABLED__: "true",
  },
});

export default defineConfig(configs.map((config) => withPerformanceMonitoring(config)));
