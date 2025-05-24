import { defineConfig } from "tsdown";

export default defineConfig([
  {
    entry: ["src/hasura.ts"],
    format: ["cjs", "esm"],
    dts: true,
    sourcemap: true,
    splitting: false,
    outExtension: ({ format }) => ({
      js: format === "esm" ? ".mjs" : ".cjs",
    }),
  },
  {
    entry: ["src/postgres.ts"],
    format: ["cjs", "esm"],
    dts: true,
    sourcemap: true,
    splitting: false,
    outExtension: ({ format }) => ({
      js: format === "esm" ? ".mjs" : ".cjs",
    }),
  },
]);
