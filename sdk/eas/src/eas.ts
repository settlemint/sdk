import { SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import { validate } from "@settlemint/sdk-utils/validation";
import { JsonRpcProvider, Wallet } from "ethers";
import { type ClientOptions, ClientOptionsSchema } from "./client-options.schema.js";
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
 * import { Wallet } from 'ethers';
 *
 * // Using a private key
 * const client = createEASClient({
 *   schemaRegistryAddress: "0x1234567890123456789012345678901234567890",
 *   attestationAddress: "0x1234567890123456789012345678901234567890",
 *   blockchainNode: "http://localhost:8545",
 *   wallet: "your-private-key-here"
 * });
 *
 * // Or using a Wallet instance
 * const wallet = new Wallet("your-private-key-here");
 * const client = createEASClient({
 *   schemaRegistryAddress: "0x1234567890123456789012345678901234567890",
 *   attestationAddress: "0x1234567890123456789012345678901234567890",
 *   blockchainNode: "http://localhost:8545",
 *   wallet
 * });
 * ```
 */
export function createEASClient(options: ClientOptions) {
  validate(ClientOptionsSchema, options);

  const provider = new JsonRpcProvider(options.blockchainNode);
  const wallet =
    typeof options.wallet === "string" ? new Wallet(options.wallet, provider) : options.wallet.connect(provider);
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
