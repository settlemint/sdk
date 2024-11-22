import { type Options, defineConfig } from "tsup";

const sharedConfig: Options = {
  sourcemap: true,
  dts: true,
  splitting: false,
  format: ["cjs", "esm"],
  outExtension: ({ format }) => ({
    js: format === "esm" ? ".mjs" : ".cjs",
  }),
};

export default defineConfig(({ watch }) => {
  return [
    {
      entry: ["src/blockscout.ts"],
      shims: true,
    },
  ].map((config) => ({
    minify: !watch,
    ...sharedConfig,
    ...config,
  }));
});
