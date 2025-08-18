import { defineConfig } from "tsdown";
// @ts-expect-error - tsdown-factory.ts is a .ts file
import { createWebOptimizedPackage, withPerformanceMonitoring } from "../../shared/tsdown-factory.ts";

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
