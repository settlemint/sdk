import { defineConfig } from "tsdown";
import { createMultiConfig, withPerformanceMonitoring } from "../../shared/tsdown-factory.ts";

export default createMultiConfig([
  {
    entry: ["src/all.ts"],
    format: ["cjs", "esm"],
    platform: "neutral", // Works in both Node.js and browser
    external: ["react", "react-dom", "next", "@settlemint/sdk-js"],
    banner: {
      js: "/* SettleMint Next.js SDK - Full Stack */",
    },
    define: {
      __NEXTJS_PACKAGE__: "true",
    },
  },
  {
    entry: ["src/components/*.tsx"],
    format: ["cjs", "esm"],
    platform: "neutral",
    outDir: "dist/components",
    external: ["react", "react-dom", "next"],
    banner: {
      js: "/* SettleMint Next.js Components */",
    },
    define: {
      __NEXTJS_COMPONENTS__: "true",
    },
  },
  {
    entry: ["src/config/*.ts"],
    format: ["cjs", "esm"],
    platform: "neutral",
    outDir: "dist/config",
    external: ["next", "@settlemint/sdk-js"],
    banner: {
      js: "/* SettleMint Next.js Config */",
    },
    define: {
      __NEXTJS_CONFIG__: "true",
    },
  },
]).map((config) => defineConfig(withPerformanceMonitoring(config)));
