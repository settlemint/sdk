# EAS SDK Source Structure

This directory contains the source code for the SettleMint EAS (Ethereum Attestation Service) SDK, organized following the repository's standard patterns.

## Directory Structure

```
src/
├── eas.ts                              # Main entry point and public API
├── eas-portal-client.ts                # Portal-based EAS client implementation
├── portal-client-options.schema.ts     # Zod validation schemas for configuration
├── portal-types.ts                     # Portal integration types and interfaces
├── schema.ts                           # EAS schema field types and constants
├── abis.ts                             # EAS and Schema Registry ABIs
├── utils/                              # Utilities and validation functions
│   └── validation.ts                   # Schema validation utilities
├── eas.test.ts                         # Main API tests
└── eas-portal.test.ts                  # Portal client tests
```

## File Organization

### Core Files
- **`eas.ts`** - Main entry point with `createEASClient()` function and exports
- **`eas-portal-client.ts`** - Complete Portal-based client implementation
- **`portal-types.ts`** - All TypeScript interfaces and types for Portal integration
- **`schema.ts`** - EAS field types, constants, and schema-related types

### Configuration & Validation
- **`portal-client-options.schema.ts`** - Zod schemas for validating client options
- **`utils/validation.ts`** - Schema field validation and building utilities
- **`abis.ts`** - Standard EAS and Schema Registry ABIs

### Tests
- **`eas.test.ts`** - Tests for the main API and client creation
- **`eas-portal.test.ts`** - Tests for the Portal client implementation

## Design Principles

This structure follows the repository's standard patterns:

1. **Flat Structure**: Most files are in the root `src/` directory
2. **Utils Directory**: Only complex utilities are separated into `utils/`
3. **Co-located Tests**: Test files are in the same directory as source files
4. **Clear Naming**: File names clearly indicate their purpose
5. **Single Responsibility**: Each file has a focused purpose

## Comparison with Other SDKs

This structure matches the patterns used by other SDK packages:

- **Simple SDKs** (hasura, thegraph, blockscout): `{name}.ts` + `{name}.test.ts`
- **SDKs with helpers** (ipfs, minio): Main files + `helpers/` or `utils/`
- **Complex SDKs** (portal, viem): Main files + organized subdirectories

The EAS SDK follows the "SDKs with helpers" pattern, keeping most files flat while organizing utilities separately. 