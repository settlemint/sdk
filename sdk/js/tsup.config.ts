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
      entry: ["src/settlemint.ts"],
      ...sharedConfig,
    },
    {
      entry: ["src/challenge.ts"],
      ...sharedConfig,
    },
  ];
});
