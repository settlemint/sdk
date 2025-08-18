import { defineConfig } from "tsdown";
// @ts-expect-error - tsdown-factory.ts is a .ts file
import { createWebOptimizedPackage, withPerformanceMonitoring } from "../../shared/tsdown-factory.ts";

const configs = createWebOptimizedPackage(["src/portal.ts"], {
  external: ["node:*", "graphql", "graphql-ws", "ws", "viem", "@settlemint/sdk-js", "@settlemint/sdk-utils"],
  banner: {
    js: "/* SettleMint Portal SDK - Blockchain Portal Optimized */",
  },
  define: {
    __PORTAL_PACKAGE__: "true",
    __GRAPHQL_ENABLED__: "true",
  },
});

export default defineConfig(configs.map((config) => withPerformanceMonitoring(config)));
