import { defineConfig } from "tsdown";
import { createNodePackage, withPerformanceMonitoring } from "../../shared/tsdown-factory.js";

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
