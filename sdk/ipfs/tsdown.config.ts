import { defineConfig } from "tsdown";
// @ts-expect-error - tsdown-factory.ts is a .ts file
import { createWebOptimizedPackage, withPerformanceMonitoring } from "../../shared/tsdown-factory.ts";

const configs = createWebOptimizedPackage(["src/ipfs.ts"], {
  external: ["@settlemint/sdk-js"],
  banner: {
    js: "/* SettleMint IPFS SDK - Distributed Storage */",
  },
  define: {
    __IPFS_PACKAGE__: "true",
    __DISTRIBUTED_STORAGE__: "true",
  },
});

export default defineConfig(configs.map((config) => withPerformanceMonitoring(config)));
