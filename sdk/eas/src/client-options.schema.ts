import { AccessTokenSchema, UrlSchema } from "@settlemint/sdk-utils/validation";
import type { ClientOptions as ViemClientOptions } from "@settlemint/sdk-viem";
import { isAddress } from "viem";
import { z } from "zod";

/**
 * Schema for validating EAS client configuration options.
 * Extends the base Viem client options with EAS-specific requirements.
 */
export const ClientOptionsSchema = z.object({
  schemaRegistryAddress: z.string().refine(isAddress, "Invalid Ethereum address format"),
  attestationAddress: z.string().refine(isAddress, "Invalid Ethereum address format"),
  ...z.object({
    accessToken: AccessTokenSchema,
    chainId: z.string().min(1),
    chainName: z.string().min(1),
    rpcUrl: UrlSchema,
  }).shape,
});

/**
 * Configuration options for creating an EAS client.
 * Combines EAS-specific options with base Viem client options.
 *
 * @property schemaRegistryAddress - The address of the EAS Schema Registry contract
 * @property attestationAddress - The address of the EAS Attestation contract
 * @property accessToken - Access token for the RPC provider (must start with 'sm_aat_' or 'sm_pat_')
 * @property chainId - The chain ID to connect to
 * @property chainName - The name of the chain to connect to
 * @property rpcUrl - The RPC URL to connect to (must be a valid URL)
 */
export type ClientOptions = z.infer<typeof ClientOptionsSchema> &
  Pick<ViemClientOptions, "accessToken" | "chainId" | "chainName" | "rpcUrl">;
