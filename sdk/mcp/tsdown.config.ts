import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/mcp.ts"],
  format: ["esm"],
  dts: true,
  sourcemap: true,
  splitting: false,
  shims: true,
  outExtension: ({ format }) => ({
    js: format === "esm" ? ".mjs" : ".cjs",
  }),
});
