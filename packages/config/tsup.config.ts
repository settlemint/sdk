import { defineConfig } from "tsup";

export default defineConfig(() => {
  return {
    minify: false,
    entry: ["src/index.ts"],
    sourcemap: true,
    clean: true,
    treeshake: true,
    splitting: false,
    shims: true,
  };
});
