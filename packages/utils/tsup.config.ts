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
      entry: ["src/index.ts"],
      ...sharedConfig,
    },
    {
      entry: ["src/package-manager.ts"],
      ...sharedConfig,
    },
    {
      entry: ["src/validation.ts"],
      ...sharedConfig,
    },
    {
      entry: ["src/filesystem.ts"],
      ...sharedConfig,
    },
    {
      entry: ["src/runtime.ts"],
      ...sharedConfig,
    },
    {
      entry: ["src/environment.ts"],
      ...sharedConfig,
    },
  ];
});
