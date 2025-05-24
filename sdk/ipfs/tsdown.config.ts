import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/ipfs.ts"],
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  splitting: false,
  outExtension: ({ format }) => ({
    js: format === "esm" ? ".mjs" : ".cjs",
  }),
});
