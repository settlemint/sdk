# MinIO Testing Scripts

This directory contains standalone scripts for testing MinIO operations in your SettleMint SDK development workflow. These scripts are designed to bypass the authentication issues seen with the Bun test framework while still providing a way to validate MinIO functionality.

## Available Scripts

### Basic Operations

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

### Complete Workflow

6. **Complete Cycle** - Demonstrate a full upload-list-download-delete cycle:
   ```
   bun run test/minio/upload-download-cycle.ts
   ```

## Environment Configuration

These scripts use the following environment variables:

- `SETTLEMINT_MINIO_ENDPOINT` - The MinIO server URL (can use s3:// protocol)
- `SETTLEMINT_MINIO_ACCESS_KEY` - The MinIO access key
- `SETTLEMINT_MINIO_SECRET_KEY` - The MinIO secret key

All scripts automatically handle converting s3:// URLs to https:// as needed for client compatibility.

## Usage During Development

These scripts are useful for:

1. **Quick Validation** - Quickly check if your MinIO setup is working
2. **Debugging Issues** - Isolate and debug specific MinIO operations
3. **Testing Changes** - Validate changes to MinIO-related code

When making changes to the MinIO SDK functionality, you can use these scripts to verify that basic operations continue to work correctly, even if the formal tests are failing due to test framework issues.

## Note about the Bun Test Framework

The standard Bun test framework appears to have authentication issues with MinIO, causing the formal E2E tests to fail with "Access Denied" errors. These standalone scripts are a workaround until that issue is resolved. The scripts use the same environment variables and client setup, but run outside the test framework.