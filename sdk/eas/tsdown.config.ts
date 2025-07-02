import { defineConfig } from "tsdown";
import { createWebOptimizedPackage, withPerformanceMonitoring } from "../../shared/tsdown-factory";

const configs = createWebOptimizedPackage(["src/eas.ts"], {
  external: ["@settlemint/sdk-portal", "@settlemint/sdk-utils", "viem"],
  banner: {
    js: "/* SettleMint EAS SDK - Portal Optimized */",
  },
  define: {
    __EAS_PORTAL_PACKAGE__: "true",
  },
});

export default defineConfig(configs.map((config) => withPerformanceMonitoring(config)));
