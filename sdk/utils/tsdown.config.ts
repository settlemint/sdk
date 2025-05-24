import { defineConfig } from "tsdown";

export default defineConfig([
  {
    entry: ["src/index.ts"],
    format: ["cjs", "esm"],
    dts: true,
    sourcemap: true,
    splitting: false,
    outExtension: ({ format }) => ({
      js: format === "esm" ? ".mjs" : ".cjs",
    }),
  },
  {
    entry: ["src/environment.ts"],
    format: ["cjs", "esm"],
    dts: true,
    sourcemap: true,
    splitting: false,
    outExtension: ({ format }) => ({
      js: format === "esm" ? ".mjs" : ".cjs",
    }),
  },
  {
    entry: ["src/filesystem.ts"],
    format: ["cjs", "esm"],
    dts: true,
    sourcemap: true,
    splitting: false,
    outExtension: ({ format }) => ({
      js: format === "esm" ? ".mjs" : ".cjs",
    }),
  },
  {
    entry: ["src/http.ts"],
    format: ["cjs", "esm"],
    dts: true,
    sourcemap: true,
    splitting: false,
    outExtension: ({ format }) => ({
      js: format === "esm" ? ".mjs" : ".cjs",
    }),
  },
  {
    entry: ["src/logging.ts"],
    format: ["cjs", "esm"],
    dts: true,
    sourcemap: true,
    splitting: false,
    outExtension: ({ format }) => ({
      js: format === "esm" ? ".mjs" : ".cjs",
    }),
  },
  {
    entry: ["src/package-manager.ts"],
    format: ["cjs", "esm"],
    dts: true,
    sourcemap: true,
    splitting: false,
    outExtension: ({ format }) => ({
      js: format === "esm" ? ".mjs" : ".cjs",
    }),
  },
  {
    entry: ["src/runtime.ts"],
    format: ["cjs", "esm"],
    dts: true,
    sourcemap: true,
    splitting: false,
    outExtension: ({ format }) => ({
      js: format === "esm" ? ".mjs" : ".cjs",
    }),
  },
  {
    entry: ["src/terminal.ts"],
    format: ["cjs", "esm"],
    dts: true,
    sourcemap: true,
    splitting: false,
    outExtension: ({ format }) => ({
      js: format === "esm" ? ".mjs" : ".cjs",
    }),
  },
  {
    entry: ["src/validation.ts"],
    format: ["cjs", "esm"],
    dts: true,
    sourcemap: true,
    splitting: false,
    outExtension: ({ format }) => ({
      js: format === "esm" ? ".mjs" : ".cjs",
    }),
  },
]);
