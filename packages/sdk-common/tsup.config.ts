import { defineConfig } from "tsup";

export default defineConfig(() => {
  return {
    minify: false,
    sourcemap: true,
    dts: true,
    spltting: false,
    format: ["cjs", "esm"],
  };
});
