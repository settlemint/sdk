import { defineConfig } from "tsup";

export default defineConfig(() => {
  return {
    banner: { js: "#!/usr/bin/env node" },
    minify: false,
    entry: ["src/index.ts"],
    sourcemap: true,
    clean: true,
    treeshake: true,
    splitting: false,
    shims: true,
  };
});
