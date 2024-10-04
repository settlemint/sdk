import { graphql } from "@/helpers/graphql";
import { type Id, IdSchema, type SettleMintClientOptions, validate } from "@/helpers/schemas";
import type { GraphQLClient } from "graphql-request";

const MiddlewareFragment = graphql(`
  fragment Middleware on Middleware {
    id
    name
  }
`);

const getMiddlewares = graphql(
  `
query getMiddlewares($id: ID!) {
  middlewares(applicationId: $id) {
    items {
      ...Middleware
    }
  }
}`,
  [MiddlewareFragment],
);

const getBlockchainNetwork = graphql(
  `
query getMiddleware($id: ID!) {
  middleware(entityId: $id) {
    ...Middleware
  }
}
`,
  [MiddlewareFragment],
);

export const middlewareList = (gqlClient: GraphQLClient, options: SettleMintClientOptions) => {
  return async (applicationId: Id) => {
    const id = validate(IdSchema, applicationId ?? options?.applicationId);
    const {
      middlewares: { items },
    } = await gqlClient.request(getMiddlewares, { id });
    return items;
  };
};

export const middlewareRead = (gqlClient: GraphQLClient, options: SettleMintClientOptions) => {
  return async (middlewareId: Id) => {
    const id = validate(IdSchema, middlewareId ?? options?.middlewareId);
    const { middleware } = await gqlClient.request(getBlockchainNetwork, { id });
    return middleware;
  };
};
