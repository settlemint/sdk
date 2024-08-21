import { defineConfig } from "tsup";

export default defineConfig(() => {
  return {
    banner: { js: "#!/usr/bin/env node" },
    minify: false,
    sourcemap: true,
    shims: true,
    dts: true,
    spltting: false,
    format: ["cjs", "esm"],
  };
});
