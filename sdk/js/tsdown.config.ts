import { defineConfig } from "tsdown";
import { withPerformanceMonitoring } from "../../shared/tsdown-factory.ts";

export default defineConfig(
  withPerformanceMonitoring({
    entry: ["src/settlemint.ts"],
    format: ["cjs", "esm"],
    platform: "node",
    external: [], // Bundle everything except node modules
    dts: true,
    sourcemap: true,
    banner: {
      js: "/* SettleMint SDK - Main Package */",
    },
    define: {
      __SDK_NAME__: '"@settlemint/sdk-js"',
      __DEV__: JSON.stringify(process.env.NODE_ENV !== "production"),
      __PROD__: JSON.stringify(process.env.NODE_ENV === "production"),
      __VERSION__: JSON.stringify(process.env.npm_package_version || "dev"),
    },
    outExtension: ({ format }) => ({
      js: format === "esm" ? ".js" : ".cjs",
    }),
  }),
);
