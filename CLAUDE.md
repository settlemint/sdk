# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

The Smart Contract Set Portal (btp-scs-portal) is a blockchain middleware service that provides a unified REST and GraphQL API gateway for interacting with smart contracts across multiple blockchain networks. It handles contract deployments, transaction management, and provides real-time updates for blockchain events.

### Technology Stack

**Core Technologies**
- Runtime: Bun (fast JavaScript runtime)
- Web Framework: Elysia (performant web framework for Bun)
- GraphQL: Yoga with Pothos schema builder
- Database: PostgreSQL with Drizzle ORM
- Blockchain: Viem for Ethereum interactions
- Queue: BullMQ for job processing
- Caching: Redis for pub/sub and caching
- API Documentation: Scalar (OpenAPI)

**Project Structure**
- src/services/ - Domain services (contract, transaction, wallet, etc.)
- src/schemas/ - GraphQL and validation schemas
- src/queue/ - Job queue processors
- src/db/ - Database migrations and schema
- src/lib/ - Shared utilities and helpers
- tests/ - Unit and integration tests

**Key Features**
- Multi-chain blockchain support
- Smart contract deployment and management
- Transaction tracking with receipt monitoring
- Account abstraction (ERC-4337) support
- WebSocket and GraphQL subscriptions for real-time updates
- Webhook notifications with reliable delivery
- Type-safe contract interactions
- Comprehensive API documentation

## Essential Commands

### Development Workflow
```bash
# Setup
bun install                  # Install dependencies
cp .env.example .env         # Create environment file
bun run db:migrate          # Run database migrations

# Development
bun run dev                  # Start development server
bun run dev:queue           # Start queue worker
bun run dev:webhook         # Start webhook server

# Testing
bun test                    # Run all tests
bun test:unit              # Run unit tests
bun test:integration       # Run integration tests
bun test:coverage          # Generate coverage report

# Code Quality
bun run lint               # Run ESLint
bun run lint:fix          # Fix linting issues
bun run format            # Format with Prettier
bun run typecheck         # Run TypeScript type checker

# Database
bun run db:migrate        # Run migrations
bun run db:push          # Push schema changes
bun run db:generate      # Generate migration files
bun run db:studio        # Open Drizzle Studio

# Production
bun run build            # Build for production
bun run start            # Start production server
```

### API Testing
```bash
# Access API documentation
open http://localhost:5174/reference

# GraphQL playground
open http://localhost:5174/graphql

# Health check
curl http://localhost:5174/health
```

## Architecture & Code Organization

### Repository Structure
```
/
├── src/
│   ├── index.ts              # Main application entry
│   ├── router.ts             # Route definitions
│   ├── services/             # Domain services
│   │   ├── contract/         # Contract deployment & management
│   │   ├── transaction/      # Transaction processing
│   │   ├── wallet/           # Wallet management
│   │   ├── webhook/          # Webhook delivery
│   │   ├── chain/            # Blockchain interactions
│   │   └── storage/          # File storage
│   ├── schemas/              # Validation & GraphQL schemas
│   │   ├── graphql/          # GraphQL type definitions
│   │   └── validation/       # Request validation schemas
│   ├── queue/                # Job processors
│   │   ├── processors/       # Queue job handlers
│   │   └── jobs/             # Job definitions
│   ├── db/                   # Database layer
│   │   ├── schema/           # Drizzle schema definitions
│   │   └── migrations/       # Database migrations
│   ├── lib/                  # Shared utilities
│   │   ├── auth/             # Authentication helpers
│   │   ├── errors/           # Error handling
│   │   └── utils/            # General utilities
│   └── types/                # TypeScript type definitions
├── tests/                    # Test files
├── scripts/                  # Utility scripts
└── config files              # Various configs
```

### Key Architecture Patterns

1. **Service-Oriented Architecture**
   - Domain-driven services (contract, transaction, wallet, etc.)
   - Clear separation of concerns
   - Dependency injection for testability

2. **Queue-Based Processing**
   - BullMQ for asynchronous job processing
   - Reliable transaction monitoring
   - Webhook delivery with retries

3. **Type-Safe APIs**
   - Elysia for type-safe REST endpoints
   - Pothos for code-first GraphQL schema
   - Zod for runtime validation

4. **Blockchain Abstraction**
   - Viem for Ethereum interactions
   - Multi-chain support architecture
   - Account abstraction (ERC-4337) ready

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

## Service-Specific Guidelines

### Contract Service
- Validate contract bytecode before deployment
- Store contract metadata properly
- Handle deployment failures gracefully
- Track deployment transactions

### Transaction Service
- Monitor transaction receipts
- Implement proper retry logic
- Handle chain reorganizations
- Update transaction status accurately

### Webhook Service
- Ensure reliable delivery with retries
- Sign webhook payloads for security
- Handle webhook failures gracefully
- Provide webhook event history

### Wallet Service
- Never store private keys
- Support multiple wallet types
- Implement proper access controls
- Validate all signatures

## Testing Guidelines

- Write unit tests for all services
- Integration tests for API endpoints
- Mock external dependencies properly
- Test error scenarios
- Ensure proper test isolation
- Use meaningful test descriptions

## Environment Configuration

Required environment variables:
- `DATABASE_URL` - PostgreSQL connection
- `REDIS_URL` - Redis connection
- `VIEM_RPC_URL_*` - RPC endpoints for each chain
- `PORT` - Server port (default: 5174)
- `WEBHOOK_PORT` - Webhook server port

See `.env.example` for complete list.

## Troubleshooting

### Common Issues
1. **Database connection errors**: Check DATABASE_URL and PostgreSQL status
2. **Redis connection errors**: Verify REDIS_URL and Redis server
3. **RPC errors**: Ensure valid RPC endpoints for each chain
4. **Type errors**: Run `bun run typecheck`

### Development Tips
- Use `bun run db:studio` to inspect database
- Check queue dashboard for job status
- Monitor logs for detailed error information
- Use API documentation for testing endpoints

## Before Creating a PR

1. **Run tests**: `bun test`
2. **Type check**: `bun run typecheck`
3. **Lint code**: `bun run lint`
4. **Format code**: `bun run format`
5. **Update documentation** if needed
6. **Test locally** with different scenarios

## Project-Specific Notes

- This is a blockchain middleware service, not a dApp
- Supports multiple blockchain networks
- Designed for high-throughput operations
- Security is paramount - validate everything
- Performance matters - use queues for heavy operations

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