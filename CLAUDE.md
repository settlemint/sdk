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

## Architecture & Code Organization

### Repository Structure
```
/
├── sdk/                      # SDK packages (monorepo)
│   ├── cli/                  # CLI tool (@settlemint/sdk-cli)
│   ├── js/                   # Core SDK (@settlemint/sdk-js)
│   ├── portal/               # Portal API (@settlemint/sdk-portal)
│   ├── viem/                 # Viem integration (@settlemint/sdk-viem)
│   ├── blockscout/           # Explorer integration
│   ├── eas/                  # Attestation service
│   ├── hasura/               # GraphQL/PostgreSQL
│   ├── ipfs/                 # IPFS integration
│   ├── minio/                # S3 storage
│   ├── thegraph/             # Subgraph integration
│   ├── next/                 # Next.js components
│   ├── mcp/                  # MCP interface
│   └── utils/                # Shared utilities
├── test/                     # E2E tests
├── docs/                     # Documentation
├── scripts/                  # Build scripts
├── fixtures/                 # Test fixtures
├── turbo.json               # Turbo config
├── biome.json               # Biome config
└── package.json             # Root package
```

### Key Architecture Patterns

1. **Monorepo Structure**
   - Bun workspaces for package management
   - Turbo for build orchestration
   - Shared dependencies and tooling
   - Independent package versioning

2. **TypeScript-First Development**
   - Strict TypeScript configuration
   - Type generation for GraphQL
   - Shared type definitions in utils
   - Runtime validation with Zod

3. **SDK Design Principles**
   - Each package is independently usable
   - Minimal dependencies between packages
   - Consistent API design across packages
   - Comprehensive TypeScript types

4. **Platform Integration**
   - GraphQL for API communication
   - RESTful endpoints where appropriate
   - WebSocket support for real-time data
   - Authentication and authorization built-in

## Development Guidelines

### TypeScript Conventions
- **NO default exports** (except when framework requires)
- Use `import type` for type imports
- Prefer interfaces over type aliases for objects
- **Never use `any`** - use `unknown` or proper types
- Use discriminated unions for error handling
- Naming conventions:
  - Files: kebab-case
  - Variables/functions: camelCase
  - Types/interfaces/classes: PascalCase
  - Constants: UPPER_SNAKE_CASE

### Code Style Rules
- Prefer nullish coalescing (`??`) over logical OR (`||`)
- Use early returns to reduce nesting
- Extract complex logic into well-named functions
- Keep functions small and focused
- Use structured logging with proper context

### API Design Principles
- RESTful conventions for HTTP endpoints
- GraphQL for complex queries and subscriptions
- Consistent error responses
- Proper HTTP status codes
- Comprehensive OpenAPI documentation

### Blockchain Best Practices
- Always validate addresses before use
- Handle chain-specific differences properly
- Implement proper gas estimation
- Use type-safe contract interactions
- Never store private keys in code or logs

### Git Workflow
- **Never push to main branch**
- Branch naming: `feat/`, `fix/`, `chore/`, etc.
- Commit format: `type(scope): description`
- Create PRs for all changes
- Ensure CI passes before merge

## Claude Code Best Practices

- Always read entire files before making changes
- Run tests after modifications
- Check existing patterns before implementing new features
- Use the project's established error handling patterns
- Validate all blockchain interactions
- Keep security in mind - never expose sensitive data
- Use queue jobs for long-running operations
- Implement proper retry logic for external calls

## Package-Specific Guidelines

### SDK CLI (@settlemint/sdk-cli)
- Main entry point for developers
- Provides project scaffolding
- Handles authentication flows
- Manages deployments and configurations

### SDK JS (@settlemint/sdk-js)
- Core platform integration
- API client for SettleMint services
- Authentication and authorization
- Resource management (nodes, networks, etc.)

### SDK Portal (@settlemint/sdk-portal)
- Smart contract portal integration
- Contract deployment and verification
- Transaction management
- Event monitoring

### SDK Viem (@settlemint/sdk-viem)
- Viem-based blockchain interactions
- Multi-chain support
- Type-safe contract calls
- Transaction helpers

