import { ApplicationAccessTokenSchema, UrlOrPathSchema } from "@settlemint/sdk-utils/validation";
import { isAddress } from "viem";
import type { Abi } from "viem";
import { z } from "zod/v4";

/**
 * ABI source configuration for EAS contracts.
 * Priority: hardcoded (default) > custom (user override) > predeployed (Portal's ABIs)
 */
export const abiSourceSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("hardcoded"),
    // Uses built-in standard EAS ABIs - this is the default
  }),
  z.object({
    type: z.literal("custom"),
    // User-provided ABIs to override the defaults
    easAbi: z.custom<Abi>((val) => Array.isArray(val)),
    schemaRegistryAbi: z.custom<Abi>((val) => Array.isArray(val)),
  }),
  z.object({
    type: z.literal("predeployed"),
    // Uses Portal's predeployed ABIs (e.g., "eas")
    abiNames: z.array(z.string()).optional().default(["eas"]),
  }),
]);

/**
 * Configuration options for the EAS Portal client
 */
export const portalClientOptionsSchema = z.object({
  /**
   * Portal instance URL or path
   */
  instance: UrlOrPathSchema,

  /**
   * Access token for Portal authentication
   */
  accessToken: ApplicationAccessTokenSchema,

  /**
   * The address of the EAS Attestation contract
   */
  easContractAddress: z.string().refine(isAddress, "Invalid EAS contract address format"),

  /**
   * The address of the EAS Schema Registry contract
   */
  schemaRegistryContractAddress: z.string().refine(isAddress, "Invalid Schema Registry address format"),

  /**
   * ABI source configuration
   * @default { type: "hardcoded" } - Uses standard EAS ABIs
   */
  abiSource: abiSourceSchema.optional().default({ type: "hardcoded" }),

  /**
   * Optional WebSocket URL for real-time transaction monitoring
   */
  wsUrl: z.string().url().optional(),

  /**
   * Request timeout in milliseconds
   * @default 30000
   */
  timeout: z.number().positive().optional().default(30000),

  /**
   * Enable debug logging
   * @default false
   */
  debug: z.boolean().optional().default(false),

  /**
   * Optional cache configuration for GraphQL requests
   */
  cache: z.enum(["default", "force-cache", "no-cache", "no-store", "only-if-cached", "reload"]).optional(),
});

export type PortalClientOptions = z.infer<typeof portalClientOptionsSchema>;
export type AbiSource = z.infer<typeof abiSourceSchema>;

/**
 * Validates EAS Portal client options.
 *
 * @param options - The options to validate
 * @returns The validated options
 * @throws If validation fails
 *
 * @example
 * ```typescript
 * import { validatePortalClientOptions } from "@settlemint/sdk-eas";
 *
 * const options = validatePortalClientOptions({
 *   instance: "https://portal.settlemint.com",
 *   accessToken: "your-token",
 *   easContractAddress: "0x...",
 *   schemaRegistryContractAddress: "0x...",
 * });
 * ```
 */
export function validatePortalClientOptions(options: unknown): PortalClientOptions {
  return portalClientOptionsSchema.parse(options);
}
