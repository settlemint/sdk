import { defineConfig } from "tsdown";
import { createNodePackage, withPerformanceMonitoring } from "../../shared/tsdown-factory";

export default defineConfig(
  withPerformanceMonitoring(
    createNodePackage(["src/settlemint.ts"], {
      external: [], // Bundle everything except node modules
      banner: {
        js: "/* SettleMint SDK - Main Package */",
      },
      define: {
        __SDK_NAME__: '"@settlemint/sdk-js"',
      },
    }),
  ),
);
