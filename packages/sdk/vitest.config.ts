import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    clearMocks: true,
    coverage: {
      all: true,
      exclude: ["dist"],
      include: ["src"],
      reporter: ["html", "lcov"],
    },
    exclude: ["lib", "node_modules"],
    passWithNoTests: true,
  },
});
