import { defineConfig } from "tsup";

export default defineConfig(() => {
  return {
    minify: true,
    entry: ["src/index.ts"],
    sourcemap: true,
    clean: true,
    treeshake: true,
    splitting: false,
  };
});
