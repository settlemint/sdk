import { type Options, defineConfig } from "tsup";

const sharedConfig: Options = {
  sourcemap: true,
  dts: true,
  splitting: false,
  treeshake: false,
  format: ["cjs", "esm"],
  outExtension: ({ format }) => ({
    js: format === "esm" ? ".mjs" : ".cjs",
  }),
};

export default defineConfig(({ watch }) => {
  return [
    {
      entry: ["src/browser/browser.ts"],
    },
    {
      entry: ["src/node/node.ts"],
    },
    {
      entry: ["src/edge/edge.ts"],
    },
  ].map((config) => ({
    minify: !watch,
    ...sharedConfig,
    ...config,
  }));
});
