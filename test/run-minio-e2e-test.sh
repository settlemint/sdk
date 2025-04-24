#!/bin/bash

# Set environment variables manually
export SETTLEMINT_MINIO_ENDPOINT="https://api-off-chain-storage-59766.gke-europe-staging.settlemint.com"
export SETTLEMINT_MINIO_ACCESS_KEY="off-chain-storage-59766"
export SETTLEMINT_MINIO_SECRET_KEY="e73865fdbc8ebeb06a9a"
export NEXT_PUBLIC_MINIO_URL="https://api-off-chain-storage-59766.gke-europe-staging.settlemint.com"

# Set special flag to force test mode
export BUN_TEST_MODE=1

# Run in direct mode to execute internal tests
echo "Running MinIO E2E tests..."
bun test test/minio.e2e.test.ts 