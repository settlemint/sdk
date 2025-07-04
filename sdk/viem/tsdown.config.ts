import { defineConfig } from "tsdown";
// @ts-expect-error - tsdown-factory.ts is a .ts file
import { createWebOptimizedPackage, withPerformanceMonitoring } from "../../shared/tsdown-factory.ts";

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
