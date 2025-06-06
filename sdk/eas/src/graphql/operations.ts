import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { PortalClient } from "../portal/portal-client.ts";

// Use a simple relative path approach that works across module targets
const getGraphQLPath = (filePath: string): string => {
  // Construct path relative to this file's location
  return join(__dirname || ".", filePath);
};

/**
 * Load a GraphQL operation from a .graphql file
 */
function loadGraphQL(filePath: string): string {
  try {
    const fullPath = getGraphQLPath(filePath);
    const content = readFileSync(fullPath, "utf-8").trim();
    if (!content) {
      throw new Error(`Empty GraphQL file: ${filePath}`);
    }
    return content;
  } catch (err) {
    const error = err as Error;
    throw new Error(`Failed to load GraphQL file ${filePath}: ${error.message}`);
  }
}

/**
 * Split GraphQL file content by double newlines and ensure all parts exist
 */
function splitGraphQLOperations(content: string, expectedCount: number): string[] {
  const operations = content.split("\n\n").filter((op) => op.trim());
  if (operations.length !== expectedCount) {
    throw new Error(`Expected ${expectedCount} operations, found ${operations.length}`);
  }
  return operations;
}

// Contract Deployment Mutations
export const getDeploySchemaRegistoryMutation = (graphql: PortalClient["graphql"]) =>
  graphql(`
    mutation DeployEASSchemaRegistry(
      $from: String!
      $constructorArguments: DeployContractEASSchemaRegistryInput!
      $gasLimit: String!
    ) {
      DeployContractEASSchemaRegistry(from: $from, constructorArguments: $constructorArguments, gasLimit: $gasLimit) {
        transactionHash
      }
    }`);
export const getDeployEASMutation = (graphql: PortalClient["graphql"]) =>
  graphql(`
    mutation DeployEAS($from: String!, $constructorArguments: DeployContractEASInput!, $gasLimit: String!) {
      DeployContractEAS(from: $from, constructorArguments: $constructorArguments, gasLimit: $gasLimit) {
        transactionHash
      }
    }`);

// Schema Operations
export const REGISTER_SCHEMA_MUTATION: string = loadGraphQL("mutations/schema-operations.graphql");

// Attestation Mutations
const attestationMutations = splitGraphQLOperations(loadGraphQL("mutations/attestation-operations.graphql"), 3);
export const ATTEST_MUTATION: string = attestationMutations[0]!;
export const MULTI_ATTEST_MUTATION: string = attestationMutations[1]!;
export const REVOKE_MUTATION: string = attestationMutations[2]!;

// Schema Queries
const schemaQueries = splitGraphQLOperations(loadGraphQL("queries/schema-queries.graphql"), 2);
export const GET_SCHEMA_QUERY: string = schemaQueries[0]!;
export const GET_SCHEMAS_QUERY: string = schemaQueries[1]!;

// Attestation Queries
const attestationQueries = splitGraphQLOperations(loadGraphQL("queries/attestation-queries.graphql"), 4);
export const GET_ATTESTATION_QUERY: string = attestationQueries[0]!;
export const IS_ATTESTATION_VALID_QUERY: string = attestationQueries[1]!;
export const GET_TIMESTAMP_QUERY: string = attestationQueries[2]!;
export const GET_ATTESTATIONS_QUERY: string = attestationQueries[3]!;

/**
 * All GraphQL operations organized by category
 */
export const GraphQLOperations = {
  mutations: {
    deploySchemaRegistry: getDeploySchemaRegistoryMutation,
    deployEAS: getDeployEASMutation,
    registerSchema: REGISTER_SCHEMA_MUTATION,
    attest: ATTEST_MUTATION,
    multiAttest: MULTI_ATTEST_MUTATION,
    revoke: REVOKE_MUTATION,
  },
  queries: {
    getSchema: GET_SCHEMA_QUERY,
    getSchemas: GET_SCHEMAS_QUERY,
    getAttestation: GET_ATTESTATION_QUERY,
    getAttestations: GET_ATTESTATIONS_QUERY,
    isAttestationValid: IS_ATTESTATION_VALID_QUERY,
    getTimestamp: GET_TIMESTAMP_QUERY,
  },
} as const;

/**
 * Type-safe access to GraphQL operations
 */
export type GraphQLMutations = typeof GraphQLOperations.mutations;
export type GraphQLQueries = typeof GraphQLOperations.queries;
