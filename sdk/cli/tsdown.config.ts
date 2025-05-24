import { defineConfig } from "tsdown";
import { createCLIPackage, withPerformanceMonitoring } from "../../shared/tsdown-factory.ts";

export default defineConfig(
  withPerformanceMonitoring(
    createCLIPackage(["src/cli.ts"], {
      external: [
        "node:*",
        "@settlemint/sdk-js",
        "@settlemint/sdk-utils",
        "node-fetch-native",
        // CLI-specific externals
        "commander",
        "@commander-js/extra-typings",
        "@inquirer/confirm",
        "@inquirer/input",
        "@inquirer/password",
        "@inquirer/select",
      ],
      define: {
        __CLI_NAME__: '"settlemint"',
        __IS_CLI__: "true",
      },
    }),
  ),
);
