import { defineConfig } from "tsup";

export default defineConfig(() => {
  return {
    banner: { js: "#!/usr/bin/env node" },
    minify: true,
    entry: ["src/index.ts"],
    sourcemap: true,
    clean: true,
    treeshake: true,
    splitting: false,
  };
});
