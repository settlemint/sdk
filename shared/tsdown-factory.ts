import { type Options, defineConfig } from "tsdown";

export interface ConfigOptions {
  entry: string[];
  format?: ("cjs" | "esm")[];
  platform?: "node" | "browser" | "neutral";
  bundle?: boolean;
  external?: string[] | ((id: string) => boolean);
  target?: string;
  outDir?: string;
  shims?: boolean;
  banner?: { js?: string };
  define?: Record<string, string>;
  minifyOverride?: boolean;
}

const isProd = process.env.NODE_ENV === "production";
const shouldAnalyze = process.env.ANALYZE_BUNDLE === "true";

export const createConfig = (options: ConfigOptions): Options => {
  const config: Options = {
    entry: options.entry,
    format: options.format || ["cjs", "esm"],
    dts: true,
    sourcemap: !isProd || "inline",
    splitting: !options.bundle && options.format?.includes("esm"),
    treeshake: isProd,
    minify: options.minifyOverride ?? isProd,
    target: options.target || (options.platform === "browser" ? "es2022" : "node20"),
    platform: options.platform === "browser" ? "browser" : "node",
    external: options.external,
    outDir: options.outDir,
    shims: options.shims,
    banner: options.banner,
    define: {
      __DEV__: JSON.stringify(!isProd),
      __PROD__: JSON.stringify(isProd),
      __VERSION__: JSON.stringify(process.env.npm_package_version || "dev"),
      ...options.define,
    },
    metafile: shouldAnalyze,
    outExtension: ({ format }) => ({
      js: format === "esm" ? ".mjs" : ".cjs",
    }),
  };

  return config;
};

export const createMultiConfig = (configs: ConfigOptions[]) => {
  return defineConfig(configs.map(createConfig));
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
    bundle: true,
    shims: true,
    target: "node20",
    banner: {
      js: "#!/usr/bin/env node\n/* SettleMint CLI */",
    },
    external: ["node:*"],
    define: {
      __CLI_VERSION__: JSON.stringify(process.env.npm_package_version || "dev"),
    },
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
    ...modules.map((module) => ({
      entry: [`src/${module}.ts`],
      format: ["cjs", "esm"] as const,
      platform: "node" as const,
      ...options,
    })),
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
  onStart: () => {
    buildStartTime = Date.now();
    console.log("🏗️  Building...");
  },
  onEnd: (result) => {
    const duration = Date.now() - buildStartTime;
    console.log(`✅ Built in ${duration}ms`);

    if (result.metafile && shouldAnalyze) {
      console.log("📊 Bundle Analysis:");
      Object.entries(result.metafile.outputs).forEach(([file, output]) => {
        const sizeKb = (output.bytes / 1024).toFixed(2);
        console.log(`📦 ${file}: ${sizeKb}kb`);
      });
    }
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
