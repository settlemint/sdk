import { defineConfig } from "tsdown";
import { createNodePackage, withPerformanceMonitoring } from "../../shared/tsdown-factory";

export default defineConfig(
  withPerformanceMonitoring(
    createNodePackage(["src/blockscout.ts"], {
      shims: true,
      external: ["@settlemint/sdk-js"],
      banner: {
        js: "/* SettleMint Blockscout SDK - Blockchain Explorer */",
      },
      define: {
        __BLOCKSCOUT_PACKAGE__: "true",
      },
    }),
  ),
);
