import { defineConfig } from "tsdown";
import { createWebOptimizedPackage, withPerformanceMonitoring } from "../../shared/tsdown-factory.js";

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
