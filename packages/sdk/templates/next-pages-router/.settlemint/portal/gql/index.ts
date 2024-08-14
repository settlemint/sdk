import { GraphQLClient } from "graphql-request";

export const portal = new GraphQLClient(`${process.env.NEXT_PUBLIC_SETTLEMINT_APP_URL}/proxy/portal/graphql`);