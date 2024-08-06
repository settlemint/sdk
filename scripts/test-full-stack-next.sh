#!/bin/bash -ex

# Setup folders

rm -Rf ../app-tests
mkdir -p ../app-tests
cd ../app-tests

# Install nextjs
bunx create-next-app full-stack-next --ts --tailwind --eslint --no-src-dir --app --turbo --use-bun --yes --import-alias='@/*'

cd full-stack-next

# Add the cli
bun add @settlemint/btp-sdk-cli@main

bun run btp-sdk-cli init

