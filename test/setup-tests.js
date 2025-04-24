// Test environment setup

// Mock environment variables needed for the tests
process.env.SETTLEMINT_MINIO_ENDPOINT = process.env.SETTLEMINT_MINIO_ENDPOINT || "http://localhost:9000";
process.env.SETTLEMINT_MINIO_ACCESS_KEY = process.env.SETTLEMINT_MINIO_ACCESS_KEY || "minioadmin";
process.env.SETTLEMINT_MINIO_SECRET_KEY = process.env.SETTLEMINT_MINIO_SECRET_KEY || "minioadmin";
process.env.NEXT_PUBLIC_MINIO_URL = process.env.NEXT_PUBLIC_MINIO_URL || "http://localhost:9000";

// You can add more mock setup here as needed
