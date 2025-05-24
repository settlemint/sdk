import { defineConfig } from "tsdown";

const sharedConfig = {
  sourcemap: true,
  dts: true,
  splitting: false,
  treeshake: false,
  format: ["cjs", "esm"] as const,
  outExtension: ({ format }: { format: string }) => ({
    js: format === "esm" ? ".js" : ".cjs",
  }),
};

export default defineConfig([
  {
    entry: ["src/index.ts"],
    ...sharedConfig,
  },
  {
    entry: ["src/environment.ts"],
    ...sharedConfig,
  },
  {
    entry: ["src/filesystem.ts"],
    ...sharedConfig,
  },
  {
    entry: ["src/http.ts"],
    ...sharedConfig,
  },
  {
    entry: ["src/json.ts"],
    ...sharedConfig,
  },
  {
    entry: ["src/logging.ts"],
    ...sharedConfig,
  },
  {
    entry: ["src/package-manager.ts"],
    ...sharedConfig,
  },
  {
    entry: ["src/retry.ts"],
    ...sharedConfig,
  },
  {
    entry: ["src/runtime.ts"],
    ...sharedConfig,
  },
  {
    entry: ["src/string.ts"],
    ...sharedConfig,
  },
  {
    entry: ["src/terminal.ts"],
    ...sharedConfig,
  },
  {
    entry: ["src/url.ts"],
    ...sharedConfig,
  },
  {
    entry: ["src/validation.ts"],
    ...sharedConfig,
  },
]);
