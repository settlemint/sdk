import { defineConfig } from "tsup";

export default defineConfig(() => {
  return {
    minify: false,
    sourcemap: true,
    treeshake: true,
    splitting: false,
    dts: true,
    format: ["cjs", "esm"],
  };
});
