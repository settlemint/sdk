import { defineConfig } from "tsdown";
// @ts-expect-error - tsdown-factory.ts is a .ts file
import { createCLIPackage, withPerformanceMonitoring } from "../../shared/tsdown-factory.ts";

export default defineConfig(
  withPerformanceMonitoring(
    createCLIPackage(["src/cli.ts"], {
      external: [
        "node:*",
        "@settlemint/sdk-hasura",
        "@settlemint/sdk-js",
        "@settlemint/sdk-utils",
        "@settlemint/sdk-utils/environment",
        "@settlemint/sdk-utils/filesystem",
        "@settlemint/sdk-utils/http",
        "@settlemint/sdk-utils/logging",
        "@settlemint/sdk-utils/package-manager",
        "@settlemint/sdk-utils/terminal",
        "@settlemint/sdk-utils/validation",
        "node-fetch-native",
        // CLI-specific externals
        "commander",
        "@commander-js/extra-typings",
        "@inquirer/confirm",
        "@inquirer/input",
        "@inquirer/password",
        "@inquirer/select",
        "@gql.tada/cli-utils",
      ],
      define: {
        __CLI_NAME__: '"settlemint"',
        __IS_CLI__: "true",
      },
    }),
  ),
);
