import { defineConfig } from "tsdown";
// @ts-expect-error - tsdown-factory.ts is a .ts file
import { createNodePackage, withPerformanceMonitoring } from "../../shared/tsdown-factory.ts";

export default defineConfig(
  withPerformanceMonitoring(
    createNodePackage(["src/minio.ts"], {
      external: ["minio", "@settlemint/sdk-js"],
      banner: {
        js: "/* SettleMint MinIO SDK - Object Storage */",
      },
      define: {
        __MINIO_PACKAGE__: "true",
        __OBJECT_STORAGE__: "true",
      },
    }),
  ),
);
