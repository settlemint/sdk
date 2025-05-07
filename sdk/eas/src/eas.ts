import { SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import { validate } from "@settlemint/sdk-utils/validation";
import { getPublicClient, getWalletClient } from "@settlemint/sdk-viem";
import type { PublicClient } from "viem";
import { type ClientOptions, ClientOptionsSchema } from "./client-options.schema.js";
import { publicClientToProvider, walletClientToSigner } from "./ethers-adapter.js";
import type { RegisterSchemaOptions } from "./types.js";
import { buildSchemaString, validateSchemaFields } from "./validation.js";

/**
 * Creates an EAS client for interacting with the Ethereum Attestation Service.
 *
 * @param options - Configuration options for the client
 * @returns An object containing the EAS client instance
 * @throws Will throw an error if the options fail validation
 *
 * @example
 * ```ts
 * import { createEASClient } from '@settlemint/sdk-eas';
 *
 * const client = createEASClient({
 *   schemaRegistryAddress: "0x1234567890123456789012345678901234567890",
 *   attestationAddress: "0x1234567890123456789012345678901234567890",
 *   accessToken: "your-access-token",
 *   chainId: "1",
 *   chainName: "Ethereum",
 *   rpcUrl: "http://localhost:8545"
 * });
 * ```
 */
export function createEASClient(options: ClientOptions) {
  validate(ClientOptionsSchema, options);

  // Create viem clients
  const publicClient = getPublicClient({
    accessToken: options.accessToken,
    chainId: options.chainId,
    chainName: options.chainName,
    rpcUrl: options.rpcUrl,
  }) as PublicClient;

  const walletClient = getWalletClient({
    accessToken: options.accessToken,
    chainId: options.chainId,
    chainName: options.chainName,
    rpcUrl: options.rpcUrl,
  })();

  // Convert to ethers for EAS SDK
  const provider = publicClientToProvider(publicClient);
  const wallet = walletClientToSigner(walletClient);

  const schemaRegistry = new SchemaRegistry(options.schemaRegistryAddress);
  schemaRegistry.connect(wallet);

  async function registerSchema(options: RegisterSchemaOptions): Promise<string> {
    validateSchemaFields(options.fields);
    const schema = buildSchemaString(options.fields);

    try {
      // Check if the provider is available
      await provider.getNetwork();

      const tx = await schemaRegistry.register({
        schema,
        resolverAddress: options.resolverAddress,
        revocable: options.revocable,
      });

      await tx.wait();
      return tx.toString();
    } catch (error) {
      throw new Error(`Failed to register schema: ${(error as Error).message}`);
    }
  }

  async function getSchema(uid: string): Promise<string> {
    try {
      // Check if the provider is available
      await provider.getNetwork();

      const schema = await schemaRegistry.getSchema({ uid });
      return schema.toString();
    } catch (error) {
      throw new Error(`Failed to get schema: ${(error as Error).message}`);
    }
  }

  return {
    registerSchema,
    getSchema,
  };
}
