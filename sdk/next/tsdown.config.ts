import { defineConfig } from "tsdown";

export default defineConfig([
  {
    entry: ["src/all.ts"],
    format: ["cjs", "esm"],
    dts: true,
    sourcemap: true,
    splitting: false,
    outExtension: ({ format }) => ({
      js: format === "esm" ? ".mjs" : ".cjs",
    }),
  },
  {
    entry: ["src/components/*.tsx"],
    format: ["cjs", "esm"],
    dts: true,
    sourcemap: true,
    splitting: false,
    outDir: "dist/components",
    outExtension: ({ format }) => ({
      js: format === "esm" ? ".mjs" : ".cjs",
    }),
  },
  {
    entry: ["src/config/*.ts"],
    format: ["cjs", "esm"],
    dts: true,
    sourcemap: true,
    splitting: false,
    outDir: "dist/config",
    outExtension: ({ format }) => ({
      js: format === "esm" ? ".mjs" : ".cjs",
    }),
  },
]);
