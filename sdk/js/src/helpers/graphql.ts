/**
 * This module initializes and exports GraphQL-related utilities using gql.tada.
 * It sets up the GraphQL client with specific configurations and exports necessary types and functions.
 */

import { initGraphQLTada } from "gql.tada";
import type { introspection } from "./graphql-env.d.ts";

/**
 * Initializes the GraphQL client with specific configurations.
 *
 * @returns A configured GraphQL client instance.
 */
export const graphql: initGraphQLTada<{
  introspection: introspection;
  disableMasking: true;
  scalars: {
    DateTime: Date;
    JSON: Record<string, unknown>;
    Bytes: string;
    Int8: string;
    BigInt: string;
    BigDecimal: string;
    Timestamp: string;
  };
}> = initGraphQLTada<{
  introspection: introspection;
  disableMasking: true;
  scalars: {
    DateTime: Date;
    JSON: Record<string, unknown>;
    Bytes: string;
    Int8: string;
    BigInt: string;
    BigDecimal: string;
    Timestamp: string;
  };
}>();

export { readFragment } from "gql.tada";
export type { FragmentOf, ResultOf, VariablesOf } from "gql.tada";
