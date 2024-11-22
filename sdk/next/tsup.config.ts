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
      entry: ["src/all.ts"],
      ...sharedConfig,
    },
    {
      entry: ["src/middlewares/*.ts"],
      ...sharedConfig,
      outDir: "dist/middlewares",
    },
    {
      entry: ["src/components/*.tsx"],
      ...sharedConfig,
      outDir: "dist/components",
    },
    {
      entry: ["src/config/*.ts"],
      ...sharedConfig,
      outDir: "dist/config",
    },
  ];
});
