import { AccessTokenSchema, UrlSchema } from "@settlemint/sdk-utils/validation";
import type { ClientOptions as ViemClientOptions } from "@settlemint/sdk-viem";
import { isAddress } from "viem";
import { z } from "zod/v4";

/**
 * Schema for validating EAS client configuration options.
 * Extends the base Viem client options with EAS-specific requirements.
 */
export const ClientOptionsSchema = z.object({
  /** The address of the EAS Schema Registry contract */
  schemaRegistryAddress: z.string().refine(isAddress, "Invalid Ethereum address format"),
  /** The address of the EAS Attestation contract */
  attestationAddress: z.string().refine(isAddress, "Invalid Ethereum address format"),
  /** Access token for the RPC provider (must start with 'sm_aat_' or 'sm_pat_') */
  accessToken: AccessTokenSchema,
  /** The chain ID to connect to */
  chainId: z.string().min(1),
  /** The name of the chain to connect to */
  chainName: z.string().min(1),
  /** The RPC URL to connect to (must be a valid URL) */
  rpcUrl: UrlSchema,
});

/**
 * Configuration options for creating an EAS client.
 * Combines EAS-specific options with base Viem client options.
 */
export type ClientOptions = z.infer<typeof ClientOptionsSchema> &
  Pick<ViemClientOptions, "accessToken" | "chainId" | "chainName" | "rpcUrl">;
