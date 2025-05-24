import { defineConfig } from "tsdown";
import { createWebOptimizedPackage, withPerformanceMonitoring } from "../../shared/tsdown-factory.ts";

const configs = createWebOptimizedPackage(["src/eas.ts"], {
  external: ["@ethereum-attestation-service/eas-sdk", "ethers", "viem", "@settlemint/sdk-js"],
  banner: {
    js: "/* SettleMint EAS SDK - Attestation Optimized */",
  },
  define: {
    __EAS_PACKAGE__: "true",
  },
});

export default defineConfig(configs.map((config) => withPerformanceMonitoring(config)));
