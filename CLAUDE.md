# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

The SettleMint SDK is a comprehensive TypeScript monorepo providing blockchain integration tools and services. It consists of 13 packages that enable seamless interaction with the SettleMint platform's features including blockchain networks, smart contracts, storage systems, and development tools.

## Core Architecture

### Monorepo Structure
- **Workspaces**: `sdk/*` (13 packages) and `apps/*` using Bun workspaces
- **Package Manager**: Bun 1.1.43 (Node.js >=20 required)
- **Build System**: tsdown (replaces tsup) with Turbo for orchestration
- **Shared Configuration**: `/shared/tsdown-factory.ts` provides standardized build configurations

### Package Categories
1. **Core SDK**: `@settlemint/sdk-js` - Main platform client with GraphQL operations
2. **Utilities**: `@settlemint/sdk-utils` - Shared helpers (environment, filesystem, http, logging, package-manager, runtime, terminal, validation)
3. **Blockchain**: `@settlemint/sdk-viem`, `@settlemint/sdk-eas` - Web3 and attestation services
4. **Storage**: `@settlemint/sdk-ipfs`, `@settlemint/sdk-minio` - Distributed and object storage
5. **Data**: `@settlemint/sdk-hasura`, `@settlemint/sdk-thegraph`, `@settlemint/sdk-portal` - Database and indexing
6. **Infrastructure**: `@settlemint/sdk-blockscout` - Blockchain explorer integration
7. **Development**: `@settlemint/sdk-cli`, `@settlemint/sdk-mcp` - Command-line and AI assistant tools
8. **Framework**: `@settlemint/sdk-next` - Next.js integration components

### Build System Architecture
- **tsdown**: Modern TypeScript bundler with Rolldown backend
- **Optimized Configurations**: Platform-specific builds (Node.js, browser, universal)
- **Tree Shaking**: Smart dependency externalization and code splitting
- **Multi-Format**: Dual CJS/ESM output with proper extensions (.cjs/.mjs)
- **Performance Monitoring**: Built-in bundle analysis with `ANALYZE_BUNDLE=true`

## Essential Commands

### Development
```bash
# Install dependencies and setup hooks
bun install

# Build all packages (respects dependency graph)
bun run build

# Build with bundle analysis
ANALYZE_BUNDLE=true NODE_ENV=production bun run build

# Development mode with watch
bun run dev

# Type checking
bun run typecheck

# Generate GraphQL types and schemas
bun run codegen
```

### Quality Assurance
```bash
# Lint and format (uses Biome)
bun run lint
bun run format:biome

# Check package exports and types
bun run publint
bun run attw

# Unused dependency detection
bun run knip

# Full CI pipeline locally
bun run ci:local
```

### Testing
```bash
# End-to-end tests with coverage
bun run test:e2e

# Type checking tests
bun run test:typecheck

# Individual package tests
cd sdk/[package] && bun test
```

### Package Management
```bash
# Link all packages for local development
bun run link:all

# Clean build artifacts and reinstall
bun run clean

# Generate documentation
bun run docs

# Update README files
bun run generate-readme
```

## Key Development Patterns

### Environment Configuration
- Use `@settlemint/sdk-utils/environment` for environment variable handling
- Zod schemas in `@settlemint/sdk-utils/validation` for type-safe validation
- Runtime vs build-time environment separation

### GraphQL Integration
- Uses `gql-tada` for type-safe GraphQL operations
- Schema generation: `bun run codegen`
- Multiple schemas supported: hasura, thegraph, portal, blockscout
- Generated types in `.settlemint/` directory

### Build Configuration
- Shared factory: `/shared/tsdown-factory.ts`
- Package-specific: `tsdown.config.ts` in each package
- Performance monitoring: `withPerformanceMonitoring()` wrapper
- Smart externals: `createSmartExternal()` for dependency optimization

### Client Creation Pattern
```typescript
import { createSettleMintClient } from "@settlemint/sdk-js";

const client = createSettleMintClient({
  accessToken: "your-token",
  instance: "your-instance-url"
});
```

## Testing Infrastructure

### E2E Test Setup
- Located in `/test/` directory
- Uses `test/scripts/setup-platform-resources.ts` preload
- Helper utilities in `test/utils/test-resources.ts`
- Environment-based resource creation and validation

### Test Configuration
- Coverage reporting enabled
- Platform resource setup automation
- Environment variable validation for test isolation

## Turbo Configuration Notes

The `turbo.json` defines a sophisticated dependency graph:
- **Build Dependencies**: All packages depend on `^build` and `codegen`
- **Cache Optimization**: Smart caching with proper input/output definitions
- **Development Mode**: Persistent processes with dependency awareness
- **Documentation**: Automated README generation from template system

## Environment Variables

Key environment variables used across packages:
- `SETTLEMINT_ACCESS_TOKEN`: Platform authentication
- `SETTLEMINT_INSTANCE`: Platform instance URL
- `NODE_ENV`: Build environment (development/production)
- `ANALYZE_BUNDLE`: Enable bundle size analysis
- `CONSOLE_GRAPHQL`: GraphQL endpoint for codegen

## Package Dependencies

Understanding the dependency hierarchy:
1. `@settlemint/sdk-utils` - Foundation (no internal dependencies)
2. `@settlemint/sdk-js` - Core client (depends on utils)
3. Specialized packages - Domain-specific functionality (depend on js/utils)
4. `@settlemint/sdk-cli` - Development tools (depends on multiple packages)
5. Integration packages - Framework adapters (depend on core packages)

## Git Workflow Memories
- never push to main