import { GraphQLClient } from "graphql-request";

interface GraphQLClientConfig {
  url: string;
  headers: Record<string, string>;
}

type GraphQLClientType = "portal" | "thegraph" | "hasura";

export function createGraphqlClient(type: GraphQLClientType): GraphQLClient {
  const fallbackUrl = process.env.NEXT_PUBLIC_SETTLEMINT_APP_URL;
  if (!fallbackUrl) {
    throw new Error("NEXT_PUBLIC_SETTLEMINT_APP_URL is not defined");
  }
  return new GraphQLClient(`${fallbackUrl}/proxy/${type}/graphql`);
}
