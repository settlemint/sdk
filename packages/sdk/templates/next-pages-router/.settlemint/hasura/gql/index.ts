import { GraphQLClient } from "graphql-request";

export const hasura = new GraphQLClient(`${process.env.NEXT_PUBLIC_SETTLEMINT_APP_URL}/proxy/hasura/graphql`);