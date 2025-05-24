import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/eas.ts"],
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  splitting: false,
  outExtension: ({ format }) => ({
    js: format === "esm" ? ".mjs" : ".cjs",
  }),
});
