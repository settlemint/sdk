import { ensureServer, runsOnServer } from "@settlemint/sdk-utils/runtime";
import { AccessTokenSchema, UrlOrPathSchema, validate } from "@settlemint/sdk-utils/validation";
import { registerUrql } from "@urql/next/rsc";
import { type AbstractSetupSchema, initGraphQLTada } from "gql.tada";
import { type Client, cacheExchange, createClient, fetchExchange } from "urql";
import { z } from "zod";

/**
 * Options for configuring the URQL client, excluding 'url' and 'exchanges'.
 */
export type UrqlOptions = Omit<ConstructorParameters<typeof Client>[0], "url" | "exchanges">;

/**
 * Schema for validating client options for the Portal client.
 */
export const ClientOptionsSchema = z.discriminatedUnion("runtime", [
  z.object({
    instance: UrlOrPathSchema,
    runtime: z.literal("server"),
    accessToken: AccessTokenSchema,
    adminSecret: z.string(),
  }),
  z.object({
    instance: UrlOrPathSchema,
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
  const isServer = options.runtime === "server";
  if (isServer) {
    ensureServer();
  }

  return isServer
    ? new URL(options.instance).toString()
    : new URL(
        options.instance,
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
export function createHasuraClient<const Setup extends AbstractSetupSchema>(
  options: Omit<ClientOptions, "runtime">,
  clientOptions?: UrqlOptions,
): {
  client: Client;
  graphql: initGraphQLTada<Setup>;
} {
  const validatedOptions = validate(ClientOptionsSchema, {
    ...options,
    runtime: runsOnServer ? "server" : "browser",
  });
  const graphql = initGraphQLTada<Setup>();
  const fullUrl = getFullUrl(validatedOptions);

  const { getClient } = registerUrql(() =>
    createClient({
      ...clientOptions,
      url: fullUrl,
      fetchSubscriptions: true,
      exchanges: [cacheExchange, fetchExchange],
      ...(validatedOptions.runtime === "server" && {
        fetchOptions: () => {
          return {
            ...(typeof clientOptions?.fetchOptions === "function"
              ? clientOptions.fetchOptions()
              : clientOptions?.fetchOptions),
            headers: {
              ...(typeof clientOptions?.fetchOptions === "function"
                ? clientOptions.fetchOptions().headers
                : clientOptions?.fetchOptions?.headers),
              "x-auth-token": validatedOptions.accessToken,
              "x-hasura-admin-secret": validatedOptions.adminSecret,
            },
            cache: "no-store",
          };
        },
      }),
    }),
  );

  return {
    client: getClient(),
    graphql,
  };
}

export { readFragment } from "gql.tada";
export type { FragmentOf, ResultOf, VariablesOf } from "gql.tada";
