import { defineConfig } from "tsup";

export default defineConfig(() => {
  return {
    minify: false,
    sourcemap: true,
    dts: true,
    format: ["cjs", "esm"],
  };
});
