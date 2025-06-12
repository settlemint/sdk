import { ApplicationAccessTokenSchema } from "@settlemint/sdk-utils/validation";
import { type Address, isAddress } from "viem";
import { z } from "zod/v4";

const ethAddressSchema = z.custom<Address>(
  (val) => typeof val === "string" && isAddress(val),
  "Invalid Ethereum address",
);

/**
 * @description Zod schema for EASClientOptions.
 */
export const EASClientOptionsSchema = z.object({
  instance: z.string().url("Invalid instance URL"),
  accessToken: ApplicationAccessTokenSchema.optional(),
  easContractAddress: ethAddressSchema.optional(),
  schemaRegistryContractAddress: ethAddressSchema.optional(),
  debug: z.boolean().optional(),
});
