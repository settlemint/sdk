import { defineConfig } from "tsdown";
import { createSmartExternal, createUtilsPackage, withPerformanceMonitoring } from "../../shared/tsdown-factory.js";

const modules = [
  "environment",
  "filesystem",
  "http",
  "json",
  "logging",
  "package-manager",
  "retry",
  "runtime",
  "string",
  "terminal",
  "url",
  "validation",
];

const configs = createUtilsPackage(modules, {
  external: createSmartExternal(true),
  banner: {
    js: "/* SettleMint SDK Utils - Optimized Build */",
  },
});

export default defineConfig(configs.map((config) => withPerformanceMonitoring(config)));
