# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

The SettleMint SDK is a comprehensive blockchain development toolkit and platform integration suite. It provides developers with tools to build, deploy, and manage blockchain applications using the SettleMint platform's infrastructure and services.

### Technology Stack

**Core Technologies**
- Runtime: Bun (fast JavaScript runtime)
- Package Manager: Bun workspaces with Turbo
- Language: TypeScript (strict mode)
- Code Quality: Biome for linting and formatting
- Testing: Vitest for unit/integration tests
- Documentation: TypeDoc
- GraphQL: Apollo Client, GraphQL Code Generator
- Blockchain: Viem, Ethers, Foundry, Hardhat support

**Monorepo Structure**
- sdk/ - All SDK packages (13 packages total)
- test/ - End-to-end tests
- docs/ - Documentation
- scripts/ - Build and utility scripts
- fixtures/ - Test fixtures

**SDK Packages**
- @settlemint/sdk-cli - Command-line interface
- @settlemint/sdk-js - Core JavaScript SDK
- @settlemint/sdk-portal - Smart contract portal API
- @settlemint/sdk-viem - Ethereum interface (Viem)
- @settlemint/sdk-blockscout - Blockchain explorer
- @settlemint/sdk-eas - Ethereum Attestation Service
- @settlemint/sdk-hasura - GraphQL/PostgreSQL
- @settlemint/sdk-ipfs - Decentralized storage
- @settlemint/sdk-minio - S3-compatible storage
- @settlemint/sdk-thegraph - Blockchain indexing
- @settlemint/sdk-next - Next.js components
- @settlemint/sdk-mcp - Model Context Protocol
- @settlemint/sdk-utils - Shared utilities

**Key Features**
- Multi-chain blockchain support
- Smart contract deployment and verification
- Platform service integration
- Developer tooling and scaffolding
- GraphQL API generation
- TypeScript type generation
- Comprehensive CLI tools
- Example applications

## Essential Commands

### Development Workflow
```bash
# Setup
bun install                  # Install dependencies (root)
bun install --frozen-lockfile # CI-safe install

# Development
bun run dev                  # Start development (turbo)
bun run dev:cli             # Develop CLI package
bun run dev:portal          # Develop portal package

# Building
bun run build               # Build all packages
bun run build:cli          # Build CLI package
bun run build:sdk          # Build SDK packages

# Testing
bun test                    # Run all tests
bun test:unit              # Run unit tests
bun test:e2e               # Run e2e tests
bun test:coverage          # Generate coverage report

# Code Quality
bun run lint               # Run Biome linter
bun run lint:fix          # Fix linting issues
bun run format            # Format with Biome
bun run typecheck         # Run TypeScript checks

# Documentation
bun run docs              # Generate TypeDoc docs
bun run docs:build       # Build documentation

# Publishing
bun run changeset         # Create changeset
bun run version          # Version packages
bun run release          # Release packages
```

### Package Development
```bash
# Work on specific packages
cd sdk/cli && bun run dev    # CLI development
cd sdk/js && bun test        # Test JS SDK
cd sdk/portal && bun build   # Build portal

# Run package scripts
turbo run build --filter=@settlemint/sdk-cli
turbo run test --filter=@settlemint/sdk-*
```

## Development Guidelines

### Pre-Commit Checklist
- Always run `bun run format:biome` and the rest of the CI suite before committing

[... rest of the existing content remains unchanged ...]