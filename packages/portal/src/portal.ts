import { runsOnServer } from "@settlemint/sdk-utils/runtime";
import { AccessTokenSchema, UrlOrPathSchema, validate } from "@settlemint/sdk-utils/validation";
import { type AbstractSetupSchema, initGraphQLTada } from "gql.tada";
import { GraphQLClient } from "graphql-request";
import { z } from "zod";

/**
 * Options for configuring the URQL client, excluding 'url' and 'exchanges'.
 */
export type RequestConfig = ConstructorParameters<typeof GraphQLClient>[1];

/**
 * Schema for validating client options for the Portal client.
 */
export const ClientOptionsSchema = z.discriminatedUnion("runtime", [
  z.object({
    instance: UrlOrPathSchema,
    runtime: z.literal("server"),
    accessToken: AccessTokenSchema,
  }),
  z.object({
    runtime: z.literal("browser"),
  }),
]);

/**
 * Type definition for client options derived from the ClientOptionsSchema.
 */
export type ClientOptions = z.infer<typeof ClientOptionsSchema>;

/**
 * Constructs the full URL for the Portal client based on the provided options.
 *
 * @param options - The client options for configuring the Portal client.
 * @returns The full URL as a string.
 * @throws Will throw an error if called on the client side when runtime is set to "server".
 */
function getFullUrl(options: ClientOptions): string {
  return options.runtime === "server"
    ? new URL(options.instance).toString()
    : new URL(
        "/proxy/portal/graphql",
        process.env.NEXTAUTH_URL ?? window?.location?.origin ?? "http://localhost:3000",
      ).toString();
}

/**
 * Creates a Portal client using URQL
 *
 * @param options - The client options for configuring the Portal client.
 * @param clientOptions - Optional configuration for the URQL client.
 * @returns An object containing the URQL client and the initialized graphql function.
 * @throws Will throw an error if the options fail validation.
 */
export function createPortalClient<const Setup extends AbstractSetupSchema>(
  options: Omit<ClientOptions, "runtime"> & Record<string, unknown>,
  clientOptions?: RequestConfig,
): {
  client: GraphQLClient;
  graphql: initGraphQLTada<Setup>;
} {
  const validatedOptions = validate(ClientOptionsSchema, {
    ...options,
    runtime: runsOnServer ? "server" : "browser",
  });
  const graphql = initGraphQLTada<Setup>();
  const fullUrl = getFullUrl(validatedOptions);

  return {
    client: new GraphQLClient(fullUrl, {
      ...clientOptions,
      ...(validatedOptions.runtime === "server" && {
        headers: {
          "x-auth-token": validatedOptions.accessToken,
        },
      }),
    }),
    graphql,
  };
}

export { readFragment } from "gql.tada";
export type { FragmentOf, ResultOf, VariablesOf } from "gql.tada";
