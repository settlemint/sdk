import { defineConfig } from "tsup";

export default defineConfig(() => {
  return {
    banner: { js: "#!/usr/bin/env node" },
    minify: false,
    sourcemap: true,
    treeshake: true,
    splitting: false,
    shims: true,
    dts: true,
    format: ["cjs", "esm"],
  };
});
