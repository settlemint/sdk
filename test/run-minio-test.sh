#!/bin/bash

# Load environment variables from .env and .env.local
export SETTLEMINT_MINIO_ENDPOINT="https://api-off-chain-storage-59766.gke-europe-staging.settlemint.com"
export SETTLEMINT_MINIO_ACCESS_KEY="off-chain-storage-59766"
export SETTLEMINT_MINIO_SECRET_KEY="e73865fdbc8ebeb06a9a"

# Run the simple test
echo "Running MinIO connection test..."
bun test test/run-minio.test.js 