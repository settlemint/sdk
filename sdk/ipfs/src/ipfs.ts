import { ensureServer } from "@settlemint/sdk-utils/runtime";
import { validate } from "@settlemint/sdk-utils/validation";
import { type KuboRPCClient, create } from "kubo-rpc-client";
import {
  type ClientOptions,
  ClientOptionsSchema,
  type ServerClientOptions,
  ServerClientOptionsSchema,
} from "./helpers/client-options.schema.js";

/**
 * Creates an IPFS client for client-side use
 *
 * @param options - Configuration options for the client
 * @returns An object containing the configured IPFS client instance
 * @throws Will throw an error if the options fail validation
 * @example
 * ```ts
 * import { createIpfsClient } from '@settlemint/sdk-ipfs';
 *
 * const { client } = createIpfsClient({
 *   instance: 'https://ipfs.settlemint.com'
 * });
 *
 * // Upload a file using Blob
 * const blob = new Blob(['Hello, world!'], { type: 'text/plain' });
 * const result = await client.add(blob);
 * console.log(result.cid.toString());
 * ```
 */
export function createIpfsClient(options: ClientOptions): { client: KuboRPCClient } {
  const validatedOptions = validate(ClientOptionsSchema, options);

  return {
    client: create({
      url: validatedOptions.instance,
    }),
  };
}

/**
 * Creates an IPFS client for server-side use with authentication
 *
 * @param options - Configuration options for the client including authentication
 * @returns An object containing the authenticated IPFS client instance
 * @throws Will throw an error if called on the client side or if options validation fails
 * @example
 * import { createServerIpfsClient } from '@settlemint/sdk-ipfs';
 *
 * const { client } = createServerIpfsClient({
 *   instance: process.env.SETTLEMINT_IPFS_ENDPOINT,
 *   accessToken: process.env.SETTLEMINT_ACCESS_TOKEN
 * });
 *
 * // Upload a file using Blob
 * const blob = new Blob(['Hello, world!'], { type: 'text/plain' });
 * const result = await client.add(blob);
 * console.log(result.cid.toString());
 */
export function createServerIpfsClient(options: ServerClientOptions): { client: KuboRPCClient } {
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
