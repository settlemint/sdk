import type { Options } from "tsdown";

export interface ConfigOptions {
  entry: string[];
  format?: ("cjs" | "esm")[];
  platform?: "node" | "browser" | "neutral";
  external?: string[] | ((id: string) => boolean);
  target?: string;
  outDir?: string;
  shims?: boolean;
  banner?: { js?: string };
  define?: Record<string, string>;
  minifyOverride?: boolean;
  dts?: boolean;
}

const isProd = process.env.NODE_ENV === "production";

export const createConfig = (options: ConfigOptions): Options => {
  const config: Options = {
    entry: options.entry,
    format: options.format || ["cjs", "esm"],
    dts: options.dts ?? true,
    sourcemap: !isProd || "inline",
    treeshake: isProd,
    minify: options.minifyOverride ?? isProd,
    target: options.target || (options.platform === "browser" ? "es2022" : "node20"),
    platform: options.platform === "browser" ? "browser" : "node",
    external: options.external,
    outDir: options.outDir,
    shims: options.shims,
    define: {
      __DEV__: JSON.stringify(!isProd),
      __PROD__: JSON.stringify(isProd),
      __VERSION__: JSON.stringify(process.env.npm_package_version || "dev"),
      ...options.define,
    },
    outputOptions: {
      banner: options.banner?.js,
    },
    outExtensions: ({ format }) => ({
      js: format === "cjs" ? ".cjs" : ".js",
    }),
  };

  return config;
};

export const createMultiConfig = (configs: ConfigOptions[]) => {
  return configs.map(createConfig);
};

export const createNodePackage = (entry: string[], options: Partial<ConfigOptions> = {}) =>
  createConfig({
    entry,
    format: ["cjs", "esm"],
    platform: "node",
    ...options,
  });

export const createBrowserPackage = (entry: string[], options: Partial<ConfigOptions> = {}) =>
  createConfig({
    entry,
    format: ["esm"],
    platform: "browser",
    external: ["node:*", "crypto"],
    define: {
      __BROWSER__: "true",
    },
    ...options,
  });

export const createCLIPackage = (entry: string[], options: Partial<ConfigOptions> = {}) =>
  createConfig({
    entry,
    format: ["esm"],
    platform: "node",
    shims: true,
    target: "node20",
    banner: {
      js: "#!/usr/bin/env node\n/* SettleMint CLI */",
    },
    external: ["node:*"],
    define: {
      __CLI_VERSION__: JSON.stringify(process.env.npm_package_version || "dev"),
    },
    dts: false,
    ...options,
  });

export const createUtilsPackage = (modules: string[], options: Partial<ConfigOptions> = {}) => {
  const configs: ConfigOptions[] = [
    // Main barrel export
    {
      entry: ["src/index.ts"],
      format: ["cjs", "esm"],
      platform: "node",
      ...options,
    },
    // Individual modules for tree shaking
    ...modules.map(
      (module): ConfigOptions => ({
        entry: [`src/${module}.ts`],
        format: ["cjs", "esm"],
        platform: "node",
        ...options,
      }),
    ),
  ];

  return configs.map(createConfig);
};

export const createWebOptimizedPackage = (entry: string[], options: Partial<ConfigOptions> = {}) => {
  const configs: ConfigOptions[] = [
    // Node.js build
    {
      entry,
      format: ["cjs", "esm"],
      platform: "node",
      ...options,
    },
    // Browser build
    {
      entry,
      format: ["esm"],
      platform: "browser",
      outDir: "dist/browser",
      external: ["crypto", "node:*"],
      define: {
        __BROWSER__: "true",
      },
      ...options,
    },
  ];

  return configs.map(createConfig);
};

// Performance monitoring helpers
let buildStartTime: number;
export const withPerformanceMonitoring = (config: Options): Options => ({
  ...config,
  hooks(hooks) {
    hooks.hook("build:prepare", (context) => {
      buildStartTime = Date.now();
      console.log(`🏗️  Building ${context.options.pkg.name}...`);
    });
    hooks.hook("build:done", (context) => {
      const duration = Date.now() - buildStartTime;
      console.log(`✅ Built ${context.options.pkg.name} in ${duration}ms`);
    });
  },
});

// Smart external dependency helper
export const createSmartExternal =
  (bundleSmall = true) =>
  (id: string): boolean => {
    // Always externalize workspace packages
    if (id.startsWith("@settlemint/sdk-")) return true;

    // Always externalize Node.js built-ins
    if (id.startsWith("node:")) return true;

    // Large dependencies to externalize
    const largeDeps = ["viem", "ethers", "graphql", "@graphql-tools", "apollo"];
    if (largeDeps.some((dep) => id.includes(dep))) return true;

    // Small utilities to bundle (if enabled)
    const smallDeps = ["ms", "debug", "chalk", "picocolors"];
    if (bundleSmall && smallDeps.includes(id)) return false;

    // Default: externalize
    return true;
  };
