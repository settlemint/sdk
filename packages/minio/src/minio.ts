import { ensureServer } from "@settlemint/sdk-utils/runtime";
import { validate } from "@settlemint/sdk-utils/validation";
import { Client } from "minio";
import { type ServerClientOptions, ServerClientOptionsSchema } from "./helpers/client-options.schema.js";

/**
 * Creates a Portal client for server-side use with additional authentication.
 *
 * @param options - The server client options for configuring the Portal client.
 * @param requestConfig - Optional configuration for GraphQL requests.
 * @returns An object containing the GraphQL client and the initialized graphql function.
 * @throws Will throw an error if not called on the server or if the options fail validation.
 *
 * @example
 * const { client, graphql } = createServerPortalClient<{
 *   introspection: introspection;
 *   disableMasking: true;
 *   scalars: {
 *     DateTime: Date;
 *     JSON: Record<string, unknown>;
 *   };
 * }>({
 *   instance: 'https://your-portal-instance.com',
 *   accessToken: 'your-access-token',
 *   adminSecret: 'your-admin-secret',
 * });
 */
export function createServerMinioClient(options: ServerClientOptions): { client: Client } {
  ensureServer();
  const validatedOptions = validate(ServerClientOptionsSchema, options);

  return {
    client: new Client({
      endPoint: new URL(validatedOptions.instance).host,
      accessKey: validatedOptions.accessKey,
      secretKey: validatedOptions.secretKey,
    }),
  };
}
