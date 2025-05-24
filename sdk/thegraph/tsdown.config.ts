import { defineConfig } from "tsdown";
import { createWebOptimizedPackage, withPerformanceMonitoring } from "../../shared/tsdown-factory.js";

const configs = createWebOptimizedPackage(["src/thegraph.ts"], {
  external: ["graphql", "@settlemint/sdk-js"],
  banner: {
    js: "/* SettleMint The Graph SDK - Indexing Protocol */",
  },
  define: {
    __THEGRAPH_PACKAGE__: "true",
    __INDEXING_PROTOCOL__: "true",
  },
});

export default defineConfig(configs.map((config) => withPerformanceMonitoring(config)));