## Testing Guidelines

- Write unit tests using Vitest
- E2E tests for CLI commands
- Mock external API calls
- Test error scenarios
- Use test fixtures for consistency
- Follow AAA pattern (Arrange, Act, Assert)

## Environment Configuration

Key environment variables:
- `SETTLEMINT_API_URL` - Platform API endpoint
- `SETTLEMINT_AUTH_TOKEN` - Authentication token
- `NODE_ENV` - Environment (development/production)

Package-specific configs:
- Each SDK package may have its own configuration
- Check individual package README files
- Use `.env` files for local development

## Troubleshooting

### Common Issues
1. **Build errors**: Run `bun install` and `bun run build`
2. **Type errors**: Check with `bun run typecheck`
3. **Linting issues**: Fix with `bun run lint:fix`
4. **Test failures**: Check test output and mocks

### Development Tips
- Use Turbo's cache for faster builds
- Run specific package tests with filters
- Check individual package README files
- Use `--verbose` flag for detailed output

## Before Creating a PR

1. **Run tests**: `bun test`
2. **Type check**: `bun run typecheck`
3. **Lint code**: `bun run lint`
4. **Format code**: `bun run format`
5. **Update documentation** if needed
6. **Test locally** with different scenarios

## Project-Specific Notes

- This is a developer SDK, not an application
- Supports the SettleMint blockchain platform
- Each package can be used independently
- Follow semantic versioning for releases
- Documentation is essential for all public APIs

## Command Reference

Use these Claude Code commands when appropriate:
- `/pr` - Create pull requests
- `/qa` - Run quality checks
- `/explore` - Understand architecture
- `/stuck` - Debug systematically
- `/deps` - Update dependencies safely
- `/performance` - Analyze performance

## MCP Server Usage

### Linear (Project Management)
When working with Linear tickets, use the MCP Linear tools:

```
# Search for issues
mcp__linear__list_issues(query="ENG-3236", limit=10)

# Get issue details
mcp__linear__get_issue(id="ENG-3236")

# Update issue with comment and/or status
mcp__linear__update_issue(
  id="ENG-3236",
  stateId="<state-id>",  # Optional: update status
  description="Updated description"  # Optional: update description
)

# Create comment on issue
mcp__linear__create_comment(
  issueId="<issue-id>",
  body="PR created: https://github.com/..."
)

# List issue statuses to find stateId
mcp__linear__list_issue_statuses(teamId="<team-id>")
```

When you create a PR for a Linear ticket:
1. Add a comment with the PR link using `mcp__linear__create_comment`
2. Update the issue status if needed using `mcp__linear__update_issue`
3. Include the Linear issue ID in the PR description for automatic linking

### Sentry (Error Tracking)
Use Sentry MCP tools for error investigation:

```
# Find organizations you have access to
mcp__sentry__find_organizations()

# Find issues in an organization
mcp__sentry__find_issues(
  organizationSlug="settlemint",
  query="is:unresolved",
  sortBy="last_seen"
)

# Get detailed error information
mcp__sentry__get_issue_details(
  organizationSlug="settlemint",
  issueId="PROJECT-123"
)

# Update issue status
mcp__sentry__update_issue(
  organizationSlug="settlemint",
  issueId="PROJECT-123",
  status="resolved"
)
```

### Context7 (Documentation)
Use for checking latest documentation:

```
# Search for library documentation
mcp__context7__resolve-library-id(libraryName="viem")

# Get library docs
mcp__context7__get-library-docs(
  context7CompatibleLibraryID="/wagmi-dev/viem",
  topic="contract-interactions"
)
```

### DeepWiki (GitHub Documentation)
Use for repository documentation:

```
# Get repository documentation structure
mcp__deepwiki__read_wiki_structure(repoName="wagmi-dev/viem")

# Read repository documentation
mcp__deepwiki__read_wiki_contents(repoName="wagmi-dev/viem")

# Ask questions about a repository
mcp__deepwiki__ask_question(
  repoName="wagmi-dev/viem",
  question="How do I deploy a contract?"
)
```