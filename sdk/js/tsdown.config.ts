import { defineConfig } from "tsdown";
// @ts-expect-error - tsdown-factory.ts is a .ts file
import { createNodePackage, withPerformanceMonitoring } from "../../shared/tsdown-factory.ts";

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
