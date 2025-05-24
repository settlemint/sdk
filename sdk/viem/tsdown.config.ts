import { defineConfig } from "tsdown";
import { createWebOptimizedPackage, withPerformanceMonitoring } from "../../shared/tsdown-factory.js";

const configs = createWebOptimizedPackage(["src/viem.ts"], {
  shims: true,
  external: ["viem", "viem/accounts", "viem/chains", "@settlemint/sdk-js"],
  banner: {
    js: "/* SettleMint Viem SDK - Web3 Optimized */",
  },
  define: {
    __WEB3_PACKAGE__: "true",
  },
});

export default defineConfig(configs.map((config) => withPerformanceMonitoring(config)));
