#!/bin/bash

# Extract hostname from s3:// URL
MINIO_ENDPOINT=$(grep SETTLEMINT_MINIO_ENDPOINT .env | cut -d'=' -f2)
if [[ $MINIO_ENDPOINT == s3://* ]]; then
  # Remove s3:// and trailing slash
  HOSTNAME=$(echo $MINIO_ENDPOINT | sed 's|s3://||' | sed 's|/||g')
  # Set as https URL
  export SETTLEMINT_MINIO_ENDPOINT="https://$HOSTNAME"
  echo "Using MinIO endpoint: $SETTLEMINT_MINIO_ENDPOINT"
fi

# Run the test
export NEXT_PUBLIC_MINIO_URL="$SETTLEMINT_MINIO_ENDPOINT"
bun test test/minio.e2e.test.ts 