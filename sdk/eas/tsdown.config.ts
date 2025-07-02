import { defineConfig } from "tsdown";
// @ts-expect-error - tsdown-factory.ts is a .ts file
import { createWebOptimizedPackage, withPerformanceMonitoring } from "../../shared/tsdown-factory.ts";

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
