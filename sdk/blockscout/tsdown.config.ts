import { defineConfig } from "tsdown";
// @ts-expect-error - tsdown-factory.ts is a .ts file
import { createNodePackage, withPerformanceMonitoring } from "../../shared/tsdown-factory.ts";

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
