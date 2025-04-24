# MinIO Testing

This directory contains resources for testing MinIO operations in your SettleMint SDK development workflow.

## E2E Test Runner

The recommended way to test MinIO functionality is using the E2E test runner script:

```
./test/minio/run-minio-e2e-test.sh
```

This script:
- Loads environment variables from `.env` and secret credentials from `.env.local`
- Sets up the proper test environment 
- Runs comprehensive tests of all MinIO operations
- Handles protocol conversion and validation

## Available Standalone Scripts

These individual scripts can be useful for testing specific operations during development:

1. **List Buckets** - View all available buckets in your MinIO instance:
   ```
   bun run test/minio/list-buckets.ts
   ```

2. **Upload File** - Upload a test file with random content:
   ```
   bun run test/minio/upload-file.ts
   ```

3. **List Objects** - List objects in a bucket with optional prefix:
   ```
   bun run test/minio/list-objects.ts [prefix]
   ```

4. **Download File** - Download a file from MinIO:
   ```
   bun run test/minio/download-file.ts <objectName>
   ```

5. **Delete File** - Delete a file from MinIO:
   ```
   bun run test/minio/delete-file.ts <objectName>
   ```

6. **Complete Cycle** - Demonstrate a full upload-list-download-delete cycle:
   ```
   bun run test/minio/upload-download-cycle.ts
   ```

## Environment Configuration

MinIO tests use the following environment variables:

- `SETTLEMINT_MINIO_ENDPOINT` - The MinIO server URL (can use s3:// protocol)
- `SETTLEMINT_MINIO_ACCESS_KEY` - The MinIO access key
- `SETTLEMINT_MINIO_SECRET_KEY` - The MinIO secret key

These should be configured in your `.env` and `.env.local` files (secrets should be in `.env.local`).

## Usage During Development

These resources are useful for:

1. **Comprehensive Testing** - Run the E2E tests to verify all operations
2. **Quick Validation** - Use standalone scripts to check specific operations
3. **Debugging Issues** - Isolate and debug specific MinIO functions
4. **Testing SDK Changes** - Validate modifications to the MinIO SDK

## Recent Improvements

Recent fixes to the SDK have addressed several issues:

1. **Path Handling** - Improved path normalization to prevent double slashes
2. **Metadata Management** - Better handling of file size and metadata
3. **Testing Framework** - Environment variable and validation improvements

The E2E tests now run successfully within the Bun test framework using the provided script.