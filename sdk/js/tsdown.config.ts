import { defineConfig } from "tsdown";
import { createNodePackage, createSmartExternal, withPerformanceMonitoring } from "../../shared/tsdown-factory.js";

export default defineConfig(
  withPerformanceMonitoring(
    createNodePackage(["src/settlemint.ts"], {
      external: createSmartExternal(false), // Externalize more for main SDK
      banner: {
        js: "/* SettleMint SDK - Main Package */",
      },
      define: {
        __SDK_NAME__: '"@settlemint/sdk-js"',
      },
    }),
  ),
);
