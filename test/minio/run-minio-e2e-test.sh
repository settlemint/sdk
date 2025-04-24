#!/bin/bash

# Source environment variables from .env and .env.local files
# (non-sensitive values from .env, secrets from .env.local)
if [ -f .env ]; then
  echo "Loading environment variables from .env..."
  export $(grep -v '^#' .env | xargs)
fi

if [ -f .env.local ]; then
  echo "Loading secrets from .env.local..."
  export $(grep -v '^#' .env.local | xargs)
fi

# Make sure MinIO endpoint is set, fallback to default if needed
if [ -z "$SETTLEMINT_MINIO_ENDPOINT" ]; then
  export SETTLEMINT_MINIO_ENDPOINT="http://localhost:9000"
  echo "Warning: SETTLEMINT_MINIO_ENDPOINT not found in environment files, using default."
fi

# Set URL for frontend access
export NEXT_PUBLIC_MINIO_URL="$SETTLEMINT_MINIO_ENDPOINT"

# Set special flag to force test mode
export BUN_TEST_MODE=1

# Run in test mode to execute all tests
echo "Running MinIO E2E tests..."
echo "Using MinIO endpoint: $SETTLEMINT_MINIO_ENDPOINT"
bun test test/minio.e2e.test.ts