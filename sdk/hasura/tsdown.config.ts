import { defineConfig } from "tsdown";
// @ts-expect-error - tsdown-factory.ts is a .ts file
import { createMultiConfig, withPerformanceMonitoring } from "../../shared/tsdown-factory.ts";

const configs = createMultiConfig([
  {
    entry: ["src/hasura.ts"],
    format: ["cjs", "esm"],
    platform: "node",
    external: ["@settlemint/sdk-js"],
    banner: {
      js: "/* SettleMint Hasura SDK - GraphQL API */",
    },
    define: {
      __HASURA_PACKAGE__: "true",
    },
  },
  {
    entry: ["src/postgres.ts"],
    format: ["cjs", "esm"],
    platform: "node",
    external: ["@settlemint/sdk-js"],
    banner: {
      js: "/* SettleMint Postgres SDK - Database Utils */",
    },
    define: {
      __POSTGRES_PACKAGE__: "true",
    },
  },
]);

export default defineConfig(configs.map((config) => withPerformanceMonitoring(config)));
