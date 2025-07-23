import { ApplicationAccessTokenSchema, UrlSchema } from "@settlemint/sdk-utils/validation";
import { type Address, isAddress } from "viem";
import { z } from "zod";

const ethAddressSchema = z.custom<Address>(
  (val) => typeof val === "string" && isAddress(val),
  "Invalid Ethereum address",
);

/**
 * Zod schema for EASClientOptions.
 */
export const EASClientOptionsSchema = z.object({
  /**
   * The EAS instance URL
   */
  instance: UrlSchema,
  /**
   * The application access token
   */
  accessToken: ApplicationAccessTokenSchema.optional(),
  /**
   * The EAS contract address
   */
  easContractAddress: ethAddressSchema.optional(),
  /**
   * The schema registry contract address
   */
  schemaRegistryContractAddress: ethAddressSchema.optional(),
  /**
   * Whether to enable debug mode
   */
  debug: z.boolean().optional(),
});
