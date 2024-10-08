import { ensureServer } from "@settlemint/sdk-utils/runtime";
import { validate } from "@settlemint/sdk-utils/validation";
import { create } from "kubo-rpc-client";
import {
  type ClientOptions,
  ClientOptionsSchema,
  type ServerClientOptions,
  ServerClientOptionsSchema,
} from "./helpers/client-options.schema.js";

/**
 * Creates an IPFS client for client-side use.
 *
 * @param options - The client options for configuring the IPFS client.
 * @returns An object containing the IPFS client.
 * @throws Will throw an error if the options fail validation.
 *
 * @example
 * const { client } = createIpfsClient({
 *   instance: 'https://your-ipfs-instance.com',
 * });
 */
export function createIpfsClient(options: ClientOptions) {
  const validatedOptions = validate(ClientOptionsSchema, options);

  return {
    client: create({
      url: validatedOptions.instance,
    }),
  };
}

/**
 * Creates an IPFS client for server-side use with additional authentication.
 *
 * @param options - The server client options for configuring the IPFS client.
 * @returns An object containing the authenticated IPFS client.
 * @throws Will throw an error if not called on the server or if the options fail validation.
 *
 * @example
 * const { client } = createServerIpfsClient({
 *   instance: 'https://your-ipfs-instance.com',
 *   accessToken: 'your-access-token',
 * });
 */
export function createServerIpfsClient(options: ServerClientOptions) {
  ensureServer();
  const validatedOptions = validate(ServerClientOptionsSchema, options);

  return {
    client: create({
      url: validatedOptions.instance,
      headers: {
        "x-auth-token": validatedOptions.accessToken,
      },
    }),
  };
}
