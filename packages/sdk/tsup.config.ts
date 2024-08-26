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
      entry: ["src/cli/cli.ts"],
      shims: true,
    },
    {
      entry: ["src/next/browser/browser.ts"],
    },
    {
      entry: ["src/next/node/node.ts"],
    },
    {
      entry: ["src/next/edge/edge.ts"],
    },
  ].map((config) => ({
    minify: !watch,
    ...sharedConfig,
    ...config,
  }));
});
